import React, { useEffect, useState } from 'react'
import { IoArrowBackOutline } from "react-icons/io5";
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
import api from 'src/api/api'
import SmartPagination from 'src/components/SmartPagination'

function TrutiArjList() {
  // Sample data - replace with your actual data source
  const navigate = useNavigate()

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
    

      const res = await api.get(`/inpsection/getEhakkaTrutiApplication?ccode=${cCode}`)

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
    console.log(application,"\application")
    navigate(`/truti-applications-details/${application.applicationId}`, { state: { application } }) // Your 7/12 view logic
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
      <CCardHeader style={{
    background: 'linear-gradient(90deg, #02024f 0%, #0b3c91 40%, #0e6ba8 70%, #1fb6e0 100%)'
  }}
   className="d-flex justify-content-between align-items-center text-white">
    <span
  onClick={() => navigate(-2)}
  style={{
    cursor: 'pointer',
    fontSize: '22px',
    color: 'white',
    transition: 'all 0.25s ease',
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.transform = 'translateX(-4px) scale(1.1)'
    e.currentTarget.style.opacity = '0.85'
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = 'none'
    e.currentTarget.style.opacity = '1'
  }}
>
  <IoArrowBackOutline />
</span>
        <h4 className="mb-0 text-center flex-grow-1">
          त्रुटी अर्ज यादी</h4>
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

      <CCardBody>
              <VillageDetailsList />

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
                        <CTableHeaderCell width="4%">क्र.</CTableHeaderCell>
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
                      {paginatedData.map((item,index) => (
                        
                        <CTableRow key={item.id}>
                          <CTableDataCell>{index + 1}</CTableDataCell>
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

               <SmartPagination
  currentPage={currentPage}
  totalPages={totalPages}
  totalItems={totalItems}
  itemsPerPage={itemsPerPage}
  onPageChange={(page) => setCurrentPage(page)}
/>

              </>
            )}
          </>
        )}
      </CCardBody>
    </CCard>
  )
}

export default TrutiArjList
