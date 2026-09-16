'use client'

import { useEffect, useRef, useState } from 'react'

// Counts up from 0 to the numeric part of `value` once it scrolls into
// view, keeping whatever suffix was there (e.g. "1200+" -> counts to
// 1200, keeps the "+"). Falls back to just showing the value if it
// doesn't start with a number, or if the user prefers reduced motion.
export default function Counter({ value, duration = 1400 }: { value: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [display, setDisplay] = useState(value)
  const started = useRef(false)

  useEffect(() => {
    const match = value.match(/^(\d+)(.*)$/)
    const el = ref.current
    if (!match || !el) {
      setDisplay(value)
      return
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplay(value)
      return
    }

    const target = parseInt(match[1], 10)
    const suffix = match[2] || ''
    setDisplay('0' + suffix)

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const start = performance.now()

          const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setDisplay(Math.round(target * eased) + suffix)
            if (progress < 1) requestAnimationFrame(tick)
          }

          requestAnimationFrame(tick)
          observer.disconnect()
        }
      },
      { threshold: 0.4 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [value, duration])

  return <span ref={ref}>{display}</span>
}
