import React, { useEffect, useState } from 'react'
import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CAlert,
  CContainer, // Added CContainer for structure
  CFormTextarea, // Added CFormTextarea for remarks
  CButton, // Added CButton for controls
  CRow, // Added CRow for layout
  CCol, // Added CCol for layout
} from '@coreui/react'
import axios from 'axios'
import URLS from 'src/URLS'
import LoadingSpinner from 'src/Models/LoadingSpinner'
import reqHeaders from 'src/instance/headers'
import './AkrushakDarTapa.module.css'
import VillageDetailsList from 'src/views/dashboard/ReusableComponents/VillageDetailsList'
import api from 'src/api/api'
import FerfarNavbar from '../../ferfarNondvahi/ferfarSections/FerfarNavbar'
const AkrushakDarTapa = () => {
  const [akrushakRateList, setAkrushakRateList] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const [remark, setRemark] = useState('')
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

  useEffect(() => {
    getAkurhsakDar()
  }, [])

  const getAkurhsakDar = async () => {
    setIsLoading(true)
    try {
      if (!cCode) {
        alert('Village code not found....Please Select Village First')
        return
      }

            const res = await api.get(`/inpsection/getAkrushakDar?ccode=${cCode}`)

      setAkrushakRateList(res.data || [])
    } catch (err) {
      setError('डेटा मिळू शकला नाही')
    } finally {
      setIsLoading(false)
    }
  }

  // --- NEW HANDLER FUNCTIONS ---
  const handleRemarkSubmit = () => {
    if (!remark.trim()) {
      alert('कृपया शेरा प्रविष्ट करा.')
      return
    }
    console.log('Remark submitted:', remark)
    // Implement submission API logic here
  }

  const handleCancel = () => {
    setRemark('')
    console.log('Action cancelled. Remark cleared.')
    // Implement navigation or other cancellation logic
  }
  // ----------------------------

  return (
    <>
<FerfarNavbar />
    <CContainer fluid className="p-4 akrushak-dar-container">
      <div className="shadow-lg p-4 rounded bg-white report-area">
        <h4 className="mb-4 text-center text-primary fw-bold border-bottom pb-2">
          📋 अकृषक दर नमूद केल्याची तपासणी
        </h4>
        <VillageDetailsList />

        <CAlert color="info" className="modern-alert">
          <strong>टीप:</strong>
          <ul className="mt-2 mb-0 text-start">
            <li>सदर गावाचे अकृषक दर भरून संबंधित काम पूर्ण झाल्याची घोषणा करण्यात आली आहे का?</li>
            <li>
              तसेच सदर दर योग्य पद्धतीने लागू करण्यात आले आहेत याचीही तपासणी करून खात्री करावी.
            </li>
          </ul>
        </CAlert>

        {isLoading && (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: '300px' }}
          >
            <LoadingSpinner message="Loading..." />
          </div>
        )}

        {error && <p className="text-danger text-center">{error}</p>}

        {/* --- TABLE CONTENT --- */}
        {!isLoading && !error && (
          <div className="table-responsive mb-4">
            <CTable
              bordered
              striped
              hover
              responsive
              align="middle"
              className="text-center akrushak-table"
            >
              <CTableHead className="bg-info text-white">
                <CTableRow>
                  <CTableHeaderCell rowSpan={2}>गावाचे नाव</CTableHeaderCell>
                  <CTableHeaderCell colSpan={4}>अकृषक दर</CTableHeaderCell>
                  <CTableHeaderCell rowSpan={2}>दर भरण्याबाबत घोषणा केली आहे काय?</CTableHeaderCell>
                </CTableRow>
                <CTableRow>
                  <CTableHeaderCell>न.प </CTableHeaderCell>
                  <CTableHeaderCell>म.न.पा</CTableHeaderCell>
                  <CTableHeaderCell>५ पैसे</CTableHeaderCell>
                  <CTableHeaderCell>१० पैसे</CTableHeaderCell>
                </CTableRow>
              </CTableHead>

              <CTableBody>
                {akrushakRateList.map((item, index) => (
                  <CTableRow key={index}>
                    <CTableDataCell>{item.name}</CTableDataCell>
                    <CTableDataCell>{item.nprate ? item.nprate : 0} पैसे </CTableDataCell>
                    <CTableDataCell>{item.mnparate ? item.mnparate : 0} पैसे</CTableDataCell>
                    <CTableDataCell>{item.fivepaise ? item.fivepaise : 0} पैसे</CTableDataCell>
                    <CTableDataCell>{item.tenpaise ? item.tenpaise : 0} पैसे</CTableDataCell>
                    <CTableDataCell>{item.declaration == 'Y' ? 'होय ' : 'नाही '}</CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </div>
        )}
        {/* --- END TABLE CONTENT --- */}

        {/* --- MODERN REMARK AND CONTROL SECTION --- */}
        <div className="remark-controls-section p-4 mt-4 border rounded bg-light">
          <h5 className="remark-title mb-3">शेरा</h5>

          <CFormTextarea
            rows={4}
            className="remark-textarea mb-3"
            placeholder="येथे तपासणीनंतर आपला शेरा/अभिप्राव नोंदवा..."
            value={remark}
            onChange={(e) => setRemark(e.target.value)}
          />

          <div className="d-flex justify-content-end gap-3 button-container">
            <CButton color="secondary" onClick={handleCancel} className="cancel-button">
              रद्द करा
            </CButton>
            <CButton
              color="success"
              onClick={handleRemarkSubmit}
              className="submit-button"
              disabled={!remark.trim()}
            >
              अभिप्राय जतन करा
            </CButton>
          </div>
        </div>
        {/* --- END REMARK AND CONTROL SECTION --- */}
      </div>
    </CContainer>
    </>
  )
}

export default AkrushakDarTapa
