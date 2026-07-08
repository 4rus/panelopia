import Link from 'next/link'
import styles from './LegalLayout.module.css'

export default function LegalLayout({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string
  title: string
  children: React.ReactNode
}) {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className="container">
          <p className="eyebrow">{eyebrow}</p>
          <h1 className={styles.title}>{title}</h1>
        </div>
      </div>

      <div className={styles.main}>
        <div className="container">
          <div className={styles.content}>{children}</div>

          <div className={styles.cta}>
            <p className={styles.ctaText}>Have a question about this policy?</p>
            <Link href="/contact" className={styles.ctaBtn}>
              Contact Us →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}