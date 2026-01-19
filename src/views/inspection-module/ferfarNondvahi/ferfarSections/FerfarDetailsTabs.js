import React, { useEffect, useRef, useState } from 'react'
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
  CTooltip,
  CRow,
  CCol,
  CFormCheck,
  CAlert,
} from '@coreui/react'
import {
  FaFilePdf,
  FaFileAlt,
  FaStickyNote,
  FaFileSignature,
  FaDownload,
  FaTimes,
  FaCheckCircle,
} from 'react-icons/fa'
import CryptoJS from 'crypto-js'
import axios from 'axios'
import { errorToast } from 'src/views/ui/Toast'
import './FerfarDetailsTabs.css'
import { MdOutlineZoomIn } from 'react-icons/md'
import URLS from 'src/URLS'
import { useNavigate } from 'react-router-dom'
import api from 'src/api/api'
import { useSelector } from 'react-redux'
import e from 'cors'
import { Bounce, ToastContainer, toast } from 'react-toastify'




const FerfarDetailsTabs = ({ ferfar }) => {
  const [activeKey, setActiveKey] = useState(1)
  const [documentHistory, setDocumentHistory] = useState([1])
  const [remark, setRemark] = useState('')
const [base64Image, setBase64Image] = useState(null)
  const [ferfarImage, setFerfarImage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSatbaraLoading, setIsSatbaraLoading] = useState(false)
  const [zoomLevel, setZoomLevel] = useState(100)
  const [attachedFile, setAttachedFile] = useState(null)
  const [priority, setPriority] = useState('')
  const [remarkTy, setRemarkTy] = useState('')
  const [submitStatus, setSubmitStatus] = useState('')
  const fileInputRef = useRef(null)
  const navigate = useNavigate()
  let VillageData = localStorage.getItem('selectedVillageData')
  let selectedVillageData = JSON.parse(VillageData)
  const { user, roles, token } = useSelector((state) => state.auth || {})
  const revenueYear = user?.revenueYear[0]?.revenueYear
  let {
    cCode,
    distMarathiName,
    districtCode,
    lgdCode,
    talukaCode,
    talukaMarathiName,
    villageName,
  } = selectedVillageData[0]
  const [suggestedRemarks] = useState([
    'अपलोड केलेले दस्तऐवज नुसार सातबारा व अंमल योग्य आला आहे/ नाही',
    'फेरफार विहित मुदतीत प्रमाणित करण्यात आले आहे / नाही',
    'आदेशाची प्रमाणित प्रत अपलोड करण्यात आले आहे / नाही',
    'दस्ताऐवज नुसार फेरफार घेण्यात आलेला आहे/नाही',
    'अपलोड केलेले दस्तऐवज वाचण्यायोग्य आहे/नाही',
  ])

  useEffect(() => {
    get712View()
    // getFerfarView()
  }, [])

  const handleTabChange = (key) => {
    setActiveKey(key)
    setDocumentHistory((prev) => {
      const newHistory = prev.filter((tab) => tab !== key)
      return [...newHistory, key]
    })
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
  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (!file) return

    if (file.type !== 'application/pdf') {
      toast.error('Only PDF files are allowed.', { autoClose: 2000 })

      e.target.value = null
                    setIsLoading(false)

      return
    }
    if (file.size > 1024 * 1024) {
      errorToast('File size must be less than 1 MB.')
      e.target.value = null
                    setIsLoading(false)

      return
    }

    setAttachedFile(file)
  }

  const handleAttachClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }
const get712View = async () => {
  setIsSatbaraLoading(true)
  try {
    const res = await api.post(
      `http://115.124.110.193:8091/echawdi/api/callExternalSatBaraApi?lgdCode=535327&pin=125`
    )

    const encryptedData = res.data.data
    const key = 'hCFaaYFOfOhIXNoeC3dL6YnHWwRPS1Jy'
    const iv = 'C3dL6YnHWwRPS1Jy'

    const decryptedBase64 = decryptDataImage(encryptedData, key, iv)

    if (decryptedBase64) {
      setBase64Image(`data:image/jpeg;base64,${decryptedBase64}`)
    }
  } catch (err) {
    console.error('Failed to load 7/12 document:', err)
  } finally {
    setIsSatbaraLoading(false)
  }
}

