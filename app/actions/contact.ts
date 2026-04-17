'use server'

import nodemailer from 'nodemailer'

export type ContactResult = { ok: true } | { ok: false; error: string }

export async function sendContactEmail(
  _prev: ContactResult | null,
  formData: FormData,
): Promise<ContactResult> {
  const name         = (formData.get('name')         as string | null)?.trim() ?? ''
  const email        = (formData.get('email')        as string | null)?.trim() ?? ''
  const businessType = (formData.get('businessType') as string | null)?.trim() ?? ''
  const message      = (formData.get('message')      as string | null)?.trim() ?? ''

  if (!name || !email || !message) {
    return { ok: false, error: 'Please fill in your name, email, and message.' }
  }

  const user = process.env.GMAIL_USER
  const pass = process.env.GMAIL_APP_PASSWORD

  if (!user || !pass) {
    console.error('GMAIL_USER or GMAIL_APP_PASSWORD not set in .env.local')
    return { ok: false, error: 'Mail not configured — please email us directly.' }
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user, pass },
  })

  await transporter.sendMail({
    from:    `"Sailfish Financial Website" <${user}>`,
    to:      'FordFox@sailfishfinancial.com',
    replyTo: email,
    subject: `New inquiry from ${name}`,
    html: `
      <div style="font-family:sans-serif;max-width:560px;color:#1a1a1a">
        <h2 style="margin:0 0 24px;color:#0C7A94">New message from your website</h2>
        <table style="width:100%;border-collapse:collapse">
          <tr><td style="padding:8px 0;color:#666;width:120px">Name</td><td style="padding:8px 0;font-weight:600">${name}</td></tr>
          <tr><td style="padding:8px 0;color:#666">Email</td><td style="padding:8px 0"><a href="mailto:${email}" style="color:#0C7A94">${email}</a></td></tr>
          ${businessType ? `<tr><td style="padding:8px 0;color:#666">Business type</td><td style="padding:8px 0">${businessType}</td></tr>` : ''}
        </table>
        <hr style="border:none;border-top:1px solid #eee;margin:24px 0" />
        <p style="white-space:pre-wrap;line-height:1.7">${message}</p>
        <hr style="border:none;border-top:1px solid #eee;margin:24px 0" />
        <p style="color:#999;font-size:12px">Hit reply to respond directly to ${name}.</p>
      </div>
    `,
  })

  return { ok: true }
}
