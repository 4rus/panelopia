'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from './MobileTabBar.module.css'

const tabs = [
  {
    href: '/products',
    label: 'Products',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3.5" y="3.5" width="7" height="7" rx="1" />
        <rect x="13.5" y="3.5" width="7" height="7" rx="1" />
        <rect x="3.5" y="13.5" width="7" height="7" rx="1" />
        <rect x="13.5" y="13.5" width="7" height="7" rx="1" />
      </svg>
    ),
  },
  {
    href: '/gallery',
    label: 'Gallery',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <circle cx="9" cy="10" r="1.75" />
        <path d="M21 16l-5.5-5.5a1.5 1.5 0 0 0-2.12 0L4 19" />
      </svg>
    ),
  },
  {
    href: '/visualizer',
    label: 'Visualizer',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 8V4.5h3.5M21 8V4.5h-3.5M3 16v3.5h3.5M21 16v3.5h-3.5" />
        <circle cx="12" cy="12" r="3.25" />
      </svg>
    ),
  },
  {
    href: '/about',
    label: 'About',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="8.5" />
        <path d="M12 11v5.5" />
        <circle cx="12" cy="8" r="0.9" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    href: '/contact',
    label: 'Contact',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M4 6.5l7.2 6a1.3 1.3 0 0 0 1.6 0L20 6.5" />
      </svg>
    ),
  },
]

// Replaces the hamburger + full-screen menu on mobile — a persistent
// bar beats a hidden menu for a 5-item site: every destination is one
// tap away instead of icon-tap-then-pick.
export default function MobileTabBar() {
  const pathname = usePathname()

  return (
    <nav className={styles.bar} aria-label="Primary">
      {tabs.map(tab => {
        const active = pathname === tab.href
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`${styles.tab} ${active ? styles.active : ''}`}
            aria-current={active ? 'page' : undefined}
          >
            <span className={styles.icon}>{tab.icon}</span>
            <span className={styles.label}>{tab.label}</span>
          </Link>
        )
      })}
    </nav>
  )
}
