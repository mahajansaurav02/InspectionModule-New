// FerfarDetailsPage.js
import React from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { CContainer } from '@coreui/react'
// import FerfarDetailsTabs from '../ferfarNondvahi/ferfarSections/FerfarDetailsTabs';
import TrutiDetailsTabs from './TrutiDetailsTabs'

const ApplicationDetailPage = () => {
  const { id } = useParams()
  const location = useLocation()
  const application = location.state?.application

  if (!application) return <p>डेटा सापडला नाही</p>

  return (
    <CContainer className="mt-4">
      <h5
        className="fw-bold mb-4 text-white px-4 py-2 rounded shadow transition-all"
        style={{
          background: 'linear-gradient(90deg, #02024f 0%, #0b3c91 40%, #0e6ba8 70%, #1fb6e0 100%)',
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
        अर्ज क्रमांक . {application.applicationId}
      </h5>
      <TrutiDetailsTabs ferfar={application} />
    </CContainer>
  )
}

export default ApplicationDetailPage
