'use client'

import { usePathname } from 'next/navigation'
import Nav from './Nav'
import Footer from './Footer'
import WhatsAppFloat from './WhatsAppFloat'

// The marketing Nav/Footer/WhatsApp float don't belong on the dashboard or
// its login screen — both have their own chrome (or none at all) and
// showing the public site nav on top of a login form is confusing.
const CHROME_FREE_PREFIXES = ['/dashboard', '/login']

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const hideChrome = CHROME_FREE_PREFIXES.some(p => pathname?.startsWith(p))

  if (hideChrome) {
    return <>{children}</>
  }

  return (
    <>
      <Nav />
      <main>{children}</main>
      <Footer />
      <WhatsAppFloat />
    </>
  )
}
