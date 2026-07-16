'use client'
import { useState, useCallback, useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styles from './page.module.css'
import { PRODUCTS, type Product } from '@/lib/products-data'

// ─── LIGHTBOX ────────────────────────────────────────────────────────────────

type LightboxProps = {
  images: { src: string; alt: string }[]
  startIndex: number
  onClose: () => void
}

function Lightbox({ images, startIndex, onClose }: LightboxProps) {
  const [current, setCurrent] = useState(startIndex)

  const prev = () => setCurrent(i => (i - 1 + images.length) % images.length)
  const next = () => setCurrent(i => (i + 1) % images.length)

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape')      onClose()
      if (e.key === 'ArrowRight')  next()
      if (e.key === 'ArrowLeft')   prev()
    }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [current]) // eslint-disable-line

  return (
    <div className={styles.lightboxOverlay} onClick={onClose} role="dialog" aria-modal="true">
      <div className={styles.lightboxInner} onClick={e => e.stopPropagation()}>

        {/* Close */}
        <button type="button" className={styles.lightboxClose} onClick={onClose} aria-label="Close">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

        {/* Main image */}
        <div className={styles.lightboxImg}>
          <Image
            key={current}
            src={images[current].src}
            alt={images[current].alt}
            fill
            className={styles.lightboxImgEl}
            sizes="90vw"
            priority
          />
        </div>

        {/* Arrows */}
        {images.length > 1 && (
          <>
            <button type="button" className={`${styles.lightboxArrow} ${styles.lightboxArrowLeft}`} onClick={prev} aria-label="Previous">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"/>
              </svg>
            </button>
            <button type="button" className={`${styles.lightboxArrow} ${styles.lightboxArrowRight}`} onClick={next} aria-label="Next">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </button>
          </>
        )}

        {/* Counter + alt */}
        <div className={styles.lightboxFooter}>
          <span className={styles.lightboxAlt}>{images[current].alt}</span>
          {images.length > 1 && (
            <span className={styles.lightboxCounter}>{current + 1} / {images.length}</span>
          )}
        </div>

        {/* Dot strip */}
        {images.length > 1 && (
          <div className={styles.lightboxDots}>
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                className={`${styles.lightboxDot} ${i === current ? styles.lightboxDotActive : ''}`}
                onClick={() => setCurrent(i)}
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
          </div>
        )}

      </div>
    </div>
  )
}

// ─── PRODUCT SECTION ────────────────────────────────────────────────────────

