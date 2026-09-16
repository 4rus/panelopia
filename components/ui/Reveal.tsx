'use client'

import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import styles from './Reveal.module.css'

// Fades + slides a section's content up once it scrolls into view.
// Fires once (disconnects after), so it doesn't replay when scrolling
// back up and down past the same section repeatedly.
export default function Reveal({
  children,
  className = '',
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -80px 0px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`${styles.reveal} ${visible ? styles.visible : ''} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  )
}
