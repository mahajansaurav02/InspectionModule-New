import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
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
import FerfarNavbar from '../ferfarNondvahi/ferfarSections/FerfarNavbar'

function EHakkTooltips() {
  const navigate = useNavigate()
  const { id } = useParams()

  const handleGoBack = () => {
    navigate(-1) // Go back to previous page
  }

  const handleViewFerfar = () => {
    // Add logic or route to view Ferfar
    console.log(id, 'check  pas id ')
    navigate(`/e-hakka-kamkaj-tapasani/talathi-applications/${id}`)
  }

  return (
    <>
      <FerfarNavbar />

      <CContainer className="mt-4">
        <CCard className="shadow-lg border-0">
          <CCardHeader className="bg-primary text-white fs-5 fw-bold">📄 इ - हक्क</CCardHeader>
          <CCardBody>
            <ol className="ps-3">
              <li className="mb-2">
                ग्राम महसूल अधिकारी यांचे कडील ई हक्क अर्जाची प्रलंबितता MIS वरून तपासा.{' '}
              </li>
              <li className="mb-2">
                ई - हक्क MIS तपासावा. अर्ज नाकारण्याचे कारण व ग्राम महसूल अधिकारी यांचा शेरा MIS
                मध्ये अर्ज क्रमांकानुसार नमूद असून नाकारण्याचे कारण व शेरा सुसंगत
                असल्याची खात्री करा{' '}
              </li>
            </ol>

            <CRow className="mt-4">
              <CCol xs={6}>
                <CButton color="success" className="w-100" onClick={handleViewFerfar}>
                  अर्ज बघा
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

export default EHakkTooltips
