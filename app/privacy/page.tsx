import Link from 'next/link'

export const metadata = {
  title: 'Privacy Policy — Sailfish Financial',
}

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen pt-28 pb-20 px-6" style={{ backgroundColor: '#071830' }}>
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="text-xs text-teal-400 hover:text-teal-300 transition-colors mb-8 inline-block">
          ← Back to Home
        </Link>

        <h1 className="font-serif text-4xl text-white mb-2">Privacy Policy</h1>
        <p className="text-silver/40 text-sm mb-10">Last updated: April 16, 2026</p>

        <div className="space-y-8 text-silver/70 text-sm leading-relaxed">
          <section>
            <h2 className="text-white font-semibold text-base mb-3">1. Who We Are</h2>
            <p>Sailfish Financial is a bookkeeping services firm based in Tallahassee, FL. We provide monthly bookkeeping, financial reporting, and related services to small businesses. You can reach us at <a href="mailto:FordFox@sailfishfinancial.com" className="text-teal-400 hover:text-teal-300">FordFox@sailfishfinancial.com</a>.</p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-base mb-3">2. Information We Collect</h2>
            <p className="mb-3">We collect information you provide directly to us, including:</p>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li>Name and contact information (email, phone number)</li>
              <li>Business name and financial records you share with us</li>
              <li>Messages submitted through our contact form</li>
              <li>Login credentials for your client portal account</li>
            </ul>
          </section>

          <section>
            <h2 className="text-white font-semibold text-base mb-3">3. How We Use Your Information</h2>
            <p className="mb-3">We use the information we collect to:</p>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li>Provide bookkeeping and financial reporting services</li>
              <li>Communicate with you about your account and our services</li>
              <li>Respond to inquiries submitted through our contact form</li>
              <li>Improve our services and client portal</li>
            </ul>
          </section>

          <section>
            <h2 className="text-white font-semibold text-base mb-3">4. Information Sharing</h2>
            <p>We do not sell, rent, or share your personal information with third parties except as necessary to provide our services (e.g., cloud storage providers, accounting software integrations you authorize) or as required by law. Any third-party services we use are bound by their own privacy policies.</p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-base mb-3">5. QuickBooks Integration</h2>
            <p>If you authorize Sailfish Financial to connect to your QuickBooks Online account, we access your financial data solely to provide bookkeeping services on your behalf. We do not store your QuickBooks credentials and access is limited to what you explicitly authorize through Intuit's OAuth process.</p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-base mb-3">6. Data Security</h2>
            <p>We take reasonable measures to protect your information, including encrypted connections (HTTPS), secure cloud storage, and access controls. However, no method of transmission over the internet is 100% secure.</p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-base mb-3">7. Data Retention</h2>
            <p>We retain your information for as long as your account is active or as needed to provide services. If you wish to have your data deleted, contact us at <a href="mailto:FordFox@sailfishfinancial.com" className="text-teal-400 hover:text-teal-300">FordFox@sailfishfinancial.com</a>.</p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-base mb-3">8. Your Rights</h2>
            <p>You may request access to, correction of, or deletion of your personal information at any time by contacting us directly. We will respond to all requests within 30 days.</p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-base mb-3">9. Changes to This Policy</h2>
            <p>We may update this privacy policy from time to time. We will notify active clients of material changes by email. Continued use of our services after changes constitutes acceptance of the updated policy.</p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-base mb-3">10. Contact</h2>
            <p>Questions about this privacy policy? Contact us at <a href="mailto:FordFox@sailfishfinancial.com" className="text-teal-400 hover:text-teal-300">FordFox@sailfishfinancial.com</a> or (770) 580-9850.</p>
          </section>
        </div>
      </div>
    </main>
  )
}
