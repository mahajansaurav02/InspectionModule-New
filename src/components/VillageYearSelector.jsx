import React, { useState } from 'react'
import {
  CButton,
  CFormSelect,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CModalFooter,
} from '@coreui/react'
import './app.css'
const VillageYearSelector = ({ villages = [], years = [], onSubmit }) => {
  const [visible, setVisible] = useState(false)
  const [selectedVillage, setSelectedVillage] = useState('')
  const [selectedYear, setSelectedYear] = useState('')

  const handleSubmit = () => {
    onSubmit({ village: selectedVillage, year: selectedYear })
    setVisible(false)
  }

  return (
    <>
    <CButton
  className="village-btn"
  onClick={() => setVisible(true)}
>
  गाव / वर्ष निवडा
</CButton>

<CModal
  visible={visible}
  onClose={() => setVisible(false)}
  alignment="center"
  className="custom-modal"
>
  <CModalHeader closeButton>
    <CModalTitle>गाव आणि राजस्व वर्ष निवडा</CModalTitle>
  </CModalHeader>
  <CModalBody>
    <div className="mb-3">
      <label>गाव निवडा</label>
      <CFormSelect
        value={selectedVillage}
        onChange={(e) => setSelectedVillage(e.target.value)}
      >
        <option value="">गाव निवडा</option>
        {villages.map((v, idx) => (
          <option key={idx} value={v}>{v}</option>
        ))}
      </CFormSelect>
    </div>

    <div>
      <label>राजस्व वर्ष निवडा</label>
      <CFormSelect
        value={selectedYear}
        onChange={(e) => setSelectedYear(e.target.value)}
      >
        <option value="">राजस्व वर्ष निवडा</option>
        {years.map((y, idx) => (
          <option key={idx} value={y}>{y}</option>
        ))}
      </CFormSelect>
    </div>
  </CModalBody>
  <CModalFooter>
    <CButton color="secondary" onClick={() => setVisible(false)}>
      बंद
    </CButton>
    <CButton color="primary" onClick={handleSubmit} disabled={!selectedVillage || !selectedYear}>
      सबमिट
    </CButton>
  </CModalFooter>
</CModal>

    </>
  )
}

export default VillageYearSelector
