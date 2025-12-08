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
function RejectedFerfar() {
  const navigate = useNavigate()

  const handleGoBack = () => {
    navigate(-1) // Go back to previous page
  }

  const handleViewFerfar = () => {
    // Add logic or route to view Ferfar
    navigate('/ferfarNondvahi/rejected-ferfar/view')
  }

  return (
    <>
      <FerfarNavbar />

      <CContainer className="mt-4">
        <CCard className="shadow-lg border-0">
          <CCardHeader className="bg-primary text-white fs-5 fw-bold">
            📄 नामंजूर केलेल्या फेरफारांची पडताळणी करताना खालील बाबी तपासा : (तांत्रिक कारण)
          </CCardHeader>
          <CCardBody>
            <h5 className="fw-semibold mb-3">📝 खालील टिप्सची यादी तपासा:</h5>
            <ol className="ps-3">
              <li className="mb-2">
                फेरफार रजिस्टरची पडताळणी करून, फेरफार तांत्रिक कारणामुळे अथवा पूर्वावलोकनामध्ये
                अयोग्य असल्यामुळे नामंजूर करण्यात आले आहेत का, याची तपासणी करण्यात यावी
              </li>
              <li className="mb-2">
                सर्वे क्रमांक, फेरफार क्रमांक, फेरफाराचे नाव, फेरफार दिनांक तसेच मंडळ अधिकाऱ्यांची
                टिप्पणी यांचा समावेश करण्यात आलेला आहे काय ? हे तपासावे.{' '}
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

export default RejectedFerfar
