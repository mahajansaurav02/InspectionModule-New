import React, { useEffect, useMemo, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { CContainer } from '@coreui/react'
import FerfarDetailsTabs from './FerfarDetailsTabs'

const FerfarDetailsPage = () => {
  const { id } = useParams()
  const location = useLocation()
  const ferfar = location.state?.ferfar

  const [selectedSurvey, setSelectedSurvey] = useState('')

  // ✅ Memo runs every render safely
  const surveyOptions = useMemo(() => {
    if (!ferfar?.surveyHissaNo) return []

    return ferfar.surveyHissaNo.split(',').map((entry) => {
      const parts = entry.split('/').filter((p) => p.trim() !== '')
      const formatted = parts.join('/')
      return { label: formatted, value: formatted }
    })
  }, [ferfar])

  // ✅ Default survey selection
  useEffect(() => {
    if (surveyOptions.length > 0) {
      setSelectedSurvey((prev) => prev || surveyOptions[0].value)
    }
  }, [surveyOptions])

  // ❗ AFTER hooks
  if (!ferfar) return <p>डेटा सापडला नाही</p>

  return (
    <CContainer className="mt-4">
      <div className="d-flex justify-content-start align-items-center mb-4 gap-3">
        <h5
          className="fw-bold text-white px-4 py-2 rounded shadow mb-0"
          style={{
            background:
              'linear-gradient(90deg, #02024f 0%, #0b3c91 40%, #0e6ba8 70%, #1fb6e0 100%)',
            borderRadius: '16px',
            fontSize: '1.5rem',
          }}
        >
          फेरफार क्र. {ferfar.mutNo}
        </h5>

        <div className="d-flex align-items-center">
          <label className="fw-bold me-2 mb-0" style={{ fontSize: 16, whiteSpace: 'nowrap' }}>
            सर्वे क्रमांक निवडा :
          </label>

          <select
            className="form-select fw-bold"
            value={selectedSurvey}
            onChange={(e) => setSelectedSurvey(e.target.value)}
            style={{
              borderRadius: '16px',
              fontSize: '1.3rem',
              padding: '0.4rem 2.5rem 0.4rem 1.2rem',
              minWidth: '220px',
            }}
          >
            {surveyOptions.map((opt, index) => (
              <option key={index} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <FerfarDetailsTabs ferfar={ferfar} selectedSurvey={selectedSurvey} />
    </CContainer>
  )
}

export default FerfarDetailsPage
