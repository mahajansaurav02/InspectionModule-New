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
function TemplateFerfar() {
  const navigate = useNavigate()

  const handleGoBack = () => {
    navigate(-1) // Go back to previous page
  }

  const handleViewFerfar = () => {
    // Add logic or route to view Ferfar
    navigate('/ferfarNondvahi/template-ferfar/view')
  }

  return (
    <>
      <FerfarNavbar ishidden={true} />

      <CContainer className="mt-4">
        <CCard className="shadow-lg border-0">
          <CCardHeader className="bg-primary text-white fs-5 fw-bold">
            📄 टेंप्लेट फेरफार :
          </CCardHeader>
          <CCardBody>
            <h5 className="fw-semibold mb-3">📝 खालील टिप्सची यादी तपासा:</h5>
            <ol className="ps-3">
              <li className="mb-2">
                दिनांक १ ऑगस्ट २०२४ ते ३१ जुलै २०२४ या कालावधीतील खरेदी,वारस,गहाणखत,मृत्युपत्र,
                फेरफार उपलब्द करून देण्यात आले आहे.तपासणी साठी ७/१२,फेरफार,नोंदणी दस्त,उपलोड केलेले
                आदेश/दस्त उपलब्ध करून देण्यात आले आहे.{' '}
              </li>
              <li className="mb-2">
                दस्त किवा आदेश प्रमाणे फेरफार घेण्यात आले आहे कि नाही ? तसेच दस्ता प्रमाणे ७/१२ वर
                योग्य प्रकारे अंमलबजावणी झाले आहे काय ? याची तपासणी अधिकारी यांनी खात्री करावी..{' '}
              </li>
              {/* <li className="mb-2">
                तहसीलदार यांनी पारीत केलेला आदेश तपासून कलम 155 &quot;लेखन प्रमाद दुरुस्ती&quot;
                च्या व्याख्येत सदर दुरुस्ती समाविष्ट होत असल्याची खात्री करावी.
              </li>

              <li className="mb-2">
                आदेशाप्रमाणे गाव नमुना ७ वर अपेक्षित अंमल आल्याची खात्री करावी.
              </li>
              <li className="mb-2">
                <a href="/locales/patrak.pdf" target="_blank" rel="noopener noreferrer">
                  परिपत्रक PDF
                </a>
              </li> */}
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
export default TemplateFerfar
