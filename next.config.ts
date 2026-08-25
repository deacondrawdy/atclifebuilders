import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(__filename)

const nextConfig: NextConfig = {
  // Emits .next/standalone with a self-contained server.js and only the
  // traced runtime dependencies. The Dockerfile copies that directory, so
  // removing this breaks the container build.
  output: 'standalone',
  images: {
    // `localPatterns` is an allow-list: any local path NOT listed here is
    // rejected by the image optimiser with a 400.
    //
    // `/_next/static/**` is required because brand imagery is imported
    // statically (see src/lib/brand.ts), so it is served from the build
    // output rather than from /public.
    localPatterns: [
      {
        pathname: '/api/media/file/**',
      },
      {
        pathname: '/_next/static/**',
      },
      {
        pathname: '/brand/**',
      },
    ],
  },
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    return webpackConfig
  },
  turbopack: {
    root: path.resolve(dirname),
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
