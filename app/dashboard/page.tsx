'use client'

import { useState } from 'react'
import styles from './page.module.css'

// Mock data — replace with Supabase query:
// const { data: leads } = await supabase.from('leads').select('*').order('created_at', { ascending: false })

type Lead = {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  city: string
  productInterest: string
  projectType: string
  budget: string
  message: string
  status: 'New' | 'Contacted' | 'Quoted' | 'Won' | 'Lost'
  createdAt: string
}

const MOCK_LEADS: Lead[] = [
  { id: '1', firstName: 'Sarah', lastName: 'Thornton', email: 'sarah.t@gmail.com', phone: '+1 403 555 0111', city: 'Calgary', productInterest: 'Wall Panels', projectType: 'Residential', budget: '$5,000–$15,000', message: 'Looking for walnut slat panels for living room accent wall.', status: 'New', createdAt: '2026-05-14T10:22:00Z' },
  { id: '2', firstName: 'Marcus', lastName: 'Okonkwo', email: 'marcus@pivotallaw.ca', phone: '+1 403 555 0222', city: 'Calgary', productInterest: 'Acoustic Panels', projectType: 'Commercial', budget: '$15,000–$50,000', message: 'New office build, need acoustic treatment for 4 meeting rooms.', status: 'Contacted', createdAt: '2026-05-13T14:05:00Z' },
  { id: '3', firstName: 'Priya', lastName: 'Mehta', email: 'priya.m@live.ca', phone: '+1 780 555 0333', city: 'Edmonton', productInterest: 'Marble Slabs', projectType: 'Residential', budget: '$5,000–$15,000', message: 'Kitchen island and bathroom feature wall.', status: 'Quoted', createdAt: '2026-05-12T09:15:00Z' },
  { id: '4', firstName: 'James', lastName: 'Whitfield', email: 'j.whitfield@hotelcrestview.com', phone: '+1 403 555 0444', city: 'Calgary', productInterest: 'Multiple / Unsure', projectType: 'Hospitality', budget: '$50,000+', message: 'Full lobby and bar redesign for boutique hotel.', status: 'Won', createdAt: '2026-05-10T16:30:00Z' },
  { id: '5', firstName: 'Leila', lastName: 'Nazari', email: 'leila@nazariinteriors.com', phone: '+1 780 555 0555', city: 'Edmonton', productInterest: 'Wallpapers', projectType: 'Residential', budget: 'Under $5,000', message: 'Master bedroom wallpaper, mural style preferred.', status: 'New', createdAt: '2026-05-14T08:45:00Z' },
  { id: '6', firstName: 'Dylan', lastName: 'Rusch', email: 'd.rusch@outlook.com', phone: '+1 403 555 0666', city: 'Calgary', productInterest: 'Wall Panels', projectType: 'Office', budget: '$5,000–$15,000', message: 'Home office makeover, want a professional look.', status: 'Lost', createdAt: '2026-05-08T11:00:00Z' },
]

const STATUS_COLORS: Record<Lead['status'], string> = {
  New: '#3DBFBF',
  Contacted: '#F5A623',
  Quoted: '#7A5DDB',
  Won: '#2D9649',
  Lost: '#999',
}

const FILTERS: Array<Lead['status'] | 'All'> = ['All', 'New', 'Contacted', 'Quoted', 'Won', 'Lost']

