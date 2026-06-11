import React, { useState, useEffect, useRef } from 'react'
import './RemarkHistory.css'
import { useSelector } from 'react-redux'
import api from 'src/instance/axiosConfig'

// ─── Set this to false when your API is ready ─────────────────────────────────
const USE_MOCK_DATA = false

const MOCK_REMARKS = [
  {
    id: 1,
    role: 'io',
    name: 'Rajesh Patil',
    roleLabel: 'Inspection Officer',
    message: 'Sample remark',
    time: '10:15 AM',
    date: '28/04/2025',
    attachment: null,
  },
]

// ─── Avatar ───────────────────────────────────────────────────────────────────
const Avatar = ({ role }) => (
  <div className={`rh-avatar ${role}`}>{role === 'io' ? 'IO' : 'TL'}</div>
)

// ─── Remark Bubble ────────────────────────────────────────────────────────────
const RemarkBubble = ({ remark }) => {
  const { role, name, roleLabel, message, time, attachment } = remark
  const isOwn = role === 'io'

  return (
    <div className={`rh-msg ${isOwn ? 'own' : 'other'}`}>
      {!isOwn && <Avatar role={role} />}

      <div className={`rh-content ${isOwn ? 'own' : 'other'}`}>
        <span className="rh-name">
          {roleLabel} — {name}
        </span>

        <div className={`rh-bubble ${isOwn ? 'own' : 'other'}`}>{message}</div>

        {attachment && (
          <div className={`rh-attach ${isOwn ? 'own' : 'other'}`}>📎 {attachment}</div>
        )}

        <span className="rh-time">{time}</span>
      </div>

      {isOwn && <Avatar role={role} />}
    </div>
  )
}

// ─── Date Divider ─────────────────────────────────────────────────────────────
const Divider = ({ label }) => (
  <div className="rh-divider">
    <span>{label}</span>
  </div>
)

// ─── Group remarks by date ────────────────────────────────────────────────────
const groupByDate = (list) => {
  const groups = {}

  list.forEach((r) => {
    const dateKey = r.date || 'Unknown Date'

    if (!groups[dateKey]) {
      groups[dateKey] = []
    }

    groups[dateKey].push(r)
  })

  return groups
}

