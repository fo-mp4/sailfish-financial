import Link from 'next/link'

export const metadata = {
  title: 'Terms of Service — Sailfish Financial',
}

export default function TermsOfService() {
  return (
    <main className="min-h-screen pt-28 pb-20 px-6" style={{ backgroundColor: '#00060E' }}>
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="text-xs text-teal-400 hover:text-teal-300 transition-colors mb-8 inline-block">
          ← Back to Home
        </Link>

        <h1 className="font-serif text-4xl text-white mb-2">Terms of Service</h1>
        <p className="text-silver/40 text-sm mb-10">Last updated: April 16, 2026</p>

        <div className="space-y-8 text-silver/70 text-sm leading-relaxed">
          <section>
            <h2 className="text-white font-semibold text-base mb-3">1. Services</h2>
            <p>Sailfish Financial ("we," "us," "our") provides monthly bookkeeping and financial reporting services to small businesses. By engaging our services or using our client portal, you ("client," "you") agree to these terms.</p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-base mb-3">2. Scope of Services</h2>
            <p className="mb-3">Sailfish Financial provides bookkeeping services only. We are not a licensed CPA firm. Our services include:</p>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li>Monthly transaction categorization and reconciliation</li>
              <li>Financial reporting (Profit & Loss, Balance Sheet)</li>
              <li>Expense tracking and invoice management</li>
              <li>Quarterly tax estimates for planning purposes only</li>
            </ul>
            <p className="mt-3">Tax estimates provided are for planning purposes and do not constitute tax advice. You should consult a licensed CPA or tax professional for tax filing and tax advice.</p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-base mb-3">3. Client Responsibilities</h2>
            <p className="mb-3">You agree to:</p>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li>Provide accurate and complete financial records and documentation</li>
              <li>Respond to requests for information in a timely manner</li>
              <li>Review and verify all reports and records we prepare</li>
              <li>Notify us promptly of any errors or discrepancies</li>
            </ul>
          </section>

          <section>
            <h2 className="text-white font-semibold text-base mb-3">4. Fees and Payment</h2>
            <p>Service fees are agreed upon in your individual service agreement. Invoices are due Net 30 unless otherwise specified. Late payments may be subject to a 1.5% monthly late fee. We reserve the right to suspend services for accounts more than 60 days past due.</p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-base mb-3">5. QuickBooks and Third-Party Integrations</h2>
            <p>If you authorize us to connect to your QuickBooks Online or other third-party accounts, you represent that you have the right to grant such access. You may revoke access at any time through the respective platform. We are not responsible for data loss or errors caused by third-party services.</p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-base mb-3">6. Confidentiality</h2>
            <p>We treat all client financial information as confidential and will not disclose it to third parties except as necessary to provide services or as required by law. See our <Link href="/privacy" className="text-teal-400 hover:text-teal-300">Privacy Policy</Link> for full details.</p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-base mb-3">7. Limitation of Liability</h2>
            <p>Sailfish Financial's liability is limited to the fees paid for services in the month in which a claim arises. We are not liable for indirect, incidental, or consequential damages, including penalties or interest resulting from errors in your financial records or tax filings.</p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-base mb-3">8. Termination</h2>
            <p>Either party may terminate services with 30 days written notice. Upon termination, you will receive all financial records and reports prepared on your behalf. Outstanding fees remain due upon termination.</p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-base mb-3">9. Governing Law</h2>
            <p>These terms are governed by the laws of the State of Florida. Any disputes shall be resolved in the courts of Leon County, Florida.</p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-base mb-3">10. Contact</h2>
            <p>Questions about these terms? Contact us at <a href="mailto:FordFox@sailfishfinancial.com" className="text-teal-400 hover:text-teal-300">FordFox@sailfishfinancial.com</a> or (770) 580-9850.</p>
          </section>
        </div>
      </div>
    </main>
  )
}
