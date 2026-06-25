'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import styles from './Nav.module.css'

const links = [
  { href: '/products',   label: 'Products' },
  { href: '/gallery',    label: 'Design Ideas' },
  { href: '/visualizer', label: 'Visualizer' },
  { href: '/about',      label: 'About' },
  { href: '/contact',    label: 'Contact' },
]

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// LOGO CONFIGURATION — edit this one object only
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const LOGO = {
  // ── Option A: use an image file ──────────────────
  // 1. Drop your logo file into /public/  (e.g. logo.png or logo.svg)
  // 2. Set imageSrc to the filename:       '/logo.png'
  // 3. Set imageWidth / imageHeight to match your logo's natural proportions
  // 4. Set useSvgFallback to false
  //
  imageSrc:       '/official_logo.png',       // ← use the official PNG logo file
  imageWidth:     260,               // set to the logo file's typical width
  imageHeight:    96,                // set to the logo file's typical height
  imageAlt:       'Panelopia logo',
  quality:        100,               // set to 100 for best quality (especially for PNG logos)

  // ── Option B: use the built-in SVG P-mark ────────
  // Set useSvgFallback: true  to use the inline SVG instead of an image file.
  // Useful while you don't have the final logo file ready.
  //
  useSvgFallback: false,             // ← SET TO false once you have your logo file

  // ── Show/hide the "Panelopia" text beside the logo
  showWordmark:   false,
}
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/** Built-in SVG P-mark — used when useSvgFallback = true */
function PMarkSVG({ size = 30 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={Math.round(size * (280 / 240))}
      viewBox="0 0 240 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect x="0" y="0" width="52" height="280" fill="#F5A623"/>
      <path d="M0 0H130C200 0 240 40 240 82C240 130 200 164 130 164H52Z" fill="#F5A623"/>
      <path d="M52 40H118C165 40 196 58 196 82C196 108 165 124 118 124H52Z" fill="white"/>
      <polygon points="94,40 148,62 148,88 94,66" fill="#E8522A"/>
      <polygon points="148,62 178,48 178,100 148,118" fill="#3DBFBF"/>
      <polygon points="94,66 148,88 148,118 94,96" fill="white"/>
    </svg>
  )
}

/** Renders whichever logo variant is configured above */
function Logo() {
  if (LOGO.useSvgFallback) {
    return (
      <div className={styles.logoImgWrap}>
        <PMarkSVG size={30} />
      </div>
    )
  }
  return (
    <div className={styles.logoImgWrap}>
      <Image
        src={LOGO.imageSrc}
        alt={LOGO.imageAlt}
        width={LOGO.imageWidth}
        height={LOGO.imageHeight}
        priority
        className={styles.logoImg}
      />
    </div>
  )
}

export default function Nav() {
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [pathname])

  const isHome = pathname === '/'

  return (
    <header className={[
      styles.header,
      isHome ? styles.transparent : styles.solid,
      scrolled  ? styles.scrolled  : '',
    ].join(' ')}>
      <div className={styles.inner}>

        {/* ── Logo ── */}
        <Link href="/" className={styles.logo} aria-label="Panelopia — home">
          <Logo />
          {LOGO.showWordmark && <span className={styles.logoText}>Panelopia</span>}
        </Link>

        {/* ── Desktop nav ── */}
        <nav className={styles.nav} aria-label="Main navigation">
          {links.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.navLink} ${pathname === link.href ? styles.active : ''}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* ── Actions ── */}
        <div className={styles.actions}>
          <Link href="/contact" className={styles.cta}>Get a Quote</Link>
          <button
            className={styles.menuToggle}
            onClick={() => setMenuOpen(v => !v)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span className={`${styles.bar} ${menuOpen ? styles.barOpen1 : ''}`} />
            <span className={`${styles.bar} ${menuOpen ? styles.barOpen2 : ''}`} />
          </button>
        </div>
      </div>

      {/* ── Mobile full-screen menu ── */}
      <div
        className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ''}`}
        aria-hidden={!menuOpen}
      >
        <div className={styles.mobileLogo}>
          <Logo />
          <span>Panelopia</span>
        </div>
        {links.map((link, i) => (
          <Link
            key={link.href}
            href={link.href}
            className={styles.mobileLink}
            style={{ animationDelay: `${i * 55}ms` }}
          >
            <span className={styles.mobileLinkNum}>0{i + 1}</span>
            {link.label}
          </Link>
        ))}
        <Link href="/contact" className={styles.mobileCta}>Get a Quote</Link>
      </div>
    </header>
  )
}
