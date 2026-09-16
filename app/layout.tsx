import type { Metadata } from 'next'
import { Montserrat, Bebas_Neue } from 'next/font/google'
import './globals.css'
import SiteChrome from '@/components/layout/SiteChrome'

// Self-hosted via next/font instead of the old @import in globals.css —
// @import fetches from fonts.googleapis.com at request time (extra DNS +
// connection, blocks rendering until it resolves). next/font downloads
// the font files at build time and serves them from our own domain, so
// there's no external request on page load at all.
const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  style: ['normal', 'italic'],
  variable: '--font-montserrat',
  display: 'swap',
})

const bebasNeue = Bebas_Neue({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-bebas-neue',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Panelopia | Luxury Redefined',
  description: 'Premium wall panels, marble slabs, acoustic panels, and designer wallpapers for residential and commercial spaces in Alberta.',
  metadataBase: new URL('https://panelopia.com'),
  openGraph: {
    title: 'Panelopia | Luxury Redefined',
    description: "Premium wall panels for Alberta's most discerning spaces.",
    siteName: 'Panelopia',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${montserrat.variable} ${bebasNeue.variable}`}>
      <body>
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  )
}