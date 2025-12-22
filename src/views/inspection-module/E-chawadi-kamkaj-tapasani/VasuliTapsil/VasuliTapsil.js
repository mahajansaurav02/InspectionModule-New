import React, { useEffect, useState } from 'react'
import {
  CTable,
  CTableBody,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTableDataCell,
  CAlert,
  CFormTextarea,
  CButton,
} from '@coreui/react'
import axios from 'axios'
import URLS from 'src/URLS'
import styles from './VasuliTapsil.module.css'
import LoadingSpinner from 'src/Models/LoadingSpinner'
import reqHeaders from 'src/instance/headers'
import VillageDetailsList from 'src/views/dashboard/ReusableComponents/VillageDetailsList'
import api from 'src/api/api'
import FerfarNavbar from '../../ferfarNondvahi/ferfarSections/FerfarNavbar'
import ConfirmSubmitModal from 'src/components/ConfirmSubmitModal'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const VasuliTapsil = () => {
  const [demandData, setDemandData] = useState(null)
  const [collectedData, setCollectedData] = useState(null)
  const [educessData, setEducessData] = useState(null)
  const [loading0029, setLoading0029] = useState(false)
  const [loading0045, setLoading0045] = useState(false)
  const [loadingUddishth, setLoadingUddishth] = useState(false) // New state for uddishth loading
  const [loadingTarget, setLoadingTarget] = useState(false) // New state for uddishth loading
  const [targetData, setTargetData] = useState(null)
  const [remark, setRemark] = useState('')
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)



  const navigate = useNavigate()
  const { user, roles, token } = useSelector((state) => state.auth || {})
  const revenueYear = user?.revenueYear[0]?.revenueYear

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

  const getDemand = async () => {
    try {
      setLoading0029(true)

      if (!cCode) {
        alert('Village code not found....Please Select Village First')
        return
      }

      const res = await api.get(`${URLS.BaseURL}/inpsection/getVasuliForDemandFor0029?ccode=${cCode}&revenueYear=2025-26`)
      //  const res = await axios.get(
      //       `${URLS.BaseURL}/inpsection/getVasuliForDemandFor0029?ccode=${cCode}&revenueYear=2025-26`,
      //       {
      //         headers: reqHeaders,
      //       },
      //     )
      setDemandData(res.data[0])
      setLoading0029(false)
    } catch (err) {
      console.error(err)
      setLoading0029(false)
    }
  }

  const getCollected = async () => {
    try {
      if (!cCode) {
        alert('Village code not found....Please Select Village First')
        return
      }
      setLoading0029(true)

      const res = await api.get(`/inpsection/getVasuliForCollectedFor0029?ccode=${cCode}&revenueYear=2025-26`)

      setCollectedData(res.data[0])
      setLoading0029(false)
    } catch (err) {
      console.error(err)
      setLoading0029(false)
    }
  }

  const getEgsAndEduCess = async () => {
    try {
      reqHeaders.token = `Bearer`
      setLoading0045(true)

      if (!cCode) {
        alert('Village code not found....Please Select Village First')
        return
      }

      const res = await api.get(`/inpsection/getVasuliForEgsAndEduCess?revenueYear=2025-26&ccode=${cCode}`)

      setEducessData(res.data)
      setLoading0045(false)
    } catch (err) {
      console.error(err)
      setLoading0045(false)
    }
  }
  const handleSubmit = async () => {
    // 1. Start Loading
    setIsSubmitting(true);

    const payload = {
      districtCode,
      talukaCode,
      ccode: cCode,
      revenueYear,
      remark,
      echawdiType: 4
    };

    try {
      const res = await api.post(`/inpsection/saveEchawdiDataForInspection`, payload);

      if (res.status === 201 || res.status === 200) {
        // 2. Stop Loading and Show Green Tick
        setIsSubmitting(false);
        setSubmitSuccess(true);

        // 3. Wait for 2 seconds so the user sees the success animation, then redirect
        setTimeout(() => {
          setSubmitSuccess(false);
          setShowConfirmModal(false);
          setRemark('');
          navigate(-1); // Redirect back
        }, 2000);

      } else {
        throw new Error('Unexpected response status');
      }
    } catch (err) {
      console.error('Submit error:', err);
      setIsSubmitting(false); // Stop loading on error
      alert(err?.response?.data?.message || 'Failed to submit remark');
    }
  }
  const handleCancel = () => {
    setRemark('')
    console.log('Action cancelled. Remark cleared.')
    // Implement navigation or other cancellation logic
  }

  const getTargetAndCollected = async () => {
    try {
      setLoadingTarget(true)
      if (!cCode) {
        alert('Village code not found....Please Select Village First')
        return
      }

      const res = await api.get(`/inpsection/getTargetAndSankirnDemandForInspection?revenueYear=2025-26&ccode=${cCode}`)

      console.log(res.data, 'target data response')
      setTargetData(res.data)
      setLoadingTarget(false)
    } catch (err) {
      console.error(err)
      setLoadingTarget(false)
    }
  }

  //

  useEffect(() => {
    getDemand()
    getCollected()
    getEgsAndEduCess()
    getTargetAndCollected()
  }, [])

  const formatNumber = (num) => {
    if (num === null || num === undefined) return 0
    return Number(num).toFixed(2).replace(/\.00$/, '')
  }

  const rows029 = [
    {
      id: 1,
      type: 'ज.म',
      demand: {
        jm: demandData?.binJmDemand || 0,
        zp: demandData?.binZpDemand || 0,
        gp: demandData?.binGpDemand || 0,
        total: demandData?.binTotalDemand || 0,
      },
      collected: {
        jm: collectedData?.binJmCollected || 0,
        zp: collectedData?.binZpCollected || 0,
        gp: collectedData?.binGpCollected || 0,
        total: collectedData?.binTotalCollected || 0,
      },
    },
    {
      id: 2,
      type: 'अकृषक',
      demand: {
        jm: demandData?.akJmDemand || 0,
        zp: demandData?.akZpDemand || 0,
        gp: demandData?.akGpDemand || 0,
        total: demandData?.akTotalDemand || 0,
      },
      collected: {
        jm: collectedData?.akJmCollected || 0,
        zp: collectedData?.akZpCollected || 0,
        gp: collectedData?.akGpCollected || 0,
        total: collectedData?.akTotalCollected || 0,
      },
    },
    {
      id: 3,
      type: 'संकीर्ण',
      demand: {
        jm: demandData?.sanJmDemand || 0,
        zp: demandData?.sanZpDemand || 0,
        gp: demandData?.sanGpDemand || 0,
        total: demandData?.sanTotalDemand || 0,
      },
      collected: {
        jm: collectedData?.sanJmCollected || 0,
        zp: collectedData?.sanZpCollected || 0,
        gp: collectedData?.sanGpCollected || 0,
        total: collectedData?.sanTotalCollected || 0,
      },
    },
  ]

  const rows045 = [
    {
      id: 1,
      type: 'रोजगार हमी',
      demand: {
        prev: educessData?.prevEgsDemand || 0,
        curr: educessData?.currEgsDemand || 0,
        total: educessData?.totalEgsDemand || 0,
      },
      collected: {
        prev: educessData?.prevEgsCollected || 0,
        curr: educessData?.currEgsCollected || 0,
        total: educessData?.totalEgsCollected || 0,
      },
    },
    {
      id: 2,
      type: 'शिक्षण कर',
      demand: {
        prev: educessData?.prevEduCessDemand || 0,
        curr: educessData?.currEduCessDemand || 0,
        total: educessData?.totalEduCessDemand || 0,
      },
      collected: {
        prev: educessData?.prevEduCessCollected || 0,
        curr: educessData?.currEduCessCollected || 0,
        total: educessData?.totalEduCessCollected || 0,
      },
    },
  ]

  const udishtData = {
    binTotalCollected: '7200',
    uddishth: '10000',
  }

  // Data for the new Uddishth table
  const uddishthRow = {
    uddishth: targetData?.annualVillageTarget || 0,
    collected: targetData?.grandTotal || 0,
    percentage: (targetData?.grandTotal / (targetData?.annualVillageTarget || 1)) * 100 || 0,
  }

  return (

    <>
      <FerfarNavbar />

      <div className={styles['vasuli-container']}>
        <h2 className={styles['main-title']}>जमीन महसूलाची वसुली तपशील</h2>
        <VillageDetailsList />

        {/* ----------------- (०२९) ----------------- */}
        <CAlert color="info" className="modern-alert">
          <strong>टीप:</strong>
          <ul className="mt-2 mb-0 text-start">
            <li>
              सदर गावात जमीन महसूल व संकीर्ण प्रकारातील मागणी किती आहे व आजपर्यंत त्यामध्ये किती वसुली
              झालेली आहे, याबाबतचा अहवाल तपासणीसाठी सादर करण्यात आलेला आहे.
            </li>
            <li>सदर माहिती मागणी निश्चितीपासून आजच्या तारखेपर्यंतच्या कालावधीतील वसुलीची आहे.</li>
          </ul>
        </CAlert>

        {loading0029 ? (
          <div className="loading-state">
            <LoadingSpinner message="Loading...." />
          </div>
        ) : (
          <div className={styles['table-card']}>
            <h6 className={styles['table-title']}>जमीन महसूल वसुली (०२९)</h6>

            <CTable bordered hover responsive className={styles['custom-table']}>
              <CTableHead className={styles['table-head']}>
                <CTableRow>
                  <CTableHeaderCell rowSpan={2} className={styles['sticky-header-cell']}>
                    क्र.
                  </CTableHeaderCell>
                  <CTableHeaderCell rowSpan={2} className={styles['sticky-header-cell']}>
                    प्रकार
                  </CTableHeaderCell>
                  <CTableHeaderCell colSpan={4}>मागणी</CTableHeaderCell>
                  <CTableHeaderCell colSpan={4}>वसुली</CTableHeaderCell>
                  <CTableHeaderCell rowSpan={2} className={styles['sticky-header-cell']}>
                    टक्केवारी
                  </CTableHeaderCell>
                </CTableRow>
                <CTableRow>
                  <CTableHeaderCell className={styles['sub-header-cell']}>ज. म</CTableHeaderCell>
                  <CTableHeaderCell className={styles['sub-header-cell']}>जि. प</CTableHeaderCell>
                  <CTableHeaderCell className={styles['sub-header-cell']}>ग्रा. प</CTableHeaderCell>
                  <CTableHeaderCell className={styles['sub-header-cell']}>एकूण</CTableHeaderCell>
                  <CTableHeaderCell className={styles['sub-header-cell']}>ज. म</CTableHeaderCell>
                  <CTableHeaderCell className={styles['sub-header-cell']}>जि. प</CTableHeaderCell>
                  <CTableHeaderCell className={styles['sub-header-cell']}>ग्रा. प</CTableHeaderCell>
                  <CTableHeaderCell className={styles['sub-header-cell']}>एकूण</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {rows029.map((row) => {
                  const percent =
                    row.demand.total > 0
                      ? ((row.collected.total / row.demand.total) * 100).toFixed(2) + '%'
                      : '0%'
                  return (
                    <CTableRow key={row.id}>
                      <CTableDataCell className={styles['data-cell']}>{row.id}</CTableDataCell>
                      <CTableDataCell className={styles['data-cell']}>{row.type}</CTableDataCell>
                      <CTableDataCell className={styles['data-cell']}>
                        {formatNumber(row.demand.jm)}
                      </CTableDataCell>
                      <CTableDataCell className={styles['data-cell']}>
                        {formatNumber(row.demand.zp)}
                      </CTableDataCell>
                      <CTableDataCell className={styles['data-cell']}>
                        {formatNumber(row.demand.gp)}
                      </CTableDataCell>
                      <CTableDataCell className={styles['data-cell']}>
                        {formatNumber(row.demand.total)}
                      </CTableDataCell>
                      <CTableDataCell className={styles['data-cell']}>
                        {formatNumber(row.collected.jm)}
                      </CTableDataCell>
                      <CTableDataCell className={styles['data-cell']}>
                        {formatNumber(row.collected.zp)}
                      </CTableDataCell>
                      <CTableDataCell className={styles['data-cell']}>
                        {formatNumber(row.collected.gp)}
                      </CTableDataCell>
                      <CTableDataCell className={styles['data-cell']}>
                        {formatNumber(row.collected.total)}
                      </CTableDataCell>
                      <CTableDataCell className={styles['data-cell']}>{percent}</CTableDataCell>
                    </CTableRow>
                  )
                })}
              </CTableBody>
            </CTable>
          </div>
        )}

        {/* ----------------- (०४५) ----------------- */}
        {loading0045 ? (
          <div className="loading-state">
            <LoadingSpinner message="Loading...." />
          </div>
        ) : (
          <div className={styles['table-card']}>
            <h6 className={styles['table-title']}>इतर जमीन महसूल वसुली (०४५)</h6>
            <CTable bordered hover responsive className={styles['custom-table']}>
              <CTableHead className={styles['table-head']}>
                <CTableRow>
                  <CTableHeaderCell rowSpan={2} className={styles['sticky-header-cell']}>
                    क्र.
                  </CTableHeaderCell>
                  <CTableHeaderCell rowSpan={2} className={styles['sticky-header-cell']}>
                    प्रकार
                  </CTableHeaderCell>
                  <CTableHeaderCell colSpan={3}>मागणी</CTableHeaderCell>
                  <CTableHeaderCell colSpan={3}>वसुली</CTableHeaderCell>
                  <CTableHeaderCell rowSpan={2} className={styles['sticky-header-cell']}>
                    टक्केवारी
                  </CTableHeaderCell>
                </CTableRow>
                <CTableRow>
                  <CTableHeaderCell className={styles['sub-header-cell']}>
                    मागील वर्ष
                  </CTableHeaderCell>
                  <CTableHeaderCell className={styles['sub-header-cell']}>चालू वर्ष</CTableHeaderCell>
                  <CTableHeaderCell className={styles['sub-header-cell']}>एकूण</CTableHeaderCell>
                  <CTableHeaderCell className={styles['sub-header-cell']}>
                    मागील वर्ष
                  </CTableHeaderCell>
                  <CTableHeaderCell className={styles['sub-header-cell']}>चालू वर्ष</CTableHeaderCell>
                  <CTableHeaderCell className={styles['sub-header-cell']}>एकूण</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {rows045.map((row) => {
                  const percent =
                    row.demand.total > 0
                      ? ((row.collected.total / row.demand.total) * 100).toFixed(2) + '%'
                      : '0%'
                  return (
                    <CTableRow key={row.id}>
                      <CTableDataCell className={styles['data-cell']}>{row.id}</CTableDataCell>
                      <CTableDataCell className={styles['data-cell']}>{row.type}</CTableDataCell>
                      <CTableDataCell className={styles['data-cell']}>
                        {formatNumber(row.demand.prev)}
                      </CTableDataCell>
                      <CTableDataCell className={styles['data-cell']}>
                        {formatNumber(row.demand.curr)}
                      </CTableDataCell>
                      <CTableDataCell className={styles['data-cell']}>
                        {formatNumber(row.demand.total)}
                      </CTableDataCell>
                      <CTableDataCell className={styles['data-cell']}>
                        {formatNumber(row.collected.prev)}
                      </CTableDataCell>
                      <CTableDataCell className={styles['data-cell']}>
                        {formatNumber(row.collected.curr)}
                      </CTableDataCell>
                      <CTableDataCell className={styles['data-cell']}>
                        {formatNumber(row.collected.total)}
                      </CTableDataCell>
                      <CTableDataCell className={styles['data-cell']}>{percent}</CTableDataCell>
                    </CTableRow>
                  )
                })}
              </CTableBody>
            </CTable>
          </div>
        )}

        {/* ----------------- Uddishth Table (उद्दिष्ट) ----------------- */}
        {loadingTarget || loading0029 ? (
          <div className="loading-state">
            <LoadingSpinner message="Loading...." />
          </div>
        ) : (
          <div className={styles['table-card']}>
            <h6 className={styles['table-title']}>उद्दिष्टानुसार वसुली</h6>
            <CTable bordered hover responsive className={styles['custom-table']}>
              <CTableHead className={styles['table-head']}>
                <CTableRow>
                  <CTableHeaderCell className={styles['sticky-header-cell']}>
                    उद्दिष्ट (००४५)
                  </CTableHeaderCell>
                  <CTableHeaderCell className={styles['sticky-header-cell']}>
                    वसुली (००४५)
                  </CTableHeaderCell>
                  <CTableHeaderCell className={styles['sticky-header-cell']}>
                    टक्केवारी %
                  </CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                <CTableRow>
                  <CTableDataCell className={styles['data-cell']}>
                    {formatNumber(uddishthRow.uddishth)}
                  </CTableDataCell>
                  <CTableDataCell className={styles['data-cell']}>
                    {formatNumber(uddishthRow.collected)}
                  </CTableDataCell>
                  <CTableDataCell className={styles['data-cell']}>
                    {uddishthRow.percentage.toFixed(2)}%
                  </CTableDataCell>
                </CTableRow>
              </CTableBody>
            </CTable>
          </div>
        )}

        {/* <div className="remark-controls-section p-4 mt-4 border rounded bg-light"> */}
        <div className={styles['table-card']}>

          <h5 className="remark-title mb-3">शेरा</h5>

          <CFormTextarea
            rows={4}
            className="remark-textarea mb-3"
            placeholder="येथे तपासणीनंतर आपला शेरा/अभिप्राव नोंदवा..."
            value={remark}
            onChange={(e) => setRemark(e.target.value)}
          />

          <div className="d-flex justify-content-end gap-3 button-container">
            <CButton color="secondary" onClick={handleCancel} className="cancel-button">
              रद्द करा
            </CButton>
            <CButton
              color="success"
              onClick={() => setShowConfirmModal(true)}
              className="submit-button"
              disabled={!remark.trim()}
            >
              अभिप्राय जतन करा
            </CButton>
          </div>
        </div>
        <ConfirmSubmitModal
          visible={showConfirmModal}
          loading={isSubmitting} // This must match your useState name
          success={submitSuccess}   // This must match your useState name
          onCancel={() => setShowConfirmModal(false)}
          onConfirm={handleSubmit}
        />
      </div>
    </>
  )
}

export default VasuliTapsil
