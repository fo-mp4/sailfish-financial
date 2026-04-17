'use server'

import nodemailer from 'nodemailer'

export type SignupResult = { ok: true } | { ok: false; error: string }

export async function sendSignupEmail(
  _prev: SignupResult | null,
  formData: FormData,
): Promise<SignupResult> {
  const name         = (formData.get('name')         as string | null)?.trim() ?? ''
  const email        = (formData.get('email')        as string | null)?.trim() ?? ''
  const phone        = (formData.get('phone')        as string | null)?.trim() ?? ''
  const business     = (formData.get('business')     as string | null)?.trim() ?? ''
  const industry     = (formData.get('industry')     as string | null)?.trim() ?? ''
  const revenue      = (formData.get('revenue')      as string | null)?.trim() ?? ''
  const services     = formData.getAll('services').join(', ')
  const quickbooks   = (formData.get('quickbooks')   as string | null)?.trim() ?? ''
  const notes        = (formData.get('notes')        as string | null)?.trim() ?? ''

  if (!name || !email || !business) {
    return { ok: false, error: 'Please fill in your name, email, and business name.' }
  }

  const user = process.env.GMAIL_USER
  const pass = process.env.GMAIL_APP_PASSWORD

  if (!user || !pass) {
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
    subject: `New signup: ${business} (${name})`,
    html: `
      <div style="font-family:sans-serif;max-width:560px;color:#1a1a1a">
        <h2 style="margin:0 0 24px;color:#0C7A94">New Get Started submission</h2>
        <table style="width:100%;border-collapse:collapse">
          <tr><td style="padding:8px 0;color:#666;width:140px">Name</td><td style="padding:8px 0;font-weight:600">${name}</td></tr>
          <tr><td style="padding:8px 0;color:#666">Email</td><td style="padding:8px 0"><a href="mailto:${email}" style="color:#0C7A94">${email}</a></td></tr>
          ${phone    ? `<tr><td style="padding:8px 0;color:#666">Phone</td><td style="padding:8px 0"><a href="tel:${phone}" style="color:#0C7A94">${phone}</a></td></tr>` : ''}
          <tr><td style="padding:8px 0;color:#666">Business</td><td style="padding:8px 0;font-weight:600">${business}</td></tr>
          ${industry ? `<tr><td style="padding:8px 0;color:#666">Industry</td><td style="padding:8px 0">${industry}</td></tr>` : ''}
          ${revenue  ? `<tr><td style="padding:8px 0;color:#666">Monthly revenue</td><td style="padding:8px 0">${revenue}</td></tr>` : ''}
          ${services    ? `<tr><td style="padding:8px 0;color:#666">Services needed</td><td style="padding:8px 0">${services}</td></tr>` : ''}
          ${quickbooks  ? `<tr><td style="padding:8px 0;color:#666">QuickBooks</td><td style="padding:8px 0">${quickbooks}</td></tr>` : ''}
        </table>
        ${notes ? `
        <hr style="border:none;border-top:1px solid #eee;margin:24px 0" />
        <p style="white-space:pre-wrap;line-height:1.7">${notes}</p>
        ` : ''}
        <hr style="border:none;border-top:1px solid #eee;margin:24px 0" />
        <p style="color:#999;font-size:12px">Hit reply to respond directly to ${name}.</p>
      </div>
    `,
  })

  return { ok: true }
}
