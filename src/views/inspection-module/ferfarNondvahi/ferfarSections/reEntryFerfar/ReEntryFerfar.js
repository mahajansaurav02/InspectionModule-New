import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CContainer,
  CCard,
  CCardBody,
  CCardHeader,
  CListGroup,
  CListGroupItem,
  CRow,
  CCol,
  CButton,
} from '@coreui/react'
import FerfarNavbar from '../FerfarNavbar'
function ReEntryFerfar() {
  const navigate = useNavigate()

  const handleGoBack = () => {
    navigate(-1) // Go back to previous page
  }

  const handleViewFerfar = () => {
    // Add logic or route to view Ferfar
    navigate('/ferfarNondvahi/reentry-ferfar/view')
  }

  return (
    <>
      <FerfarNavbar ishidden={true} />

      <CContainer className="mt-4">
        <CCard className="shadow-lg border-0">
          <CCardHeader className="bg-primary text-white fs-5 fw-bold">
            📄 रि-एन्ट्री केलेल्या फेरफारांची पडताळणी करताना खालील बाबी तपासा :
          </CCardHeader>
          <CCardBody>
            <ol className="ps-3">
              <li className="mb-2">
                ग्राम महसूल अधिकारी / मंडळ अधिकारी लॉगिनमध्ये री-एंट्री साठी दर्शविण्यात आलेल्या
                फेरफारांची तपासणी करावी.{' '}
              </li>
              <li className="mb-2">
                फेरफाराच्या री-एंट्री साठीचे कारण योग्य व स्पष्ट आहे का, याची खातरजमा
                करावी.प्रत्यक्ष वस्तुस्थितीची पडताळणी करून री-एंट्रीच्या कारणांची वैधता निश्चित
                करावी.
              </li>
            </ol>

            <CRow className="mt-4">
              <CCol xs={6}>
                <CButton color="success" className="w-100" onClick={handleViewFerfar}>
                  फेरफार बघा
                </CButton>
              </CCol>
              <CCol xs={6}>
                <CButton color="secondary" className="w-100" onClick={handleGoBack}>
                  मागे जा
                </CButton>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CContainer>
    </>
  )
}

export default ReEntryFerfar
