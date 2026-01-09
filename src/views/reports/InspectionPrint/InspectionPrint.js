import React from 'react'
import {
  CContainer,
  CRow,
  CCol,
  CCard,
  CCardHeader,
  CCardBody,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
} from '@coreui/react'
import '@coreui/coreui/dist/css/coreui.min.css'
import '../Inspection-report/InspectionReport.css'

const InspectionPrint = React.forwardRef(({ reportData }, ref) => {
  return (
    <div ref={ref} className="print-view">
      <div className="print-page">
        <CContainer className="inspection-container" fluid>
          <CCard className="shadow-none border-dark">
            <CCardHeader className="headerName">
              <h2 className="mb-0">ग्राम महसूल अधिकारी दप्तर निरीक्षण टिप्पणी.</h2>
            </CCardHeader>
            <CCardBody className="p-4">
              <div className="report-content">
                <CRow className="mb-3 report-header">
                  <CCol md={6}>
                    <p>
                      <strong>तपासणी अधिकारी यांचे नाव आणि पदनाम:</strong>{' '}
                      {reportData.tapasaniAdhikariName} ({reportData.tapasaniAdhikariPadnam})
                    </p>
                  </CCol>
                  <CCol md={6}>
                    <p>
                      <strong>तपासणी दिनांक:</strong> {reportData.tapasaniDinanck}
                    </p>
                  </CCol>
                  <CCol md={6}>
                    <p>
                      <strong>साजाचे नाव:</strong> {reportData.sajacheNaw}
                    </p>
                  </CCol>
                  <CCol md={6}>
                    <p>
                      <strong>ग्राम महसूल अधिकाऱ्याचे नाव:</strong>{' '}
                      {reportData.gramMahsulAdhikariName}
                    </p>
                  </CCol>
                  <CCol md={6}>
                    <p>
                      <strong>गावाचे नाव:</strong> {reportData.gawacheNaw}
                    </p>
                  </CCol>
                </CRow>

                <hr className="my-4" />

                <h4 className="mt-4 text-primary mb-3">अ. फेरफार तपासणी</h4>
                <div className="table-responsive">
                  <CTable striped bordered responsive className="text-center mb-4">
                    <CTableHead>
                      <CTableRow className="bg-light">
                        <CTableHeaderCell width="5%">अ.क्र.</CTableHeaderCell>
                        <CTableHeaderCell width="40%" className="text-start">
                          प्रकार
                        </CTableHeaderCell>
                        <CTableHeaderCell width="30%">तपशील</CTableHeaderCell>
                        {/* <CTableHeaderCell width="25%">शेरा</CTableHeaderCell> */}
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      {reportData.ferfarData?.map((item, index) => (
                        <CTableRow key={index}>
                          <CTableHeaderCell scope="row">{item.kramank}.</CTableHeaderCell>
                          <CTableDataCell className="text-start">{item.tapshil}</CTableDataCell>
                          <CTableDataCell>{item.sherat}</CTableDataCell>
                          {/* <CTableDataCell>&nbsp;</CTableDataCell> */}
                        </CTableRow>
                      ))}
                    </CTableBody>
                  </CTable>
                </div>

                <hr className="my-4" />

                <h4 className="mt-4 text-primary mb-3">ब. ई-हक्क प्रणाली मधील अर्ज तपासणी</h4>
                <CRow className="mb-3">
                  <CCol xs={12}>
                    <p>
                      <strong>
                        १. त्रुटीपूर्ततेसाठी भूधारकास परत पाठविण्यात आलेल्या अर्जांची तपासणी (अर्ज
                        क्र.):
                      </strong>{' '}
                    </p>
                    <div className="table-responsive">
                      <CTable bordered className="text-center mb-4">
                        <CTableHead>
                          <CTableRow className="bg-light">
                            <CTableHeaderCell style={{ width: '60%' }} className="text-start">
                              तपशील
                            </CTableHeaderCell>
                            <CTableHeaderCell style={{ width: '120px' }}>
                              अर्ज क्र.
                            </CTableHeaderCell>
                          </CTableRow>
                        </CTableHead>

                        <CTableBody>
                          {reportData.eHakkArjData?.trutiArjList?.length > 0 ? (
                            <CTableRow className="bg-light-subtle">
                              {/* Column 1: Static Title */}
                              <CTableDataCell className="text-start">
                                त्रुटीपूर्ततेसाठी भूधारकास परत पाठविण्यात आलेले अर्ज
                              </CTableDataCell>

                              {/* Column 2: All Numbers Comma Separated */}
                              <CTableDataCell>
                                {reportData.eHakkArjData.trutiArjList
                                  .map((item) => item.arjNo)
                                  .join(', ')}
                              </CTableDataCell>
                            </CTableRow>
                          ) : (
                            <CTableRow>
                              <CTableDataCell colSpan={2} className="text-muted">
                                माहिती उपलब्ध नाही
                              </CTableDataCell>
                            </CTableRow>
                          )}
                        </CTableBody>
                      </CTable>
                    </div>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol xs={12}>
                    <p className="mb-3">
                      <strong>
                        २. तलाठी स्तरावर फेरफाराकरीता प्रलंबित अर्जांची तपासणी (अर्ज संख्या):
                      </strong>
                    </p>
                    <div className="table-responsive">
                      <CTable bordered className="text-center mb-4">
                        <CTableHead>
                          <CTableRow className="bg-light">
                            <CTableHeaderCell width="20%">
                              १८० दिवसापेक्षा जास्त दिवस प्रलंबित
                            </CTableHeaderCell>
                            <CTableHeaderCell width="20%">
                              ९० ते १८० दिवसातील प्रलंबित
                            </CTableHeaderCell>
                            <CTableHeaderCell width="20%">
                              ३० ते ९० दिवसातील प्रलंबित
                            </CTableHeaderCell>
                            <CTableHeaderCell width="20%">
                              ३० दिवसा पेक्षा कमी दिवस प्रलंबित
                            </CTableHeaderCell>
                            {/* <CTableHeaderCell width="20%">शेरा</CTableHeaderCell> */}
                          </CTableRow>
                        </CTableHead>
                        <CTableBody>
                          <CTableRow>
                            <CTableDataCell>
                              {reportData.eHakkArjData?.pralambitArj['180 दिवसापेक्षा जास्त']}
                            </CTableDataCell>
                            <CTableDataCell>
                              {reportData.eHakkArjData?.pralambitArj['90 ते 180 दिवसातील']}
                            </CTableDataCell>
                            <CTableDataCell>
                              {reportData.eHakkArjData?.pralambitArj['30 ते 90 दिवसातील']}
                            </CTableDataCell>
                            <CTableDataCell>
                              {reportData.eHakkArjData?.pralambitArj['30 दिवसा पेक्षा कमी']}
                            </CTableDataCell>
                            {/* <CTableDataCell>&nbsp;</CTableDataCell> */}
                          </CTableRow>
                        </CTableBody>
                      </CTable>
                    </div>
                  </CCol>
                </CRow>

                <hr className="my-4" />

                <h4 className="mt-4 text-primary mb-3">क. ई-चावडी प्रणाली मधील तपासणी</h4>
                <div className="table-responsive">
                  <CTable striped bordered responsive className="text-center mb-4">
                    <CTableHead>
                      <CTableRow className="bg-light">
                        <CTableHeaderCell width="5%">अ.क्र.</CTableHeaderCell>
                        <CTableHeaderCell width="55%" className="text-start">
                          तपशील
                        </CTableHeaderCell>
                        <CTableHeaderCell width="20%">संख्या</CTableHeaderCell>
                        {/* <CTableHeaderCell width="20%">शेरा</CTableHeaderCell> */}
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      <CTableRow className="bg-light-subtle">
                        <CTableHeaderCell scope="row">१.</CTableHeaderCell>
                        <CTableDataCell className="text-start fw-bold" colSpan={3}>
                          गावातील गाव नमुना पूर्ण भरण्याची घोषणा केलेले गाव नमुना संख्या:
                        </CTableDataCell>
                      </CTableRow>
                      <CTableRow>
                        <CTableDataCell></CTableDataCell>
                        <CTableDataCell className="text-start ps-5">
                          I) निरंक केलेले नमुना संख्या:
                        </CTableDataCell>
                        <CTableDataCell>
                          {reportData.eChawadiData?.gawNamunaPurna.nirank}
                        </CTableDataCell>
                        {/* <CTableDataCell>&nbsp;</CTableDataCell> */}
                      </CTableRow>
                      <CTableRow>
                        <CTableDataCell></CTableDataCell>
                        <CTableDataCell className="text-start ps-5">
                          II) कामकाज पूर्ण नमुना संख्या:
                        </CTableDataCell>
                        <CTableDataCell>
                          {reportData.eChawadiData?.gawNamunaPurna.kamkajPurna}
                        </CTableDataCell>
                        {/* <CTableDataCell>&nbsp;</CTableDataCell> */}
                      </CTableRow>
                      <CTableRow>
                        <CTableDataCell></CTableDataCell>
                        <CTableDataCell className="text-start ps-5">
                          III) निरंक/कामकाज संपल्याची घोषणा न केलेल्या नमुन्याची संख्या:
                        </CTableDataCell>
                        <CTableDataCell>
                          {reportData.eChawadiData?.gawNamunaPurna.aghoshanaKeliNaslele}
                        </CTableDataCell>
                        {/* <CTableDataCell>&nbsp;</CTableDataCell> */}
                      </CTableRow>

                      <CTableRow>
                        <CTableHeaderCell scope="row">२.</CTableHeaderCell>
                        <CTableDataCell className="text-start">
                          गावातील मागणी निश्चिती केल्यानंतर दुरुस्ती करण्यात आलेल्या खातेदारांची
                          संख्या:
                        </CTableDataCell>
                        <CTableDataCell>
                          {reportData.eChawadiData?.mangniRakkamKamiKhatedar}
                        </CTableDataCell>
                        {/* <CTableDataCell>&nbsp;</CTableDataCell> */}
                      </CTableRow>

                      <CTableRow>
                        <CTableHeaderCell scope="row">३.</CTableHeaderCell>
                        <CTableDataCell className="text-start">
                          गावाचा अकृषक दर भरला आहे काय ?
                        </CTableDataCell>
                        <CTableDataCell>
                          {reportData.eChawadiData?.akrushakDarBharlaKay} (दर (प्रति चौ.मी):{' '}
                          {reportData.eChawadiData?.akrushakDarRakkam})
                        </CTableDataCell>
                        {/* <CTableDataCell>&nbsp;</CTableDataCell> */}
                      </CTableRow>

                      <CTableRow>
                        <CTableHeaderCell scope="row">४.</CTableHeaderCell>
                        <CTableDataCell className="text-start">
                          उप-अधीक्षक, भूमिअभिलेख आकारबंद तपशील:
                          <br />
                          **(तलाठी दप्तरात उपलब्ध असलेले भूमापन क्रमांक परंतु उप-अधीक्षक यांच्या
                          आकारबंद मध्ये उपलब्ध नसलेले भूमापन संख्या)**
                        </CTableDataCell>
                        <CTableDataCell>
                          {reportData.eChawadiData?.akarbandTapshil.upAdhikshakNotAvail}
                        </CTableDataCell>
                        {/* <CTableDataCell>&nbsp;</CTableDataCell> */}
                      </CTableRow>
                    </CTableBody>
                  </CTable>
                </div>

                <hr className="my-4" />

                <h4 className="mt-4 text-primary mb-3">ड. वसुली बाबत तपशील</h4>
                <div className="table-responsive">
                  <CTable bordered responsive className="text-center mb-4">
                    <CTableHead>
                      <CTableRow className="bg-light">
                        <CTableHeaderCell width="30%">तपशील</CTableHeaderCell>
                        <CTableHeaderCell width="20%">मागणी</CTableHeaderCell>
                        <CTableHeaderCell width="20%">वसुली</CTableHeaderCell>
                        <CTableHeaderCell width="15%">टक्केवारी</CTableHeaderCell>
                        {/* <CTableHeaderCell width="15%">शेरा</CTableHeaderCell> */}
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      <CTableRow>
                        <CTableDataCell className="text-start">
                          जमीन महसूल वसुली (०२९)
                        </CTableDataCell>
                        <CTableDataCell>
                          {reportData.vasuliData?.jaminMahsul029.mangni}
                        </CTableDataCell>
                        <CTableDataCell>
                          {reportData.vasuliData?.jaminMahsul029.vasuli}
                        </CTableDataCell>
                        <CTableDataCell>
                          {reportData.vasuliData?.jaminMahsul029.percentage}%
                        </CTableDataCell>
                        {/* <CTableDataCell rowSpan={3} className="align-middle">
                                                    &nbsp;
                                                </CTableDataCell> */}
                      </CTableRow>
                      <CTableRow>
                        <CTableDataCell className="text-start">
                          इतर जमीन महसूल वसुली (०४५)
                        </CTableDataCell>
                        <CTableDataCell>
                          {reportData.vasuliData?.itarMahsul045.mangni}
                        </CTableDataCell>
                        <CTableDataCell>
                          {reportData.vasuliData?.itarMahsul045.vasuli}
                        </CTableDataCell>
                        <CTableDataCell>
                          {reportData.vasuliData?.itarMahsul045.percentage}%
                        </CTableDataCell>
                      </CTableRow>

                      <CTableRow>
                        <CTableDataCell className="text-start">उद्दिष्टानुसार वसुली</CTableDataCell>
                        <CTableDataCell>
                          {reportData.vasuliData?.uddishtanusar.mangni}
                        </CTableDataCell>
                        <CTableDataCell>
                          {reportData.vasuliData?.uddishtanusar.vasuli}
                        </CTableDataCell>
                        <CTableDataCell>
                          {reportData.vasuliData?.uddishtanusar.percentage}%
                        </CTableDataCell>
                      </CTableRow>

                      <CTableRow className="bg-warning">
                        <CTableHeaderCell className="text-start">एकूण</CTableHeaderCell>
                        <CTableHeaderCell>{reportData.vasuliData?.ekun.mangni}</CTableHeaderCell>
                        <CTableHeaderCell>{reportData.vasuliData?.ekun.vasuli}</CTableHeaderCell>
                        <CTableHeaderCell colSpan={2}>
                          {reportData.vasuliData?.ekun.percentage}%
                        </CTableHeaderCell>
                      </CTableRow>
                    </CTableBody>
                  </CTable>
                </div>

                <hr className="my-4" />

                <CRow className="mt-4">
                  <CCol xs={12}>
                    <p className="mb-3">
                      <strong>तपसणी अधिकाऱ्याचा सर्वसाधारण शेरा:</strong>{' '}
                      {reportData.sarvSadharanShera}
                    </p>
                  </CCol>
                  <CCol xs={12}>
                    <p>
                      <strong>पुर्ततेकरिता मुद्दे क्रमांक:</strong>{' '}
                      {reportData.purttatekkaritaMudde}
                    </p>
                  </CCol>
                </CRow>
                <CRow className="mt-5 mb-2 text-end">
                  <CCol className="signature" xs={12}>
                    <p className="mb-1">
                      <strong>तपासणी अधिकाऱ्याचे नाव व पदनाम:</strong>
                    </p>
                    <p className="mb-0">
                      {reportData.tapasaniAdhikariName} ({reportData.tapasaniAdhikariPadnam})
                    </p>
                  </CCol>
                </CRow>
              </div>
            </CCardBody>
          </CCard>
        </CContainer>
      </div>
    </div>
  )
})

InspectionPrint.displayName = 'InspectionPrint'
export default InspectionPrint
