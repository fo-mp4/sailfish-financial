import type { Metadata } from 'next'
import { Inter, Outfit, Cormorant_Garamond, Bodoni_Moda } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
})

const bodoni = Bodoni_Moda({
  subsets: ['latin'],
  variable: '--font-bodoni',
  weight: ['400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Sailfish Financial — Monthly Bookkeeping for Small Businesses',
  description:
    'Flat-rate monthly bookkeeping for US small businesses. Accurate records, clean reports, and no surprises at tax time. Based in Tallahassee, FL.',
  keywords: ['bookkeeping', 'small business', 'accounting', 'Tallahassee', 'Florida', 'QuickBooks'],
  openGraph: {
    title: 'Sailfish Financial',
    description: 'Your books, handled.',
    siteName: 'Sailfish Financial',
    locale: 'en_US',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} ${cormorant.variable} ${bodoni.variable}`}>
      <body>{children}</body>
    </html>
  )
}
