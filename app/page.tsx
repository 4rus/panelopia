import Link from 'next/link'
import Image from 'next/image'
import styles from './page.module.css'

const stats = [
  { value: '50+', label: 'Projects completed' },
  { value: '3+', label: 'Years in Alberta' },
  { value: '50+', label: 'Panel collections' },
  { value: '2', label: 'Showrooms' },
]

const categories = [
  {
    id: 'wpc-panels',
    label: 'WPC Wall Panels',
    description: "Waterproof wood-plastic composite slat panels — warm timber look, engineered for Alberta's climate.",
    accent: '#F5A623',
  },
  {
    id: 'uv-marble',
    label: 'UV Marble Imitation Sheets',
    description: 'Lightweight UV-protected PVC marble sheets — the depth of natural stone, none of the weight or maintenance.',
    accent: '#3DBFBF',
  },
  {
    id: 'wallpapers',
    label: 'Designer Wallpapers',
    description: 'Curated vinyl, grasscloth, and non-woven wallcoverings — supplied and installed by our team.',
    accent: '#E8522A',
  },
  {
    id: 'acoustic-panels',
    label: 'Acoustic Wall Panels',
    description: 'NRC-rated acoustic slat and fabric panels for home theatres, offices, and commercial spaces.',
    accent: '#F5A623',
  },
  {
    id: 'decorative-panels',
    label: 'Decorative Wall Panels',
    description: 'Geometric and sculptural decorative wall panels in MDF, PVC, and gypsum for bold architectural features.',
    accent: '#3DBFBF',
  },
]

const process = [
  { step: '01', title: 'Consultation', desc: 'Schedule a visit to our showroom or call us for a site visit at your space.' },
  { step: '02', title: 'Selection', desc: 'Browse samples in person or use the Wall Visualizer to preview panels in your room.' },
  { step: '03', title: 'Quotation', desc: 'We prepare a clear, itemised quote. No hidden costs, no surprises.' },
  { step: '04', title: 'Installation', desc: 'Our team installs with care. You inspect the finish before we pack up.' },
]

