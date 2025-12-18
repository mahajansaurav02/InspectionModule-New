import React, { useEffect, useState } from 'react'
import {
  CContainer,
  CCard,
  CCardBody,
  CCardHeader,
  CTable,
  CTableHead,
  CTableBody,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CButton,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CPagination,
  CBadge,
  CCol,
  CRow,
  CFormInput,
  CAlert,
  CTooltip,
  CPaginationItem,
} from '@coreui/react'
import {CIcon} from '@coreui/icons-react'
import { cilSearch, cilFile, cilMagnifyingGlass, cilInfo ,cilArrowCircleLeft } from '@coreui/icons'
import FerfarNavbar from '../FerfarNavbar'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
// import reqHeaders from 'src/instance/headers'
import URLS from 'src/URLS'
import moment from 'moment'
import Section1 from 'src/views/dashboard/Sections/Section1'
import LoadingSpinner from 'src/Models/LoadingSpinner'
import VillageDetailsList from 'src/views/dashboard/ReusableComponents/VillageDetailsList'
import { useSelector } from 'react-redux'
import getReqHeaders from 'src/instance/getHeader'
import  'src/views/inspection-module/ferfarNondvahi/FerfarHome.module.css'

function ViewOrderFerfarList() {
  const navigate = useNavigate()
  const [visible, setVisible] = useState(false)
  const [selectedFerfar, setSelectedFerfar] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [ferfarList1, setFerfarList1] = useState([])
  const [dropdownVal, setDropdownVal] = useState()
  let VillageData = localStorage.getItem('selectedVillageData')



const { user, roles, token } = useSelector((state) => state.auth || {})
const finalState = useSelector((state) => state)
const reqHeaders = getReqHeaders({ token, user })

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

  const itemsPerPage = 5

  useEffect(() => {
    getAdeshFerfarList()
  }, [])

  const getAdeshFerfarList = async () => {
console.log(finalState, 'checkkkk final state')
console.log(user, 'checkkkk user state')

    console.log(selectedVillageData, 'checkkkkkkk')
    console.log(selectedVillageData[0], 'checkkkkkkk2222222222')
    setIsLoading(true)
    try {
      console.log(cCode)
      if (!cCode) {
        alert('village noyt fpound')
        return
      }
      console.log(reqHeaders, 'checkkk headerss')
      const res = await axios.get(
        `${URLS.BaseURL}/inpsection/getAdeshNumberFerfar?ccode=${cCode}`,
        {
          headers: reqHeaders,
        },
      )
      setFerfarList1(res.data)
    } catch (err) {
      console.error(err)
      // You can add error handling here, e.g., show a toast message
    } finally {
      setIsLoading(false)
    }
  }


  const pressBack=()=>{
navigate(-2)

  }
  // Filter data based on search term from the API data
  const filteredData = ferfarList1.filter(
    (ferfar) =>
      String(ferfar.mutNo).toLowerCase().includes(searchTerm.toLowerCase()) ||
      (ferfar.mutDate &&
        moment(ferfar.mutDate)
          .format('DD/MM/YYYY')
          .toLowerCase()
          .includes(searchTerm.toLowerCase())),
  )

  // Calculate paginated data
  const totalItems = filteredData.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  )

  const handleFerfarClick = (ferfar) => {
    ferfar.ferfar_type='1'
    navigate(`/ferfar-details/${ferfar.mutNo}`, { state: { ferfar } })
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case true:
        return <CBadge color="success">अभिप्राय दिलेला आहे </CBadge>
      case false:
        return <CBadge color="danger">अभिप्राय दिलेला नाही </CBadge>
      default:
        return <CBadge color="warning">प्रलंबित</CBadge>
    }
  }

  return (
    <>
      {/* <FerfarNavbar /> */}
      <CCard className="mb-4 custom-card">
        <CCardHeader style={{
    background: 'linear-gradient(90deg, #02024f 0%, #0b3c91 40%, #0e6ba8 70%, #1fb6e0 100%)'
  }}
   className="d-flex justify-content-between align-items-center text-white ">
<CIcon
  icon={cilArrowCircleLeft}
  size="xl"
  onClick={pressBack}
  style={{
    marginLeft: '6px',
    marginTop: '2px',
    cursor: 'pointer',
    color: '#b8c7deff',
    transition: 'transform 0.2s ease, color 0.2s ease',
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.transform = 'scale(1.15)'
    e.currentTarget.style.color = '#c8d3e2ff'
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = 'scale(1)'
    e.currentTarget.style.color = ' #c6cedaff'
  }}
/>

          <h4 className="mb-0"> आदेश फेरफार यादी</h4>
          <div className="d-flex align-items-center">
            <CTooltip content="Search ferfar">
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
        <br />
        <CCardBody>
          {isLoading ? (
            <div className="loading-state">
              <LoadingSpinner message="Loading...." />
            </div>
          ) : (
            <>
              {filteredData.length === 0 ? (
                <CAlert color="info" className="text-center">
                  <CIcon icon={cilInfo} className="me-2" />
                  कोणतेही फेरफार सापडले नाहीत
                </CAlert>
              ) : (
                <>
                  <VillageDetailsList />

                  <div className="table-responsive">
                    <CTable hover striped bordered className="mb-4">
                      <CTableHead className="table-dark">
                        <CTableRow>
                          <CTableHeaderCell width="5%">अनु. क्रमांक</CTableHeaderCell>
                          <CTableHeaderCell width="15%">फेरफार क्रमांक</CTableHeaderCell>
                          <CTableHeaderCell width="15%">दिनांक</CTableHeaderCell>
                          <CTableHeaderCell width="15%">स्थिती</CTableHeaderCell>
                          {/* The commented-out columns were for dummy data. You might need to add them back if your API returns those fields. */}
                          {/* <CTableHeaderCell width="15%">7/12 पहा</CTableHeaderCell>
                          <CTableHeaderCell width="15%">दस्त पहा</CTableHeaderCell> */}
                        </CTableRow>
                      </CTableHead>
                      <CTableBody>
                        {paginatedData.map((ferfar, index) => (
                          <CTableRow key={ferfar.mutNo || index}>
                            <CTableDataCell className="text-center">
                              {(currentPage - 1) * itemsPerPage + index + 1}
                            </CTableDataCell>
                            <CTableDataCell className="text-center">
                              <button
                                className="btn btn-link text-primary text-decoration-underline p-0"
                                onClick={() => handleFerfarClick(ferfar)}
                              >
                                {ferfar.mutNo}
                              </button>
                            </CTableDataCell>
                            <CTableDataCell className="text-center">
                              {ferfar.mutDate ? moment(ferfar.mutDate).format('DD/MM/YYYY') : 'N/A'}
                            </CTableDataCell>
                            <CTableDataCell className="text-center">
                              {getStatusBadge(ferfar.isRemarkSubmitted)}
                            </CTableDataCell>
                          </CTableRow>
                        ))}
                      </CTableBody>
                    </CTable>
                  </div>

                  <CRow>
                    <CCol md={6} className="d-flex align-items-center">
                         <div className="dataTables_info">
                      {totalItems} नोंदींपैकी {(currentPage - 1) * itemsPerPage + 1} ते {' '}
                       {Math.min(currentPage * itemsPerPage, totalItems)} नोंदी दाखवत आहे.
                      
                    </div>
                    </CCol>
                    <CCol md={6} className="d-flex justify-content-end">
                      <CPagination align="end" size="sm" className="mb-0">
                        <CPaginationItem
                          disabled={currentPage === 1}
                          onClick={() => setCurrentPage(currentPage - 1)}
                        >
                          मागे जा 
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
                          पुढे जा 
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

      {/* Modal kept for future use */}
      <CModal visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader onClose={() => setVisible(false)}>
          <strong>फेरफार तपशील</strong>
        </CModalHeader>
        <CModalBody>
          {selectedFerfar ? (
            <>
              <p>
                <strong>फेरफार क्रमांक:</strong> {selectedFerfar.ferfarNumber}
              </p>
              <p>
                <strong>तपशील:</strong> {selectedFerfar.description}
              </p>
            </>
          ) : (
            <p>कृपया फेरफार निवडा.</p>
          )}
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            बंद करा
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default ViewOrderFerfarList
