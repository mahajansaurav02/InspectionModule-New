import React, { useEffect, useState } from 'react'
import './MagniDurustiReporttapa.css'
import axios from 'axios'
import URLS from 'src/URLS'
import { useSelector } from 'react-redux'

import { ToastContainer, toast, Bounce } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import LoadingSpinner from 'src/Models/LoadingSpinner'
import { CAlert } from '@coreui/react'
import { useNavigate } from 'react-router-dom'
// import reqHeaders from 'src/instance/headers'
import VillageDetailsList from 'src/views/dashboard/ReusableComponents/VillageDetailsList'
import getReqHeaders from 'src/instance/getHeader'
import api from 'src/api/api'
import FerfarNavbar from '../../ferfarNondvahi/ferfarSections/FerfarNavbar'
import ConfirmSubmitModal from 'src/components/ConfirmSubmitModal'

export const MagniDurustiReporttapa = () => {
  const [khatedarList, setKhatedarList] = useState([])
  const [remark, setRemark] = useState('')
  const [loading, setLoading] = useState(false)
  const [reqHeaders, setReqHeaders] = useState({})
  const [submitStatus, setSubmitStatus] = useState('')
  let VillageData = localStorage.getItem('selectedVillageData')
  let selectedVillageData = JSON.parse(VillageData)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  let {
    cCode,
    distMarathiName,
    lgdCode,
    talukaCode,
    talukaMarathiName,
    villageName,
    districtCode,
  } = selectedVillageData[0]
  const navigate = useNavigate()
  const { user, roles, token } = useSelector((state) => state.auth || {})
  const revenueYear = user?.revenueYear[0]?.revenueYear

  // const reqHeaders = getReqHeaders({ token, user })
  const tableHeaderMap = {
    khataNo: 'खाताक्र.',
    khataOwnerName: 'खातेदाराचे नाव',
    area: 'क्षेत्र',
    assessment: 'आकारणी (रु.पैसे)',
    jmBindumala: 'ज.म. बिंदुमाला',
    zpBindumala: 'जि.प. बिंदुमाला',
    gpBindumala: 'ग्रा.पं बिंदुमाला',
    jmDumala: 'ज.म. दुमाला',
    zpDumala: 'जि.प. दुमाला',
    gpDumala: 'ग्रा.पं दुमाला',
    jmSankirn: 'ज.म. संकीर्ण',
    zpSankirn: 'जि.प. संकीर्ण',
    gpSankirn: 'ग्रा.पं. संकीर्ण',
    jmAkrushik: 'ज.म. अकृषिक',
    zpAkrushik: 'जि.प. अकृषिक',
    gpAkrushik: 'ग्रा.पं. अकृषिक',
    jmVajasut: 'ज.म. वजासुट',
    zpVajasut: 'जि.प. वजासुट',
    gpVajasut: 'ग्रा.पं. वजासुट',
    addlLandRevenue: 'वाढीव जमीन महसूल',
    educationalCess: 'शिक्षण उपकर',
    addlEducationalCess: 'वाहिव शिक्षण उपकर',
    employeeGuaranteeScheme: 'रो.ह. उपकर',
    preYearPendingJm: 'मागील ज.म.',
    preYearPendingZp: 'मागील जि.प.',
    preYearPendingGp: 'मागील ग्रा.पं.',
    preYearPendingAddlLandRevenue: 'मागील वाढीव जमीन महसूल',
    preYearPendingEducationalCess: 'मागील शिक्षण उपकर',
    preYearPendingAddlEducationalCess: 'मागील वाहिव शिक्षण उपकर',
    preYearPendingEmployeeGuaranteeScheme: 'मागील रो.ह. उपकर',
    netAmount: 'एकूण रक्कम',
  }

  useEffect(() => {
    const initHeaders = async () => {
      if (!token || !user) return

      const headers = await getReqHeaders({ token, user })
      setReqHeaders(headers)
    }

    initHeaders()
  }, [token, user])

  useEffect(() => {
    if (!reqHeaders || Object.keys(reqHeaders).length === 0) return

    getMahsulDurustiList()
  }, [reqHeaders])

  const handleSubmit = async () => {
    // 1. Start Loading
    setIsSubmitting(true)

    const payload = {
      districtCode,
      talukaCode,
      ccode: cCode,
      revenueYear,
      remark,
      echawdiType: 2,
    }

    try {
      const res = await api.post(`/inpsection/saveEchawdiDataForInspection`, payload)

      if (res.status === 201 || res.status === 200) {
        // 2. Stop Loading and Show Green Tick
        setIsSubmitting(false)
        setSubmitSuccess(true)

        // 3. Wait for 2 seconds so the user sees the success animation, then redirect
        setTimeout(() => {
          setSubmitSuccess(false)
          setShowConfirmModal(false)
          setRemark('')
          navigate(-1) // Redirect back
        }, 2000)
      } else {
        throw new Error('Unexpected response status')
      }
    } catch (err) {
      console.error('Submit error:', err)
      setIsSubmitting(false)

      let errorMessage = err?.response?.data?.message || 'Failed to submit remark'

      if (err?.response?.status === 409) {
        errorMessage =
          'निवडलेल्या गावाचा व संबंधित महसूल वर्षाचा मागणी दुरुस्ती चा शेरा पूर्वीच प्रदान करण्यात आलेला आहे.'
      }

      toast.error(errorMessage, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        theme: 'colored',
        transition: Bounce,
        style: {
          backgroundColor: '#FF9800',
          color: '#FFFFFF',
          fontWeight: 'bold',
          fontSize: '15px',
        },
      })
    }
  }
  const handleCancel = () => {
    navigate('/inspection-module/E-chawadi-kamkaj-tapasani/EChawadiKamkajTap')
  }

  const getMahsulDurustiList = async () => {
    setLoading(true)
    try {
      if (!cCode) {
        toast.error('Village code not found', { autoClose: 2000 })
        console.log('Village code not found')
        return
      }
      const response = await api.get(
        `/landRevenue/getLandRevenueDemandDetails?districtCode=${'24'}&talukaCode=${talukaCode}&cCode=${cCode}&activeFlag=E&revenueYear=2025-26`,
      )

      if (response.data.length <= 0) {
        toast.info('No records found', { autoClose: 2000 })
      } else {
        const formattedData = response.data.map((row, index) => ({
          id: row.khataNo,
          khataNo: row.khataNo,
          khataOwnerName: row.khataOwnerName,
          jmBindumala: row.jmBindumala,
          zpBindumala: row.zpBindumala,
          gpBindumala: row.gpBindumala,
          jmDumala: row.jmDumala,
          zpDumala: row.zpDumala,
          gpDumala: row.gpDumala,
          jmAkrushik: row.jmAkrushik,
          zpAkrushik: row.zpAkrushik,
          gpAkrushik: row.gpAkrushik,
          jmSankirn: row.jmSankirn,
          zpSankirn: row.zpSankirn,
          gpSankirn: row.gpSankirn,
          jmVajasut: row.jmVajasut,
          gpVajasut: row.gpVajasut,
          zpVajasut: row.zpVajasut,
          addlLandRevenue: row.addlLandRevenue,
          educationalCess: row.educationalCess,
          addlEducationalCess: row.addlEducationalCess,
          employeeGuaranteeScheme: row.employeeGuaranteeScheme,
          netAmount: row.netAmount,
          preYearPendingJm: row.preYearPendingJm,
          preYearPendingZp: row.preYearPendingZp,
          preYearPendingGp: row.preYearPendingGp,
          preYearPendingAddlLandRevenue: row.preYearPendingAddlLandRevenue,
          preYearPendingEducationalCess: row.preYearPendingEducationalCess,
          preYearPendingAddlEducationalCess: row.preYearPendingAddlEducationalCess,
          preYearPendingEmployeeGuaranteeScheme: row.preYearPendingEmployeeGuaranteeScheme,
          miscellaneousAmount: row.miscellaneousAmount,
          area: row.area,
          assessment: row.assessment,
          srNo: index + 1,
          surveyHissaNo: row.surveyHissaNo,
          uom: row.uom,
        }))
        toast.success('Data fetched successfully!', { autoClose: 2000 })
        setKhatedarList(formattedData)
      }
    } catch (error) {
      console.error('Error fetching data:', error)
      toast.error('Failed to fetch data', { autoClose: 2000 })
    } finally {
      setLoading(false)
    }
  }

  // 🔹 Group rows by khataNo and find last row for each
  const getLastRowByKhataNo = (list) => {
    const lastRows = {}
    list.forEach((row) => {
      lastRows[row.khataNo] = row // overwrite → ensures last occurrence stays
    })
    return lastRows
  }

  const lastRows = getLastRowByKhataNo(khatedarList)

  // 🔹 Helper: check mismatch with last row
  const isDifferent = (row, field) => {
    if (!lastRows[row.khataNo]) return false
    return row[field] !== lastRows[row.khataNo][field]
  }

  const tableFields = [
    'khataNo',
    'khataOwnerName',
    'area',
    'assessment',
    'jmBindumala',
    'zpBindumala',
    'gpBindumala',
    'jmDumala',
    'zpDumala',
    'gpDumala',
    'jmSankirn',
    'zpSankirn',
    'gpSankirn',
    'jmAkrushik',
    'zpAkrushik',
    'gpAkrushik',
    'jmVajasut',
    'zpVajasut',
    'gpVajasut',
    'addlLandRevenue',
    'educationalCess',
    'addlEducationalCess',
    'employeeGuaranteeScheme',
    'preYearPendingJm',
    'preYearPendingZp',
    'preYearPendingGp',
    'preYearPendingAddlLandRevenue',
    'preYearPendingEducationalCess',
    'preYearPendingAddlEducationalCess',
    'preYearPendingEmployeeGuaranteeScheme',
    'netAmount',
  ]

  return (
    <>
      <FerfarNavbar
        tooltipData={
          'तपासणी अधिकारी यांना मागणीची दुरुस्ती (मागणी रक्कम कमी/जास्त )केलेल्या खात्यांचा अहवाल उपलब्ध होणार आहे.'
        }
      />

      <div className="report-container">
        <ToastContainer position="top-right" autoClose={2000} theme="colored" />
        <h4 className="report-title">महसूल मागणी दुरुस्ती</h4>
        <VillageDetailsList />

        <div className="table-wrapper">
          <CAlert color="info" className="modern-alert">
            <strong>टीप:</strong>
            <ul className="mt-2 mb-0 text-start">
              <li>
                मागणी निश्चिती केल्यानंतर, ज्या खातेदारांच्या नावे दुरुस्ती करण्यात आलेली आहे, त्या
                सर्व दुरुस्त्यांचा तपशील तपासणीसाठी सादर करण्यात आलेला आहे.
              </li>
              <li>
                सादर केलेल्या अहवालामध्ये जास्ती अथवा कमी झालेल्या दुरुस्त्या जसे की - जमीन महसूल
                (ज.म.), अकृषक, जिल्हा परिषद (जि.प.), ग्रामपंचायत (ग्रा.प.), रस्ते हमी (रो.हमी),
                शिक्षण कर व संकीर्ण प्रकारातील दुरुस्त्या समाविष्ट आहेत.
              </li>
              <li>
                वरील सर्व दुरुस्त्या मागणीच्या अनुषंगाने योग्य रीतीने करण्यात आलेल्या आहेत याची
                खात्री करण्यात यावी.
              </li>
            </ul>
          </CAlert>

          {loading ? (
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ minHeight: '300px' }}
            >
              <LoadingSpinner message="Loading..." />
            </div>
          ) : (
            <div className="table-scroll-area">
              <table className="table modern-table">
                <thead className="sticky-top">
                  <tr>
                    <th>अ.क्र</th>
                    {tableFields.map((field, idx) => (
                      <th key={idx}>{tableHeaderMap[field]}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {khatedarList.map((r, i) => (
                    <tr key={`${r.khataNo}-${i}`}>
                      <td>{i + 1}</td>
                      {tableFields.map((field, idx) => (
                        <td
                          key={idx}
                          style={{
                            backgroundColor: isDifferent(r, field) ? 'lightpink' : 'transparent',
                          }}
                        >
                          {r[field]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="remark-controls-section">
          {/* Remark Section */}
          <div className="remark-section">
            <h4 className="remark-title">तपासणी शेरा </h4>
            <textarea
              className="form-control"
              rows="3"
              value={remark}
              onChange={(e) => setRemark(e.target.value)}
              placeholder="येथे आपला शेरा/तपासणी नोंदवा..."
            ></textarea>
          </div>

          {/* Button Container */}
          <div className="button-container">
            <button className="cancel-button" onClick={handleCancel}>
              रद्द करा
            </button>
            <button
              className="submit-button"
              onClick={() => setShowConfirmModal(true)}
              disabled={!remark?.trim()}
            >
              अभिप्राय जतन करा
            </button>
          </div>
        </div>
        <ConfirmSubmitModal
          visible={showConfirmModal}
          loading={isSubmitting} // This must match your useState name
          success={submitSuccess} // This must match your useState name
          onCancel={() => setShowConfirmModal(false)}
          onConfirm={handleSubmit}
        />
      </div>
    </>
  )
}