export default function HomePage() {
  const pairs = []
  for (let i = 0; i < categories.length; i += 2) {
    pairs.push(categories.slice(i, i + 2))
  }

  return (
    <div className={styles.page}>

      {/* ── HERO ───────────────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <Image
            src="/images/heroImageNew.jpg"
            alt="Panelopia showroom featuring WPC slat wall panels"
            fill
            priority
            quality={100}
            className={styles.heroBgImg}
            sizes="100vw"
          />
          <div className={styles.heroOverlay} />
        </div>

        <div className={styles.heroContent}>
          <div className={styles.trustBar}>
            <span className={styles.trustItem}>
              <span className={styles.trustDot} />
              Calgary &amp; Edmonton Showrooms
            </span>
            <span className={styles.trustDivider} />
            <span className={styles.trustItem}>Supply &amp; Installation Included</span>
            <span className={styles.trustDivider} />
            <span className={styles.trustItem}>Trusted by Homeowners &amp; Designers</span>
          </div>

          <h1 className={styles.heroTitle}>
            Premium Surfaces.
            <br />
            Expertly Installed.
          </h1>

          <p className={styles.heroSub}>
            Panelopia supplies WPC slat panels, UV marble sheets, acoustic panels, and designer
            wallpapers — and installs them ourselves. Visit our showroom in Calgary or Edmonton,
            or book a free site visit.
          </p>

          <div className={styles.heroCtas}>
            <Link href="/products" className={styles.heroCta}>
              Explore Collections
            </Link>
            <Link href="/contact" className={styles.heroCtaOutline}>
              Book a Site Visit
            </Link>
          </div>
        </div>
      </section>

      {/* ── STATS STRIP ────────────────────────────── */}
      <section className={styles.stats}>
        <div className="container">
          <div className={styles.statsGrid}>
            {stats.map((s) => (
              <div key={s.label} className={styles.stat}>
                <span className={styles.statValue}>{s.value}</span>
                <span className={styles.statLabel}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SPLIT FEATURE ──────────────────────────── */}
      <section className={styles.featureSplit}>
        <div className={styles.featureSplitImg}>
          <Image
            src="/images/entryway-slat.jpg"
            alt="Oak WPC slat wall panel installed in residential entryway"
            fill
            className={styles.featureImg}
            sizes="50vw"
          />
        </div>
        <div className={styles.featureSplitText}>
          <p className="eyebrow">Why Panelopia</p>
          <h2 className={styles.featureTitle}>
            We supply and install — under one roof.
          </h2>
          <p className={styles.featureBody}>
            Most suppliers drop off materials and leave the installation to you.
            We do both. Our in-house team measures, cuts, and fits every panel
            ourselves — so you get a seamless finish and a single point of contact
            from first call to final inspection.
          </p>
          <div className={styles.featurePoints}>
            {[
              'WPC panels — waterproof &amp; termite resistant',
              'UV marble sheets — lightweight, scratch-resistant',
              'Acoustic wall panels for home &amp; office',
              'Designer wallpapers, fully installed',
            ].map((p) => (
              <div key={p} className={styles.featurePoint}>
                <span className={styles.featurePointDot} />
                <span dangerouslySetInnerHTML={{ __html: p }} />
              </div>
            ))}
          </div>
          <Link href="/products" className={styles.featureCta}>
            See all products →
          </Link>
        </div>
      </section>

      {/* ── PRODUCTS GRID ──────────────────────────── */}
      <section className={`section ${styles.products}`}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <p className="eyebrow">Our Collections</p>
            <h2 className={styles.sectionTitle}>Five product families. One installer.</h2>
            <p className={styles.sectionSub}>
              Every product we carry is stocked in our showrooms and installed by our own team.
            </p>
          </div>

          <div className={styles.categoriesGrid}>
  <div className={styles.categoryRow}>
    {categories.map((cat, i) => (
      <Link
        key={cat.id}
        href={`/products#${cat.id}`}
        className={styles.categoryCard}
      >
        <div className={styles.categoryNum} style={{ color: cat.accent }}>
          0{i + 1}
        </div>
                    <div className={styles.categoryInner}>
                      <h3 className={styles.categoryTitle}>{cat.label}</h3>
                      <p className={styles.categoryDesc}>{cat.description}</p>
                      <span className={styles.categoryArrow} style={{ color: cat.accent }}>→</span>
                    </div>
                    <div className={styles.categoryBar} style={{ background: cat.accent }} />
                  </Link>
                ))}
              </div>
          </div>

          <div className={styles.productsFooter}>
            <Link href="/products" className={styles.viewAll}>
              View all products
            </Link>
          </div>
        </div>
      </section>

      {/* ── GALLERY STRIP ──────────────────────────── */}
      <section className={styles.galleryStrip}>
        <div className={styles.galleryStripInner}>
          <div className={styles.galleryStripText}>
            <p className="eyebrow">Recent Installations</p>
            <h2 className={styles.galleryStripTitle}>
              Installed across Alberta.
            </h2>
            <p className={styles.galleryStripSub}>
              From fireplace feature walls in Calgary to office receptions in Edmonton —
              browse completed projects and get ideas for your own space.
            </p>
            <Link href="/gallery" className={styles.galleryStripCta}>
              View all projects →
            </Link>
          </div>
          <div className={styles.galleryStripPhotos}>
            {[
              { src: '/images/dark-slat-fireplace.jpg', alt: 'Dark charcoal WPC slat panels flanking fireplace' },
              { src: '/images/black-slat-mirror.jpg',   alt: 'Black WPC slat accent wall with round mirror' },
              { src: '/images/office-slat-wallpaper.jpg', alt: 'Office reception with slat panel and textured wallpaper' },
            ].map((img) => (
              <div key={img.src} className={styles.galleryStripPhoto}>
                <Image src={img.src} alt={img.alt} fill className={styles.galleryStripImg} sizes="25vw" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VISUALIZER PROMO ───────────────────────── */}
      <section className={styles.visualizerPromo}>
        <div className="container">
          <div className={styles.visualizerInner}>
            <div className={styles.visualizerText}>
              <p className={styles.visualizerEyebrow}>Wall Visualizer</p>
              <h2 className={styles.visualizerTitle}>
                Preview any panel on your wall before committing.
              </h2>
              <p className={styles.visualizerSub}>
                Upload a photo of your room. Choose from our full catalogue. Adjust coverage
                and opacity. Share the preview with your designer — all in under two minutes.
              </p>
              <div className={styles.visualizerCtas}>
                <Link href="/visualizer" className={styles.visualizerCta}>
                  Open the Visualizer
                </Link>
                <span className={styles.visualizerNote}>Free — no account needed</span>
              </div>
            </div>
            <div className={styles.visualizerDemo}>
              <div className={styles.demoFrame}>
                <div className={styles.demoPhotoWrap}>
                  <Image
                    src="/images/fireplace-wallpaper.jpg"
                    alt="Wallpaper and slat panel combination on fireplace wall"
                    fill
                    className={styles.demoPhoto}
                    sizes="400px"
                  />
                  <div className={styles.demoOverlay} />
                </div>
                <div className={styles.demoChrome}>
                  <div className={styles.demoChromeDot} />
                  <span>Live Preview · Leaf Pattern Wallpaper</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROCESS ────────────────────────────────── */}
      <section className={`section ${styles.processSection}`}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <p className="eyebrow">How It Works</p>
            <h2 className={styles.sectionTitle}>From first call to finished wall</h2>
          </div>
          <div className={styles.processGrid}>
            {process.map((step) => (
              <div key={step.step} className={styles.processStep}>
                <span className={styles.processNum}>{step.step}</span>
                <div className={styles.processConnector} />
                <h4 className={styles.processTitle}>{step.title}</h4>
                <p className={styles.processDesc}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ─────────────────────────────── */}
      <section className={styles.ctaSection}>
        <div className="container-narrow">
          <div className={styles.ctaInner}>
            <p className="eyebrow">Ready to Begin?</p>
            <h2 className={styles.ctaTitle}>Visit our showroom</h2>
            <p className={styles.ctaSub}>
              Calgary: New Horizon Mall, Unit G-02, Balzac, AB<br />
              Edmonton: 65 St, Beaumont, AB<br />
              Call <a href="tel:5874335187" className={styles.ctaPhone}>587-433-5187</a> to book an appointment.
            </p>
            <div className={styles.ctaActions}>
              <Link href="/contact" className={styles.ctaBtn}>
                Book a Consultation
              </Link>
              <Link href="/gallery" className={styles.ctaBtnSecondary}>
                View installed projects
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}