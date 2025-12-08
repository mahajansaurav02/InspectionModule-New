import React from 'react'
import { CButton, CCol, CContainer, CRow } from '@coreui/react'
import { Paper } from '@mui/material'
import DetailsCard from '../ReusableComponents/DetailsCard'
import DescriptionIcon from '@mui/icons-material/Description'
import CIcon from '@coreui/icons-react'
import { cilMedicalCross, cilViewStream } from '@coreui/icons'

const Section4 = ({ count4A, count4B, count4C }) => {
  return (
    <CContainer fluid style={{ marginTop: 10, marginBottom: 10 }}>
      <Paper elevation={4} style={{ padding: 10, paddingBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
          <CCol md={4}>
            <DetailsCard label="वसूल झालेली रक्कम" count={count4A} icon={<DescriptionIcon />} />
          </CCol>
          <CButton color="light">
            <CIcon icon={cilViewStream} title="Download file" />
          </CButton>
          <CCol md={3}>
            <DetailsCard
              label="जमीन व इतर महसूल (संकीर्ण वगळता)"
              count={count4B}
              icon={<DescriptionIcon />}
            />
          </CCol>
          <CButton color="light">
            <CIcon icon={cilMedicalCross} title="Download file" />
          </CButton>
          <CCol md={3}>
            <DetailsCard label="संकीर्ण महसूल" count={count4C} icon={<DescriptionIcon />} />
          </CCol>
        </div>
      </Paper>
    </CContainer>
  )
}

export default Section4
