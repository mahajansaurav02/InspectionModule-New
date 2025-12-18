import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { CSpinner } from '@coreui/react'
import { CIcon } from '@coreui/icons-react'
import { cilCheckAlt, cilX } from '@coreui/icons'

import URLS from 'src/URLS'
import LoadingSpinner from 'src/Models/LoadingSpinner'

import './NirankGavNamunaTapa.css'
import { Card } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import VillageDetailsList from 'src/views/dashboard/ReusableComponents/VillageDetailsList'
import getReqHeaders from 'src/instance/getHeader'
import api from 'src/api/api'
import FerfarNavbar from '../../ferfarNondvahi/ferfarSections/FerfarNavbar'

const villageData = JSON.parse(localStorage.getItem('villageData'))

export const NirankGavNamunaTapa = () => {
  const [villageForms, setVillageForms] = useState([])
  const [loading, setLoading] = useState(false)
  const [tableData, setTableData] = useState([])
  const [kajapaData, setKajapaData] = useState([])
  const [addLandRevenueData, setAddLandRevenueData] = useState([])
  const [otherTableData, setOtherTableData] = useState([])
  const [selectedForm, setSelectedForm] = useState(null)
  const [remark, setRemark] = useState('') // New state for remark
  const apiCalled = useRef(false)
  const navigate = useNavigate()
  let VillageData = localStorage.getItem('selectedVillageData')

  let selectedVillageData = JSON.parse(VillageData)
  const { user, roles, token } = useSelector((state) => state.auth || {})
  const [reqHeaders, setReqHeaders] = useState({})

  let {
    cCode,
    distMarathiName,
    districtCode,
    lgdCode,
    talukaCode,
    talukaMarathiName,
    villageName,
  } = selectedVillageData[0]
  const getVillageForms = async () => {

    try {

      const response = await api.get(`/restservice/getAllVillageForm`)


      setVillageForms(
        response.data.villageFormMaster.map((vfm, i) => ({
          ...vfm,
          formName: vfm.formNameMr,
          isNirank: false,
          isCompleted: false,
          index: i,
        })),
      )
    } catch (error) {
      console.error('Error fetching village forms:', error)
      setVillageForms([])
    }
  }

  const getNirankandCompleted = async () => {
    setLoading(true)
    try {
      if (!cCode) {
        console.error('Village code not found')
        return
      }


      const response = await api.get(`/restservice/getNirankandCompleted?cCode=${cCode}&revenueYear=2025-26`)

      if (response.data) {
        const dataa = response.data.nirank.map((row, index) => ({
          srNo: index + 1,
          id: row.id,
          formId: row.formId,
          isCompleted: row.isCompleted,
          isNirank: row.isNirank,
        }))
        setTableData(dataa)
      }
    } catch (error) {
      console.error('Error fetching nirank data:', error)
      setTableData([])
    } finally {
      setLoading(false)
    }
  }

  const getKajapadata = async () => {
    setLoading(true)
    try {
      if (!cCode) {
        console.error('Village code not found')
        return
      }

      const response = await api.get(`/form17NoKaJaPa/getReportForm17NoKaJaPa?cCode=${cCode}`)

      if (response.data) {
        setKajapaData(
          response.data.form17NoKaJaPaData.map((row, index) => ({
            srNo: index + 1,
            id: row.khataNo,
            khataNo: row.khataNo,
            surveyHissaNo: row.surveyHissaNo,
            totalArea: row.totalArea,
            uomOfTotalArea: row.uomOfTotalArea,
            assessment: row.assessment,
            personLiable: row.personLiable,
            orderNo: row.orderNo,
            areaAffected: row.areaAffected,
            amountOfJm: row.amountOfJm,
            amountOfZp: row.amountOfZp,
            amountOfGp: row.amountOfGp,
            prayojanType: row.prayojanType,
            locationOfLand: row.locationOfLand,
          })),
        )
      }
    } catch (error) {
      console.error('Error fetching kajapa data:', error)
      setKajapaData([])
    } finally {
      setLoading(false)
    }
  }

  const getAddlrData = async () => {
    setLoading(true)
    try {
      if (!cCode) {
        console.error('Village code not found')
        return
      }

      const response = await api.get(`/additionalLandRevenue/ReportGetAdditionalLandRevenue?cCode=${cCode}&revenueYear=${'2025-26'}`)

      if (response.data) {
        setAddLandRevenueData(
          response.data.additionalLandRevenueData.map((row, index) => ({
            srNo: index + 1,
            id: row.id,
            khataNo: row.khataNo,
            area: row.area,
            assessment: row.assessment,
            checkboxgroup: row.checkboxgroup,
            khataOwnerName: row.khataOwnerName,
            remarks: row.remarks,
          })),
        )
      }
    } catch (error) {
      console.error('Error fetching additional land revenue data:', error)
      setAddLandRevenueData([])
    } finally {
      setLoading(false)
    }
  }

  const getOtherTableData = async () => {
    setLoading(true)
    try {
      const ccode = villageData[0]?.cCode
      if (!ccode) {
        console.error('Village code not found')
        return
      }

      const response = await axios.get(
        `${URLS.BaseURL}/otherEndpoint/getOtherData?cCode=${ccode}`,
        {
          headers: reqHeaders,
        },
      )

      if (response.data) {

        setOtherTableData([
          {
            id: 1,
            field1: 'Data 1',
            field2: 'Data 2',
            field3: 'Data 3',
            field4: 'Data 4',
          },
          {
            id: 2,
            field1: 'Data 5',
            field2: 'Data 6',
            field3: 'Data 7',
            field4: 'Data 8',
          },
        ])
      }
    } catch (error) {
      console.error('Error fetching other table data:', error)
      setOtherTableData([])
    } finally {
      setLoading(false)
    }
  }



  useEffect(() => {
    // if (!reqHeaders || Object.keys(reqHeaders).length === 0) return

    if (!apiCalled.current) {
      apiCalled.current = true

      getVillageForms()
      getNirankandCompleted()
      getKajapadata()
      getOtherTableData()
    }
  }, [reqHeaders])


  useEffect(() => {
    if (villageForms.length > 0 && tableData.length > 0) {
      const updatedForms = villageForms.map((vfm) => ({
        ...vfm,
        id: tableData.find((t) => t.formId === vfm.formId)?.id,
        isCompleted: tableData.find((t) => t.formId === vfm.formId)?.isCompleted === 'Y',
        isNirank: tableData.find((t) => t.formId === vfm.formId)?.isNirank === 'Y',
      }))

      if (JSON.stringify(updatedForms) !== JSON.stringify(villageForms)) {
        setVillageForms(updatedForms)
      }
    }
  }, [tableData])

  useEffect(() => {
    if (selectedForm) {
      setRemark('')
      if (
        selectedForm.formName.includes('वाढीव जमीन महसूल') ||
        selectedForm.formId === 'addlandlr'
      ) {
        getAddlrData()
      }
    }
  }, [selectedForm])

  const renderStatusIcon = (value) =>
    value ? (
      <CIcon icon={cilCheckAlt} className="status-icon success" size="lg" />
    ) : (
      <CIcon icon={cilX} className="status-icon danger" size="lg" />
    )

  const handleCancel = () => {
    navigate('/inspection-module/E-chawadi-kamkaj-tapasani/EChawadiKamkajTap')
  }

  const handleRemarkSubmit = () => {
    if (!selectedForm) {
      alert('Please select a form before submitting a remark.')
      return
    }

    if (!remark.trim()) {
      alert('Remark cannot be empty.')
      return
    }

    console.log(`Submitting remark for form: ${selectedForm.formName}`)
    console.log(`Remark: ${remark}`)


    alert(`Remark submitted successfully for ${selectedForm.formName}`)
    setRemark('')
  }

  const renderReportTable = () => {
    if (!selectedForm) return null

    const tableProps = {
      formName: selectedForm.formName,
    }

    if (selectedForm.formName.includes('कजाप') || selectedForm.formId === 'FORM_17') {
      return <KajapaReportTable data={kajapaData} {...tableProps} />
    } else if (selectedForm.formName.includes('निरंक') || selectedForm.formId === 'NIRANK_FORM') {
      return <NirankReportTable data={tableData} {...tableProps} />
    } else if (
      selectedForm.formName.includes('वाढीव जमीन महसूल') ||
      selectedForm.formId === 'addlandlr'
    ) {
      return <AddLandRevenueReport data={addLandRevenueData} {...tableProps} />
    } else {
      return <DefaultReportTable data={otherTableData} {...tableProps} />
    }
  }

  return (<>
    <FerfarNavbar />

    <div className='container'>

      <VillageDetailsList />

      <div className="main-container">
        <div className="content-panel">
          <h2 className="main-title">निरंक गाव व कामकाज पुर्ण असलेले नमुने</h2>
          <div className="info-alert">
            <strong>टीप:</strong> सदर गावातील गाव नमुने भरण्याचे काम पूर्ण झाल्याची घोषणा करण्यात
            आलेली आहे. घोषणेशी संबंधित नमुन्यांची माहिती तपासणीसाठी सादर करण्यात आलेली आहे. यामध्ये
            निरंक नमुने व काम पूर्ण झाल्याच्या घोषणांची नोंद समाविष्ट आहे.
          </div>

          {loading ? (
            <div className="loading-state">
              <LoadingSpinner message="Loading...." />
            </div>
          ) : (
            <div className="form-grid">
              {villageForms.length > 0 ? (
                villageForms.slice(1).map((record) => (
                  <div
                    key={record.id || record.index}
                    className={`form-card ${selectedForm?.formId === record.formId ? 'selected' : ''
                      }`}
                    onClick={() => setSelectedForm(record)}
                  >
                    <div className="form-card-inner">
                      <h4 className="form-title">{record.formName}</h4>
                      <div className="status-section">
                        <div className="status-item">
                          <span className="status-label">निरंक</span>
                          <div className="status-icon-container">
                            {renderStatusIcon(record.isNirank)}
                          </div>
                        </div>
                        <div className="status-item">
                          <span className="status-label">कामकाज पूर्ण</span>
                          <div className="status-icon-container">
                            {renderStatusIcon(record.isCompleted)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-data-found">No data found.</div>
              )}
            </div>
          )}
        </div>

        <div className="report-panel">
          {selectedForm ? (
            <>
              {renderReportTable()}

              {/* Remark and Control Section */}
              <div className="remark-section mt-4">
                <h4 className="remark-title">निरंक/तपासणी शेरा </h4>
                <textarea
                  className="form-control"
                  rows="3"
                  value={remark}
                  onChange={(e) => setRemark(e.target.value)}
                  placeholder="येथे आपला शेरा/तपासणी नोंदवा..."
                ></textarea>
              </div>

              <div className="button-container">
                <button className="cancel-button" onClick={handleCancel}>
                  रद्द करा
                </button>
                <button
                  className="submit-button"
                  onClick={handleRemarkSubmit}
                  disabled={!remark.trim()}
                >
                  अभिप्राय जतन करा
                </button>
              </div>
              {/* End Remark and Control Section */}
            </>
          ) : (
            <div className="report-placeholder">
              <p>कृपया अहवाल पाहण्यासाठी डाव्या बाजूच्या पॅनलमधील संबंधित कार्ड निवडा.</p>
            </div>
          )}
        </div>
      </div>
    </div>
    </>
    )
}

    // Kajapa Report Table Component (No changes needed here, keeping for completeness)
    const KajapaReportTable = ({
      data,
      formName,
      village = 'Village A',
      taluka = 'Taluka B',
      district = 'District C',
}) => {
  const handleDownload = () => {
      console.log('Download button clicked for Kajapa table.')
    }

    return (
    <div className="table-container">
      <div className="table-header">
        <h3>{formName} - रिपोर्ट</h3>
        <button onClick={handleDownload} className="download-button">
          Download as XLS
        </button>
      </div>

      <div className="table-wrapper">
        <table className="report-table">
          <thead>
            <tr>
              <th colSpan="13">
                <h2 className="table-main-title">कजाप न झालेल्या बिनशेती जमिनी</h2>
              </th>
            </tr>
            <tr>
              <th colSpan="13">
                <h4 className="location-info">
                  गाव-{village} तालुका-{taluka} जिल्हा-{district}
                </h4>
              </th>
            </tr>
            <tr className="column-headers">
              <th>
                <b>क्र.</b>
              </th>
              <th>
                <b>खाता क्र</b>
              </th>
              <th>
                <b>सर्वे हिस्सा क्र</b>
              </th>
              <th>
                <b>एकूण क्षेत्र</b>
              </th>
              <th>
                <b>मूल्यांकन</b>
              </th>
              <th>
                <b>जबाबदार व्यक्ती</b>
              </th>
              <th>
                <b>ऑर्डर क्र</b>
              </th>
              <th>
                <b>प्रभावित क्षेत्र</b>
              </th>
              <th>
                <b>जमिनीचे स्थान</b>
              </th>
              <th>
                <b>प्रयोजन प्रकार</b>
              </th>
              <th>
                <b>JM रक्कम</b>
              </th>
              <th>
                <b>ZP रक्कम</b>
              </th>
              <th>
                <b>GP रक्कम</b>
              </th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((r, i) => (
                <tr key={r.id}>
                  <td className="text-center">{i + 1}</td>
                  <td className="text-center">{r.khataNo || '-'}</td>
                  <td className="text-center">{r.surveyHissaNo || '-'}</td>
                  <td className="text-center">
                    {r.totalArea || '0'} {r.uomOfTotalArea || ''}
                  </td>
                  <td className="text-center">{r.assessment || '-'}</td>
                  <td className="text-center">{r.personLiable || '-'}</td>
                  <td className="text-center">{r.orderNo || '-'}</td>
                  <td className="text-center">{r.areaAffected || '0'}</td>
                  <td className="text-center">{r.locationOfLand || '-'}</td>
                  <td className="text-center">{r.prayojanType || '-'}</td>
                  <td className="text-center">{r.amountOfJm || '0'}</td>
                  <td className="text-center">{r.amountOfZp || '0'}</td>
                  <td className="text-center">{r.amountOfGp || '0'}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="13" className="no-data">
                  कोणतेही डेटा उपलब्ध नाही
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
    )
}

    // AddLandRevenueReport Component (No changes needed here, keeping for completeness)
    const AddLandRevenueReport = ({
      data,
      formName,
      village = 'Village A',
      taluka = 'Taluka B',
      district = 'District C',
}) => {
  const handleDownload = () => {
      console.log('Download button clicked for Nirank table.')
    }

    return (
    <div className="table-container">
      <div className="table-header">
        <h3>{formName}</h3>
        <button onClick={handleDownload} className="download-button">
          Download as XLS
        </button>
      </div>

      <div className="table-wrapper">
        <Card>
          <table className="report-table">
            <thead>
              <tr>
                <th colSpan="7">
                  <h2 className="table-main-title">जमीन महसूल अहवाल</h2>
                </th>
              </tr>

              <tr>
                <th colSpan="7">
                  <h4 className="location-info">
                    गाव-{village} तालुका-{taluka} जिल्हा-{district}
                  </h4>
                </th>
              </tr>

              <tr className="column-headers">
                <th>अ.क्र</th>
                <th>खाता क्र.</th>
                <th>खातेदाराचे नाव</th>
                <th>क्षेत्र</th>
                <th>आकारणी</th>
                <th>टक्केवारीमधे</th>
                <th>वाढीव जमीन भरण्यासाठी असलेली माहिती</th>
              </tr>
            </thead>

            <tbody>
              {data.length > 0 ? (
                <>
                  {data.map((r, i) => (
                    <tr key={i}>
                      <td className="text-center">{i + 1}</td>
                      <td className="text-center">{r.khataNo}</td>
                      <td className="text-center">{r.khataOwnerName}</td>
                      <td className="text-center">{r.area}</td>
                      <td className="text-center">{r.assessment}</td>
                      <td className="text-center">{r.checkboxgroup || '-'}</td>
                      <td className="text-center">{r.remarks || '-'}</td>
                    </tr>
                  ))}
                </>
              ) : (
                <tr>
                  <td colSpan="7" className="no-data">
                    कोणताही डेटा उपलब्ध नाही
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
    )
}
    // Nirank Report Table Component (No changes needed here, keeping for completeness)
    const NirankReportTable = ({
      data,
      formName,
      village = 'Village A',
      taluka = 'Taluka B',
      district = 'District C',
}) => {
  const handleDownload = () => {
      console.log('Download button clicked for Nirank table.')
    }

    return (
    <div className="table-container">
      <div className="table-header">
        <h3>{formName} - रिपोर्ट</h3>
        <button onClick={handleDownload} className="download-button">
          Download as XLS
        </button>
      </div>

      <div className="table-wrapper">
        <table className="report-table">
          <thead>
            <tr>
              <th colSpan="6">
                <h2 className="table-main-title">निरंक नोंदी</h2>
              </th>
            </tr>
            <tr>
              <th colSpan="6">
                <h4 className="location-info">
                  गाव-{village} तालुका-{taluka} जिल्हा-{district}
                </h4>
              </th>
            </tr>
            <tr className="column-headers">
              <th>
                <b>क्र.</b>
              </th>
              <th>
                <b>फॉर्म ID</b>
              </th>
              <th>
                <b>निरंक स्थिती</b>
              </th>
              <th>
                <b>कामकाज पूर्ण</b>
              </th>
              <th>
                <b>अपडेट तारीख</b>
              </th>
              <th>
                <b>टिप्पणी</b>
              </th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((r, i) => (
                <tr key={r.id}>
                  <td className="text-center">{i + 1}</td>
                  <td className="text-center">{r.formId || '-'}</td>
                  <td className="text-center">
                    <span className={`status-badge ${r.isNirank ? 'completed' : 'pending'}`}>
                      {r.isNirank ? 'होय' : 'नाही'}
                    </span>
                  </td>
                  <td className="text-center">
                    <span className={`status-badge ${r.isCompleted ? 'completed' : 'pending'}`}>
                      {r.isCompleted ? 'पूर्ण' : 'अपूर्ण'}
                    </span>
                  </td>
                  <td className="text-center">{new Date().toLocaleDateString()}</td>
                  <td className="text-center">-</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="no-data">
                  कोणतेही निरंक डेटा उपलब्ध नाही
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
    )
}

    // Default Report Table Component (No changes needed here, keeping for completeness)
    const DefaultReportTable = ({
      data,
      formName,
      village = 'Village A',
      taluka = 'Taluka B',
      district = 'District C',
}) => {
  const handleDownload = () => {
      console.log('Download button clicked for default table.')
    }

    return (
    <div className="table-container">
      <div className="table-header">
        <h3>{formName} - रिपोर्ट</h3>
        <button onClick={handleDownload} className="download-button">
          Download as XLS
        </button>
      </div>

      <div className="table-wrapper">
        <table className="report-table">
          <thead>
            <tr>
              <th colSpan="5">
                <h2 className="table-main-title">सामान्य माहिती</h2>
              </th>
            </tr>
            <tr>
              <th colSpan="5">
                <h4 className="location-info">
                  गाव-{village} तालुका-{taluka} जिल्हा-{district}
                </h4>
              </th>
            </tr>
            <tr className="column-headers">
              <th>
                <b>क्र.</b>
              </th>
              <th>
                <b>फील्ड 1</b>
              </th>
              <th>
                <b>फील्ड 2</b>
              </th>
              <th>
                <b>फील्ड 3</b>
              </th>
              <th>
                <b>फील्ड 4</b>
              </th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((r, i) => (
                <tr key={r.id}>
                  <td className="text-center">{i + 1}</td>
                  <td className="text-center">{r.field1 || '-'}</td>
                  <td className="text-center">{r.field2 || '-'}</td>
                  <td className="text-center">{r.field3 || '-'}</td>
                  <td className="text-center">{r.field4 || '-'}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="no-data">
                  कोणतेही डेटा उपलब्ध नाही
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
    )
}

    export default NirankGavNamunaTapa
