'use client'

import { useState } from 'react'
import styles from './page.module.css'

type FormData = {
  firstName: string
  lastName: string
  email: string
  phone: string
  city: 'Calgary' | 'Edmonton' | ''
  productInterest: string
  projectType: string
  message: string
  budget: string
}

const initialForm: FormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  city: '',
  productInterest: '',
  projectType: '',
  message: '',
  budget: '',
}

const products = ['Wall Panels', 'Marble Slabs', 'Acoustic Panels', 'Wallpapers', 'Multiple / Unsure']
const projectTypes = ['Residential', 'Commercial', 'Hospitality', 'Office', 'Other']
const budgets = ['Under $5,000', '$5,000–$15,000', '$15,000–$50,000', '$50,000+', 'Not sure yet']

function ShowroomHours() {
  return (
    <div className={styles.hours}>
      <div className={styles.hoursHeader}>
        <svg className={styles.hoursIcon} width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 6v6l4 2" />
        </svg>
        Hours
      </div>
      <div className={styles.hoursRow}>
        <span>Thu – Mon</span>
        <span>11am – 7pm</span>
      </div>
      <div className={styles.hoursNote}>(Sun until 6pm)</div>
      <div className={`${styles.hoursRow} ${styles.hoursClosed}`}>
        <span>Tue – Wed</span>
        <span>Closed</span>
      </div>
    </div>
  )
}

export default function ContactPage() {
  const [form, setForm] = useState<FormData>(initialForm)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    try {
      // Supabase insert — replace with actual client
      // const { error } = await supabase.from('leads').insert([{
      //   first_name: form.firstName,
      //   last_name: form.lastName,
      //   email: form.email,
      //   phone: form.phone,
      //   city: form.city,
      //   product_interest: form.productInterest,
      //   project_type: form.projectType,
      //   message: form.message,
      //   budget: form.budget,
      //   created_at: new Date().toISOString(),
      // }])

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1200))
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className="container">
          <p className="eyebrow">Let&apos;s Talk</p>
          <h1 className={styles.pageTitle}>Get in touch</h1>
          <p className={styles.pageDesc}>
            Tell us about your project and we&apos;ll be in touch within one business day.
          </p>
        </div>
      </div>

      <div className={styles.main}>
        <div className="container">
          <div className={styles.layout}>
            {/* Form */}
            <div className={styles.formWrapper}>
              {status === 'success' ? (
                <div className={styles.success}>
                  <div className={styles.successIcon}>✓</div>
                  <h2 className={styles.successTitle}>Message received</h2>
                  <p className={styles.successDesc}>
                    Thank you, {form.firstName}. We&apos;ll review your enquiry and respond within one business day.
                  </p>
                  <button
                    className={styles.successReset}
                    onClick={() => { setForm(initialForm); setStatus('idle') }}
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form className={styles.form} onSubmit={handleSubmit} noValidate>
                  <h2 className={styles.formTitle}>Request a Quote</h2>

                  <div className={styles.row}>
                    <div className={styles.field}>
                      <label className={styles.label}>First name *</label>
                      <input
                        className={styles.input}
                        type="text"
                        name="firstName"
                        value={form.firstName}
                        onChange={handleChange}
                        required
                        placeholder="Jane"
                        autoComplete="given-name"
                      />
                    </div>
                    <div className={styles.field}>
                      <label className={styles.label}>Last name *</label>
                      <input
                        className={styles.input}
                        type="text"
                        name="lastName"
                        value={form.lastName}
                        onChange={handleChange}
                        required
                        placeholder="Smith"
                        autoComplete="family-name"
                      />
                    </div>
                  </div>

                  <div className={styles.row}>
                    <div className={styles.field}>
                      <label className={styles.label}>Email *</label>
                      <input
                        className={styles.input}
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        placeholder="jane@example.com"
                        autoComplete="email"
                      />
                    </div>
                    <div className={styles.field}>
                      <label className={styles.label}>Phone</label>
                      <input
                        className={styles.input}
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+1 (403) 000-0000"
                        autoComplete="tel"
                      />
                    </div>
                  </div>

                  <div className={styles.row}>
                    <div className={styles.field}>
                      <label className={styles.label}>Nearest city *</label>
                      <select
                        className={styles.select}
                        name="city"
                        value={form.city}
                        onChange={handleChange}
                        required
                      >
                        <option value="" disabled>Select your city</option>
                        <option value="Calgary">Calgary</option>
                        <option value="Edmonton">Edmonton</option>
                      </select>
                    </div>
                    <div className={styles.field}>
                      <label className={styles.label}>Project type</label>
                      <select
                        className={styles.select}
                        name="projectType"
                        value={form.projectType}
                        onChange={handleChange}
                      >
                        <option value="" disabled>Select type</option>
                        {projectTypes.map(t => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className={styles.row}>
                    <div className={styles.field}>
                      <label className={styles.label}>Product interest</label>
                      <select
                        className={styles.select}
                        name="productInterest"
                        value={form.productInterest}
                        onChange={handleChange}
                      >
                        <option value="" disabled>Select product</option>
                        {products.map(p => (
                          <option key={p} value={p}>{p}</option>
                        ))}
                      </select>
                    </div>
                    <div className={styles.field}>
                      <label className={styles.label}>Approximate budget</label>
                      <select
                        className={styles.select}
                        name="budget"
                        value={form.budget}
                        onChange={handleChange}
                      >
                        <option value="" disabled>Select range</option>
                        {budgets.map(b => (
                          <option key={b} value={b}>{b}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label}>Tell us about your project</label>
                    <textarea
                      className={styles.textarea}
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={5}
                      placeholder="Describe your space, timeline, any specific requirements..."
                    />
                  </div>

                  {status === 'error' && (
                    <p className={styles.errorMsg}>
                      Something went wrong. Please try again or email us directly.
                    </p>
                  )}

                  <button
                    type="submit"
                    className={styles.submit}
                    disabled={status === 'loading'}
                  >
                    {status === 'loading' ? 'Sending...' : 'Send Enquiry →'}
                  </button>

                  <p className={styles.formNote}>
                    We respond within one business day. Your details are never shared.
                  </p>
                </form>
              )}
            </div>

            {/* Info sidebar */}
            <div className={styles.info}>
              <div className={styles.infoBlock}>
                <h3 className={styles.infoTitle}>Calgary Showroom</h3>
                <p className={styles.infoAddress}>
                  New Horizon Mall, 260300 Writing Creek Cres<br />
                  Unit G-02, Balzac, AB T4A 0X8
                </p>
                <div className={styles.hoursDivider} />
                <ShowroomHours />
              </div>

              <div className={styles.infoBlock}>
                <h3 className={styles.infoTitle}>Edmonton Showroom</h3>
                <p className={styles.infoAddress}>
                  65 St, Beaumont, AB<br />
                  T4X 0G7
                </p>
                <div className={styles.hoursDivider} />
                <ShowroomHours />
              </div>

              <div className={styles.infoBlock}>
                <h3 className={styles.infoTitle}>Contact</h3>
                <p className={styles.infoText}>
                  <a href="tel:+14031234567" className={styles.infoLink}>587-433-5187</a>
                </p>
                <p className={styles.infoText}>
                  <a href="mailto:info@panelopia.com" className={styles.infoLink}>info@panelopia.com</a>
                </p>
              </div>

              <div className={styles.whatsapp}>
                <p className={styles.whatsappText}>Prefer WhatsApp?</p>
                <a
                  href="https://wa.me/15874335187"
                  className={styles.whatsappBtn}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Message us on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}