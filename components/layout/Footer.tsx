import Image from 'next/image'
import Link from 'next/link'
import styles from './Footer.module.css'

const productLinks = [
  { href: '/products#wpc-panels',   label: 'WPC Wall Panels' },
  { href: '/products#uv-marble',    label: 'UV Marble Sheets' },
  { href: '/products#acoustic',     label: 'Acoustic Panels' },
  { href: '/products#wallpapers',   label: 'Designer Wallpapers' },
]

const companyLinks = [
  { href: '/gallery',    label: 'Design Ideas' },
  { href: '/visualizer', label: 'Wall Visualizer' },
  { href: '/about',      label: 'About Us' },
  { href: '/contact',    label: 'Contact' },
  { href: '/policies',   label: 'Privacy Policy' },
]

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>

        <div className={styles.brand}>
          <div className={styles.logo}>
            <Image
              src="/official_logo.png"
              alt="Panelopia logo"
              width={200}
              height={80}
              priority
              className={styles.footerLogo}
            />
          </div>
          <p className={styles.desc}>
            Premium WPC wall panels, UV marble sheets, 3D panels, acoustic finishes,
            designer wallpapers, and zebra blinds — supplied and installed across Calgary
            and Edmonton, Alberta.
          </p>
          <div className={styles.locations}>
            <span>Calgary</span>
            <span className={styles.dot}/>
            <span>Edmonton</span>
            <span className={styles.dot}/>
            <span>Alberta</span>
          </div>
          <div className={styles.social}>
            {[
              { href: 'https://www.instagram.com/panelopia_official', label: 'Instagram' },
              { href: 'https://www.facebook.com/profile.php?id=61563496005698', label: 'Facebook' },
              { href: 'https://x.com/Panelopia_yyc', label: 'X' },
              { href: 'https://wa.me/15874335187', label: 'WhatsApp' },
            ].map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                className={styles.socialLink}>{s.label}</a>
            ))}
          </div>
        </div>

        <div className={styles.col}>
          <h6 className={styles.colTitle}>Products</h6>
          <ul>
            {productLinks.map(l => (
              <li key={l.href}><Link href={l.href} className={styles.footLink}>{l.label}</Link></li>
            ))}
          </ul>
        </div>

        <div className={styles.col}>
          <h6 className={styles.colTitle}>Company</h6>
          <ul>
            {companyLinks.map(l => (
              <li key={l.href}><Link href={l.href} className={styles.footLink}>{l.label}</Link></li>
            ))}
          </ul>
        </div>

        <div className={styles.col}>
          <h6 className={styles.colTitle}>Contact Us</h6>
          <p className={styles.contactItem}><a href="tel:5874335187" className={styles.footLink}>587-433-5187</a></p>
          <p className={styles.contactItem}><a href="mailto:info@panelopia.com" className={styles.footLink}>info@panelopia.com</a></p>
          <p className={styles.contactAddr}>
            <strong>Calgary:</strong><br/>
            New Horizon Mall, Unit G-02<br/>
            260300 Writing Creek Cres<br/>
            Balzac, AB T4A 0X8
          </p>
          <p className={styles.contactAddr}>
            <strong>Edmonton:</strong><br/>
            65 St, Beaumont<br/>
            AB T4X 0G7
          </p>
          <Link href="/contact" className={styles.quoteBtn}>Book a Consultation →</Link>
        </div>

      </div>

      <div className={styles.bottom}>
        <span>© 2025 Panelopia Inc. All rights reserved.</span>
        <div className={styles.bottomLinks}>
          <Link href="/policies" className={styles.bottomLink}>Privacy Policy</Link>
          <Link href="/tandc" className={styles.bottomLink}>Terms &amp; Conditions</Link>
          <Link href="/return-policy" className={styles.bottomLink}>Return Policy</Link>
        </div>
      </div>
    </footer>
  )
}
