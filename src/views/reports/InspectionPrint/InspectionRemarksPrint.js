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

const InspectionRemarksPrint = React.forwardRef(
  ({ reportData, ferfarRemarkList, eChawadiRemarks, vasuliRemarks, eHakkRemarks }, ref) => {
    return (
      <div ref={ref} className="print-view remarks-report">
        <div className="print-page">
          <CContainer className="inspection-container" fluid>
            <CCard className="shadow-none border-dark">
              <CCardHeader style={{ padding: 0, margin: 0 }}>
                <h4 className="mb-0">ग्राम महसूल अधिकारी दप्तर निरीक्षण - शेरा यादी.</h4>
              </CCardHeader>
              <CCardBody className="p-4">
                <div className="report-content">
                  {/* Basic Info */}
                  {/* <CRow className="mb-3 report-header">
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
                                            <strong>गावाचे नाव:</strong> {reportData.gawacheNaw}
                                        </p>
                                    </CCol>
                                    <CCol md={6}>
                                        <p>
                                            <strong>ग्राम महसूल अधिकाऱ्याचे नाव:</strong>{' '}
                                            {reportData.gramMahsulAdhikariName}
                                        </p>
                                    </CCol>
                                </CRow> */}

                  {/* 1. फेरफार शेरा */}
                  <h4 className="mt-4 text-primary mb-3">अ. फेरफार तपासणी शेरा</h4>
                  <div className="table-responsive">
                    <CTable striped bordered responsive className="text-center mb-4">
                      <CTableHead>
                        <CTableRow className="bg-light">
                          <CTableHeaderCell width="10%">अ.क्र.</CTableHeaderCell>
                          <CTableHeaderCell width="40%" className="text-start">
                            प्रकार
                          </CTableHeaderCell>
                          <CTableHeaderCell width="25%">फेरफार क्रमांक</CTableHeaderCell>
                          <CTableHeaderCell width="25%">शेरा</CTableHeaderCell>
                        </CTableRow>
                      </CTableHead>
                      <CTableBody>
                        {reportData.ferfarData?.map((item, index) => (
                          <CTableRow key={index}>
                            <CTableHeaderCell scope="row">{item.kramank}.</CTableHeaderCell>
                            <CTableDataCell className="text-start">{item.tapshil}</CTableDataCell>
                            <CTableDataCell>{item.sherat}</CTableDataCell>
                            <CTableDataCell className="text-start">
                              {ferfarRemarkList[item.kramank]?.map((remark, remarkIndex) => (
                                <div key={remarkIndex} className="mb-1">
                                  <strong>फेरफार {remark.mutNo}:</strong> {remark.remark}
                                </div>
                              )) || 'शेरा उपलब्ध नाही'}
                            </CTableDataCell>
                          </CTableRow>
                        ))}
                      </CTableBody>
                    </CTable>
                  </div>

                  {/* 2. ई-हक्क शेरा */}
                  {/* ==================== UPDATE START ==================== */}
                  <h4 className="mt-4 text-primary mb-3">ब. ई-हक्क प्रणाली शेरा</h4>
                  <div className="table-responsive">
                    <CTable bordered responsive className="text-center mb-4">
                      <CTableHead>
                        <CTableRow className="bg-light">
                          <CTableHeaderCell width="30%">विषय</CTableHeaderCell>
                          <CTableHeaderCell width="70%">शेरा</CTableHeaderCell>
                        </CTableRow>
                      </CTableHead>
                      <CTableBody>
                        <CTableRow>
                          <CTableDataCell className="text-start">
                            त्रुटीपूर्ततेसाठी भूधारकास परत पाठविण्यात आलेल्या अर्जांची तपासणी
                          </CTableDataCell>
                          <CTableDataCell className="text-start">
                            {reportData.eHakkArjData?.trutiArjList?.length > 0 ? (
                              reportData.eHakkArjData.trutiArjList.map((item, index) => (
                                <div key={index} className="mb-1">
                                  <strong>अर्ज क्र. {item.arjNo}:</strong>{' '}
                                  {eHakkRemarks?.trutiPurtta || 'शेरा उपलब्ध नाही'}
                                </div>
                              ))
                            ) : (
                              <div>{eHakkRemarks?.trutiPurtta || 'शेरा उपलब्ध नाही'}</div>
                            )}
                          </CTableDataCell>
                        </CTableRow>
                        <CTableRow>
                          <CTableDataCell className="text-start">
                            प्रलंबित अर्जांचे शेरा
                          </CTableDataCell>
                          <CTableDataCell className="text-start">
                            {eHakkRemarks?.pralambitArj || 'शेरा उपलब्ध नाही'}
                          </CTableDataCell>
                        </CTableRow>
                      </CTableBody>
                    </CTable>
                  </div>
                  {/* ==================== END ==================== */}

                  {/* 3. ई-चावडी शेरा */}
                  <h4 className="mt-4 text-primary mb-3">क. ई-चावडी प्रणाली शेरा</h4>
                  <div className="table-responsive">
                    <CTable bordered responsive className="text-center mb-4">
                      <CTableHead>
                        <CTableRow className="bg-light">
                          <CTableHeaderCell width="30%">तपशील</CTableHeaderCell>
                          <CTableHeaderCell width="70%">शेरा</CTableHeaderCell>
                        </CTableRow>
                      </CTableHead>
                      <CTableBody>
                        <CTableRow>
                          <CTableDataCell className="text-start">
                            निरंक केलेले नमुना संख्या
                          </CTableDataCell>
                          <CTableDataCell className="text-start">
                            {eChawadiRemarks?.gawNamunaPurna?.nirank || 'शेरा उपलब्ध नाही'}
                          </CTableDataCell>
                        </CTableRow>
                        <CTableRow>
                          <CTableDataCell className="text-start">
                            कामकाज पूर्ण नमुना संख्या
                          </CTableDataCell>
                          <CTableDataCell className="text-start">
                            {eChawadiRemarks?.gawNamunaPurna?.kamkajPurna || 'शेरा उपलब्ध नाही'}
                          </CTableDataCell>
                        </CTableRow>
                        <CTableRow>
                          <CTableDataCell className="text-start">
                            निरंक/कामकाज संपल्याची घोषणा न केलेल्या नमुन्याची संख्या
                          </CTableDataCell>
                          <CTableDataCell className="text-start">
                            {eChawadiRemarks?.gawNamunaPurna?.aghoshanaKeliNaslele ||
                              'शेरा उपलब्ध नाही'}
                          </CTableDataCell>
                        </CTableRow>
                        <CTableRow>
                          <CTableDataCell className="text-start">
                            मागणी निश्चिती केल्यानंतर दुरुस्ती करण्यात आलेल्या खातेदारांची संख्या
                          </CTableDataCell>
                          <CTableDataCell className="text-start">
                            {eChawadiRemarks?.mangniRakkamKamiKhatedar || 'शेरा उपलब्ध नाही'}
                          </CTableDataCell>
                        </CTableRow>
                        <CTableRow>
                          <CTableDataCell className="text-start">
                            अकृषक दर भरला आहे काय?
                          </CTableDataCell>
                          <CTableDataCell className="text-start">
                            {eChawadiRemarks?.akrushakDarBharlaKay || 'शेरा उपलब्ध नाही'}
                          </CTableDataCell>
                        </CTableRow>
                        <CTableRow>
                          <CTableDataCell className="text-start">
                            उप-अधीक्षक आकारबंद तपशील
                          </CTableDataCell>
                          <CTableDataCell className="text-start">
                            {eChawadiRemarks?.akarbandTapshil || 'शेरा उपलब्ध नाही'}
                          </CTableDataCell>
                        </CTableRow>
                      </CTableBody>
                    </CTable>
                  </div>

                  {/* 4. वसुली शेरा */}
                  <h4 className="mt-4 text-primary mb-3">ड. वसुली बाबत शेरा</h4>
                  <div className="table-responsive">
                    <CTable bordered responsive className="text-center mb-4">
                      <CTableHead>
                        <CTableRow className="bg-light">
                          <CTableHeaderCell width="30%">विषय</CTableHeaderCell>
                          <CTableHeaderCell width="70%">शेरा</CTableHeaderCell>
                        </CTableRow>
                      </CTableHead>
                      <CTableBody>
                        <CTableRow>
                          <CTableDataCell className="text-start">
                            जमीन महसूल वसुली (०२९)
                          </CTableDataCell>
                          <CTableDataCell className="text-start">
                            {vasuliRemarks || 'शेरा उपलब्ध नाही'}
                          </CTableDataCell>
                        </CTableRow>
                        <CTableRow>
                          <CTableDataCell className="text-start">
                            इतर जमीन महसूल वसुली (०४५)
                          </CTableDataCell>
                          <CTableDataCell className="text-start">
                            {vasuliRemarks || 'शेरा उपलब्ध नाही'}
                          </CTableDataCell>
                        </CTableRow>
                        <CTableRow>
                          <CTableDataCell className="text-start">
                            उद्दिष्टानुसार वसुली
                          </CTableDataCell>
                          <CTableDataCell className="text-start">
                            {vasuliRemarks || 'शेरा उपलब्ध नाही'}
                          </CTableDataCell>
                        </CTableRow>
                      </CTableBody>
                    </CTable>
                  </div>

                  {/* 5. सर्वसाधारण शेरा */}
                  <h4 className="mt-4 text-primary mb-3">इ. सर्वसाधारण शेरा</h4>
                  <CRow className="mb-4">
                    <CCol xs={12}>
                      <div className="border p-3 bg-light">
                        <p className="mb-0">
                          {reportData.sarvSadharanShera || 'सर्वसाधारण शेरा नोंदलेला नाही'}
                        </p>
                      </div>
                    </CCol>
                  </CRow>

                  {/* 6. पुर्ततेकरिता मुद्दे */}
                  <h4 className="mt-4 text-primary mb-3">फ. पुर्ततेकरिता मुद्दे</h4>
                  <CRow className="mb-4">
                    <CCol xs={12}>
                      <div className="border p-3">
                        <p className="mb-0">
                          {reportData.purttatekkaritaMudde || 'पुर्ततेकरिता मुद्दे नोंदलेले नाहीत'}
                        </p>
                      </div>
                    </CCol>
                  </CRow>

                  {/* Signature Section */}
                  <CRow className="mt-5 mb-10 text-end">
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
  },
)

InspectionRemarksPrint.displayName = 'InspectionRemarksPrint'
export default InspectionRemarksPrint
