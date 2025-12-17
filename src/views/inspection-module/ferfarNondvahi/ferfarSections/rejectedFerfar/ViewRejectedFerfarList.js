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
  CSpinner,
  CTooltip,
  CPaginationItem,
} from '@coreui/react'
import { useSelector } from 'react-redux'
import CIcon from '@coreui/icons-react'
import { cilSearch, cilFile, cilMagnifyingGlass, cilInfo } from '@coreui/icons'
import FerfarNavbar from '../FerfarNavbar'
import { useNavigate } from 'react-router-dom'
import LoadingSpinner from 'src/Models/LoadingSpinner'
import axios from 'axios'
import URLS from 'src/URLS'
import moment from 'moment/moment'
import VillageDetailsList from 'src/views/dashboard/ReusableComponents/VillageDetailsList'
import getReqHeaders from 'src/instance/getHeader'

function ViewRejectedFerfarList() {
  const navigate = useNavigate()
  const [visible, setVisible] = useState(false)
  const [selectedFerfar, setSelectedFerfar] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [ferfarList, setFerfarList] = useState([])
  let VillageData = localStorage.getItem('selectedVillageData')

  let selectedVillageData = JSON.parse(VillageData)
const { user, roles, token } = useSelector((state) => state.auth || {})

const reqHeaders = getReqHeaders({ token, user })
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

  const getRejectedFerfar = async () => {
    setIsLoading(true)
    if (!cCode) {
      alert('Village code not found....Please Select Village First')
      return
    }
    try {
      const res = await axios.get(
        `${URLS.BaseURL}/inpsection/getTantrikFerfarForInspection?ccode=${cCode}`,
        {
          headers: reqHeaders,
        },
      )
      setFerfarList(res.data)
    } catch (err) {
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getRejectedFerfar()
  }, [])

  // Filter data based on search term
  const filteredData = ferfarList.filter((ferfar) =>
    String(ferfar.mutNo).toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Calculate paginated data
  const totalItems = filteredData.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  )

  const handleFerfarClick = (ferfar) => {
    navigate(`/ferfar-details/${ferfar.mutNo}`, { state: { ferfar } })
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case true:
        return <CBadge color="success">अभिप्राय दिलेला आहे</CBadge>
      case false:
        return <CBadge color="danger">अभिप्राय दिलेला नाही</CBadge>
      default:
        return <CBadge color="secondary">स्थिती उपलब्ध नाही</CBadge>
    }
  }

  return (
    <>
      <FerfarNavbar />
      <CCard className="mb-4 custom-card">
        <CCardHeader className="d-flex justify-content-between align-items-center bg-danger text-white">
          <h4 className="mb-0">📋 तांत्रिक कारणास्तव नामंजूर केलेल्या फेरफारांची यादी</h4>
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
        <div style={{ paddingLeft: '80px', paddingRight: '80px' }}>
          <VillageDetailsList />
        </div>
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
                  <div className="table-responsive">
                    <CTable hover striped bordered className="mb-4">
                      <CTableHead className="table-dark">
                        <CTableRow>
                          <CTableHeaderCell width="5%">अनु. क्रमांक</CTableHeaderCell>
                          <CTableHeaderCell width="15%">फेरफार क्रमांक</CTableHeaderCell>
                          <CTableHeaderCell width="15%">दिनांक</CTableHeaderCell>
                          <CTableHeaderCell width="15%">स्थिती</CTableHeaderCell>
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
                      <small className="text-muted">
                        Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
                        {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} entries
                      </small>
                    </CCol>
                    <CCol md={6} className="d-flex justify-content-end">
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

      {/* Modal */}
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

export default ViewRejectedFerfarList
