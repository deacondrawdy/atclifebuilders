# Multi-stage build for Next.js standalone output.
# Requires `output: 'standalone'` in next.config.ts — see the COPY at the end.
# Based on https://github.com/vercel/next.js/blob/canary/examples/with-docker/Dockerfile

FROM node:22.17.0-alpine AS base

# Pin pnpm. Keep in step with the version used locally (`pnpm --version`).
#
# Installed from npm rather than via `corepack enable pnpm`: with no version
# pinned, Corepack fetches whatever pnpm is tagged `latest`. pnpm 12 ships a
# native binary instead of bin/pnpm.cjs, and the Corepack bundled with Node
# 22.17 can't run it ("Cannot find module .../pnpm/12.4.1/bin/pnpm.cjs"), so
# the build broke the day 12 became latest, with no change on our side.
#
# ENV, not ARG: an ARG declared in this stage is not inherited by the stages
# built FROM base, so deps and builder would see an empty version.
ENV PNPM_VERSION=11.5.0

# ---------------------------------------------------------------------------
# deps — install node_modules only
# ---------------------------------------------------------------------------
FROM base AS deps
# libc6-compat (gcompat) is needed by native modules such as sharp on musl.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# pnpm-workspace.yaml carries the `allowBuilds` approvals. pnpm 11 refuses to
# run install scripts without them and exits non-zero
# (ERR_PNPM_IGNORED_BUILDS), so omitting this file fails the build outright.
# sharp in particular is useless without its install script.
COPY package.json pnpm-workspace.yaml yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then npm install -g pnpm@${PNPM_VERSION} && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

# ---------------------------------------------------------------------------
# builder — compile the app
# ---------------------------------------------------------------------------
FROM base AS builder
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1

# Payload reads PAYLOAD_SECRET at import time while building the admin routes.
# The real secret is injected at runtime by Railway; this placeholder only has
# to be non-empty so the build can complete.
ENV PAYLOAD_SECRET=build-time-placeholder
# Likewise, the Postgres adapter is constructed at build time even though it
# never connects. An empty connection string can fail validation, so give it a
# syntactically valid placeholder. Railway supplies the real DATABASE_URL at
# runtime from the attached Postgres service.
ENV DATABASE_URL=postgres://build:build@127.0.0.1:5432/build

RUN \
  if [ -f yarn.lock ]; then yarn run build; \
  elif [ -f package-lock.json ]; then npm run build; \
  elif [ -f pnpm-lock.yaml ]; then npm install -g pnpm@${PNPM_VERSION} && pnpm run build; \
  else echo "Lockfile not found." && exit 1; \
  fi

# ---------------------------------------------------------------------------
# runner — minimal production image
# ---------------------------------------------------------------------------
FROM base AS runner
# Also required here: the runner starts from `base`, not from `deps`, so it
# does not inherit the compat layer sharp needs at runtime.
RUN apk add --no-cache libc6-compat
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Prerender cache must be writable by the app user.
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Standalone output already contains a traced node_modules and server.js.
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT=3000
# Bind all interfaces so Railway's proxy can reach the container.
ENV HOSTNAME=0.0.0.0

# JSON form so SIGTERM reaches node directly and shutdowns stay clean.
CMD ["node", "server.js"]
