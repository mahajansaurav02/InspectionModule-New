import React, { useState } from 'react'

const VillageDetailsList = () => {
  // State to manage the selected values (optional, but good practice for forms)
  const [district, setDistrict] = useState('')
  const [taluka, setTaluka] = useState('')
  const [village, setVillage] = useState('')
  const [revenueYear, setRevenueYear] = useState('')

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

  return (
    <div className="village-details-container" style={{ padding: '5px' }}>
      <div
        style={{
          display: 'flex',
          gap: '15px',
          alignItems: 'flex-start',
          marginBottom: '20px',
        }}
      >
        <div style={{ flex: 1, minWidth: '150px' }}>
          <label
            style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#555' }}
          >
            जिल्हा
          </label>
          <div
            style={{
              padding: '8px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              backgroundColor: '#f9f9f9',
              minHeight: '20px',
            }}
          >
            {distMarathiName || '---'}
          </div>
        </div>

        <div style={{ flex: 1, minWidth: '150px' }}>
          <label
            style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#555' }}
          >
            तालुका
          </label>
          <div
            style={{
              padding: '8px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              backgroundColor: '#f9f9f9',
              minHeight: '20px',
            }}
          >
            {talukaMarathiName || '---'}
          </div>
        </div>

        <div style={{ flex: 1, minWidth: '150px' }}>
          <label
            style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#555' }}
          >
            गाव
          </label>
          <div
            style={{
              padding: '8px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              backgroundColor: '#f9f9f9',
              minHeight: '20px',
            }}
          >
            {/* Display the value passed via props */}
            {villageName || '---'}
          </div>
        </div>

        <div style={{ flex: 1, minWidth: '150px' }}>
          <label
            style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#555' }}
          >
            महसूल वर्ष
          </label>
          <div
            style={{
              padding: '8px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              backgroundColor: '#f9f9f9',
              minHeight: '20px',
            }}
          >
            {'2024-25' || '---'}
          </div>
        </div>
      </div>
    </div>
  )
}

export default VillageDetailsList
