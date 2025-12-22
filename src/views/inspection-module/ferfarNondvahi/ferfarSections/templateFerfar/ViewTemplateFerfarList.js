import React, { useEffect, useState } from 'react'
import { IoArrowBackOutline } from "react-icons/io5";
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
  CPagination,
  CBadge,
  CCol,
  CRow,
  CFormInput,
  CAlert,
  CTooltip,
  CPaginationItem,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilSearch, cilInfo } from '@coreui/icons'
import FerfarNavbar from '../FerfarNavbar'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import URLS from 'src/URLS'
import moment from 'moment'
import Section1 from 'src/views/dashboard/Sections/Section1'
import LoadingSpinner from 'src/Models/LoadingSpinner'
import { useSelector } from 'react-redux'
import VillageDetailsList from 'src/views/dashboard/ReusableComponents/VillageDetailsList'
import getReqHeaders from 'src/instance/getHeader'
import api from 'src/api/api'
import SmartPagination from 'src/components/SmartPagination'
import { toast, ToastContainer } from 'react-toastify';

function ViewTemplateFerfarList() {
  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [ferfarList, setFerfarList] = useState([])
  const [dropdownVal, setDropdownVal] = useState()
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
  const { user, roles, token } = useSelector((state) => state.auth || {})

  const reqHeaders = getReqHeaders({ token, user })
  const itemsPerPage = 10

  const getTemplateFerfar = async () => {
    setIsLoading(true)
    if (!cCode) {
      alert('Village code not found....Please Select Village First')
      return
    }
    try {


      const res = await api.get(`/inpsection/getTemplateFerfar?ccode=${cCode}`)
      setFerfarList(res.data)
      toast.success('Data fetched successfully!', { autoClose: 2000 })

    } catch (err) {
      console.error(err)
      toast.error(err?.response?.data?.message || err?.message, { autoClose: 2000 })

    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getTemplateFerfar()
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
    ferfar.ferfar_type = '8'
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
      {/* <FerfarNavbar /> */}
      <CCard className="mb-4 custom-card">
                <ToastContainer position="top-right" autoClose={2000} theme="colored" />

        <CCardHeader style={{
          background: 'linear-gradient(90deg, #02024f 0%, #0b3c91 40%, #0e6ba8 70%, #1fb6e0 100%)'
        }}
          className="d-flex justify-content-between align-items-center bg-primary text-white">
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
            📋 फेरफार क्रमांकानुसार यादी</h4>
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
                  <div className="table-responsive">
                    <CTable hover striped bordered className="mb-4">
                      <CTableHead className="text-center flex-grow-1 table-dark">
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
    </>
  )
}

export default ViewTemplateFerfarList
