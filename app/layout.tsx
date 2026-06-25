import type { Metadata } from 'next'
import './globals.css'
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'
import WhatsAppFloat from '@/components/layout/WhatsAppFloat'

export const metadata: Metadata = {
  title: 'Panelopia — Luxury Redefined',
  description: 'Premium wall panels, marble slabs, acoustic panels, and designer wallpapers for residential and commercial spaces in Alberta.',
  metadataBase: new URL('https://panelopia.com'),
  openGraph: {
    title: 'Panelopia — Luxury Redefined',
    description: "Premium wall panels for Alberta's most discerning spaces.",
    siteName: 'Panelopia',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Nav />
        <main>
          {children}
        </main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  )
}