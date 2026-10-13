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
  const trend = { labels: [], values: [] } // महसूल वसुलीचा कल
  const recentActivity = [] // अलीकडील हालचाली

  const landRevenue = toNumber(data.totalReceived) - toNumber(data.sankirnMahsool)
  const pending = Math.max(toNumber(data.vasuliPatra) - toNumber(data.vasuliPurna), 0)
  const progress =
    toNumber(data.target) > 0
      ? Math.min(Math.round((toNumber(data.totalReceived) / toNumber(data.target)) * 100), 100)
      : 0

  const trendLabels = trend.labels.length ? trend.labels : Array(7).fill('१ ऑगस्ट')
  const trendValues = trend.values.length ? trend.values : Array(7).fill(0)

  const lineChartData = {
    labels: trendLabels,
    datasets: [
      {
        label: 'वसुली',
        data: trendValues,
        borderColor: '#14a098',
        backgroundColor: 'rgba(20, 160, 152, 0.15)',
        fill: true,
        tension: 0.3,
      },
    ],
  }

  const doughnutData = {
    labels: ['पूर्ण', 'प्रलंबित'],
    datasets: [
      {
        data:
          toNumber(data.vasuliPurna) + pending > 0 ? [toNumber(data.vasuliPurna), pending] : [1, 0],
        backgroundColor: ['#bcdcf7', '#d4a017'],
        borderWidth: 0,
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

        {/* Row 2 : khatedar counts */}
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

        {/* Row 3 : charts */}
        <div className="co-chart-row">
          <div className="co-card co-panel">
            <div className="co-panel-header">
              <span>महसूल वसुलीचा कल</span>
              <span className="co-dot co-dot-teal" />
            </div>
            <div className="co-line-chart">
              <CChart
                type="line"
                data={lineChartData}
                options={{
                  maintainAspectRatio: false,
                  plugins: { legend: { display: false } },
                  scales: { y: { beginAtZero: true } },
                }}
              />
            </div>
          </div>

          <div className="co-card co-panel">
            <div className="co-panel-header">
              <span>वसुली स्थिती</span>
            </div>
            <div className="co-doughnut-wrap">
              <CChart
                type="doughnut"
                data={doughnutData}
                options={{
                  maintainAspectRatio: false,
                  cutout: '70%',
                  plugins: { legend: { display: false }, tooltip: { enabled: pending > 0 } },
                }}
              />
              <div className="co-doughnut-center">{toNumber(data.vasuliPurna)}</div>
            </div>
            <div className="co-legend">
              <span>
                <i className="co-legend-box" style={{ background: '#bcdcf7' }} /> पूर्ण
              </span>
              <span>
                <i className="co-legend-box" style={{ background: '#d4a017' }} /> प्रलंबित
              </span>
            </div>
          </div>

          <div className="co-side-col">
            <div className="co-card co-panel">
              <div className="co-panel-header">
                <span>वसुली प्रगती</span>
                <span className="co-dot co-dot-gold" />
              </div>
              <div className="co-progress-value">{progress}%</div>
              <div className="co-progress-track">
                <div className="co-progress-fill" style={{ width: `${progress}%` }} />
              </div>
            </div>

            <div className="co-card co-panel co-panel-grow">
              <div className="co-panel-header">
                <span>अलीकडील हालचाली</span>
                <span className="co-dot co-dot-gold" />
              </div>
              {recentActivity.length === 0 ? (
                <div className="co-empty">अद्याप कोणतीही हालचाल नाही</div>
              ) : (
                <ul className="co-activity-list">
                  {recentActivity.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>

        {/* Row 4 : amount equation */}
        <div className="co-amount-row">
          <div className="co-card co-amount-card">
            <span className="co-dot co-dot-teal co-dot-corner" />
            <div className="co-card-label">वसूल झालेली रक्कम</div>
            <div className="co-card-count">{toNumber(data.totalReceived)}</div>
          </div>
          <div className="co-operator">=</div>
          <div className="co-card co-amount-card">
            <span className="co-dot co-dot-gold co-dot-corner" />
            <div className="co-card-label">जमीन व इतर महसूल (संकीर्ण वगळता)</div>
            <div className="co-card-count">{landRevenue}</div>
          </div>
          <div className="co-operator">+</div>
          <div className="co-card co-amount-card">
            <span className="co-dot co-dot-gold co-dot-corner" />
            <div className="co-card-label">संकीर्ण महसूल</div>
            <div className="co-card-count">{toNumber(data.sankirnMahsool)}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CircleOfficer
