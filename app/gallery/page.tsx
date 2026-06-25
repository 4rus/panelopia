'use client'

import { useState } from 'react'
import Image from 'next/image'
import styles from './page.module.css'

const filters = ['All', 'Wall Panels', 'Wallpapers', 'Showroom']

const projects = [
  {
    id: 1,
    title: 'Entryway Feature Wall',
    location: 'Calgary, AB',
    category: 'Wall Panels',
    product: 'Oak WPC Slat Panel',
    src: '/images/entryway-slat.jpg',
    size: 'large',
  },
  {
    id: 2,
    title: 'Living Room Fireplace',
    location: 'Calgary, AB',
    category: 'Wallpapers',
    product: 'Leaf Pattern Wallpaper + WPC Slat',
    src: '/images/fireplace-wallpaper.jpg',
    size: 'small',
  },
  {
    id: 3,
    title: 'Media Wall',
    location: 'Edmonton, AB',
    category: 'Wall Panels',
    product: 'Charcoal WPC Slat Panel',
    src: '/images/dark-slat-fireplace.jpg',
    size: 'small',
  },
  {
    id: 4,
    title: 'Hallway Accent Wall',
    location: 'Calgary, AB',
    category: 'Wall Panels',
    product: 'Black WPC Slat Panel',
    src: '/images/black-slat-mirror.jpg',
    size: 'medium',
  },
  {
    id: 5,
    title: 'Office Reception',
    location: 'Edmonton, AB',
    category: 'Wallpapers',
    product: 'Textured Wallpaper + WPC Slat with LED',
    src: '/images/office-slat-wallpaper.jpg',
    size: 'medium',
  },
  {
    id: 6,
    title: 'Showroom — Calgary',
    location: 'New Horizon Mall, Balzac, AB',
    category: 'Showroom',
    product: 'WPC Slat + Brick Panel Display',
    src: '/images/showroom-main.jpg',
    size: 'large',
  },
  {
    id: 7,
    title: 'Showroom Kitchen Display',
    location: 'New Horizon Mall, Balzac, AB',
    category: 'Showroom',
    product: 'Grasscloth Wallpaper + WPC Slat Shelving',
    src: '/images/showroom-kitchen.jpg',
    size: 'small',
  },
  {
    id: 8,
    title: 'Showroom Slat Shelf Wall',
    location: 'New Horizon Mall, Balzac, AB',
    category: 'Showroom',
    product: 'Oak WPC Slat Panel — close detail',
    src: '/images/showroom-slat-shelf.jpg',
    size: 'small',
  },
]

const accentColors: Record<string, string> = {
  'Wall Panels': '#F5A623',
  'Wallpapers': '#3DBFBF',
  'Showroom': '#E8522A',
}

export default function GalleryPage() {
  const [active, setActive] = useState('All')

  const filtered = active === 'All' ? projects : projects.filter(p => p.category === active)

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className="container">
          <p className="eyebrow">Portfolio</p>
          <h1 className={styles.pageTitle}>Design Ideas</h1>
          <p className={styles.pageDesc}>
            Installed projects across Calgary and Edmonton. Every photo is a real Panelopia installation.
          </p>
        </div>
      </div>

      <div className={styles.main}>
        <div className="container">
          <div className={styles.filters} role="tablist">
            {filters.map((f) => (
              <button
                key={f}
                role="tab"
                aria-selected={active === f}
                className={`${styles.filter} ${active === f ? styles.filterActive : ''}`}
                onClick={() => setActive(f)}
              >
                {f}
              </button>
            ))}
          </div>

          <p className={styles.count}>
            <span>{filtered.length}</span> {filtered.length === 1 ? 'project' : 'projects'}
          </p>

          <div className={styles.grid}>
            {filtered.map((project) => (
              <div key={project.id} className={`${styles.card} ${styles[`size-${project.size}`]}`}>
                <div className={styles.cardImage}>
                  <Image
                    src={project.src}
                    alt={project.title}
                    fill
                    className={styles.cardImg}
                    sizes="(max-width:600px) 100vw, (max-width:900px) 50vw, 33vw"
                  />
                  <div className={styles.cardOverlay} />
                  <div
                    className={styles.cardTag}
                    style={{
                      background: accentColors[project.category] + '22',
                      color: accentColors[project.category],
                    }}
                  >
                    {project.category}
                  </div>
                </div>
                <div className={styles.cardBody}>
                  <h3 className={styles.cardTitle}>{project.title}</h3>
                  <div className={styles.cardMeta}>
                    <span>{project.location}</span>
                    <span className={styles.cardDot} />
                    <span className={styles.cardProduct}>{project.product}</span>
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
    </div>
  )
}
