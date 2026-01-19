import React, { useEffect, useState } from 'react'
import {
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
  CButton,
  CFormTextarea,
  CCard,
  CCardBody,
  CSpinner,
  CAlert,
  CTooltip,
  CContainer,
  CRow,
  CCol,
  CFormCheck,
} from '@coreui/react'
import {
  FaFilePdf,
  FaFileAlt,
  FaStickyNote,
  FaFileSignature,
  FaCheckCircle,
  FaTimesCircle,
  FaDownload,
  FaTimes,
  FaArrowLeft,
} from 'react-icons/fa'
import '../Tabs.css'
import { useSelector } from 'react-redux'

import { MdOutlineZoomIn } from 'react-icons/md'
import { Navigate } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import api from 'src/api/api'
import ConfirmSubmitModal from 'src/components/ConfirmSubmitModal'
import { toast, ToastContainer } from 'react-toastify'

const TrutiDetailsTabs = ({ ferfar }) => {
  const [activeKey, setActiveKey] = useState(1)
  const [documentHistory, setDocumentHistory] = useState([1])
  const [remark, setRemark] = useState('')
  const [priority, setPriority] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)
  const [zoomLevel, setZoomLevel] = useState(100)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
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

  const { user, roles, token } = useSelector((state) => state.auth || {})

  const revenueYear = user?.revenueYear[0]?.revenueYear

  const navigate = useNavigate()

  const [suggestedRemarks] = useState([
    'अपलोड केलेले दस्तऐवज नुसार सातबारा व अंमल योग्य आला आहे/ नाही',
    'फेरफार विहित मुदतीत प्रमाणित करण्यात आले आहे / नाही',
    'आदेशाची प्रमाणित प्रत अपलोड करण्यात आले आहे / नाही',
    'दस्ताऐवज नुसार फेरफार घेण्यात आलेला आहे/नाही',
    'अपलोड केलेले दस्तऐवज वाचण्यायोग्य आहे/नाही',
  ])

  const handleTabChange = (key) => {
    setActiveKey(key)
    setDocumentHistory((prev) => {
      const newHistory = prev.filter((tab) => tab !== key)
      return [...newHistory, key]
    })
  }
  const handleBack = (key) => {
    navigate('/inspection-module/e-hakka-kamkaj-tapasani/eHakkaSection')
  }

  const handleCloseDocument = (tabKey) => {
    setDocumentHistory((prev) => prev.filter((tab) => tab !== tabKey))
    if (tabKey === activeKey) {
      const remainingTabs = documentHistory.filter((tab) => tab !== tabKey)
      if (remainingTabs.length > 0) {
        setActiveKey(remainingTabs[remainingTabs.length - 1])
      } else {
        setActiveKey(1)
        setDocumentHistory([1])
      }
    }
  }

  const handleSubmit = async () => {


    if (!priority) {
      toast.warn('कृपया अभिप्रायाचे प्राधान्य प्रकार निवडा')
      return
    }

    let remarkType = ''
    if (priority === 'High') remarkType = 'अतीगंभीर'
    if (priority === 'Medium') remarkType = 'गंभीर'
    if (priority === 'Low') remarkType = 'साधारण'

    setIsSubmitting(true);
    console.log(ferfar, '========application=ji========')
    let inte = parseInt(ferfar.ehakkaType)
    const payload = {
      districtCode: districtCode,
      talukaCode: talukaCode,
      ccode: cCode,
      revenueYear: revenueYear,
      applicationid: ferfar.applicationId,
      ehakkaType: inte,
      remark: remark,
      remarkType: remarkType
    }


    // const payload =
    // {
    //   districtCode: "24",
    //   talukaCode: "13",
    //   ccode: "2724003796434400",
    //   revenueYear: "2025-26",
    //   applicationid: 13242,
    //   ehakkaType: 2,
    //   remark: "नोंद तपासणी पूर्ण झाली",
    //   remarkType: "साधारण"
    // }





    try {
      const res = await api.post(`/inpsection/saveEHakkaForInspection`, payload);

      if (res.status === 201 || res.status === 200) {
        setIsSubmitting(false);
        setSubmitSuccess(true);

        setTimeout(() => {
          setSubmitSuccess(false);
          setShowConfirmModal(false);
          setRemark('');
          navigate(-1);
        }, 2000);

      } else {
        throw new Error('Unexpected response status');
      }
    } catch (err) {
      console.error('Submit error:', err);
      setIsSubmitting(false);
      alert(err?.response?.data?.message || 'Failed to submit remark');
    }
  }


  const handleDownload = (type) => {
    let filePath, fileName

    switch (type) {
      case '7/12':
        filePath = '/satbaaraa.pdf'
        fileName = '7-12-utara.pdf'
        break
      case 'ferfar':
        filePath = '/ferfar.png'
        fileName = 'ferfar-pavati.png'
        break
      case 'document':
        filePath = '/document_app.pdf'
        fileName = 'application-document.pdf'
        break
      default:
        console.error('Unknown document type')
        return
    }

    const link = document.createElement('a')
    link.href = filePath
    link.download = fileName
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleZoom = (direction) => {
    setZoomLevel((prev) => {
      const newLevel = direction === 'in' ? prev + 10 : prev - 10
      return Math.max(50, Math.min(150, newLevel))
    })
  }

  const getDocumentTitle = (type) => {
    switch (type) {
      case '7/12':
        return '७/१२ दस्तऐवज'
      case 'ferfar':
        return 'फेरफार दस्तऐवज'
      case 'document':
        return 'अर्ज दस्तऐवज'
      default:
        return ''
    }
  }

  const getDocumentForTab = (tabKey) => {
    switch (tabKey) {
      case 1:
        return { type: '7/12', content: '/satbaaraa.pdf' }
      case 2:
        return { type: 'ferfar', content: '/ferfar.png' }
      case 3:
        return { type: 'document', content: '/document_app.pdf' }
      default:
        return { type: '', content: '' }
    }
  }

  const renderDocumentContent = (doc, tabKey) => {
    if (doc.type === '7/12' || doc.type === 'document') {
      return (
        <iframe
          src={doc.content}
          title={`${doc.type} Document`}
          width={`${zoomLevel}%`}
          height="600px"
          style={{
            borderRadius: '10px',
            border: '1px solid #ccc',
            backgroundColor: '#f9fafb',
          }}
        />
      )
    } else if (doc.type === 'ferfar') {
      return (
        <iframe
          src={doc.content}
          title="Ferfar Document"
          width={`${zoomLevel}%`}
          height="600px"
          style={{
            borderRadius: '10px',
            border: '1px solid #ccc',
            backgroundColor: '#f9fafb',
          }}
        />
      )
    }
  }

  const renderDocumentHeader = (doc, tabKey) => {
    return (
      <div className="d-flex justify-content-center align-items-center mb-3 position-relative">
        <h5 className="text-center mb-0">{getDocumentTitle(doc.type)}</h5>
        {documentHistory.length > 1 && (
          <CButton
            color="link"
            size="sm"
            onClick={() => handleCloseDocument(tabKey)}
            className="p-0 position-absolute end-0"
          >
            <FaTimes className="text-danger" />
          </CButton>
        )}
      </div>
    )
  }

  const renderDocumentView = () => {
    const currentDoc = getDocumentForTab(activeKey)
    const otherDocs = documentHistory.filter((tab) => tab !== activeKey)
    const lastOtherDoc = otherDocs.length > 0 ? otherDocs[otherDocs.length - 1] : null

    if (!lastOtherDoc || activeKey === 4) {
      if (activeKey === 4) {
        return (
          <div className="mb-3">
            <div className="suggested-remarks mb-3">
              <h6>सुचविलेले अभिप्राय:</h6>
              <div className="d-flex flex-wrap gap-2">
                {suggestedRemarks.map((suggestion, index) => (
                  <CButton
                    key={index}
                    color="light"
                    size="sm"
                    onClick={() =>
                      setRemark((prev) => (prev ? `${prev}\n${suggestion}` : suggestion))
                    }
                    className="suggestion-btn"
                  >
                    {suggestion}
                  </CButton>
                ))}
              </div>
            </div>

            <CFormTextarea
              rows={4}
              className="remark-textarea mb-3"
              placeholder="तुमचा अभिप्राय येथे लिहा..."
              value={remark}
              onChange={(e) => setRemark(e.target.value)}
            />
            <div className="priority-selection-sm mb-3">
              <span className="priority-label-sm">
                अभिप्रायाचे प्राधान्य प्रकार :
              </span>

              <div className="d-flex gap-2 mt-2 flex-wrap">
                <label className={`priority-pill low ${priority === 'High' ? 'active' : ''}`}>
                  <input
                    type="radio"
                    name="priorityType"
                    value="Low"
                    checked={priority === 'High'}
                    onChange={() => setPriority('High')}
                  />
                  अतीगंभीर
                </label>

                <label className={`priority-pill medium ${priority === 'Medium' ? 'active' : ''}`}>
                  <input
                    type="radio"
                    name="priorityType"
                    value="Medium"
                    checked={priority === 'Medium'}
                    onChange={() => setPriority('Medium')}
                  />
                  गंभीर
                </label>

                <label className={`priority-pill high ${priority === 'Low' ? 'active' : ''}`}>
                  <input
                    type="radio"
                    name="priorityType"
                    value="High"
                    checked={priority === 'High'}
                    onChange={() => setPriority('Low')}
                  />
                  साधारण
                </label>
              </div>
            </div>

            <div className="d-flex gap-2">
              <CButton color="secondary" onClick={() => setRemark('')} className="clear-button">
                साफ करा
              </CButton>

              <CButton
                color="primary"
                onClick={() => setShowConfirmModal(true)}
                className="submit-button"
                disabled={isLoading}
              >
                {isLoading ? 'जतन होत आहे ...' : 'जतन करा'}
              </CButton>
            </div>

            {submitStatus === 'success' && (
              <CAlert color="success" className="mt-3">
                <FaCheckCircle className="me-2" />
                अभिप्राय यशस्वीरित्या जतन झाला!
              </CAlert>
            )}
          </div>
        )
      }

      return (
        <div className="single-document-view">
          {renderDocumentHeader(currentDoc, activeKey)}
          {renderDocumentContent(currentDoc, activeKey)}
        </div>
      )
    }

    const otherDoc = getDocumentForTab(lastOtherDoc)

    return (
      <CRow>
        <CCol md={6}>
          {renderDocumentHeader(currentDoc, activeKey)}
          {renderDocumentContent(currentDoc, activeKey)}
        </CCol>
        <CCol md={6}>
          {renderDocumentHeader(otherDoc, lastOtherDoc)}
          {renderDocumentContent(otherDoc, lastOtherDoc)}
        </CCol>
      </CRow>
    )
  }

  const documentControls = (
    <div className="d-flex justify-content-end gap-2 mb-3">
      <CTooltip content="Zoom In">
        <CButton
          color="light"
          size="sm"
          onClick={() => handleZoom('in')}
          disabled={zoomLevel >= 150}
        >
          <MdOutlineZoomIn /> +
        </CButton>
      </CTooltip>
      <CTooltip content="Zoom Out">
        <CButton
          color="light"
          size="sm"
          onClick={() => handleZoom('out')}
          disabled={zoomLevel <= 50}
        >
          <MdOutlineZoomIn /> -
        </CButton>
      </CTooltip>
      <CTooltip content="दस्तऐवज डाउनलोड करा">
        <CButton
          color="primary"
          size="sm"
          onClick={() => handleDownload(getDocumentForTab(activeKey).type)}
          disabled={activeKey === 4}
        >
          <FaDownload className="me-1" /> Download
        </CButton>
      </CTooltip>
    </div>
  )

  const tabStyle = (isActive) => ({
    fontWeight: 500,
    fontSize: '15px',
    padding: '10px 15px',
    backgroundColor: isActive ? '#eef2ff' : '#f8f9fa',
    borderBottom: isActive ? '3px solid #6366f1' : '3px solid transparent',
    color: isActive ? '#3730a3' : '#4b5563',
    borderRadius: '6px 6px 0 0',
    transition: 'all 0.3s ease-in-out',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '180px',
  })

  return (
    <CCard className="shadow border-0 mt-4" style={{ backgroundColor: '#f0f4f8' }}>
      <ToastContainer position="top-right" autoClose={2000} theme="colored" />

      <CCardBody>
        <div className="d-flex justify-content-start mb-3">
          <CButton color="light" onClick={handleBack} className="d-flex align-items-center">
            <FaArrowLeft className="me-2" />
            मागे जा
          </CButton>
        </div>
        <CNav variant="tabs" role="tablist" className="mb-3 flex-nowrap overflow-auto">
          <CNavItem className="me-2">
            <CNavLink
              style={tabStyle(activeKey === 1)}
              active={activeKey === 1}
              onClick={() => handleTabChange(1)}
            >
              <FaFilePdf className="me-2" /> ७/१२ पहा
            </CNavLink>
          </CNavItem>
          <CNavItem className="me-2">
            <CNavLink
              style={tabStyle(activeKey === 2)}
              active={activeKey === 2}
              onClick={() => handleTabChange(2)}
            >
              <FaFileSignature className="me-2" /> अर्ज पहा
            </CNavLink>
          </CNavItem>
          <CNavItem className="me-2">
            <CNavLink
              style={tabStyle(activeKey === 3)}
              active={activeKey === 3}
              onClick={() => handleTabChange(3)}
            >
              <FaFilePdf className="me-2" /> दस्ताऐवज पहा
            </CNavLink>
          </CNavItem>
          <CNavItem className="me-2">
            <CNavLink
              style={tabStyle(activeKey === 4)}
              active={activeKey === 4}
              onClick={() => handleTabChange(4)}
            >
              <FaStickyNote className="me-2" /> अभिप्राय नोंदवा
            </CNavLink>
          </CNavItem>
        </CNav>

        <CTabContent className="p-3 bg-white rounded shadow-sm">
          <CTabPane visible={activeKey === 1}>
            {isLoading ? (
              <div className="text-center py-5">
                <CSpinner />
                <p>Loading document...</p>
              </div>
            ) : (
              <>
                {documentControls}
                {renderDocumentView()}
              </>
            )}
          </CTabPane>

          <CTabPane visible={activeKey === 2}>
            {documentControls}
            {renderDocumentView()}
          </CTabPane>

          <CTabPane visible={activeKey === 3}>
            {documentControls}
            {renderDocumentView()}
          </CTabPane>

          <CTabPane visible={activeKey === 4}>{renderDocumentView()}</CTabPane>
        </CTabContent>
      </CCardBody>
      <ConfirmSubmitModal
        visible={showConfirmModal}
        loading={isSubmitting}
        success={submitSuccess}
        onCancel={() => setShowConfirmModal(false)}
        onConfirm={handleSubmit}
      />
    </CCard>
  )
}

export default TrutiDetailsTabs
