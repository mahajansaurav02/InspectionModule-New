import React, { useState, useRef, useEffect } from 'react'
import { Tabs, Tab } from 'react-bootstrap'
import { Card, Button, Spinner } from 'react-bootstrap'
import { DownloadTableExcel } from 'react-export-table-to-excel'
import styles from './DyslrAkarbandTapasani.module.css'
import LoadingSpinner from 'src/Models/LoadingSpinner'
import { CAlert } from '@coreui/react'
import axios from 'axios'
import URLS from 'src/URLS'
import reqHeaders from 'src/instance/headers'
import VillageDetailsList from 'src/views/dashboard/ReusableComponents/VillageDetailsList'

// Add the new functions from the second code snippet
var prevTotalArea = 0.0,
  prevAssessment = 0,
  prevNetCultiArea = 0,
  prevTotalPotKharabArea = 0

function getTotalAreaAssess(totalAreaH, cultivableAreaInt, netCultiAreaH, assessment) {
  prevTotalArea += parseFloat(totalAreaH)
  prevTotalPotKharabArea += parseFloat(cultivableAreaInt)
  prevNetCultiArea += parseFloat(netCultiAreaH)
  prevAssessment += parseFloat(assessment)
}

const DyslrAkarbandTapasani = () => {
  const [activeTab, setActiveTab] = useState('akarband')
  const [loading, setLoading] = useState(false)
  const [loadingRejected, setLoadingRejected] = useState(false)
  const [tableData, setTableData] = useState([])
  const [rejectedTableData, setRejectedTableData] = useState([])
  const tableRef = useRef(null)
  const rejectedTableRef = useRef(null)
  const firstRemarkRef = useRef(null)
  const secondRemarkRef = useRef(null)
  const token = localStorage.getItem('token')
  // const [districtCode, setDistrictCode] = useState('24'); // Replace with actual state management
  // const [talukaCode, setTalukaCode] = useState('11'); // Replace with actual state management
  const [villageCode, setVillageCode] = useState('270900130113130000') // Replace with actual state management

  const [firstRemark, setFirstRemark] = useState('')
  const [firstRemarkSubmitting, setFirstRemarkSubmitting] = useState(false)
  
  const [secondRemark, setSecondRemark] = useState('')
  const [secondRemarkSubmitting, setSecondRemarkSubmitting] = useState(false)

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

  // Function to scroll to remark section
  const scrollToRemark = (tab) => {
    setActiveTab(tab)
    
    // Small delay to ensure tab content is rendered
    setTimeout(() => {
      if (tab === 'akarband' && firstRemarkRef.current) {
        firstRemarkRef.current.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' 
        })
      } else if (tab === 'akarbandRejected' && secondRemarkRef.current) {
        secondRemarkRef.current.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' 
        })
      }
    }, 100)
  }

  const handleFirstRemarkSubmit = () => {
    if (!firstRemark.trim()) {
      alert('कृपया शेरा भरा')
      return
    }

    setFirstRemarkSubmitting(true)

    // 🔹 API call for first tab remark
    setTimeout(() => {
      console.log('Submitted First Remark:', firstRemark)
      setFirstRemarkSubmitting(false)
      setFirstRemark('')
      // Here you can add API call to save the remark
    }, 1000)
  }

  const handleFirstRemarkClear = () => {
    setFirstRemark('')
  }

  const handleSecondRemarkSubmit = () => {
    if (!secondRemark.trim()) {
      alert('कृपया शेरा भरा')
      return
    }

    setSecondRemarkSubmitting(true)

    // 🔹 API call for second tab remark
    setTimeout(() => {
      console.log('Submitted Second Remark:', secondRemark)
      setSecondRemarkSubmitting(false)
      setSecondRemark('')
      // Here you can add API call to save the remark
    }, 1000)
  }

  const handleSecondRemarkClear = () => {
    setSecondRemark('')
  }

  const getAkarbandDiffData = async () => {
    setLoading(true)
    try {
      // reqHeaders.token=''
      if (!cCode) {
        alert('Village code not found....Please Select Village First')
        return
      }
      const response = await axios.get(
        `${URLS.BaseURL}/inpsection/form1OdcDiff?districtCode=${districtCode}&talukaCode=${talukaCode}&cCode=${cCode}`,
        {
          headers: reqHeaders,
        },
      )

      if (response.data) {
        const filteredData = response.data.filter((r) => {
          return (
            r.form1Totalarea !== r.form7Totalarea ||
            r.form1PotKharaba !== r.form7PotKharaba ||
            r.form1PotType !== r.form7PotType ||
            r.form1NetCultiArea !== r.form7NetCultiArea ||
            r.form1Assessment !== r.form7Assessment ||
            r.form1TenureCode !== r.form7TenureCode
          )
        })

        const mappedData = filteredData.map((r) => ({
          surveyNumber: r.pin,
          totalAreaFlag:
            r.form1Totalarea === r.form7Totalarea ? (
              <span style={{ color: 'green' }}>नाही</span>
            ) : (
              <span style={{ color: 'red' }}>
                होय{' '}
                <button
                  type="button"
                  style={{
                    border: '1px solid #8C92AC',
                    marginLeft: '5px',
                    height: '32px',
                    padding: '4px 15px',
                    backgroundColor: '#FFFFFF',
                    color: '#2E3138',
                    borderRadius: '3px',
                  }}
                >
                  <span>{r.form1Totalarea}</span>
                </button>
                <button
                  type="button"
                  style={{
                    border: '1px solid #FF8F00',
                    marginLeft: '5px',
                    height: '32px',
                    width: '80px',
                    padding: '4px 15px',
                    backgroundColor: '#FFFFFF',
                    color: '#2E3138',
                    borderRadius: '3px',
                  }}
                >
                  <span>{r.form7Totalarea} </span>
                </button>
              </span>
            ),
          potKharabaFlag:
            r.form1PotKharaba === r.form7PotKharaba ? (
              <span style={{ color: 'green' }}>नाही</span>
            ) : (
              <span style={{ color: 'red' }}>
                होय
                <button
                  type="button"
                  style={{
                    border: '1px solid #8C92AC',
                    marginLeft: '5px',
                    height: '32px',
                    padding: '4px 15px',
                    backgroundColor: '#FFFFFF',
                    color: '#2E3138',
                    borderRadius: '3px',
                  }}
                >
                  <span>{r.form1PotKharaba}</span>
                </button>
                <button
                  type="button"
                  style={{
                    border: '1px solid #FF8F00',
                    marginLeft: '5px',
                    height: '32px',
                    width: '80px',
                    padding: '4px 15px',
                    backgroundColor: '#FFFFFF',
                    color: '#2E3138',
                    borderRadius: '3px',
                  }}
                >
                  <span>{r.form7PotKharaba} </span>
                </button>
              </span>
            ),
          potKharabaTypeFlag:
            r.form1PotType === r.form7PotType ? (
              <span style={{ color: 'green' }}>नाही</span>
            ) : (
              <span style={{ color: 'red' }}>होय</span>
            ),
          netCultiAreaFlag:
            r.form1NetCultiArea === r.form7NetCultiArea ? (
              <span style={{ color: 'green' }}>नाही</span>
            ) : (
              <span style={{ color: 'red' }}>
                होय
                <button
                  type="button"
                  style={{
                    border: '1px solid #8C92AC',
                    height: '32px',
                    marginLeft: '5px',
                    padding: '4px 15px',
                    backgroundColor: '#FFFFFF',
                    color: '#CC0000',
                    borderRadius: '3px',
                  }}
                >
                  <span>{r.form1NetCultiArea}</span>
                </button>
                <button
                  type="button"
                  style={{
                    border: '1px solid #FF8F00',
                    marginLeft: '5px',
                    height: '32px',
                    width: '80px',
                    padding: '4px 15px',
                    backgroundColor: '#FFFFFF',
                    color: '#2E3138',
                    borderRadius: '3px',
                  }}
                >
                  <span>{r.form7NetCultiArea} </span>
                </button>
              </span>
            ),
          assessmentFlag:
            r.form1Assessment === r.form7Assessment ? (
              <span style={{ color: 'green' }}>नाही</span>
            ) : (
              <span style={{ color: 'red' }}>
                होय
                <button
                  type="button"
                  style={{
                    border: '1px solid #8C92AC',
                    marginLeft: '5px',
                    height: '32px',
                    padding: '4px 15px',
                    backgroundColor: '#FFFFFF',
                    color: '#2E3138',
                    borderRadius: '3px',
                  }}
                >
                  <span>{r.form1Assessment}</span>
                </button>
                <button
                  type="button"
                  style={{
                    border: '1px solid #FF8F00',
                    marginLeft: '5px',
                    height: '32px',
                    width: '80px',
                    padding: '4px 15px',
                    backgroundColor: '#FFFFFF',
                    color: '#2E3138',
                    borderRadius: '3px',
                  }}
                >
                  <span>{r.form7Assessment} </span>
                </button>
              </span>
            ),
          tenureCodeFlag:
            r.form1TenureCode === r.form7TenureCode ? (
              <span style={{ color: 'green' }}>नाही</span>
            ) : (
              <span style={{ color: 'red' }}>
                होय
                <button
                  type="button"
                  style={{
                    border: '1px solid #8C92AC',
                    marginLeft: '5px',
                    height: '32px',
                    width: '50px',
                    padding: '4px 15px',
                    backgroundColor: '#FFFFFF',
                    color: '#2E3138',
                    borderRadius: '3px',
                  }}
                >
                  <span>{r.form1TenureCode}</span>
                </button>
                <button
                  type="button"
                  style={{
                    border: '1px solid #FF8F00',
                    marginLeft: '5px',
                    height: '32px',
                    width: '50px',
                    padding: '4px 15px',
                    backgroundColor: '#FFFFFF',
                    color: '#2E3138',
                    borderRadius: '3px',
                  }}
                >
                  <span>{r.form7TenureCode} </span>
                </button>
              </span>
            ),
        }))
        setTableData(mappedData)
      }
    } catch (error) {
      console.error('Error fetching data:', error)
      setTableData([])
    } finally {
      setLoading(false)
    }
  }

  const getAkarbandRejectedData = async () => {
    // Corrected to use separate assignment statements
    prevTotalArea = 0
    prevAssessment = 0
    prevNetCultiArea = 0
    prevTotalPotKharabArea = 0

    setLoadingRejected(true)
    try {
      const response = await axios.get(
        `${URLS.BaseURL}/inpsection/getFormDyslrDeleteEntries?cCode=${cCode}
`,
        {
          headers: reqHeaders,
        },
      )
      if (response.data && response.data.form1DyslrData) {
        const mappedData = response.data.form1DyslrData.map((r) => {
          getTotalAreaAssess(r.totalAreaH, r.cultivableAreaInt, r.netCultiAreaH, r.assessment)
          return {
            surveyHissaNo:
              r.hissaNo == null || r.hissaNo.trim() == '' ? r.pin : r.pin + '/' + r.hissaNo,
            designation: r.designation,
            totalAreaH: r.totalAreaH,
            tenureName: r.tenureName,
            potkharabaType: r.potkharabaType,
            cultivableAreaInt: r.cultivableAreaInt,
            netCultiAreaH: r.netCultiAreaH,
            naAssessment:
              r.naAssessment != null || r.naAssessment > 0 ? r.naAssessment : r.assessment,
            assessment: r.assessment,
            publicRightsOfWayAndEasements: r.publicRightsOfWayAndEasements,
            particularsOfAlteration: r.particularsOfAlteration,
            orderSanctioningChanges: r.orderNo,
            orderDate: r.orderDate,
            remarks: r.remarks,
          }
        })
        setRejectedTableData(mappedData)
      }
    } catch (error) {
      console.error('Error fetching rejected data:', error)
      setRejectedTableData([])
    } finally {
      setLoadingRejected(false)
    }
  }

  return (
    <div className={styles.wrapper}>
      <h4 className="text-center fw-bold mb-4 text-primary">
        उप-अधीक्षक, भूमिअभिलेख आकारबंद तपशील
      </h4>
      <VillageDetailsList />

      <Tabs
        activeKey={activeTab}
        onSelect={(k) => setActiveTab(k)}
        className="mb-3 justify-content-center fw-semibold"
        variant="pills"
      >
        <Tab 
          eventKey="akarband" 
          title={
            <div className="d-flex align-items-center">
              <span>गाव नमुना एक ( दुरुस्तीसाठी पडताळणी तक्ता )</span>
              <Button 
                variant="link" 
                size="sm" 
                className="ms-2 p-0 text-decoration-none"
                onClick={(e) => {
                  e.stopPropagation();
                  scrollToRemark('akarband');
                }}
                title="शेरा साठी जा"
              >
                📝
              </Button>
            </div>
          }
        >
          <div className={styles.tabContent}>
            <CAlert color="info" className="modern-alert">
              <strong>टीप:</strong>
              <ul className="mt-2 mb-0 text-start">
                <li>उप-अधीक्षक, भूमिअभिलेख यांनी हस्तलिखित नुसार आकारबंद भरलेला आहे.</li>
                <li>
                  सदर विसंगतीचे तपशीलवार निरीक्षण करत, त्या भूमापन क्रमांकांची यादी तपासणीसाठी
                  उपलब्ध करून देण्यात आलेली आहे.
                </li>
                <li>
                  ग्राम महसूल अधिकारी यांच्या आकारबंदमधील असलेले काही भूमापन क्रमांक, उप-अधीक्षक
                  भूमिअभिलेख यांच्या आकारबंदात नमूद नाहीत.ते तपासून खात्री करा.
                </li>
              </ul>
              <Button 
                variant="primary" 
                size="sm" 
                style={{margin: '10px'}}
                className="ms-2 p-0 text-decoration-none"
                onClick={(e) => {
                  e.stopPropagation();
                  scrollToRemark('akarband');
                }}
                title="शेरा साठी जा"
              >
                अभिप्राय नोंदवा 📝
              </Button>
            </CAlert>

            <div className={styles.controls}>
              <Button
                onClick={getAkarbandDiffData}
                disabled={loading}
                className={styles.customButton}
              >
                {loading ? <Spinner size="sm" /> : 'माहिती मिळवा'}
              </Button>
            </div>

            {loading ? (
              <div className="loading-state">
                <LoadingSpinner message="Loading...." />
              </div>
            ) : tableData.length > 0 ? (
              <Card className={styles.reportCard}>
                <div className={styles.exportControls}>
                  <DownloadTableExcel
                    filename="akarband-report"
                    sheet="akarband"
                    currentTableRef={tableRef.current}
                  >
                    <Button variant="success" className={styles.downloadButton}>
                      Download as XLS
                    </Button>
                  </DownloadTableExcel>
                </div>

                <div className={styles.tableContainer}>
                  <table ref={tableRef} className={styles.report_table}>
                    <thead>
                      <tr style={{ backgroundColor: 'white', border: '1px solid black' }}>
                        <th colSpan="7" style={{ backgroundColor: '#add8e6', width: '100%' }}>
                          <h3 style={{ color: 'red' }}>
                            <b>गाव नमुना एक( दुरुस्तीसाठी पडताळणी तक्ता )</b>
                          </h3>
                        </th>
                      </tr>

                      <tr style={{ backgroundColor: '#add8e6', border: '1px solid black' }}>
                        <th rowSpan="2">
                          <span style={{ whiteSpace: 'nowrap' }}>भूमापन क्रमांक</span>
                        </th>
                        <th rowSpan="2">
                          <span style={{ whiteSpace: 'nowrap' }}>धारणा प्रकार </span>
                          <span style={{ color: '#8C92AC' }}>(ODC फरक)</span>{' '}
                          <span style={{ color: '#FF8F00' }}>(Live फरक)</span>
                        </th>
                        <th rowSpan="2">
                          <span style={{ whiteSpace: 'nowrap' }}>एकूण क्षेत्र</span>
                          <span style={{ color: '#8C92AC' }}>(ODC फरक)</span>{' '}
                          <span style={{ color: '#FF8F00' }}>(Live फरक)</span>
                        </th>
                        <th rowSpan="2">
                          <span style={{ whiteSpace: 'nowrap' }}>पोट खराब क्षेत्रातील फरक</span>
                        </th>
                        <th rowSpan="2">
                          <span style={{ whiteSpace: 'nowrap' }}>पोट खराब क्षेत्र</span>
                          <span style={{ color: '#8C92AC' }}>(ODC फरक)</span>{' '}
                          <span style={{ color: '#FF8F00' }}>(Live फरक)</span>
                        </th>
                        <th rowSpan="2">
                          <span style={{ whiteSpace: 'nowrap' }}>निव्वळ लागवड योग्य क्षेत्र</span>
                          <span style={{ color: '#8C92AC' }}>(ODC फरक)</span>{' '}
                          <span style={{ color: '#FF8F00' }}>(Live फरक)</span>
                        </th>
                        <th rowSpan="2">
                          <span style={{ whiteSpace: 'nowrap' }}>कृषिक आकारणीतील फरक</span>
                          <span style={{ color: '#8C92AC' }}>(ODC फरक)</span>{' '}
                          <span style={{ color: '#FF8F00' }}>(Live फरक)</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {tableData.map((r, index) => (
                        <tr key={index}>
                          <td>{r.surveyNumber}</td>
                          <td>{r.tenureCodeFlag}</td>
                          <td>{r.totalAreaFlag}</td>
                          <td>{r.potKharabaTypeFlag}</td>
                          <td>{r.potKharabaFlag}</td>
                          <td>{r.netCultiAreaFlag}</td>
                          <td>{r.assessmentFlag}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            ) : (
              <p className={styles.noData}>No records found</p>
            )}

            {/* 🔹 First Tab Shera Section */}
            <div ref={firstRemarkRef}>
              <Card className={styles.remarkCard}>
                <h6 className={styles.remarkTitle}>शेरा / अभिप्राय </h6>

                <textarea
                  className={styles.remarkInput}
                  rows={3}
                  placeholder="गाव नमुना एक ( दुरुस्तीसाठी पडताळणी तक्ता ) यासंबंधीचा शेरा येथे लिहा..."
                  value={firstRemark}
                  onChange={(e) => setFirstRemark(e.target.value)}
                />

                <div className={styles.remarkActions}>
                  <Button
                    variant="success"
                    size="sm"
                    disabled={firstRemarkSubmitting}
                    onClick={handleFirstRemarkSubmit}
                  >
                    {firstRemarkSubmitting ? 'जतन होत आहे...' : 'अभिप्राय जतन करा'}
                  </Button>

                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={handleFirstRemarkClear}
                  >
                    साफ करा 
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </Tab>

        <Tab
          eventKey="akarbandRejected"
          title={
            <div className="d-flex align-items-center">
              <span>गाव नमुना एक Dyslr(आकारबंद) वगळण्यात आलेले भूमापन क्रमांक</span>
              <Button 
                variant="link" 
                size="sm" 
                className="ms-2 p-0 text-decoration-none"
                onClick={(e) => {
                  e.stopPropagation();
                  scrollToRemark('akarbandRejected');
                }}
                title="शेरा साठी जा"
              >
                📝
              </Button>
            </div>
          }
        >
          <div className={styles.tabContent}>
            <CAlert color="info" className="modern-alert">
              <strong>टीप:</strong>
              <ul className="mt-2 mb-0 text-start">
                <li>
                  उप-अधीक्षक, भूमिअभिलेख यांनी हस्तलिखित नुसार आकारबंद मध्ये ग्राम महसूल अधिकारी
                  यांच्या कडील आकारबंद live नुसार उपलब्ध नसलेले भूमापन क्रमांक कमी करण्यात आले आहे.
                  त्याचा अहवाल उपलब्ध करून देण्यात आला आहे.
                </li>
              </ul>

               <Button 
                variant="primary" 
                size="sm" 
                style={{margin: '10px',padding:'5px'}}
                className="ms-2 p-0 text-decoration-none"
                onClick={(e) => {
                  e.stopPropagation();
                  scrollToRemark('akarbandRejected');
                }}
                title="शेरा साठी जा"
              >
                अभिप्राय नोंदवा 📝
              </Button>
            </CAlert>
            <div className={styles.controls}>
              <Button
                onClick={getAkarbandRejectedData}
                disabled={loadingRejected}
                variant="primary"
                className={styles.customButton}
              >
                {loadingRejected ? <Spinner size="sm" /> : 'माहिती मिळवा'}
              </Button>
            </div>
            {loadingRejected ? (
              <div className="loading-state">
                <LoadingSpinner message="Loading...." />
              </div>
            ) : rejectedTableData.length > 0 ? (
              <Card className={styles.reportCard}>
                <div className={styles.exportControls}>
                  <DownloadTableExcel
                    filename="rejected-report"
                    sheet="rejected"
                    currentTableRef={rejectedTableRef.current}
                  >
                    <Button variant="success" className={styles.downloadButton}>
                      Download as XLS
                    </Button>
                    
                  </DownloadTableExcel>
                </div>
                <div className={styles.tableContainer}>
                  <table ref={rejectedTableRef} className={styles.report_table}>
                    <thead>
                      <tr style={{ backgroundColor: '#add8e6', border: '1px solid black' }}>
                        <th colSpan="13" style={{ backgroundColor: '#add8e6', width: '100%' }}>
                          <h3 style={{ color: 'red' }}>
                            <b>गाव नमुना एक Dyslr(आकारबंद) वगळण्यात आलेले भूमापन क्रमांक</b>
                          </h3>
                        </th>
                      </tr>
                      <tr style={{ backgroundColor: '#add8e6', border: '1px solid black' }}>
                        <th>भूमापन क्रमांक</th>
                        <th>नामनिर्देशन</th>
                        <th>एकूण क्षेत्र</th>
                        <th>धारण जमिनीचा प्रकार</th>
                        <th>पोट खराब क्षेत्र</th>
                        <th>निव्वळ लागवड योग्य क्षेत्र</th>
                        <th>कृषिक आकारणी</th>
                        <th>अकृषिक आकारणी</th>
                        <th>सार्वजनिक रस्ता</th>
                        <th>बदलाची नोंद</th>
                        <th>फेरफार क्रमांक</th>
                        <th>फेरफार दिनांक</th>
                        <th>शेरा</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rejectedTableData.map((r, index) => (
                        <tr key={index}>
                          <td>{r.surveyHissaNo}</td>
                          <td>{r.designation}</td>
                          <td>{r.totalAreaH}</td>
                          <td>{r.tenureName}</td>
                          <td>
                            {r.cultivableAreaInt} ({r.potkharabaType})
                          </td>
                          <td>{r.netCultiAreaH}</td>
                          <td>{r.assessment}</td>
                          <td>{r.naAssessment}</td>
                          <td>{r.publicRightsOfWayAndEasements}</td>
                          <td>{r.particularsOfAlteration}</td>
                          <td>{r.orderSanctioningChanges}</td>
                          <td>{r.orderDate}</td>
                          <td>{r.remarks}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            ) : (
              <p className={styles.noData}>No records found</p>
            )}

            {/* 🔹 Second Tab Shera Section */}
            <div ref={secondRemarkRef}>
              <Card className={styles.remarkCard}>
                <h6 className={styles.remarkTitle}>शेरा / अभिप्राय </h6>

                <textarea
                  className={styles.remarkInput}
                  rows={3}
                  placeholder="गाव नमुना एक Dyslr(आकारबंद) वगळण्यात आलेले भूमापन क्रमांक यासंबंधीचा शेरा येथे लिहा..."
                  value={secondRemark}
                  onChange={(e) => setSecondRemark(e.target.value)}
                />

                <div className={styles.remarkActions}>
                  <Button
                    variant="success"
                    size="sm"
                    disabled={secondRemarkSubmitting}
                    onClick={handleSecondRemarkSubmit}
                  >
                    {secondRemarkSubmitting ? 'जतन होत आहे...' : 'अभिप्राय जतन करा'}
                  </Button>

                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={handleSecondRemarkClear}
                  >
                    साफ करा 
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </Tab>
      </Tabs>
    </div>
  )
}

export default DyslrAkarbandTapasani