// ─── Main Component ───────────────────────────────────────────────────────────
const RemarkHistory = ({ currentUserRole = 'io' }) => {
  const [remarks, setRemarks] = useState([])
  const [replyText, setReplyText] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  const threadRef = useRef(null)
  const hasFetched = useRef(false)

  const { user } = useSelector((state) => state.auth || {})

  const revenueYear = user?.revenueYear?.[0]?.revenueYear

  let selectedVillageData = []

  try {
    const raw = localStorage.getItem('selectedVillageData')

    if (raw) {
      selectedVillageData = JSON.parse(raw)
    }
  } catch (_) {}

  const { cCode } = selectedVillageData[0] || {}

  // ─── Fetch Remarks ────────────────────────────────────────────────────────
  const fetchRemarks = async () => {
    if (loading) return

    setLoading(true)
    setError(null)

    // MOCK DATA
    if (USE_MOCK_DATA) {
      setTimeout(() => {
        setRemarks(MOCK_REMARKS)
        setLoading(false)
      }, 500)

      return
    }

    try {
      const res = await api.get(`/inpsection/getTalathiRemarkInspection`, {
        params: {
          revenueYear: revenueYear || '2025-26',
          ccode: cCode,
        },
      })

      const raw = res.data?.data || res.data || []

      const normalised = raw.map((item, idx) => {
        const dateTime = item.createDtTm ? new Date(item.createDtTm) : null

        return {
          id: item.id ?? idx,

          role: item.designation === 'INOFICER' ? 'io' : 'tl',

          name: item.name || item.inspectionOfficerUsername || '',

          roleLabel: item.designation === 'INOFICER' ? 'Inspection Officer' : 'Talathi',

          message: item.message || item.remark || '',

          time: dateTime
            ? dateTime.toLocaleTimeString('en-IN', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
              })
            : '',

          date: dateTime ? dateTime.toLocaleDateString('en-GB') : '',

          attachment: item.attachment || null,
        }
      })

      setRemarks(normalised)
    } catch (err) {
      console.error('Fetch remarks error:', err)

      setError(err?.response?.data?.message || 'Failed to load remarks.')
    } finally {
      setLoading(false)
    }
  }

  // ─── Prevent Double API Calls ─────────────────────────────────────────────
  useEffect(() => {
    if (hasFetched.current || !cCode || !revenueYear) {
      return
    }

    hasFetched.current = true

    fetchRemarks()
  }, [cCode, revenueYear])

  // ─── Auto Scroll ──────────────────────────────────────────────────────────
  useEffect(() => {
    if (threadRef.current) {
      threadRef.current.scrollTop = threadRef.current.scrollHeight
    }
  }, [remarks])

  // ─── Check Last Remark ───────────────────────────────────────────────────
  const lastRemark = remarks[remarks.length - 1]

  const isInspectionOfficerWaiting = lastRemark?.role === 'io'

  // ─── Submit Remark ───────────────────────────────────────────────────────
  const handleSave = async () => {
    if (!replyText.trim() || isInspectionOfficerWaiting) {
      return
    }

    setSubmitting(true)

    const payload = {
      ccode: cCode,
      designation: 'INOFICER',
      servarthId: 'CHECK!@#',
      revenueYear: revenueYear || '2025-26',
      remark: replyText.trim(),
    }

    try {
      const res = await api.post(`/inpsection/saveTalathiRemark`, payload)

      if (res.status === 200 || res.status === 201) {
        const now = new Date()

        // Add locally instead of refetching API
        setRemarks((prev) => [
          ...prev,
          {
            id: Date.now(),
            role: 'io',
            name: user?.name || 'Inspection Officer',

            roleLabel: 'Inspection Officer',

            message: replyText.trim(),

            time: now.toLocaleTimeString('en-IN', {
              hour: '2-digit',
              minute: '2-digit',
              hour12: true,
            }),

            date: now.toLocaleDateString('en-GB'),

            attachment: null,
          },
        ])

        setReplyText('')
      } else {
        throw new Error('Unexpected response status')
      }
    } catch (err) {
      console.error('Submit error:', err)

      alert(err?.response?.data?.message || 'Failed to submit remark')
    } finally {
      setSubmitting(false)
    }
  }

  // ─── Grouped Remarks ─────────────────────────────────────────────────────
  const grouped = groupByDate(remarks)

  const lastActivity = remarks.length ? remarks[remarks.length - 1].time : '—'

  const initiatedBy = remarks.length ? remarks[0].roleLabel : '—'

  // ─── Render ──────────────────────────────────────────────────────────────
  return (
    <div className="rh-wrap">
      {/* Stats */}
      <div className="rh-stats">
        <div className="rh-stat">
          <p className="rh-stat-label">Total Remarks</p>

          <p className="rh-stat-val">{remarks.length}</p>
        </div>

        <div className="rh-stat">
          <p className="rh-stat-label">Initiated by</p>

          <p className="rh-stat-val">{initiatedBy}</p>
        </div>

        <div className="rh-stat">
          <p className="rh-stat-label">Last Activity</p>

          <p className="rh-stat-val">{lastActivity}</p>
        </div>
      </div>

      {/* Thread */}
      <div className="rh-thread" ref={threadRef}>
        {loading && (
          <div className="rh-state">
            <span className="rh-spinner" />
            Loading remarks…
          </div>
        )}

        {!loading && error && <div className="rh-state error">{error}</div>}

        {!loading && !error && remarks.length === 0 && (
          <div className="rh-state muted">No remarks yet.</div>
        )}

        {!loading &&
          !error &&
          Object.entries(grouped).map(([date, list]) => (
            <React.Fragment key={date}>
              <Divider label={date} />

              {list.map((r) => (
                <RemarkBubble key={r.id} remark={r} />
              ))}
            </React.Fragment>
          ))}
      </div>

      {/* Reply Box */}
      <div className="rh-reply">
        <p className="rh-reply-label">Add a remark reply</p>

        <textarea
          className="rh-textarea"
          placeholder={
            isInspectionOfficerWaiting
              ? 'Waiting for Talathi response...'
              : 'Type your remark here...'
          }
          value={replyText}
          onChange={(e) => setReplyText(e.target.value)}
          disabled={submitting || isInspectionOfficerWaiting}
        />

        {isInspectionOfficerWaiting && (
          <p
            style={{
              color: '#d97706',
              fontSize: '13px',
              marginTop: '8px',
            }}
          >
            Waiting for Talathi remark before adding another remark.
          </p>
        )}

        <div className="rh-actions">
          <button className="rh-btn">+ Attach document</button>

          <button
            className="rh-btn primary"
            onClick={handleSave}
            disabled={submitting || !replyText.trim() || isInspectionOfficerWaiting}
          >
            {submitting ? 'Submitting…' : 'Submit remark'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default RemarkHistory
