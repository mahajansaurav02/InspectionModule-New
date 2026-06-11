import React, { useEffect, useState } from 'react'
import { IoArrowBackOutline } from 'react-icons/io5'
import {
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
import CIcon from '@coreui/icons-react'
import { useSelector } from 'react-redux'

import { cilSearch, cilFile, cilMagnifyingGlass, cilInfo } from '@coreui/icons'
import FerfarNavbar from '../FerfarNavbar'
import { useNavigate } from 'react-router-dom'
import LoadingSpinner from 'src/Models/LoadingSpinner'
import axios from 'axios'
import URLS from 'src/URLS'
import moment from 'moment'
import VillageDetailsList from 'src/views/dashboard/ReusableComponents/VillageDetailsList'
import getReqHeaders from 'src/instance/getHeader'
import api from 'src/instance/axiosConfig'
import SmartPagination from 'src/components/SmartPagination'
import { toast, ToastContainer } from 'react-toastify'
import InfoIcon from '@mui/icons-material/Info'
import '../../FerfarList.css'

// const token = localStorage.getItem('token')

function ViewNiyantritFerfar() {
  const navigate = useNavigate()
  const [visible, setVisible] = useState(false)
  const [selectedFerfar, setSelectedFerfar] = useState(null)
  const [ferfarList1, setFerfarList1] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const itemsPerPage = 10

  // Filter data based on search term
  const filteredData = ferfarList1.filter((ferfar) =>
    String(ferfar.mutNo).toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getReEntryFerfarList = async () => {
    setIsLoading(true)
    const cCode = '272400110296420000'
    try {
      const res = await api.get(`${URLS.BaseURL}/inpsection/getWarg2FherfarData?ccode=${cCode}`)

      setFerfarList1(res.data)
      toast.success('Data fetched successfully!', { autoClose: 2000 })
    } catch (err) {
      console.error(err, '=========================err=============')
      toast.error(err?.response?.data?.message || err?.message, { autoClose: 2000 })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getReEntryFerfarList()
  }, [])

  const totalItems = filteredData.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  )

  const handleFerfarClick = (ferfar) => {
    ferfar.ferfar_type = '6'
    console.log(ferfar, '=================ferfar==================')

    navigate(`/ferfar-details/${ferfar.mutNo}`, { state: { ferfar } })
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case true:
        return <CBadge color="success">अभिप्राय दिलेला आहे</CBadge>
      case false:
        return <CBadge color="danger">अभिप्राय दिलेला नाही</CBadge>
      default:
        return <CBadge color="warning">प्रलंबित</CBadge>
    }
  }

  return (
    <>
      {/* <FerfarNavbar /> */}
      <CCard className="mb-4 custom-card">
        <ToastContainer position="top-right" autoClose={2000} theme="colored" />

        <CCardHeader
          style={{
            background:
              'linear-gradient(90deg, #02024f 0%, #0b3c91 40%, #0e6ba8 70%, #1fb6e0 100%)',
          }}
          className="d-flex justify-content-between align-items-center text-white"
        >
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
            📋 नियंत्रीत सत्ता प्रकार असलेले भूमापन क्रमांकवर घेण्यात आलेले फेरफार{' '}
          </h4>
          <div className="d-flex align-items-center">
            <CTooltip
              content="गाव नमुना एक-क मधील नियंत्रीत सत्ता प्रकार असलेले भूमापन क्रमांकवर घेण्यात आलेले सर्व फेरफार तपासणी अधिकारी यांना उपलब्ध करून देण्यात आले आहे."
              placement="bottom-end"
            >
              <span className="tooltip-icon-btn me-4">
                <InfoIcon sx={{ color: 'white', fontSize: 24 }} />
              </span>
            </CTooltip>

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
                      <CTableHead className="text-center flex-grow-1 table-dark">
                        <CTableRow>
                          <CTableHeaderCell width="5%">अनु क्रमांक</CTableHeaderCell>
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

      {/* Modal */}
      <CModal visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader onClose={() => setVisible(false)}>
          <strong>पुनर्प्रवेश फेरफार तपशील</strong>
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
            <p>कृपया पुनर्प्रवेश फेरफार निवडा.</p>
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

export default ViewNiyantritFerfar
