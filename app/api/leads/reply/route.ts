import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { createClient } from '@/lib/supabase/server'

// Sends a reply email to a lead and logs it, whether or not the email
// actually goes out. Requires a logged-in dashboard session — the anon
// key alone can't insert into lead_replies (see lib/schema.sql RLS).
export async function POST(request: Request) {
  const supabase = createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'Not signed in.' }, { status: 401 })
  }

  const { leadId, message } = await request.json()
  if (!leadId || !message?.trim()) {
    return NextResponse.json({ error: 'leadId and message are required.' }, { status: 400 })
  }

  const { data: lead, error: leadError } = await supabase
    .from('leads')
    .select('id, first_name, email, status')
    .eq('id', leadId)
    .single()

  if (leadError || !lead) {
    return NextResponse.json({ error: 'Lead not found.' }, { status: 404 })
  }

  let emailSent = false
  let emailError: string | null = null

  const apiKey = process.env.RESEND_API_KEY
  const fromAddress = process.env.RESEND_FROM_EMAIL
  const replyDomain = process.env.REPLY_DOMAIN

  // Reply-To is per-lead (reply+<leadId>@REPLY_DOMAIN) rather than the
  // flat info@ address — that's what lets /api/leads/inbound match an
  // incoming reply back to the right lead. Falls back to the plain
  // address if the inbound-email piece isn't set up yet, so replies
  // still land somewhere (your real inbox), just not in the dashboard.
  const replyTo = replyDomain ? `reply+${leadId}@${replyDomain}` : fromAddress

  if (!apiKey || !fromAddress) {
    emailError = 'RESEND_API_KEY / RESEND_FROM_EMAIL not configured: reply saved but not emailed.'
  } else {
    try {
      const resend = new Resend(apiKey)
      const { error } = await resend.emails.send({
        from: `Panelopia <${fromAddress}>`,
        to: lead.email,
        replyTo,
        subject: 'Re: Your enquiry to Panelopia',
        text: message,
        html: `<div style="font-family:sans-serif;font-size:15px;line-height:1.6;color:#1A1814;white-space:pre-wrap">${escapeHtml(message)}</div>`,
      })
      if (error) {
        emailError = error.message
      } else {
        emailSent = true
      }
    } catch (err) {
      emailError = err instanceof Error ? err.message : 'Unknown error sending email.'
    }
  }

  const { error: insertError } = await supabase.from('lead_replies').insert([{
    lead_id: leadId,
    message,
    sent_by: user.email,
    email_sent: emailSent,
    email_error: emailError,
  }])

  if (insertError) {
    return NextResponse.json({ error: `Reply not saved: ${insertError.message}` }, { status: 500 })
  }

  if (lead.status === 'New') {
    await supabase.from('leads').update({ status: 'Contacted' }).eq('id', leadId)
  }

  return NextResponse.json({ emailSent, emailError })
}

function escapeHtml(str: string) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}
