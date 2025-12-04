import React, { useState, useEffect } from 'react'
import axios from 'axios'
import URLS from 'src/URLS'

import { Paper } from '@mui/material'
import Section1 from './Sections/Section1'
import Section2 from './Sections/Section2'
import Section3 from './Sections/Section3'
import Section4 from './Sections/Section4'
import { useLocation } from 'react-router-dom'

function useQuery() {
  return new URLSearchParams(useLocation().search)
}

const Dashboard = () => {
  const [dropdownVal, setDropdownVal] = useState({
    village: '',
    villageCode: '',
    cCode: '',
    revenueYear: '',
  })
  const query = useQuery()
  const districtCode = query.get('districtCode')
  const roles = query.get('roles')
  // const username = query.get("username");
  // const token = query.get("token");
  // const email = query.get("email");

  //console.info('dashboard stateup-', dropdownVal)
  const [totalLiveKhatedar, setTotalLiveKhatedar] = useState(0)
  const [totalSurveyNumber, setTotalSurveyNumber] = useState(0)
  const [totalKhatedar, setTotalKhatedar] = useState(0)
  const [AugPin1, setAugPin1] = useState(0)
  const [Wasulipatrakhatedar, setWasulipatrakhatedar] = useState()
  const [targetData, setTargetData] = useState(0)

  const [totalNetAmount, setTotalNetAmount] = useState(0)
  const [totalNetReceived, setTotalNetReceived] = useState(0)
  const [khatedarAmountReceived, setKhatedarAmountReceived] = useState(0)
  const [sankirnWith, setSankirnWith] = useState(0)
  const [sankirnWithOut, setSankirnWithOut] = useState(0)
  const [sankirnMahsool, setSankirnMahsool] = useState()
  const [demandGenerated, setDemandGenerated] = useState(0)
  const [jamabandi, setJamabandi] = useState()

  const TotalLiveKhatedar = async () => {
    // alert(dropdownVal?.cCode)

    const token = localStorage.getItem('token')
    const talukCode = JSON.parse(localStorage.getItem('talukaCode'))
    const ccode = JSON.parse(localStorage.getItem('talukaCode'))
    //272400110296420000
    await axios
      //.get(`${URLS.BaseURL}/restservice/getDashBoardKhataNoDetails?cCode=272400110296420000`, {
      .get(
        `${URLS.BaseURL}/restservice/getDashBoardKhataNoDetails?cCode=272400110296420000&talukaCode=${talukCode}`,
        {
          headers: {
            Authorization: 'Bearer ' + token,
            Echdbname: '3y+6bSLaBNfOzEUWW3yXOA==',
            Echschemaname: '33gU8iw1FOl/D43LCQ6MhA==',
            Echhost: 'On3zPHeGPKNn95bKB26ZhA==',
            Mhrdbname: 'egt/yzXRlGH+dexGJKQ7yA==',
            Mhrhost: 'On3zPHeGPKNn95bKB26ZhA==',
            Mhrschemaname: 'jfxKEUeaSF6ew8mrXvUedg==',
            Servarthid: 'REVARPM8102',
          },
        },
      )
      .then((res) => {
        try {
          setTotalSurveyNumber(res.data.form7KhataData[0].pin)
          setTotalKhatedar(res.data.form7KhataDataAug[0].khataNo)
          setAugPin1(res.data.form7KhataDataAug[0].pin)

          //setWasulipatrakhatedar(res.data.form7KhataData[0].netAmount1);
          setWasulipatrakhatedar(res.data.khatedarPatra[0].netAmount1)
          //console.log('data for live khatedar', res);
        } catch (err) {
          console.log(err, 'error in TotalLiveKhatedar')
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const getTargetData = async () => {
    let a = '3y+6bSLaBNfOzEUWW3yXOA=='
    let b = '33gU8iw1FOl/D43LCQ6MhA=='
    const token = localStorage.getItem('token')
    await axios
      .get(
        `${URLS.BaseURL}/restservice/getVillageTarget?cCode=272400110296420000&revenueYear=2022-23`,
        {
          headers: {
            Authorization: 'Bearer ' + token,
            Echdbname: a,
            Echschemaname: b,
            Echhost: 'On3zPHeGPKNn95bKB26ZhA==',
            Mhrdbname: 'egt/yzXRlGH+dexGJKQ7yA==',
            Mhrhost: 'On3zPHeGPKNn95bKB26ZhA==',
            Mhrschemaname: 'jfxKEUeaSF6ew8mrXvUedg==',
            Servarthid: 'REVARPM8102',
          },
        },
      )
      .then((res) => {
        // console.log(res, '-------getTargetData');
        try {
          setTargetData(res.data.talathiDashBoardData[0].annualVillageTarget)
        } catch (err) {
          console.log(err, 'error in block getTargetData')
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const TotalLiveDemandDetails = async () => {
    let a = '3y+6bSLaBNfOzEUWW3yXOA=='
    let b = '33gU8iw1FOl/D43LCQ6MhA=='
    const token = localStorage.getItem('token')
    axios
      .get(
        `${URLS.BaseURL}/restservice/getDashBoardTotalDemandDetails?cCode=272400110296420000&revenueYear=2022-23`,
        {
          headers: {
            Authorization: 'Bearer ' + token,
            Echdbname: a,
            Echschemaname: b,
            Echhost: 'On3zPHeGPKNn95bKB26ZhA==',
            Mhrdbname: 'egt/yzXRlGH+dexGJKQ7yA==',
            Mhrhost: 'On3zPHeGPKNn95bKB26ZhA==',
            Mhrschemaname: 'jfxKEUeaSF6ew8mrXvUedg==',
            Servarthid: 'REVARPM8102',
          },
        },
      )
      .then((res) => {
        //console.info(res.data, '-------data----11----')
        setTotalNetAmount(res.data.landRevenueDemandData[0].netAmount)
        setTotalNetReceived(res.data.landRevenueDemandData[0].netReceived)
        setKhatedarAmountReceived(res.data.landRevenueDemandData[0].khataNo)
        setSankirnWith(res.data.landRevenueDemandData[0].totalOfWithSankirn)
        setSankirnWithOut(res.data.landRevenueDemandData[0].totalOfWithuotSankirn)
        //setDemandGenerated(res.data.landRevenueDemandData[0].demandGeneratedKhataNo);
        setDemandGenerated(res.data.demandGenerated[0].demandGenerated)
        //setSankirnMahsool(parseInt(res.data.landRevenueDemandData[0].sankirnMahsool));
        setSankirnMahsool(
          // parseInt(res.data.sankirnMahsool[0].sankirnMahsool),
          parseInt(res.sankirnMahsool),
        )
        //setJamabandi(res.data.landRevenueDemandData[0].jamabandi_p);
        setJamabandi(res.data.jmp[0].jamabandi_p)
        //setJamabandinew(res.data.jmp[0].jamabandi_p);
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    console.log(roles, 'rolesroles')
    console.log(districtCode, 'districtNamedistrictNamedistrictName')
    TotalLiveKhatedar()
    TotalLiveDemandDetails()
    getTargetData()
  }, [])
  return (
    <>
      <Paper
        elevation={5}
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          paddingBottom: 10,
          paddingTop: 10,
          marginBottom: 10,
        }}
      >
        {/* <Section1 setDropdownVal={setDropdownVal} dropdownVal={dropdownVal} /> */}
        <Section2
          count1A={AugPin1}
          count1B={totalLiveKhatedar}
          count2A={totalKhatedar}
          count2B={totalSurveyNumber}
          count3A={jamabandi}
          count3B={targetData}
        />
        <Section3
          count3A={demandGenerated}
          count3B={Wasulipatrakhatedar}
          count3C={khatedarAmountReceived}
          pieChart1A={demandGenerated ? demandGenerated : 0}
          pieChart1B={AugPin1 - demandGenerated ? AugPin1 - demandGenerated : 0}
          pieChart2A={khatedarAmountReceived ? khatedarAmountReceived : 0}
          pieChart2B={
            Wasulipatrakhatedar - khatedarAmountReceived
              ? Wasulipatrakhatedar - khatedarAmountReceived
              : 0
          }
        />
        <Section4
          count4A={parseInt(totalNetReceived)}
          count4B={parseInt(totalNetReceived - sankirnMahsool)}
          count4C={parseInt(sankirnMahsool)}
        />
      </Paper>
    </>
  )
}

export default Dashboard
