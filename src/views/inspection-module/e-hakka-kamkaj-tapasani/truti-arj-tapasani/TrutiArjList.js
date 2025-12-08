import React, { useEffect, useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CButton,
  CPagination,
  CBadge,
  CCol,
  CRow,
  CFormInput,
  CAlert,
  CSpinner,
  CTooltip,
  CPaginationItem,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilSearch, cilFile, cilMagnifyingGlass, cilInfo } from '@coreui/icons'
import '@coreui/coreui/dist/css/coreui.min.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import URLS from 'src/URLS'
import reqHeaders from 'src/instance/headers'
import VillageDetailsList from 'src/views/dashboard/ReusableComponents/VillageDetailsList'

function TrutiArjList() {
  // Sample data - replace with your actual data source
  const navigate = useNavigate()

  const [data, setData] = React.useState([
    {
      id: '1',
      applicationNo: 'APP-2023-001',
      cancelReason: 'आपण अपलोड केलेले दस्तावेज अपूर्ण आहेत.',
      date: '2023-05-15',
      docLink: '/documents/app-001',
      status: 'pending',
    },
    {
      id: '2',
      applicationNo: 'APP-2023-002',
      cancelReason: 'धारण जमीन भोगवटदार वर्ग २ ची असल्याने सक्षम अधिकाऱ्याची परवानगी आवश्यक आहे.',
      date: '2023-05-18',
      docLink: '/documents/app-002',
      status: 'rejected',
    },
    {
      id: '3',
      applicationNo: 'APP-2023-003',
      cancelReason: 'अर्जामधील माहिती चा फेरफार घेणे ची तरतूद नाही.',
      date: '2023-05-20',
      docLink: '/documents/app-003',
      status: 'rejected',
    },
    {
      id: '4',
      applicationNo: 'APP-2023-1252',
      cancelReason: 'दिवाणी / महसूली / सहकार न्यायालयाच्या आदेशावर स्थगिती आहे.',
      date: '2023-05-20',
      docLink: '/documents/app-003',
      status: 'rejected',
    },
    {
      id: '5',
      applicationNo: 'APP-2023-56952',
      cancelReason: 'आपण अपलोड केलेला दस्तावेज व भरलेली माहिती यामध्ये तफावत आहे',
      date: '2023-05-20',
      docLink: '/documents/app-003',
      status: 'rejected',
    },
    {
      id: '6',
      applicationNo: 'APP-2023-0322',
      cancelReason: 'आपण अपलोड केलेले दस्तावेज अपूर्ण आहेत',
      date: '2023-05-20',
      docLink: '/documents/app-003',
      status: 'rejected',
    },
    {
      id: '7',
      applicationNo: 'APP-2023-0322',
      cancelReason: 'आपण अर्जा मध्ये अचुक माहीती भरलेली नाही',
      date: '2023-05-20',
      docLink: '/documents/app-003',
      status: 'rejected',
    },
    {
      id: '8',
      applicationNo: 'APP-2023-0322',
      cancelReason: 'आपण भरलेल्या सर्व्हे/खाता नंबरवर आक्षेपीत फेरफार प्रलंबित आहे.',
      date: '2023-05-20',
      docLink: '/documents/app-003',
      status: 'rejected',
    },
    {
      id: '9',
      applicationNo: 'APP-2023-0322',
      cancelReason: 'आपणास अर्ज करण्याचा कायदेशीर अधिकार नाही.',
      date: '2023-05-20',
      docLink: '/documents/app-003',
      status: 'rejected',
    },
  ])

  const [currentPage, setCurrentPage] = React.useState(1)
  const [searchTerm, setSearchTerm] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(false)
  const [trutiArjList, setTrutiArjList] = useState([])
  const itemsPerPage = 8
  let VillageData = localStorage.getItem('selectedVillageData')

  let selectedVillageData = JSON.parse(VillageData)

  let {
    cCode,
    distMarathiName,
    districtCode,
    lgdCode,
    talukaCode,
    talukaMarathiName,
    villageName,
  } = selectedVillageData[0]

  const getTrutiArjListList = async () => {
    setIsLoading(true)
    if (!cCode) {
      alert('Village code not found....Please Select Village First')
      return
    }
    try {
      const res = await axios.get(
        `${URLS.BaseURL}/inpsection/getEhakkaTrutiApplication?ccode=${cCode}`,
        {
          headers: reqHeaders,
        },
      )

      console.log(res.data, 'trutiApplication list')
      setTrutiArjList(res.data)
    } catch (err) {
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getTrutiArjListList()
  }, [])

  // Filter data based on search term
  // const filteredData = trutiArjList.filter(item =>
  //   item.applicationId.includes(searchTerm.toLowerCase()) ||
  //   item.rejReason.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  // Calculate paginated data
  const totalItems = trutiArjList.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const paginatedData = trutiArjList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  )

  const handleApplicationClick = (application) => {
    navigate(`/truti-applications-details/${application.id}`, { state: { application } }) // Your 7/12 view logic
  }
  const handle7_12Click = (applicationNo) => {
    console.log(`View 7/12 for application: ${applicationNo}`)
    // Your 7/12 view logic
  }

  const handleDocView = (docLink) => {
    console.log(`View documents at: ${docLink}`)
    // Your document view logic
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case 'approved':
        return <CBadge color="success">अभिप्राय दिलेला आहे</CBadge>
      case 'rejected':
        return <CBadge color="danger">अभिप्राय दिलेला नाही</CBadge>
      default:
        return <CBadge color="warning">प्रलंबित</CBadge>
    }
  }

  return (
    <CCard className="mb-4 custom-card">
      <CCardHeader className="d-flex justify-content-between align-items-center bg-primary text-white">
        <h4 className="mb-0">त्रुटी अर्ज यादी</h4>
        <div className="d-flex align-items-center">
          <CTooltip content="Search applications">
            <div className="position-relative">
              <CIcon
                icon={cilSearch}
                className="position-absolute top-50 start-0 translate-middle-y ms-2"
              />
              <CFormInput
                type="text"
                placeholder="शोधा..."
                className="ps-5"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value)
                  setCurrentPage(1)
                }}
              />
            </div>
          </CTooltip>
        </div>
      </CCardHeader>
      <VillageDetailsList />

      <CCardBody>
        {isLoading ? (
          <div className="text-center py-5">
            <CSpinner color="primary" />
            <p className="mt-2">लोड होत आहे...</p>
          </div>
        ) : (
          <>
            {trutiArjList.length === 0 ? (
              <CAlert color="info" className="text-center">
                <CIcon icon={cilInfo} className="me-2" />
                कोणतेही अर्ज सापडले नाहीत
              </CAlert>
            ) : (
              <>
                <div className="table-responsive">
                  <CTable hover striped bordered className="mb-4">
                    <CTableHead className="table-dark">
                      <CTableRow>
                        <CTableHeaderCell width="15%">अर्ज क्रमांक</CTableHeaderCell>
                        <CTableHeaderCell width="30%">
                          त्रुटीपूर्ततेखाली पाठविण्यात आलेले कारण
                        </CTableHeaderCell>
                        <CTableHeaderCell width="15%">पाठविण्याचा दिनांक</CTableHeaderCell>
                        <CTableHeaderCell width="10%">स्थिती</CTableHeaderCell>
                        {/* <CTableHeaderCell width="15%">7/12</CTableHeaderCell> */}
                        {/* <CTableHeaderCell width="15%">दस्त</CTableHeaderCell> */}
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      {paginatedData.map((item) => (
                        <CTableRow key={item.id}>
                          <CTableDataCell>
                            <button
                              className="btn btn-link text-primary text-decoration-underline p-0"
                              onClick={() => handleApplicationClick(item)}
                            >
                              {item.applicationId}
                            </button>{' '}
                          </CTableDataCell>
                          <CTableDataCell>{item.rejReason}</CTableDataCell>
                          <CTableDataCell>{item.appDate}</CTableDataCell>
                          <CTableDataCell>{getStatusBadge(item.isRemarkSubmitted)}</CTableDataCell>
                          {/* <CTableDataCell>
                            <CTooltip content="7/12 पहा">
                              <CButton 
                                color="primary" 
                                variant="outline"
                                size="sm"
                                onClick={() => handle7_12Click(item.applicationNo)}
                              >
                                <CIcon icon={cilFile} className="me-1" />
                                7/12
                              </CButton>
                            </CTooltip>
                          </CTableDataCell> */}
                          {/* <CTableDataCell>
                            <CTooltip content="दस्तऐवज पहा">
                              <CButton 
                                color="info" 
                                variant="outline"
                                size="sm"
                                onClick={() => handleDocView(item.docLink)}
                              >
                                <CIcon icon={cilMagnifyingGlass} className="me-1" />
                                दस्त
                              </CButton>
                            </CTooltip>
                          </CTableDataCell> */}
                        </CTableRow>
                      ))}
                    </CTableBody>
                  </CTable>
                </div>

                <CRow className="mt-3 align-items-center">
                  <CCol xs={12} md={6} className="mb-2 mb-md-0">
                    <div className="dataTables_info">
                      Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
                      {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} entries
                    </div>
                  </CCol>

                  <CCol xs={12} md={6}>
                    <CPagination align="end" size="sm" className="mb-0">
                      <CPaginationItem
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(currentPage - 1)}
                      >
                        Previous
                      </CPaginationItem>

                      {Array.from({ length: totalPages }, (_, i) => (
                        <CPaginationItem
                          key={i + 1}
                          active={i + 1 === currentPage}
                          onClick={() => setCurrentPage(i + 1)}
                        >
                          {i + 1}
                        </CPaginationItem>
                      ))}

                      <CPaginationItem
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(currentPage + 1)}
                      >
                        Next
                      </CPaginationItem>
                    </CPagination>
                  </CCol>
                </CRow>
              </>
            )}
          </>
        )}
      </CCardBody>
    </CCard>
  )
}

export default TrutiArjList
