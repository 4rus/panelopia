'use client'

import { useEffect, useState, useCallback, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/browser'
import type { Lead } from '@/lib/supabase'
import styles from './page.module.css'

type Reply = {
  id: string
  lead_id: string
  message: string
  sent_by: string | null
  direction: 'outbound' | 'inbound'
  email_sent: boolean
  email_error: string | null
  created_at: string
}

const STATUS_COLORS: Record<Lead['status'], string> = {
  New: '#3DBFBF',
  Contacted: '#F5A623',
  Quoted: '#7A5DDB',
  Won: '#2D9649',
  Lost: '#999',
}

const FILTERS: Array<Lead['status'] | 'All'> = ['All', 'New', 'Contacted', 'Quoted', 'Won', 'Lost']

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-CA', {
    month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit',
  })

function DashboardContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const supabase = createClient()

  const [userEmail, setUserEmail] = useState<string | null>(null)
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [filter, setFilter] = useState<Lead['status'] | 'All'>('All')
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
  const [deepLinkApplied, setDeepLinkApplied] = useState(false)

  const [replies, setReplies] = useState<Reply[]>([])
  const [replyText, setReplyText] = useState('')
  const [replyStatus, setReplyStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [replyNote, setReplyNote] = useState<string | null>(null)

  const loadLeads = useCallback(async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      setLoadError(error.message)
    } else {
      setLoadError(null)
      setLeads(data as Lead[])
    }
    setLoading(false)
  }, [supabase])

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUserEmail(data.user?.email ?? null))
    loadLeads()
  }, [supabase, loadLeads])

  const loadReplies = useCallback(async (leadId: string) => {
    const { data, error } = await supabase
      .from('lead_replies')
      .select('*')
      .eq('lead_id', leadId)
      .order('created_at', { ascending: true })

    if (!error) setReplies(data as Reply[])
  }, [supabase])

  const openLead = (lead: Lead) => {
    if (selectedLead?.id === lead.id) {
      setSelectedLead(null)
      return
    }
    setSelectedLead(lead)
    setReplyText('')
    setReplyStatus('idle')
    setReplyNote(null)
    loadReplies(lead.id)

    // Clear the "customer replied" indicator now that someone's looking at it.
    if (lead.needs_attention) {
      setLeads(prev => prev.map(l => l.id === lead.id ? { ...l, needs_attention: false } : l))
      supabase.from('leads').update({ needs_attention: false }).eq('id', lead.id)
    }
  }

  // Supports links like /dashboard?lead=<id> — used by the "customer
  // replied" notification email so clicking it jumps straight to the
  // right lead instead of just landing on the general list.
  useEffect(() => {
    if (deepLinkApplied || loading || leads.length === 0) return
    const leadId = searchParams.get('lead')
    if (leadId) {
      const match = leads.find(l => l.id === leadId)
      if (match) openLead(match)
    }
    setDeepLinkApplied(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [leads, loading, deepLinkApplied, searchParams])

  const filtered = filter === 'All' ? leads : leads.filter(l => l.status === filter)

  const stats = {
    total: leads.length,
    new: leads.filter(l => l.status === 'New').length,
    quoted: leads.filter(l => l.status === 'Quoted').length,
    won: leads.filter(l => l.status === 'Won').length,
  }

  const updateStatus = async (id: string, status: Lead['status']) => {
    setLeads(prev => prev.map(l => l.id === id ? { ...l, status } : l))
    if (selectedLead?.id === id) setSelectedLead(prev => prev ? { ...prev, status } : null)
    await supabase.from('leads').update({ status }).eq('id', id)
  }

  const sendReply = async () => {
    if (!selectedLead || !replyText.trim()) return
    setReplyStatus('sending')
    setReplyNote(null)

    try {
      const res = await fetch('/api/leads/reply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ leadId: selectedLead.id, message: replyText }),
      })
      const result = await res.json()

      if (!res.ok) {
        setReplyStatus('error')
        setReplyNote(result.error || 'Failed to send reply.')
        return
      }

      setReplyStatus('sent')
      setReplyNote(result.emailSent ? null : result.emailError)
      setReplyText('')
      await loadReplies(selectedLead.id)
      if (selectedLead.status === 'New') {
        setLeads(prev => prev.map(l => l.id === selectedLead.id ? { ...l, status: 'Contacted' } : l))
        setSelectedLead(prev => prev ? { ...prev, status: 'Contacted' } : null)
      }
    } catch {
      setReplyStatus('error')
      setReplyNote('Network error — reply was not sent.')
    }
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  return (
    <div className={styles.page}>
      {/* Top bar */}
      <div className={styles.topbar}>
        <div className={styles.topbarLeft}>
          <Image src="/official_logo.png" alt="Panelopia" width={120} height={50} className={styles.topbarLogo} priority />
        </div>
        <div className={styles.topbarRight}>
          {userEmail && <span className={styles.topbarUser}>{userEmail}</span>}
          <a href="/" className={styles.topbarSite}>View Site →</a>
          <button className={styles.topbarSignout} onClick={signOut}>Sign out</button>
        </div>
      </div>

      <div className={styles.layout}>
        {/* Main content */}
        <main className={styles.main}>
          <div className={styles.mainHeader}>
            <p className="eyebrow">Dashboard</p>
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

          {loadError && (
            <div className={styles.empty}>
              Couldn&apos;t load leads: {loadError}. Check your Supabase env vars are set.
            </div>
          )}

          {!loadError && loading && (
            <div className={styles.empty}>Loading leads…</div>
          )}

          {/* Lead cards */}
          {!loading && !loadError && (
            <div className={styles.leadList}>
              {filtered.map(lead => (
                <button
                  key={lead.id}
                  className={`${styles.leadCard} ${selectedLead?.id === lead.id ? styles.leadCardSelected : ''}`}
                  onClick={() => openLead(lead)}
                >
                  <div className={styles.avatarWrap}>
                    <div className={styles.avatar}>
                      {lead.first_name[0]}{lead.last_name[0]}
                    </div>
                    {lead.needs_attention && <span className={styles.unreadDot} title="Customer replied" />}
                  </div>

                  <div className={styles.leadMain}>
                    <div className={styles.leadTopRow}>
                      <span className={styles.leadName}>{lead.first_name} {lead.last_name}</span>
                      {lead.needs_attention && <span className={styles.unreadTag}>New reply</span>}
                      <span
                        className={styles.statusBadge}
                        style={{ color: STATUS_COLORS[lead.status], borderColor: STATUS_COLORS[lead.status] + '33', background: STATUS_COLORS[lead.status] + '12' }}
                      >
                        {lead.status}
                      </span>
                    </div>
                    <div className={styles.leadMeta}>
                      <span>{lead.email}</span>
                      {lead.phone && <span>{lead.phone}</span>}
                    </div>
                    <div className={styles.leadTags}>
                      {lead.city && <span className={styles.leadTag}>{lead.city}</span>}
                      {lead.product_interest && <span className={styles.leadTag}>{lead.product_interest}</span>}
                      {lead.budget && <span className={styles.leadTag}>{lead.budget}</span>}
                    </div>
                  </div>

                  <span className={styles.leadDate}>{formatDate(lead.created_at)}</span>
                </button>
              ))}

              {filtered.length === 0 && (
                <div className={styles.empty}>No leads with status &ldquo;{filter}&rdquo;</div>
              )}
            </div>
          )}
        </main>

        {/* Lead detail panel */}
        {selectedLead && (
          <aside className={styles.detailPanel}>
            <div className={styles.detailHeader}>
              <h2 className={styles.detailName}>{selectedLead.first_name} {selectedLead.last_name}</h2>
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
                { label: 'Product', value: selectedLead.product_interest },
                { label: 'Project Type', value: selectedLead.project_type },
                { label: 'Budget', value: selectedLead.budget },
                { label: 'Received', value: formatDate(selectedLead.created_at) },
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
                <a href={`tel:${selectedLead.phone}`} className={styles.actionBtnSec}>
                  Call
                </a>
              </div>

              {/* Reply thread */}
              <div className={styles.replySection}>
                <p className={styles.detailLabel}>Replies</p>

                {replies.length === 0 && (
                  <p className={styles.replyEmpty}>No replies sent yet.</p>
                )}

                {replies.map(r => (
                  <div
                    key={r.id}
                    className={`${styles.replyItem} ${r.direction === 'inbound' ? styles.replyItemInbound : ''}`}
                  >
                    <p className={styles.replyMeta}>
                      {r.direction === 'inbound'
                        ? `${selectedLead.first_name} replied`
                        : (r.sent_by || 'You')}
                      {' · '}{formatDate(r.created_at)}
                      {r.direction === 'outbound' && !r.email_sent && (
                        <span className={styles.replyWarn}> · not emailed</span>
                      )}
                    </p>
                    <p className={styles.replyText}>{r.message}</p>
                  </div>
                ))}

                <textarea
                  className={styles.replyInput}
                  placeholder={`Reply to ${selectedLead.first_name}…`}
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  rows={4}
                />

                {replyStatus === 'sent' && !replyNote && (
                  <p className={styles.replySuccess}>Reply sent.</p>
                )}
                {replyNote && (
                  <p className={replyStatus === 'error' ? styles.replyErrorText : styles.replyWarnText}>
                    {replyNote}
                  </p>
                )}

                <button
                  className={styles.actionBtn}
                  onClick={sendReply}
                  disabled={replyStatus === 'sending' || !replyText.trim()}
                >
                  {replyStatus === 'sending' ? 'Sending…' : 'Send Reply'}
                </button>
              </div>
            </div>
          </aside>
        )}
      </div>
    </div>
  )
}

export default function DashboardPage() {
  return (
    <Suspense fallback={null}>
      <DashboardContent />
    </Suspense>
  )
}
