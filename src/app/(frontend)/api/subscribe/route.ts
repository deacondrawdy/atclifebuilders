import { NextResponse } from 'next/server'

/**
 * Newsletter subscribe endpoint — STUB.
 *
 * Accepts the form post so the UI is functional end-to-end, but does not yet
 * persist or forward the address. Wire this to the chosen provider
 * (Mailchimp / Beehiiv / Resend Audiences) before launch.
 *
 * Deliberately returns the same response for success and duplicate-signup so
 * the endpoint can't be used to enumerate which addresses are subscribed.
 */

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(request: Request) {
  let email: string | null = null

  const contentType = request.headers.get('content-type') || ''
  if (contentType.includes('application/json')) {
    const body = await request.json().catch(() => null)
    email = typeof body?.email === 'string' ? body.email : null
  } else {
    const form = await request.formData().catch(() => null)
    const value = form?.get('email')
    email = typeof value === 'string' ? value : null
  }

  if (!email || !EMAIL.test(email.trim()) || email.length > 254) {
    return NextResponse.json(
      { ok: false, error: 'Please enter a valid email address.' },
      { status: 400 },
    )
  }

  // TODO: forward to the newsletter provider.
  console.info('[subscribe] pending provider wiring:', email.trim().toLowerCase())

  // Non-JS form posts land here; send them back with a success flag.
  if (!contentType.includes('application/json')) {
    return NextResponse.redirect(new URL('/?subscribed=1', request.url), 303)
  }

  return NextResponse.json({ ok: true })
}
