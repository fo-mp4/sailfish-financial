import Link from 'next/link'
import Logo from './Logo'

export default function Footer() {
  return (
    <footer className="bg-navy-950 border-t border-white/5 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <Logo className="h-7 w-auto opacity-80" />
            <span className="font-display font-semibold text-white text-sm tracking-wide">
              Sailfish <span className="font-light text-teal-500">Financial</span>
            </span>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap gap-6">
            <Link href="#services" className="text-xs text-silver/40 hover:text-silver/70 transition-colors">Services</Link>
            <Link href="#why-us"   className="text-xs text-silver/40 hover:text-silver/70 transition-colors">Why Us</Link>
            <Link href="/contact"  className="text-xs text-silver/40 hover:text-silver/70 transition-colors">Contact</Link>
            <a href="mailto:FordFox@sailfishfinancial.com" className="text-xs text-silver/40 hover:text-silver/70 transition-colors">
              FordFox@sailfishfinancial.com
            </a>
            <a href="tel:7705809850" className="text-xs text-silver/40 hover:text-silver/70 transition-colors">
              (770) 580-9850
            </a>
          </nav>
        </div>

        <div className="mt-8 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-silver/25 text-xs">
            © {new Date().getFullYear()} Sailfish Financial · 650 W Gaines St, Tallahassee, FL
          </p>
          <p className="text-silver/20 text-xs max-w-sm text-right">
            Bookkeeping services only. Not a licensed CPA firm. Tax estimates are for planning purposes and do not constitute tax advice.
          </p>
        </div>
      </div>
    </footer>
  )
}
