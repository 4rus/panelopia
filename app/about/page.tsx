import styles from './page.module.css'
import Image from 'next/image'
import Link from 'next/link'

const values = [
  {
    title: 'Supply & Install — One Team',
    desc: 'We handle everything from material sourcing to final installation. No subcontractors, no handoffs. One team, one invoice.',
    icon: '◈',
  },
  {
    title: 'Real Showrooms, Real Samples',
    desc: 'Visit us in Calgary or Edmonton and see every panel, slab, and wallpaper in person before you decide.',
    icon: '◉',
  },
  {
    title: 'Alberta-Specific Products',
    desc: 'Our WPC panels are waterproof and termite-resistant — built to perform in Alberta\'s climate, not just look good in a catalogue.',
    icon: '◍',
  },
  {
    title: 'Transparent Pricing',
    desc: 'A clear, itemised quote every time. We tell you exactly what you\'re paying for — materials and labour — before any work begins.',
    icon: '◎',
  },
]

export default function AboutPage() {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className="container">
          <p className="eyebrow">Our Story</p>
          <h1 className={styles.pageTitle}>
            Built on craft
            <br />
            and care.
          </h1>
        </div>
      </div>

      {/* Mission */}
      <section className={styles.mission}>
        <div className="container">
          <div className={styles.missionInner}>
            <div className={styles.missionText}>
              <h2 className={styles.missionTitle}>
                Alberta deserves a surface supplier that treats installation as seriously as selection.
              </h2>
              <p className={styles.missionBody}>
                Panelopia was founded to fill a real gap in the Alberta market: homeowners and
                designers could find beautiful materials, but getting them professionally installed
                meant hiring a separate contractor — with all the coordination, markups, and risk
                that entails.
              </p>
              <p className={styles.missionBody}>
                We changed that. We supply WPC wall panels, UV marble sheets, acoustic panels,
                and designer wallpapers — and our in-house team installs every single one. Visit
                us at New Horizon Mall in Calgary or our Edmonton location in Beaumont.
              </p>
              <div className={styles.missionContact}>
                <a href="tel:5874335187" className={styles.missionPhone}>587-433-5187</a>
                <span className={styles.missionContactDiv} />
                <a href="mailto:info@panelopia.com" className={styles.missionEmail}>info@panelopia.com</a>
              </div>
            </div>
            <div className={styles.missionStats}>
              {[
                { n: '50+', l: 'Projects completed' },
                { n: '3+', l: 'Years in business' },
                { n: '2', l: 'Alberta showrooms' },
              ].map(s => (
                <div key={s.l} className={styles.bigStat}>
                  <span className={styles.bigNum}>{s.n}</span>
                  <span className={styles.bigLabel}>{s.l}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className={styles.values}>
        <div className="container">
          <p className="eyebrow">What We Stand For</p>
          <h2 className={styles.valuesTitle}>Our principles</h2>
          <div className={styles.valuesGrid}>
            {values.map((v) => (
              <div key={v.title} className={styles.valueCard}>
                <span className={styles.valueIcon}>{v.icon}</span>
                <h4 className={styles.valueTitle}>{v.title}</h4>
                <p className={styles.valueDesc}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Showrooms — real photos */}
      <section className={styles.showrooms}>
        <div className="container">
          <p className="eyebrow">Visit Us</p>
          <h2 className={styles.showroomsTitle}>Two showrooms. One standard.</h2>
          <div className={styles.showroomsGrid}>
            <div className={styles.showroom}>
              <div className={styles.showroomImgWrap}>
                <Image
                  src="/images/showroom-main.jpg"
                  alt="Panelopia Calgary showroom interior"
                  fill
                  className={styles.showroomImg}
                  sizes="(max-width:900px) 100vw, 50vw"
                />
              </div>
              <div className={styles.showroomInfo}>
                <h3 className={styles.showroomCity}>Calgary</h3>
                <p className={styles.showroomAddr}>
                  New Horizon Mall, Unit G-02<br />
                  260300 Writing Creek Cres<br />
                  Balzac, AB T4A 0X8
                </p>
                <p className={styles.showroomHours}>By appointment — call 587-433-5187</p>
              </div>
            </div>

            <div className={styles.showroom}>
              <div className={styles.showroomImgWrap}>
                <Image
                  src="/images/showroom-kitchen.jpg"
                  alt="Panelopia Edmonton showroom display"
                  fill
                  className={styles.showroomImg}
                  sizes="(max-width:900px) 100vw, 50vw"
                />
              </div>
              <div className={styles.showroomInfo}>
                <h3 className={styles.showroomCity}>Edmonton</h3>
                <p className={styles.showroomAddr}>
                  65 St<br />
                  Beaumont, AB T4X 0G7
                </p>
                <p className={styles.showroomHours}>By appointment — call 587-433-5187</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social */}
      <section className={styles.social}>
        <div className="container">
          <p className={styles.socialLabel}>Follow our work</p>
          <div className={styles.socialLinks}>
            <a href="https://www.instagram.com/panelopia_official" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
              Instagram @panelopia_official
            </a>
            <a href="https://www.facebook.com/profile.php?id=61563496005698" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
              Facebook
            </a>
            <a href="https://x.com/Panelopia_yyc" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
              X @Panelopia_yyc
            </a>
            <a href="https://wa.me/15874335187" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
              WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.cta}>
        <div className="container-narrow">
          <h2 className={styles.ctaTitle}>Ready to start?</h2>
          <p className={styles.ctaDesc}>
            Visit a showroom, browse the collection, or book a free site visit in Calgary or Edmonton.
          </p>
          <div className={styles.ctaActions}>
            <Link href="/contact" className={styles.ctaBtn}>Book a Consultation</Link>
            <Link href="/products" className={styles.ctaBtnSec}>Browse Products →</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
