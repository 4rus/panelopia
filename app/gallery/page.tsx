'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import styles from './page.module.css'

type Size = 'large' | 'medium' | 'small'

const projects: { id: number; src: string; size: Size }[] = [
  { id: 1, src: '/images/entryway-slat.jpg', size: 'large' },
  { id: 2, src: '/images/fireplace-wallpaper.jpg', size: 'small' },
  { id: 3, src: '/images/dark-slat-fireplace.jpg', size: 'small' },
  { id: 4, src: '/images/black-slat-mirror.jpg', size: 'medium' },
  { id: 5, src: '/images/office-slat-wallpaper.jpg', size: 'medium' },
  { id: 6, src: '/images/showroom-main.jpg', size: 'large' },
  { id: 7, src: '/images/showroom-kitchen.jpg', size: 'small' },
  { id: 8, src: '/images/showroom-slat-shelf.jpg', size: 'small' },
  { id: 9, src: '/images/DSCF2774 (2025-09-13T22_06_54.168).webp', size: 'medium' },
  { id: 10, src: '/images/DSCF2780 (2025-09-13T22_09_54.493).webp', size: 'small' },
  { id: 11, src: '/images/IMG_3762 (2025-10-13T05_46_24.008).webp', size: 'small' },
  { id: 12, src: '/images/IMG_3861 (2025-10-13T05_47_38.731).webp', size: 'large' },
  { id: 13, src: '/images/IMG_3912 (2025-10-13T05_48_12.069).webp', size: 'medium' },
  { id: 14, src: '/images/IMG_7971.webp', size: 'small' },
  { id: 15, src: '/images/IMG_8312.webp', size: 'small' },
  { id: 16, src: '/images/IMG-20240609-WA0092.webp', size: 'medium' },
  { id: 17, src: '/images/IMG-20240609-WA0163.webp', size: 'small' },
  { id: 18, src: '/images/IMG-20240609-WA0175.webp', size: 'small' },
  { id: 19, src: '/images/IMG-20250810-WA0012.webp', size: 'large' },
  { id: 20, src: '/images/IMG-20250919-WA0015.webp', size: 'medium' },
  { id: 21, src: '/images/IMG-20250919-WA0017.webp', size: 'small' },
  { id: 22, src: '/images/IMG-20250919-WA0018.webp', size: 'small' },
  { id: 23, src: '/images/IMG_1525 (2025-07-31T16_47_24.073).webp', size: 'medium' },
  { id: 24, src: '/images/IMG_2008 (2025-02-04T07_25_28.524).webp', size: 'small' },
  { id: 25, src: '/images/IMG_2014 (2025-02-04T07_25_33.524).webp', size: 'small' },
  { id: 26, src: '/images/IMG_2159.webp', size: 'large' },
  { id: 27, src: '/images/IMG_2471.webp', size: 'medium' },
]

export default function GalleryPage() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const close = useCallback(() => setSelectedIndex(null), [])
  const showPrev = useCallback(() => {
    setSelectedIndex((i) => (i === null ? null : (i - 1 + projects.length) % projects.length))
  }, [])
  const showNext = useCallback(() => {
    setSelectedIndex((i) => (i === null ? null : (i + 1) % projects.length))
  }, [])

  useEffect(() => {
    if (selectedIndex === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowLeft') showPrev()
      if (e.key === 'ArrowRight') showNext()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [selectedIndex, close, showPrev, showNext])

  const selected = selectedIndex !== null ? projects[selectedIndex] : null

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className="container">
          <p className="eyebrow">Portfolio</p>
          <h1 className={styles.pageTitle}>Design Ideas</h1>
          <p className={styles.pageDesc}>
            A look at real Panelopia installations across our showroom and client spaces.
          </p>
        </div>
      </div>

      <div className={styles.main}>
        <div className="container">
          <p className={styles.count}>
            <span>{projects.length}</span> photos
          </p>

          <div className={styles.grid}>
            {projects.map((project, index) => (
              <div
                key={project.id}
                className={`${styles.card} ${styles[`size-${project.size}`]}`}
                style={{ animationDelay: `${Math.min(index * 40, 480)}ms` }}
                onClick={() => setSelectedIndex(index)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') setSelectedIndex(index)
                }}
              >
                <div className={styles.cardImage}>
                  <Image
                    src={project.src}
                    alt={`Panelopia installation ${index + 1}`}
                    fill
                    className={styles.cardImg}
                    sizes="(max-width:600px) 100vw, (max-width:900px) 50vw, 33vw"
                  />
                  <div className={styles.cardOverlay} />
                  <span className={styles.cardIndex}>{String(index + 1).padStart(2, '0')}</span>
                  <div className={styles.cardExpand}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M9 3H3v6M15 3h6v6M9 21H3v-6M15 21h6v-6"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.galleryCta}>
            <p className={styles.galleryCtaText}>Inspired? Let&apos;s talk about your space.</p>
            <a href="/contact" className={styles.galleryCtaBtn}>Start a Project →</a>
          </div>
        </div>
      </div>

      {selected && (
        <div className={styles.lightbox} onClick={close} role="dialog" aria-modal="true">
          <button className={styles.lightboxClose} onClick={close} aria-label="Close">
            ×
          </button>

          <button
            className={`${styles.lightboxNav} ${styles.lightboxNavPrev}`}
            onClick={(e) => { e.stopPropagation(); showPrev() }}
            aria-label="Previous image"
          >
            ‹
          </button>
          <button
            className={`${styles.lightboxNav} ${styles.lightboxNavNext}`}
            onClick={(e) => { e.stopPropagation(); showNext() }}
            aria-label="Next image"
          >
            ›
          </button>

          <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.lightboxImageWrap}>
              <Image
                src={selected.src}
                alt={`Panelopia installation ${selectedIndex! + 1}`}
                fill
                className={styles.lightboxImg}
                sizes="90vw"
                priority
              />
            </div>
            <div className={styles.lightboxInfo}>
              {String(selectedIndex! + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}