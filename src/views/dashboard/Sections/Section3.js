import { CCol, CContainer, CRow } from '@coreui/react'
import { Paper } from '@mui/material'
import React from 'react'
import DetailsCard from '../ReusableComponents/DetailsCard'
import DescriptionIcon from '@mui/icons-material/Description'
import { CChart } from '@coreui/react-chartjs'

const Section3 = ({
  count3A,
  count3B,
  count3C,
  pieChart1A,
  pieChart1B,
  pieChart2A,
  pieChart2B,
}) => {
  const pieChart1 = {
    labels: [
      'मागणी निश्चित झालेली खातेदार संख्या % मध्ये',
      'मागणी निश्चित न झालेली खातेदार संख्या % मध्ये',
    ],
    datasets: [
      {
        data: [parseInt(pieChart1A), parseInt(pieChart1B)],
        backgroundColor: ['#16DD1B', '#DD1B16'],
        hoverBackgroundColor: ['#16DD1B', '#DD1B16'],
      },
    ],
  }
  const pieChart2 = {
    labels: [
      'वसुली पूर्ण झालेली खातेदार संख्या % मध्ये',
      'वसुली पूर्ण न झालेली खातेदार संख्या % मध्ये',
    ],
    datasets: [
      {
        data: [parseInt(pieChart2A), parseInt(pieChart2B)],
        backgroundColor: ['#16DD1B', '#DD1B16'],
        hoverBackgroundColor: ['#16DD1B', '#DD1B16'],
      },
    ],
  }
  // const options = {
  //   // tooltips: {
  //   //   enabled: false,
  //   //   custom: customTooltips
  //   // },
  //   maintainAspectRatio: true,
  // }
  return (
    <CContainer fluid>
      <Paper elevation={4} style={{ padding: 10 }}>
        <CRow>
          <CCol>
            <DetailsCard
              label="मागणी निश्चित केलेली खातेदार संख्या"
              count={count3A ? count3A : 0}
              icon={<DescriptionIcon />}
            />
          </CCol>
          <CCol>
            <DetailsCard
              label="वसुली पात्र खातेदार संख्या"
              count={count3B ? count3B : 0}
              icon={<DescriptionIcon />}
            />
          </CCol>
          <CCol>
            <DetailsCard
              label="वसुली पूर्ण खातेदार संख्या"
              count={count3C ? count3C : 0}
              icon={<DescriptionIcon />}
            />
          </CCol>
        </CRow>
        <CRow>
          {/* <CCol md={1}></CCol> */}
          <CCol md={6}>
            <Paper
              elevation={7}
              style={{ margin: 10, padding: 15, paddingLeft: 115, paddingRight: 115 }}
            >
              <CChart type="pie" data={pieChart1} />
            </Paper>
          </CCol>

          <CCol md={6}>
            <Paper
              elevation={7}
              style={{ margin: 10, padding: 15, paddingLeft: 115, paddingRight: 115 }}
            >
              <CChart type="pie" data={pieChart2} />
            </Paper>
          </CCol>
          {/* <CCol md={1}></CCol> */}
        </CRow>
      </Paper>
    </CContainer>
  )
}

export default Section3
