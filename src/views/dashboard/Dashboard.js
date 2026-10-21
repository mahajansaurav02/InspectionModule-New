import React, { useState, useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { CChart } from '@coreui/react-chartjs'
import DescriptionIcon from '@mui/icons-material/Description'
import TrackChangesIcon from '@mui/icons-material/TrackChanges'
import GroupsIcon from '@mui/icons-material/Groups'
import AssessmentIcon from '@mui/icons-material/Assessment'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import URLS from 'src/URLS'
import reqHeaders from 'src/instance/headers'
import api from 'src/instance/axiosConfig'
import './CircleOfficer.css'

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */
const toNumber = (val) => {
  const num = parseInt(val)
  return isNaN(num) ? 0 : num
}

function useQuery() {
  return new URLSearchParams(useLocation().search)
}

const getInspectionVillages = () => {
  try {
    const data = localStorage.getItem('villageList')
    return data ? JSON.parse(data) : []
  } catch (error) {
    console.error('Error parsing villageList from localStorage:', error)
    return []
  }
}

/* ------------------------------------------------------------------ */
/*  Presentational components (design)                                 */
/* ------------------------------------------------------------------ */
const StatCard = ({ label, count, icon, topHeader }) => (
  <div className="co-card co-stat-card">
    {icon && <div className="co-card-icon">{icon}</div>}
    {topHeader && <div className="co-card-top-header">{topHeader}</div>}
    <div className="co-card-label">{label}</div>
    <div className="co-card-count">{toNumber(count)}</div>
  </div>
)

const FilterSelect = ({ label, name, value, options, onChange, disabled = false }) => (
  <div className="co-filter">
    <label className="co-filter-label" htmlFor={`co-${name}`}>
      {label}
    </label>
    <select
      id={`co-${name}`}
      className="co-filter-select"
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
    >
      <option value="">-- निवडा --</option>
      {options?.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
)

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */
const CircleOfficer = () => {
  const query = useQuery()

  // Get villages directly from localStorage (matching Section1 logic)
  const inspectionVillages = getInspectionVillages()

  // Read currently selected village data
  const selectedVillage = localStorage.getItem('selectedVillageData')
  let villageNameData = []
  try {
    const parsedVillageData = selectedVillage ? JSON.parse(selectedVillage) : []
    villageNameData = Array.isArray(parsedVillageData)
      ? parsedVillageData
      : parsedVillageData
        ? [parsedVillageData]
        : []
  } catch (error) {
    console.error('Error parsing selectedVillageData from localStorage:', error)
  }
  const selectedMainVillage = villageNameData?.[0]?.villageCode || ''

  const currentYear = localStorage.getItem('selectedRevenueYear')

  // Extract cCode for the API calls
  let cCode = ''
  if (villageNameData.length > 0) {
    cCode = villageNameData[0]?.cCode || ''
  }

  const [filters, setFilters] = useState({
    district: localStorage.getItem('districtName') || inspectionVillages[0]?.distMarathiName || '',
    taluka: localStorage.getItem('talukaName') || inspectionVillages[0]?.talukaMarathiName || '',
    village: selectedMainVillage,
    revenueYear: currentYear || '2024-25',
  })

  /* ---------------- Handle Filter Changes ---------------- */
  const handleFilterChange = (e) => {
    const { name, value } = e.target

    if (name === 'village') {
      // 1. Find the exact village object from the list based on the selected value
      const selectedVillageData = inspectionVillages?.find((u) => u.villageCode === value)
      
      if (selectedVillageData) {
        console.log(selectedVillageData, 'checkkkk All data')
        
        // 2. Save to localStorage
        localStorage.setItem('selectedVillageData', JSON.stringify([{ ...selectedVillageData }]))
        
        // 3. Reload page to trigger dashboard APIs with new cCode
        window.location.reload()
      }
    } else if (name === 'revenueYear') {
      localStorage.setItem('Ry', value)
      localStorage.setItem('selectedRevenueYear', value)
      window.location.reload()
    } else {
      setFilters((prev) => ({ ...prev, [name]: value }))
    }
  }

  /* ---------------- API state ---------------- */
  const [totalLiveKhatedar, setTotalLiveKhatedar] = useState(0)
  const [totalSurveyNumber, setTotalSurveyNumber] = useState(0)
  const [totalKhatedar, setTotalKhatedar] = useState(0)
  const [AugPin1, setAugPin1] = useState(0)
  const [Wasulipatrakhatedar, setWasulipatrakhatedar] = useState(0)
  const [targetData, setTargetData] = useState(0)

  const [totalNetReceived, setTotalNetReceived] = useState(0)
  const [khatedarAmountReceived, setKhatedarAmountReceived] = useState(0)
  const [sankirnMahsool, setSankirnMahsool] = useState(0)
  const [demandGenerated, setDemandGenerated] = useState(0)
  const [jamabandi, setJamabandi] = useState(0)
  
  // Roles are stored as a plain string, e.g. ROLE_MANDAL_ADHIKARI.
  const userRole = (localStorage.getItem('roles') || '').trim()
  const isCollector = userRole === 'ROLE_COLLECTOR'

  /* ---------------- Auto-Select First Village if None ---------------- */
  useEffect(() => {
    if (inspectionVillages?.length > 0 && !selectedMainVillage) {
      const firstVillage = inspectionVillages[0]
      localStorage.setItem('selectedVillageData', JSON.stringify([firstVillage]))
      window.location.reload()
    }
  }, [inspectionVillages, selectedMainVillage])

  /* ---------------- Dashboard APIs ---------------- */
  const TotalLiveKhatedar = async () => {
    const talukCode = JSON.parse(localStorage.getItem('talukaCode'))
    await api
      .get(
        `${URLS.BaseURL}/restservice/getDashBoardKhataNoDetails?cCode=${cCode}&talukaCode=${talukCode}`,
        {
          headers: {
            Authorization: reqHeaders.Authorization,
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
          setWasulipatrakhatedar(res.data.khatedarPatra[0].netAmount1)
        } catch (err) {
          console.log(err, 'error in TotalLiveKhatedar')
        }
      })
      .catch((err) => console.log(err))
  }

  const getTargetData = async () => {
    const a = '3y+6bSLaBNfOzEUWW3yXOA=='
    const b = '33gU8iw1FOl/D43LCQ6MhA=='
    await api
      .get(
        `${URLS.BaseURL}/restservice/getVillageTarget?cCode=${cCode}&revenueYear=${currentYear}`,
        {
          headers: {
            Authorization: reqHeaders.Authorization,
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
        try {
          setTargetData(res.data.talathiDashBoardData[0].annualVillageTarget)
        } catch (err) {
          console.log(err, 'error in block getTargetData')
        }
      })
      .catch((err) => console.log(err))
  }

  const TotalLiveDemandDetails = async () => {
    const a = '3y+6bSLaBNfOzEUWW3yXOA=='
    const b = '33gU8iw1FOl/D43LCQ6MhA=='
    await api
      .get(
        `${URLS.BaseURL}/restservice/getDashBoardTotalDemandDetails?cCode=${cCode}&revenueYear=${currentYear}`,
        {
          headers: {
            Authorization: reqHeaders.Authorization,
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
        setTotalNetReceived(res.data.landRevenueDemandData[0].netReceived)
        setKhatedarAmountReceived(res.data.landRevenueDemandData[0].khataNo)
        setDemandGenerated(res.data.demandGenerated[0].demandGenerated)
        setSankirnMahsool(parseInt(res.sankirnMahsool))
        setJamabandi(res.data.jmp[0].jamabandi_p)
      })
      .catch((err) => console.log(err))
  }

  const isFetched = useRef(false)
  useEffect(() => {
    const fetchData = async () => {
      if (cCode && currentYear && !isFetched.current) {
        TotalLiveKhatedar()
        TotalLiveDemandDetails()
        getTargetData()
        isFetched.current = true
      }
    }
    fetchData()
  }, [cCode, currentYear])

  /* ---------------- map API state → design data object ---------------- */
  const data = {
    khatedarAug: AugPin1,
    khatedarToday: totalLiveKhatedar,
    satbaraAug: totalKhatedar,
    satbaraToday: totalSurveyNumber,
    jamabandi: jamabandi,
    target: targetData,
    demandGenerated: demandGenerated,
    vasuliPatra: Wasulipatrakhatedar,
    vasuliPurna: khatedarAmountReceived,
    totalReceived: totalNetReceived,
    sankirnMahsool: sankirnMahsool,
  }

  const landRevenue = toNumber(data.totalReceived) - toNumber(data.sankirnMahsool)

  /* ---------------- charts ---------------- */
  const pieOptions = {
    maintainAspectRatio: false,
    plugins: { legend: { position: 'top', labels: { boxWidth: 30, font: { size: 11 } } } },
  }

  const demandPieData = {
    labels: [
      'मागणी निश्चित झालेली खातेदार संख्या % मध्ये',
      'मागणी निश्चित न झालेली खातेदार संख्या % मध्ये',
    ],
    datasets: [
      {
        data: [
          toNumber(data.demandGenerated),
          Math.max(toNumber(data.khatedarAug) - toNumber(data.demandGenerated), 0),
        ],
        backgroundColor: ['#1565c0', '#90caf9'],
        hoverBackgroundColor: ['#0a3d9c', '#64b5f6'],
      },
    ],
  }

  const vasuliPieData = {
    labels: [
      'वसुली पूर्ण झालेली खातेदार संख्या % मध्ये',
      'वसुली पूर्ण न झालेली खातेदार संख्या % मध्ये',
    ],
    datasets: [
      {
        data: [
          toNumber(data.vasuliPurna),
          Math.max(toNumber(data.vasuliPatra) - toNumber(data.vasuliPurna), 0),
        ],
        backgroundColor: ['#1565c0', '#90caf9'],
        hoverBackgroundColor: ['#0a3d9c', '#64b5f6'],
      },
    ],
  }

  /* ---------------- render ---------------- */
  return (
    <div className="co-dashboard">
      <div className="co-body">
        
        {/* FIXED FILTER BAR */}
       <div className="co-filter-bar">
  <h2 className="co-dashboard-headline">डॅशबोर्ड</h2>

  <div className="co-filters-group">
    {/* District: Always disabled */}
    <FilterSelect
      label="जिल्हा"
      name="district"
      value={filters.district}
      options={[
        {
          value: filters.district,
          label: filters.district || 'नागपूर',
        },
      ]}
      onChange={handleFilterChange}
      disabled
    />

    {/* Taluka: Enabled only for Collector */}
    <FilterSelect
      label="तालुका"
      name="taluka"
      value={filters.taluka}
      options={[
        {
          value: filters.taluka,
          label: filters.taluka || 'कुही',
        },
      ]}
      onChange={handleFilterChange}
      disabled={!isCollector}
    />

    {/* Village: Enabled for non-Collector roles */}
    <FilterSelect
      label="गाव"
      name="village"
      value={selectedMainVillage}
      options={inspectionVillages?.map((val) => ({
        value: val.villageCode,
        label: val.villageCode,
      }))}
      onChange={handleFilterChange}
      disabled={isCollector}
    />

    {/* Revenue Year */}
    <FilterSelect
      label="महसूल वर्ष"
      name="revenueYear"
      value={filters.revenueYear}
      options={[
        { value: '2023-24', label: '2023-24' },
        { value: '2024-25', label: '2024-25' },
        { value: '2025-26', label: '2025-26' },
        { value: '2026-27', label: '2026-27' },
      ]}
      onChange={handleFilterChange}
    />
  </div>
</div>

        {/* Row 1 : section titles + stat cards */}
        <div className="co-grid-3">
          <div className="co-group">
            <div className="co-section-title">एकूण खातेदार संख्या</div>
            <div className="co-grid-2">
              <StatCard label="१ ऑगस्ट रोजी" count={data.khatedarAug} icon={<DescriptionIcon />} />
              <StatCard label="आजची संख्या" count={data.khatedarToday} icon={<TrackChangesIcon />} />
            </div>
          </div>

          <div className="co-group">
            <div className="co-section-title">एकूण ७/१२ संख्या</div>
            <div className="co-grid-2">
              <StatCard label="१ ऑगस्ट रोजी" count={data.satbaraAug} icon={<GroupsIcon />} />
              <StatCard label="आजची संख्या" count={data.satbaraToday} icon={<GroupsIcon />} />
            </div>
          </div>

          <div className="co-group">
            <div className="co-section-title">वसुली</div>
            <div className="co-grid-2">
              <StatCard
                label="जमाबंदी प्रमाणे"
                count={data.jamabandi}
                icon={<AssessmentIcon />}
                topHeader="प्रपत्र-अ"
              />
              <StatCard
                label="उद्दिष्ट"
                count={data.target}
                icon={<EmojiEventsIcon />}
                topHeader="प्रपत्र-अ"
              />
            </div>
          </div>
        </div>

        {/* Row 2 : khatedar counts + pie charts */}
        <div className="co-section-panel">
          <div className="co-grid-3">
            <StatCard
              label="मागणी निश्चित केलेले खातेदार संख्या"
              count={data.demandGenerated}
              icon={<DescriptionIcon />}
            />
            <StatCard
              label="वसुली पात्र खातेदार संख्या"
              count={data.vasuliPatra}
              icon={<DescriptionIcon />}
            />
            <StatCard
              label="वसुली पूर्ण खातेदार संख्या"
              count={data.vasuliPurna}
              icon={<DescriptionIcon />}
            />
          </div>

          <div className="co-pie-row">
            <div className="co-card co-pie-card">
              <CChart type="pie" data={demandPieData} options={pieOptions} />
            </div>
            <div className="co-card co-pie-card">
              <CChart type="pie" data={vasuliPieData} options={pieOptions} />
            </div>
          </div>
        </div>

        {/* Row 3 : amount equation */}
        <div className="co-section-panel">
          <div className="co-amount-row">
            <StatCard
              label="वसूल झालेली रक्कम"
              count={data.totalReceived}
              icon={<DescriptionIcon />}
            />
            <div className="co-operator">=</div>
            <StatCard
              label="जमीन व इतर महसूल (संकीर्ण वगळता)"
              count={landRevenue}
              icon={<DescriptionIcon />}
            />
            <div className="co-operator">+</div>
            <StatCard
              label="संकीर्ण महसूल"
              count={data.sankirnMahsool}
              icon={<DescriptionIcon />}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CircleOfficer