export default function DashboardPage() {
  const [filter, setFilter] = useState<Lead['status'] | 'All'>('All')
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
  const [leads, setLeads] = useState<Lead[]>(MOCK_LEADS)

  const filtered = filter === 'All' ? leads : leads.filter(l => l.status === filter)

  const stats = {
    total: leads.length,
    new: leads.filter(l => l.status === 'New').length,
    quoted: leads.filter(l => l.status === 'Quoted').length,
    won: leads.filter(l => l.status === 'Won').length,
  }

  const updateStatus = (id: string, status: Lead['status']) => {
    setLeads(prev => prev.map(l => l.id === id ? { ...l, status } : l))
    if (selectedLead?.id === id) setSelectedLead(prev => prev ? { ...prev, status } : null)
  }

  const formatDate = (iso: string) => {
    return new Date(iso).toLocaleDateString('en-CA', {
      month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit'
    })
  }

  return (
    <div className={styles.page}>
      {/* Top bar */}
      <div className={styles.topbar}>
        <div className={styles.topbarLeft}>
          <svg width="24" height="24" viewBox="0 0 100 110" fill="none" aria-hidden="true">
            <rect x="8" y="0" width="22" height="110" fill="#F5A623"/>
            <path d="M8 0 H55 A37 37 0 0 1 55 74 H30" fill="#F5A623"/>
            <polygon points="30,22 52,32 52,58 30,46" fill="white"/>
            <polygon points="52,32 64,22 64,48 52,58" fill="#E8522A"/>
          </svg>
          <span className={styles.topbarTitle}>Panelopia CRM</span>
        </div>
        <div className={styles.topbarRight}>
          <span className={styles.topbarUser}>Admin</span>
          <a href="/" className={styles.topbarSite}>View Site →</a>
        </div>
      </div>

      <div className={styles.layout}>
        {/* Sidebar nav */}
        <aside className={styles.sidebar}>
          <nav className={styles.sidenav}>
            {[
              { label: 'Leads', icon: '◈', active: true },
              { label: 'Clients', icon: '◉', active: false },
              { label: 'Projects', icon: '◍', active: false },
              { label: 'Analytics', icon: '◎', active: false },
            ].map(item => (
              <button
                key={item.label}
                className={`${styles.navItem} ${item.active ? styles.navItemActive : ''}`}
              >
                <span className={styles.navIcon}>{item.icon}</span>
                {item.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main content */}
        <main className={styles.main}>
          <div className={styles.mainHeader}>
            <h1 className={styles.mainTitle}>Lead Management</h1>
            <p className={styles.mainSub}>All enquiries submitted via the website</p>
          </div>

          {/* Stats */}
          <div className={styles.statsRow}>
            {[
              { label: 'Total Leads', value: stats.total },
              { label: 'New', value: stats.new, color: '#3DBFBF' },
              { label: 'Quoted', value: stats.quoted, color: '#7A5DDB' },
              { label: 'Won', value: stats.won, color: '#2D9649' },
            ].map(s => (
              <div key={s.label} className={styles.statCard}>
                <span className={styles.statVal} style={{ color: s.color || 'var(--ink)' }}>
                  {s.value}
                </span>
                <span className={styles.statLab}>{s.label}</span>
              </div>
            ))}
          </div>

          {/* Filters */}
          <div className={styles.filters}>
            {FILTERS.map(f => (
              <button
                key={f}
                className={`${styles.filterBtn} ${filter === f ? styles.filterBtnActive : ''}`}
                onClick={() => setFilter(f)}
              >
                {f}
                {f !== 'All' && (
                  <span className={styles.filterCount}>
                    {leads.filter(l => l.status === f).length}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Table */}
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Contact</th>
                  <th>City</th>
                  <th>Product</th>
                  <th>Budget</th>
                  <th>Status</th>
                  <th>Received</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(lead => (
                  <tr
                    key={lead.id}
                    className={`${styles.tableRow} ${selectedLead?.id === lead.id ? styles.tableRowSelected : ''}`}
                    onClick={() => setSelectedLead(selectedLead?.id === lead.id ? null : lead)}
                  >
                    <td className={styles.tdName}>
                      <div className={styles.avatar}>
                        {lead.firstName[0]}{lead.lastName[0]}
                      </div>
                      <span>{lead.firstName} {lead.lastName}</span>
                    </td>
                    <td className={styles.tdContact}>
                      <div>{lead.email}</div>
                      <div className={styles.phone}>{lead.phone}</div>
                    </td>
                    <td>{lead.city}</td>
                    <td>{lead.productInterest}</td>
                    <td>{lead.budget}</td>
                    <td>
                      <span
                        className={styles.statusBadge}
                        style={{ color: STATUS_COLORS[lead.status], borderColor: STATUS_COLORS[lead.status] + '33', background: STATUS_COLORS[lead.status] + '12' }}
                      >
                        {lead.status}
                      </span>
                    </td>
                    <td className={styles.tdDate}>{formatDate(lead.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filtered.length === 0 && (
              <div className={styles.empty}>No leads with status &ldquo;{filter}&rdquo;</div>
            )}
          </div>
        </main>

        {/* Lead detail panel */}
        {selectedLead && (
          <aside className={styles.detailPanel}>
            <div className={styles.detailHeader}>
              <h2 className={styles.detailName}>{selectedLead.firstName} {selectedLead.lastName}</h2>
              <button className={styles.detailClose} onClick={() => setSelectedLead(null)} aria-label="Close">✕</button>
            </div>

            <div className={styles.detailBody}>
              <div className={styles.detailSection}>
                <p className={styles.detailLabel}>Status</p>
                <select
                  className={styles.statusSelect}
                  value={selectedLead.status}
                  onChange={(e) => updateStatus(selectedLead.id, e.target.value as Lead['status'])}
                  style={{ color: STATUS_COLORS[selectedLead.status] }}
                >
                  {(['New', 'Contacted', 'Quoted', 'Won', 'Lost'] as Lead['status'][]).map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              {[
                { label: 'Email', value: selectedLead.email },
                { label: 'Phone', value: selectedLead.phone },
                { label: 'City', value: selectedLead.city },
                { label: 'Product', value: selectedLead.productInterest },
                { label: 'Project Type', value: selectedLead.projectType },
                { label: 'Budget', value: selectedLead.budget },
                { label: 'Received', value: formatDate(selectedLead.createdAt) },
              ].map(field => (
                <div key={field.label} className={styles.detailField}>
                  <p className={styles.detailLabel}>{field.label}</p>
                  <p className={styles.detailValue}>{field.value}</p>
                </div>
              ))}

              <div className={styles.detailField}>
                <p className={styles.detailLabel}>Message</p>
                <p className={styles.detailMessage}>{selectedLead.message}</p>
              </div>

              <div className={styles.detailActions}>
                <a href={`mailto:${selectedLead.email}`} className={styles.actionBtn}>
                  Send Email
                </a>
                <a href={`tel:${selectedLead.phone}`} className={styles.actionBtnSec}>
                  Call
                </a>
              </div>
            </div>
          </aside>
        )}
      </div>
    </div>
  )
}