const getFerfarView = async () => {
    console.log(ferfar, "======ferfar=========")
    setIsSatbaraLoading(true)
    try {
      const token = 'UcW60oyb7mdxakkWQOYHYqYLaYuquDBmkyir3wBBSkWLsGcoC9JpjidlJuxmdEtI'
      const response = await axios.post(
        `https://api.mahabhumi.gov.in/api/eferfar/getMRView`,
        null,
        {
          headers: {
            Authorization: 'Bearer ' + URLS.ApiToken,
            'API-KEY': URLS.ApiKey,
            'SECRET-KEY': URLS.SecretKey,
          },
          params: {
            lgd_code: '536349',
            mut_no: ferfar.mutNo,
          },
        },
      )

      const encryptedData = response.data.data
      const key = 'hCFaaYFOfOhIXNoeC3dL6YnHWwRPS1Jy'
      const iv = 'C3dL6YnHWwRPS1Jy'
      const base64String = atob(encryptedData)
      const decryptedData = decryptDataImage(base64String, key, iv)
      const parsedData = JSON.parse(decryptedData)

      // setFerfarImage(parsedData)
    } catch (err) {
      errorToast('Failed to load 7/12 document')
      console.error(err)
    } finally {
      setIsSatbaraLoading(false)
    }
  }
  const decryptDataImage = (ciphertext, keyStr, ivStr) => {
  try {
    const cleanCiphertext = ciphertext.replace(/ /g, '+');

    const key = CryptoJS.enc.Utf8.parse(keyStr);
    const iv = CryptoJS.enc.Utf8.parse(ivStr);

    const cipherParams = CryptoJS.lib.CipherParams.create({
      ciphertext: CryptoJS.enc.Base64.parse(cleanCiphertext),
    });

    const decrypted = CryptoJS.AES.decrypt(cipherParams, key, {
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });

    const base64Result = decrypted.toString(CryptoJS.enc.Base64);

    if (!base64Result) throw new Error("Empty decrypt output");

    return base64Result;
  } catch (err) {
    console.error("Decryption Core Error:", err);
    return null;
  }
};

  const handleSubmit = async () => {
        setIsLoading(true)

    if (!priority) {
      // toast.warn('')
      toast.warn('कृपया अभिप्रायाचे प्राधान्य प्रकार निवडा', {
position: "top-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: false,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "colored",
transition: Bounce,
});
              setIsLoading(false)

      return

    }

    let remarkType = ''
    if (priority === 'High') remarkType = 'अतीगंभीर'
    if (priority === 'Medium') remarkType = 'गंभीर'
    if (priority === 'Low') remarkType = 'साधारण'


    try {
      const formData = new FormData()

      const dataPayload = {
        districtCode,
        talukaCode,
        ccode: cCode,
        revenueYear,
        mutNo: ferfar.mutNo,
        ferfar_type: ferfar.ferfar_type,
        remark,
        remarkType,
      }

      // ✅ Append JSON payload
      formData.append('data', JSON.stringify(dataPayload))

      // ✅ Append file only if exists
      if (attachedFile) {
        formData.append('File', attachedFile)
      }else{
        formData.append('File', null)
      }

      // 🔍 Debug FormData (IMPORTANT)
      for (const [key, value] of formData.entries()) {
        console.log(key, value)
      }

      const res = await api.post(
        '/inpsection/saveFerfarForInspection',
        formData
      )

      if (res.status === 201) {
        setSubmitStatus('success')

        setTimeout(() => {
          setSubmitStatus(null)
          setRemark('')
          navigate(-1)
        }, 1000)
      } else {
        throw new Error('Unexpected response')
      }
    } catch (err) {
      console.error('Submit error:', err)
      setSubmitStatus('error')
      alert(err?.response?.data?.message || 'Failed to submit remark')
    } finally {
      setIsLoading(false)
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
      case 'other':
        filePath = '/document_app.pdf'
        fileName = 'ferfar-document.pdf'
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
      case 'other':
        return 'इतर दस्तऐवज'
      default:
        return ''
    }
  }

  const getDocumentForTab = (tabKey) => {
    switch (tabKey) {
      case 1:
        return { type: '7/12', content: base64Image }
      case 2:
        return { type: 'ferfar', content: ferfarImage }
      case 3:
        return { type: 'other', content: '/document_app.pdf' }
      default:
        return { type: '', content: '' }
    }
  }
