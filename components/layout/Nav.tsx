'use client'

import { useState, useEffect } from 'react'
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

// useSvgFallback keeps the inline P-mark available as a backup if we
// ever need to swap logo files again.
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
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={[
      styles.header,
      styles.solid,
      scrolled ? styles.scrolled : '',
    ].join(' ')}>
      <div className={styles.inner}>

        {/* ── Logo ── */}
        <Link href="/" className={styles.logo} aria-label="Panelopia, home">
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
        {/* Mobile has no hamburger/menu here anymore — MobileTabBar
            (components/layout/MobileTabBar.tsx) covers every one of
            these destinations as a persistent bottom bar instead. */}
        <div className={styles.actions}>
          <Link href="/contact" className={styles.cta}>Get a Quote</Link>
        </div>
      </div>
    </header>
  )
}