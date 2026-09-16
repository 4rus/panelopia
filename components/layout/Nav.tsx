'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import styles from './Nav.module.css'

const links = [
  { href: '/products',   label: 'Products' },
  { href: '/gallery',    label: 'Gallery' },
  { href: '/visualizer', label: 'Visualizer' },
  { href: '/about',      label: 'About' },
  { href: '/contact',    label: 'Contact' },
]

// Header + mobile menu both render this. useSvgFallback keeps the inline
// P-mark available as a backup if we ever need to swap logo files again.
const LOGO = {
  imageSrc:       '/official_logo.png',
  imageWidth:     302,
  imageHeight:    126,
  imageAlt:       'Panelopia logo',
  quality:        100,
  useSvgFallback: false,
  showWordmark:   false,
}

/** Inline P-mark fallback, used when useSvgFallback is true. */
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
  const [mounted, setMounted]     = useState(false)   // NEW — portal needs document.body, client-only
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  // Close the mobile menu whenever the route changes.
  // This is the fix: Nav lives in the root layout and never unmounts
  // between pages, so without this, menuOpen stayed `true` after a
  // link tap and the full-screen overlay kept sitting on top of
  // (and fading into) the newly-navigated page underneath it.
  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  const isHome = pathname === '/'
  const closeMenu = () => setMenuOpen(false)

  return (
    <>
    <header className={[
    styles.header,
    isHome ? styles.transparent : styles.solid,
    scrolled  ? styles.scrolled  : '',
    menuOpen  ? styles.menuOpen  : '',
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

    </header>

    {/* ── Mobile full-screen menu ──────────────────────────────
        Rendered through a portal directly onto <body>, NOT nested
        inside <header>. This is the actual fix: .header gets
        backdrop-filter in its .solid / .transparent.scrolled states,
        and backdrop-filter on an ancestor creates a new containing
        block for any position:fixed descendant. That silently
        shrank this menu's "fixed, inset:0" box down to the header's
        own 88px height instead of the full viewport — which is why
        it broke specifically on inner pages and once you scrolled,
        but looked fine on an unscrolled home page. Portaling to
        <body> means there's no filtered ancestor to break it,
        on any page, in any scroll state. ── */}
    {mounted && createPortal(
      <div
        className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ''}`}
        aria-hidden={!menuOpen}
      >
        <button
          className={styles.mobileMenuClose}
          onClick={closeMenu}
          aria-label="Close menu"
        >
          <span className={styles.closeBar} />
          <span className={styles.closeBar} />
        </button>

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
            onClick={closeMenu}
          >
            <span className={styles.mobileLinkNum}>0{i + 1}</span>
            {link.label}
          </Link>
        ))}
        <Link href="/contact" className={styles.mobileCta} onClick={closeMenu}>
          Get a Quote
        </Link>
      </div>,
      document.body
    )}
    </>
  )
}