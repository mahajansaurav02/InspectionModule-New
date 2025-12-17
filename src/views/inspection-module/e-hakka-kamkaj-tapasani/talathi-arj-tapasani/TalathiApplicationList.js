import React, { useEffect, useState, useCallback } from 'react'
import axios from 'axios'
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
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilSearch, cilInfo } from '@coreui/icons'
import '@coreui/coreui/dist/css/coreui.min.css'
import { useNavigate, useParams } from 'react-router-dom' // 👈 IMPORTANT: Import useParams
import URLS from 'src/URLS'
import reqHeaders from 'src/instance/headers'
import VillageDetailsList from 'src/views/dashboard/ReusableComponents/VillageDetailsList'

const CONDITION_MAPPING = {
  // We are using '1', '2', '3', '4' assuming those are the IDs passed in the path.
  1: {
    apiUrl: 'inpsection/getPendingApplicationsOver180Days',
    title: '१८० दिवसापेक्षा जास्त दिवस प्रलंबित अर्जांची यादी',
  },
  2: {
    apiUrl: 'inpsection/getPendingApplications90To180Days',
    title: '९० ते १८० दिवसातील प्रलंबित अर्जांची यादी',
  },
  3: {
    apiUrl: 'inpsection/getPendingApplicationsForTalathiInMidPendingRange',
    title: '३० ते ९० दिवसातील प्रलंबित अर्जांची यादी',
  },
  4: {
    apiUrl: 'inpsection/getPendingApplicationsForTalathiUnderThirtyDays',
    title: '३० दिवसा पेक्षा कमी दिवस प्रलंबित अर्जांची यादी',
  },
}
// /getPendingApplicationsForTalathiUnderThirtyDays
//  /getPendingApplicationsForTalathiInMidPendingRange
//  /getPendingApplicationsOver180Days
//  /getPendingApplications90To180Days
// --------------------------------------------------------

function TrutiArjList() {
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

  const navigate = useNavigate()

  const { conditionId } = useParams()
  const currentCondition = CONDITION_MAPPING[conditionId]

  const [data, setData] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [apiError, setApiError] = useState(null)

  const itemsPerPage = 8

  // Function to fetch data based on the current condition
  const fetchApplications = useCallback(async () => {
    setData([])
    setApiError(null)

    if (!currentCondition) {
      console.error('Condition ID is missing or invalid:', conditionId)
      setApiError('अवैध तपासणी श्रेणी निवडली आहे.')
      return
    }

    setIsLoading(true)
    setCurrentPage(1) // Reset to first page on new fetch
    console.log(conditionId, '----------currentCondition')

    // 🚨 Adjust payload for your API requirements (e.g., divisionCode, status, etc.)

    try {
      const response = await axios.get(
        `${URLS.BaseURL}/${currentCondition.apiUrl}?ccode=${cCode}&talukaCode=${talukaCode}&districtCode=${districtCode}`,
        {
          headers: reqHeaders,
        },
      )
      // Adjust this line based on your API response structure (e.g., response.data.data.content)
      const fetchedData = response.data.data.content || response.data.data || response.data

      if (Array.isArray(fetchedData)) {
        setData(fetchedData)
      } else {
        setData([])
        setApiError('माहितीची संरचना अयोग्य आहे.')
      }
    } catch (error) {
      console.error('Error fetching application list:', error)
      // setApiError("माहिती आणताना त्रुटी आली. API तपासा.");
    } finally {
      setIsLoading(false)
    }
  }, [conditionId, currentCondition]) // Depend on conditionId/currentCondition

  // --- useEffect to trigger fetch on ID change ---
  useEffect(() => {
    // console.log("Current Condition ID:", conditionId); // Now this should show the correct ID
    fetchApplications()
  }, [conditionId, fetchApplications])

  // --- Filtering and Pagination Logic ---
  const filteredData = data.filter(
    (item) =>
      item.applicationNo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.date?.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const totalItems = filteredData.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  )

  const handleApplicationClick = (application) => {
    navigate(`/truti-applications-details/${application.id}`, { state: { application } })
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case 'approved':
        return <CBadge color="success">अभिप्राय दिलेला आहे</CBadge>
      case 'rejected':
      default:
        return <CBadge color="danger">अभिप्राय दिलेला नाही </CBadge>
    }
  }
  // ---------------------------------------------

  return (
    <CCard className="mb-4 custom-card">
      <CCardHeader className="d-flex justify-content-between align-items-center bg-primary text-white">
        {/* Display the dynamic title */}
        <h4 className="mb-0">
          {currentCondition ? currentCondition.title : 'तलाठी स्तरावर प्रलंबित अर्जांची यादी'}
        </h4>
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
        {apiError && (
          <CAlert color="danger" className="text-center">
            {apiError}
          </CAlert>
        )}

        {isLoading ? (
          <div className="text-center py-5">
            <CSpinner color="primary" />
            <p className="mt-2">लोड होत आहे...</p>
          </div>
        ) : (
          <>
            {filteredData.length === 0 ? (
              <CAlert color="info" className="text-center">
                <CIcon icon={cilInfo} className="me-2" />
                कोनतेही अर्ज सापडले नाहीत
              </CAlert>
            ) : (
              <>
                <div className="table-responsive">
                  <CTable hover striped bordered className="mb-4">
                    <CTableHead className="table-dark">
                      <CTableRow>
                        <CTableHeaderCell width="15%">अर्ज क्रमांक</CTableHeaderCell>
                        <CTableHeaderCell width="15%">पाठविण्याचा दिनांक</CTableHeaderCell>
                        <CTableHeaderCell width="10%">स्थिती</CTableHeaderCell>
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
                              {item.applicationNo}
                            </button>
                          </CTableDataCell>
                          <CTableDataCell>{item.date}</CTableDataCell>
                          <CTableDataCell>{getStatusBadge(item.status)}</CTableDataCell>
                        </CTableRow>
                      ))}
                    </CTableBody>
                  </CTable>
                </div>

                <CRow className="mt-3 align-items-center">
                  <CCol xs={12} md={6} className="mb-2 mb-md-0">
                    {/* <div className="dataTables_info">
                      Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
                      {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} entries
                    </div> */}
                    <div className="dataTables_info">
                      {totalItems} नोंदींपैकी {(currentPage - 1) * itemsPerPage + 1} ते {' '}
                       {Math.min(currentPage * itemsPerPage, totalItems)} नोंदी दाखवत आहे.
                      
                    </div>
                  </CCol>

                  <CCol xs={12} md={6}>
                    {totalPages > 1 && (
                      <CPagination
                        activePage={currentPage}
                        pages={totalPages}
                        onActivePageChange={setCurrentPage}
                        align="end"
                        dots={false}
                        doubleArrows={false}
                        firstButton="First"
                        lastButton="Last"
                        size="sm"
                        className="justify-content-center justify-content-md-end"
                      />
                    )}
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
