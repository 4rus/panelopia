import crypto from 'crypto'
import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { createServiceClient } from '@/lib/supabase/service'

// Receives Mailgun's "Routes" webhook for anything sent to
// reply+<leadId>@REPLY_DOMAIN — i.e. a customer replying to an email we
// sent from the dashboard. See docs/mailgun-inbound-setup (or the setup
// steps given alongside this) for the Mailgun-side configuration.
//
// Needs the Node runtime (not edge) for crypto.createHmac.
export const runtime = 'nodejs'

function verifyMailgunSignature(timestamp: string, token: string, signature: string) {
  const signingKey = process.env.MAILGUN_SIGNING_KEY
  if (!signingKey) return false

  const expected = crypto
    .createHmac('sha256', signingKey)
    .update(timestamp + token)
    .digest('hex')

  // Reject anything older than 15 minutes so a leaked payload can't be replayed forever.
  const age = Date.now() / 1000 - Number(timestamp)
  if (!Number.isFinite(age) || age > 900 || age < -60) return false

  try {
    return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature))
  } catch {
    return false // different-length buffers, e.g. a malformed signature
  }
}

export async function POST(request: Request) {
  const form = await request.formData()

  const timestamp = String(form.get('timestamp') || '')
  const token = String(form.get('token') || '')
  const signature = String(form.get('signature') || '')

  if (!verifyMailgunSignature(timestamp, token, signature)) {
    return NextResponse.json({ error: 'Invalid signature.' }, { status: 401 })
  }

  const recipient = String(form.get('recipient') || '')
  const sender = String(form.get('sender') || form.get('from') || '')
  // stripped-text is Mailgun's best-effort "just the new reply, not the
  // quoted history below it". Falls back to the full plain-text body.
  const message = String(form.get('stripped-text') || form.get('body-plain') || '').trim()

  const leadId = recipient.match(/^reply\+([^@]+)@/)?.[1]
  if (!leadId || !message) {
    // Not a shape we recognize — 200 so Mailgun doesn't retry forever,
    // but nothing gets written.
    return NextResponse.json({ skipped: true })
  }

  const supabase = createServiceClient()

  const { data: lead } = await supabase
    .from('leads')
    .select('id, first_name, last_name, email')
    .eq('id', leadId)
    .single()

  if (!lead) {
    return NextResponse.json({ skipped: true, reason: 'Unknown lead.' })
  }

  // Sanity check, not a hard gate — someone replying from a different
  // address than we emailed shouldn't have their reply silently dropped
  // (forwarded threads, a secondary address, etc.), but it's worth
  // recording who it actually came from.
  const senderEmail = sender.match(/<([^>]+)>/)?.[1] || sender

  await supabase.from('lead_replies').insert([{
    lead_id: leadId,
    message,
    sent_by: senderEmail || null,
    direction: 'inbound',
    email_sent: true,
  }])

  await supabase.from('leads').update({ needs_attention: true }).eq('id', leadId)

  await notifyOfReply(lead, message)

  return NextResponse.json({ ok: true })
}

// A short heads-up to a real inbox you actually check — deliberately NOT
// a forward of the customer's raw email. If it were, hitting "Reply" on
// it in Gmail would message the customer directly and bypass the
// dashboard, leaving a silent gap in that lead's thread. This is just a
// notification; the real reply happens from /dashboard.
async function notifyOfReply(
  lead: { id: string; first_name: string; last_name: string; email: string },
  message: string
) {
  const apiKey = process.env.RESEND_API_KEY
  const fromAddress = process.env.RESEND_FROM_EMAIL
  const notifyTo = process.env.NOTIFY_EMAIL || fromAddress
  if (!apiKey || !fromAddress || !notifyTo) return

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://panelopia.com'
  const dashboardLink = `${siteUrl}/dashboard?lead=${lead.id}`
  const preview = message.length > 200 ? `${message.slice(0, 200)}…` : message

  try {
    const resend = new Resend(apiKey)
    await resend.emails.send({
      from: `Panelopia Dashboard <${fromAddress}>`,
      to: notifyTo,
      subject: `${lead.first_name} ${lead.last_name} replied`,
      text: `${lead.first_name} ${lead.last_name} (${lead.email}) replied:\n\n"${preview}"\n\nView and reply: ${dashboardLink}`,
      html: `<div style="font-family:sans-serif;font-size:15px;line-height:1.6;color:#1A1814">
        <p><strong>${escapeHtml(lead.first_name)} ${escapeHtml(lead.last_name)}</strong> (${escapeHtml(lead.email)}) replied:</p>
        <p style="background:#F0EDE6;padding:12px;border-radius:8px;white-space:pre-wrap">${escapeHtml(preview)}</p>
        <p><a href="${dashboardLink}">View and reply in the dashboard →</a></p>
      </div>`,
    })
  } catch (err) {
    // Best-effort — the reply is already saved either way, so a failed
    // notification just means you find out from the dashboard instead.
    console.error('Failed to send reply notification email:', err)
  }
}

function escapeHtml(str: string) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}
