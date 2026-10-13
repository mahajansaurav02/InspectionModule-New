import React, { useState } from 'react'
import { CChart } from '@coreui/react-chartjs'
import DescriptionIcon from '@mui/icons-material/Description'
import TrackChangesIcon from '@mui/icons-material/TrackChanges'
import GroupsIcon from '@mui/icons-material/Groups'
import AssessmentIcon from '@mui/icons-material/Assessment'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import './CircleOfficer.css'

const toNumber = (val) => {
  const num = parseInt(val)
  return isNaN(num) ? 0 : num
}

const StatCard = ({ label, count, icon, topHeader }) => (
  <div className="co-card co-stat-card">
    {icon && <div className="co-card-icon">{icon}</div>}
    {topHeader && <div className="co-card-top-header">{topHeader}</div>}
    <div className="co-card-label">{label}</div>
    <div className="co-card-count">{toNumber(count)}</div>
  </div>
)

const FilterSelect = ({ label, name, value, options, onChange }) => (
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
    >
      <option value="">-- निवडा --</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
)

// Sample dropdown options for UI only
const filterOptions = {
  district: [{ value: '1', label: 'नागपूर' }],
  taluka: [{ value: '1', label: 'कुही' }],
  village: [{ value: '1', label: 'भोजापुर' }],
  saja: [{ value: '1', label: 'त.सा.क्र. 6' }],
  revenueYear: [
    { value: '2024-25', label: '2024-25' },
    { value: '2025-26', label: '2025-26' },
    { value: '2026-27', label: '2026-27' },
  ],
}

const CircleOfficer = () => {
  const [filters, setFilters] = useState({
    district: '',
    taluka: '',
    village: '',
    saja: '',
    revenueYear: '',
  })

  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilters((prev) => ({ ...prev, [name]: value }))
  }

  // Static UI values for now
  const data = {
    khatedarAug: 0, // एकूण खातेदार संख्या - १ ऑगस्ट रोजी
    khatedarToday: 0, // एकूण खातेदार संख्या - आजची संख्या
    satbaraAug: 0, // एकूण ७/१२ संख्या - १ ऑगस्ट रोजी
    satbaraToday: 0, // एकूण ७/१२ संख्या - आजची संख्या
    jamabandi: 0, // प्रपत्र-अ जमाबंदी प्रमाणे
    target: 0, // प्रपत्र-अ उद्दिष्ट
    demandGenerated: 0, // मागणी निश्चित केलेले खातेदार संख्या
    vasuliPatra: 0, // वसुली पात्र खातेदार संख्या
    vasuliPurna: 0, // वसुली पूर्ण खातेदार संख्या
    totalReceived: 0, // वसूल झालेली रक्कम
    sankirnMahsool: 0, // संकीर्ण महसूल
  }

  const landRevenue = toNumber(data.totalReceived) - toNumber(data.sankirnMahsool)

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

  return (
    <div className="co-dashboard">
      <div className="co-body">
        {/* Filters */}
        <div className="co-filter-bar">
          <FilterSelect
            label="जिल्हा"
            name="district"
            value={filters.district}
            options={filterOptions.district}
            onChange={handleFilterChange}
          />
          <FilterSelect
            label="तालुका"
            name="taluka"
            value={filters.taluka}
            options={filterOptions.taluka}
            onChange={handleFilterChange}
          />
          <FilterSelect
            label="गाव"
            name="village"
            value={filters.village}
            options={filterOptions.village}
            onChange={handleFilterChange}
          />
          <FilterSelect
            label="साजा"
            name="saja"
            value={filters.saja}
            options={filterOptions.saja}
            onChange={handleFilterChange}
          />
          <FilterSelect
            label="महसूल वर्ष"
            name="revenueYear"
            value={filters.revenueYear}
            options={filterOptions.revenueYear}
            onChange={handleFilterChange}
          />
        </div>

        {/* Row 1 : section titles + stat cards */}
        <div className="co-grid-3">
          <div className="co-group">
            <div className="co-section-title">एकूण खातेदार संख्या</div>
            <div className="co-grid-2">
              <StatCard label="१ ऑगस्ट रोजी" count={data.khatedarAug} icon={<DescriptionIcon />} />
              <StatCard
                label="आजची संख्या"
                count={data.khatedarToday}
                icon={<TrackChangesIcon />}
              />
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
