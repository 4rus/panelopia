import type { ReactNode } from 'react'
import styles from './PageHeader.module.css'

// Shared header for inner pages (Products, Gallery, About, Contact) —
// carries the same cream/slat-texture identity as the homepage hero, so
// the site reads as one considered system instead of "bold homepage,
// generic template underneath" once you click past it.
export default function PageHeader({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string
  title: ReactNode
  description?: ReactNode
  children?: ReactNode
}) {
  return (
    <div className={styles.header}>
      <div className={styles.slats} aria-hidden="true" />
      <div className={`container ${styles.inner}`}>
        <p className={`eyebrow ${styles.eyebrow}`}>{eyebrow}</p>
        <h1 className={styles.title}>{title}</h1>
        {description && <p className={styles.description}>{description}</p>}
        {children}
      </div>
    </div>
  )
}