function ProductSection({ product, index }: { product: Product; index: number }) {
  const [activeVariantIndex, setActiveVariantIndex] = useState(0)
  const [activeImageIndex,   setActiveImageIndex]   = useState(0)
  const [fadingIn,   setFadingIn]   = useState(true)
  const [expanding,  setExpanding]  = useState(false)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const fadeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const activeVariant  = product.variants[activeVariantIndex]
  const activeImage    = activeVariant.images[activeImageIndex]

  // Crossfade helper
  const changeImage = useCallback((variantIdx: number, imgIdx: number) => {
    if (fadeTimer.current) clearTimeout(fadeTimer.current)
    setFadingIn(false)
    fadeTimer.current = setTimeout(() => {
      setActiveImageIndex(imgIdx)
      setFadingIn(true)
    }, 55)
  }, [])

  const handleVariantClick = (vIndex: number) => {
    if (vIndex === activeVariantIndex) return
    setActiveVariantIndex(vIndex)
    setActiveImageIndex(0)
    setFadingIn(false)
    setExpanding(true)
    fadeTimer.current && clearTimeout(fadeTimer.current)
    fadeTimer.current = setTimeout(() => { setFadingIn(true) }, 55)
    setTimeout(() => setExpanding(false), 420)
  }

  const handleThumbnailClick = (imgIdx: number) => {
    if (imgIdx === activeImageIndex) return
    changeImage(activeVariantIndex, imgIdx)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const len = activeVariant.images.length
    if (e.key === 'ArrowRight') handleThumbnailClick((activeImageIndex + 1) % len)
    if (e.key === 'ArrowLeft')  handleThumbnailClick((activeImageIndex - 1 + len) % len)
    if (e.key === 'Enter' || e.key === ' ') setLightboxOpen(true)
  }

  const isAlt = index % 2 === 1

  // The src to display — uses activeVariantIndex so it re-reads after variant change
  const displaySrc = product.variants[activeVariantIndex].images[activeImageIndex]?.src ?? ''
  const displayAlt = product.variants[activeVariantIndex].images[activeImageIndex]?.alt ?? ''

  return (
    <>
      {lightboxOpen && (
        <Lightbox
          images={product.variants[activeVariantIndex].images}
          startIndex={activeImageIndex}
          onClose={() => setLightboxOpen(false)}
        />
      )}

      <section
        id={product.id}
        className={`${styles.productSection} ${isAlt ? styles.alt : ''}`}
      >
        <div className="container">
          <div className={`${styles.productGrid} ${isAlt ? styles.gridReverse : ''}`}>

            {/* ── PHOTO COLUMN ── */}
            <div
              className={styles.photoColumn}
              onKeyDown={handleKeyDown}
              tabIndex={0}
              aria-label={`${activeVariant.label} image gallery`}
            >
              {/* Main image — click opens lightbox */}
              <div
                className={`${styles.mainPhoto} ${expanding ? styles.expanding : ''}`}
                onClick={() => setLightboxOpen(true)}
                title="Click to enlarge"
              >
                <div className={`${styles.mainPhotoInner} ${fadingIn ? styles.fadeIn : styles.fadeOut}`}>
                  <Image
                    key={`${activeVariantIndex}-${activeImageIndex}`}
                    src={displaySrc}
                    alt={displayAlt}
                    fill
                    className={styles.mainPhotoImg}
                    sizes="(max-width:900px) 100vw, 50vw"
                    priority={index === 0}
                  />
                </div>

                {/* Badge */}
                <span className={styles.eyebrowTag}>{product.eyebrow}</span>

                {/* Expand hint */}
                <span className={styles.expandHint}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
                  </svg>
                  View full size
                </span>

                {/* Prev / Next arrows */}
                {activeVariant.images.length > 1 && (
                  <>
                    <button
                      type="button"
                      className={`${styles.arrowBtn} ${styles.arrowLeft}`}
                      onClick={e => { e.stopPropagation(); handleThumbnailClick((activeImageIndex - 1 + activeVariant.images.length) % activeVariant.images.length) }}
                      aria-label="Previous image"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="15 18 9 12 15 6"/>
                      </svg>
                    </button>
                    <button
                      type="button"
                      className={`${styles.arrowBtn} ${styles.arrowRight}`}
                      onClick={e => { e.stopPropagation(); handleThumbnailClick((activeImageIndex + 1) % activeVariant.images.length) }}
                      aria-label="Next image"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6"/>
                      </svg>
                    </button>
                  </>
                )}

                {/* Counter */}
                {activeVariant.images.length > 1 && (
                  <span className={styles.imageCounter}>{activeImageIndex + 1} / {activeVariant.images.length}</span>
                )}
              </div>

              {/* Thumbnails */}
              {activeVariant.images.length > 1 && (
                <div className={styles.thumbnails} role="tablist">
                  {activeVariant.images.map((img, i) => (
                    <button
                      key={i}
                      type="button"
                      role="tab"
                      aria-selected={i === activeImageIndex}
                      className={`${styles.thumb} ${i === activeImageIndex ? styles.thumbActive : ''}`}
                      onClick={() => handleThumbnailClick(i)}
                      aria-label={`Image ${i + 1}`}
                    >
                      <Image src={img.src} alt={img.alt} fill className={styles.thumbImg} sizes="80px" />
                      <span className={styles.thumbOverlay} />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* ── CONTENT COLUMN ── */}
            <div className={styles.contentColumn}>
              <p className={styles.blockLabel}>{product.eyebrow}</p>
              <h2 className={styles.productName}>{product.name}</h2>
              <p className={styles.tagline}>{activeVariant.tagline}</p>
              <p className={styles.description}>{activeVariant.description}</p>

              {/* Variants / Finish */}
              <div className={styles.variantsBlock}>
                <p className={styles.blockLabel}>Finish</p>
                <div className={styles.variants}>
                  {product.variants.map((v, vi) => (
                    <button
                      key={v.label}
                      type="button"
                      onClick={() => handleVariantClick(vi)}
                      className={`${styles.variant} ${vi === activeVariantIndex ? styles.variantSelected : ''}`}
                    >
                      <span className={styles.variantSwatch}>
                        <Image
                          src={v.images[0].src}
                          alt={v.label}
                          fill
                          className={styles.variantSwatchImg}
                          sizes="32px"
                        />
                      </span>
                      <span className={styles.variantLabel}>{v.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Colour note */}
              {activeVariant.colorNote && (
                <div className={styles.materialBlock}>
                  <p className={styles.blockLabel}>Colour</p>
                  <p className={styles.materialText}>{activeVariant.colorNote}</p>
                </div>
              )}

              {/* Features */}
              <div className={styles.featuresBlock}>
                <p className={styles.blockLabel}>Key Features</p>
                <div className={styles.features}>
                  {product.features.map(f => (
                    <div key={f} className={styles.feature}>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                        <circle cx="7" cy="7" r="6.5" stroke="currentColor" strokeOpacity="0.25"/>
                        <path d="M4.5 7l2 2 3-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Specs */}
              <div className={styles.specsBlock}>
                <p className={styles.blockLabel}>Product Details</p>
                <div className={styles.specs}>
                  {product.specs.map(spec => (
                    <div key={spec.label} className={styles.specRow}>
                      <span className={styles.specLabel}>{spec.label}</span>
                      <span className={styles.specValue}>{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTAs */}
              <div className={styles.productCtas}>
                <Link href="/contact" className={styles.primaryCta}>Request a Quote</Link>
                <Link href="/gallery" className={styles.secondaryCta}>View Installed Projects</Link>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  )
}

// ─── PAGE ────────────────────────────────────────────────────────────────────

export default function ProductsPage() {
  return (
    <div className={styles.page}>

      <div className={styles.header}>
        <div className="container">
          <p className="eyebrow">What We Offer</p>
          <h1 className={styles.pageTitle}>Our Collections</h1>
          <p className={styles.pageDesc}>
            Three product families. One installation team. Serving Calgary and Edmonton.
          </p>

          {/* Collection image cards */}
          <div className={styles.quickNav}>
            {PRODUCTS.map(p => (
              <a key={p.id} href={`#${p.id}`} className={styles.quickNavCard}>
                <span className={styles.quickNavImgWrap}>
                  <Image
                    src={p.variants[0].images[0].src}
                    alt={p.name}
                    fill
                    className={styles.quickNavImg}
                    sizes="140px"
                  />
                </span>
                <span className={styles.quickNavLabel}>{p.name}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {PRODUCTS.map((product, i) => (
        <ProductSection key={product.id} product={product} index={i} />
      ))}

      <section className={styles.bottomCta}>
        <div className="container-narrow">
          <p className="eyebrow" style={{ color: 'rgba(250,248,244,0.5)' }}>Ready to Begin?</p>
          <h2 className={styles.ctaTitle}>Not sure what you need?</h2>
          <p className={styles.ctaDesc}>
            Our team will visit your space in Calgary or Edmonton, assess your requirements,
            and return with a clear quote — at no cost.
          </p>
          <div className={styles.ctaActions}>
            <Link href="/contact" className={styles.ctaBtn}>Book a Free Consultation</Link>
            <Link href="/gallery" className={styles.ctaBtnSec}>View Installed Projects</Link>
          </div>
        </div>
      </section>

    </div>
  )
}