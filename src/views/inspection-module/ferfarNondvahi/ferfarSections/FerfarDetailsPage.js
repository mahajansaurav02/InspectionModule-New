// FerfarDetailsPage.js
import React from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { CContainer, CRow, CCol } from '@coreui/react'
import FerfarDetailsTabs from './FerfarDetailsTabs'

const FerfarDetailsPage = () => {
  const { id } = useParams()
  const location = useLocation()
  const ferfar = location.state?.ferfar

  // 1. Helper function to format the Survey Numbers
  const formatSurveyHissa = (rawString) => {
    if (!rawString) return []

    // Split by comma to get individual entries
    const entries = rawString.split(',')

    return entries.map((entry) => {
      // Split by '/' and filter out empty strings
      const parts = entry.split('/').filter((part) => part.trim() !== '')

      // Join with '/' to create the display label (e.g., "83/1/10")
      const formattedLabel = parts.join('/')

      return {
        label: formattedLabel,
        value: formattedLabel,
      }
    })
  }

  if (!ferfar) return <p>डेटा सापडला नाही</p>

  // Get the formatted options
  const surveyOptions = formatSurveyHissa(ferfar.surveyHissaNo)

  return (
    <CContainer className="mt-4">
      {/* Header and Dropdown Row */}
      <div className="d-flex justify-content-start align-items-center mb-4 gap-3">
        <h5
          className="fw-bold text-white px-4 py-2 rounded shadow transition-all mb-0"
          style={{
            background:
              'linear-gradient(90deg, #02024f 0%, #0b3c91 40%, #0e6ba8 70%, #1fb6e0 100%)',
            display: 'inline-block',
            borderRadius: '16px',
            fontSize: '1.5rem',
            letterSpacing: '0.7px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
            transition: 'all 0.3s ease-in-out',
            transform: 'scale(1)',
            cursor: 'default',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          फेरफार क्र. {ferfar.mutNo}
        </h5>

        {/* Right Side: Survey No. Dropdown */}
        <div className="d-flex align-items-center">
          {/* <label
            className="fw-bold me-2 mb-0"
            style={{ fontSize: '14px', color: '#555', whiteSpace: 'nowrap' }}
          >
            सर्वे क्रमांक निवडा :
          </label> */}
          <select
            className="form-select fw-bold"
            aria-label="Survey Number Select"
            onChange={(e) => console.log('Selected Survey:', e.target.value)}
            style={{
              // MATCHING STYLES:
              borderRadius: '16px', // Same radius as badge
              fontSize: '1.3rem', // Large font to match height
              padding: '0.4rem 2.5rem 0.4rem 1.2rem', // Padding to match bulk (px-4 py-2 equivalent)
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)', // Same shadow
              color: '#0b3c91', // Blue text to match theme
              border: '2px solid #e0e0e0', // Clean border
              cursor: 'pointer',
              minWidth: '220px', // Ensure it's wide enough
            }}
          >
            <option value="">सर्वे क्रमांक निवडा :</option>
            {surveyOptions.length > 0 ? (
              surveyOptions.map((opt, index) => (
                <option key={index} value={opt.value}>
                  {opt.label}
                </option>
              ))
            ) : (
              <option disabled>सर्वे नंबर उपलब्ध नाही</option>
            )}
          </select>
        </div>
      </div>

      {/* Tabs Component */}
      <FerfarDetailsTabs ferfar={ferfar} />
    </CContainer>
  )
}

export default FerfarDetailsPage