const renderDocumentContent = (doc, tabKey) => {
  if (doc.type === '7/12') {
    console.log(doc.content,"=====doc.content=====")
    if (!doc.content) {
      return <div className="text-muted">७/१२ उपलब्ध नाही</div>
    }

    // ✅ CORRECT: render base64 as IMAGE
    return (
      <div className="image-container">
        <img
          src={doc.content}
          alt="7/12 Document"
          style={{
            width: '100%',
            height: 'auto',
            transform: `scale(${zoomLevel / 100})`,
            transformOrigin: 'top center',
          }}
          onError={(e) => {
            console.error('7/12 image failed to load')
            e.target.src = '/placeholder-image.png'
          }}
        />
      </div>
    )
  }

  if (doc.type === 'ferfar') {
    if (!doc.content) {
      return <div className="text-muted">फेरफार दस्तऐवज उपलब्ध नाही</div>
    }

    return (
      <div className="image-container">
        <img
          src={doc.content}
          alt="Ferfar Document"
          style={{ width: '100%', height: 'auto' }}
        />
      </div>
    )
  }

  // PDFs / others
  return (
    <iframe
      src={doc.content}
      title="Document viewer"
      width="100%"
      height="500px"
      style={{ border: '1px solid #ddd' }}
    />
  )
}

  const renderDocumentHeader = (doc, tabKey) => {
    return (
      <div className="d-flex justify-content-center align-items-center mb-3 position-relative">
        <h5 className="mb-0">{getDocumentTitle(doc.type)}</h5>
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
            <div className="d-flex align-items-center gap-2 mb-3">
              <input
                type="file"
                accept="application/pdf"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
              <CButton color="info" onClick={handleAttachClick}>
                दस्ताऐवज जोडा
              </CButton>
              {attachedFile && <span className="text-success small">{attachedFile.name}</span>}
            </div>
            {' '}
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
                    checked={priority === 'Low'}
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

              <CButton disabled={!remark.trim()}
                color="primary" onClick={handleSubmit} className="submit-button">
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

  return (
    <CCard className="ferfar-details-card">
<ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="colored"
transition={Bounce}
/>      <CCardBody className="tabscard">
        <CNav variant="tabs" role="tablist" className="ferfar-tab-nav">
          <CNavItem className="ferfar-tab-item">
            <CNavLink
              className="ferfar-tab-link"
              active={activeKey === 1}
              onClick={() => handleTabChange(1)}
            >
              <FaFilePdf className="me-2" /> ७/१२ पहा
            </CNavLink>
          </CNavItem>
          <CNavItem className="ferfar-tab-item">
            <CNavLink
              className="ferfar-tab-link"
              active={activeKey === 2}
              onClick={() => handleTabChange(2)}
            >
              <FaFileSignature className="me-2" /> फेरफार पहा
            </CNavLink>
          </CNavItem>
          <CNavItem className="ferfar-tab-item">
            <CNavLink
              className="ferfar-tab-link"
              active={activeKey === 3}
              onClick={() => handleTabChange(3)}
            >
              <FaFileAlt className="me-2" /> दस्ताऐवज पहा
            </CNavLink>
          </CNavItem>
          <CNavItem className="ferfar-tab-item">
            <CNavLink
              className="ferfar-tab-link"
              active={activeKey === 4}
              onClick={() => handleTabChange(4)}
            >
              <FaStickyNote className="me-2" />
              अभिप्राय नोंदवा
            </CNavLink>
          </CNavItem>
        </CNav>

        <CTabContent className="ferfar-tab-content">
          <CTabPane visible={activeKey === 1}>
            {isLoading ? (
              <div className="document-loading">
                <div className="loading-spinner" />
                <p className="loading-text">Loading document...</p>
                <p className="loading-subtext">Please wait while we prepare your document</p>
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
    </CCard>
  )
}

export default FerfarDetailsTabs
