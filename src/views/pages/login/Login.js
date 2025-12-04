import React, { useEffect, useState } from 'react'
import LanguageSelector from '../../../components/language-selector'
import { Trans, useTranslation } from 'react-i18next'
import { Link, redirect, useHistory, useLocation, useNavigate } from 'react-router-dom'
import Background from 'src/assets/images/Maharashtra_Divisions_Eng.png'
//import Background from 'src/assets/images/Maharashtra_Divisions_Eng.svg'
import ToasterMessage from 'src/components/ToasterMessage'
import ErrorSuccessToast from 'src/components/ErrorSuccessToast'
import { validUser, validPassword, NUMBERS_ONLY, CHAR_ONLY } from 'src/components/Regex'
import { AES, enc } from 'crypto-js'
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined'
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined'
import axios from 'axios'
import URLS from 'src/URLS'
import './login.css'

import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser, cilClosedCaptioning, cilLowVision } from '@coreui/icons'
import { LoadCanvasTemplate, loadCaptchaEnginge, validateCaptcha } from 'react-simple-captcha'
import { useDispatch, useSelector } from 'react-redux'
import { selectState, addHomepageDetails } from '../../../slices/HomepageSlice'
import { Button } from '@mui/material'
import { Toast, errorToast } from 'src/views/ui/Toast'
import ChangePasswordModal from 'src/views/ui/ChangePasswordModal/ChangePasswordModal'

const baseURL = 'https://localhost:9092/inspection/getRoles'

const Login = () => {
  const { t } = useTranslation('login')
  //const { line1, line2 } = t('description', { channel: 'RoadsideCoder' })

  const homepageState = useSelector(selectState)
  const dispatch = useDispatch()
  let logoutTimer
  let toastTimerL
  let initialToken
  const navigate = useNavigate()
  const [loginValue, setLoginValue] = useState({
    userName: '',
    password: '',
    captcha: '',
  })
  const [showToast, setShowToast] = useState(false)
  const [toastMsg, setToastMsg] = useState(false)
  const [validated, setValidated] = useState(false)
  const [userErr, setUserErr] = useState(false)
  const [pwdError, setPwdError] = useState(false)
  const [username, setUsername] = useState()
  const [loginstatus, setLoginstatus] = useState(false)
  const [warnpassword, setwarnpassword] = useState(false)
  const [eye, seteye] = useState(true)
  const [password, setpassword] = useState('password')
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false)
  const [type, settype] = useState(false)

  const [toastTimer, setToastTimer] = useState(false)
  const [passwordType, setPasswordType] = useState('password')

  const [loadings, setLoadings] = useState([])

  const Eye = () => {
    if (password == 'password') {
      setpassword('text')
      seteye(false)
      settype(true)
    } else {
      setpassword('password')
      seteye(true)
      settype(false)
    }
  }
  const calculateRemainingTime = (expiryDate) => {
    const currentTime = new Date().getTime()
    const adjExpirationTime = new Date(expiryDate).getTime()
    const remainingDuration = adjExpirationTime - currentTime
    return 300000000
  }

  const retrieveStoredToken = () => {
    const storedToken = localStorage.getItem('token')
    const storedExpirationDate = localStorage.getItem('expiryDate')

    const remainingTime = calculateRemainingTime(+storedExpirationDate)
    if (new Date().getTime() + remainingTime <= 30000) {
      return null
    }
    return {
      token: storedToken,
      duration: remainingTime,
    }
  }
  const [token, setToken] = useState(initialToken)
  const tokenData = retrieveStoredToken()

  if (tokenData) {
    initialToken = tokenData.token
  }
  useEffect(() => {
    if (tokenData) {
      logoutTimer = setTimeout(logout, tokenData.duration)
    }
  }, [tokenData])

  const logout = () => {
    setToken('')
    setToastTimer(false)
    //setToastTimer();
    localStorage.clear()
    localStorage.removeItem('token')
    localStorage.removeItem('expiryDate')
  }

  const toastTimerF = () => {
    setToastTimer(true)
  }
  const authLogin = (tokenAfterLogin, expiryDate) => {
    setToastTimer(false)
    setToken(tokenAfterLogin)
    localStorage.setItem('token', tokenAfterLogin)

    localStorage.setItem('expiryDate', expiryDate)

    const remainingTime = calculateRemainingTime(expiryDate)

    logoutTimer = setTimeout(logout, remainingTime)
    toastTimerL = setTimeout(toastTimerF, 20000)

    console.log('Remaining Time==>', remainingTime)
    console.log('logoutTimer==>', logoutTimer)
    console.log('toastTimerL==>', toastTimerL)

    sessionStorage.setItem('token', tokenAfterLogin)
    sessionStorage.setItem('expiryDate', expiryDate)
  }

  const handleLogin = async (e) => {
    // const history = useHistory()
    const form = e.currentTarget

    if (form.checkValidity() === false) {
      e.preventDefault()
      e.stopPropagation()
    }
    setValidated(true)

    if (validateCaptcha(loginValue.captcha) == true) {
    } else {
      setShowToast(true)
      setToastMsg('Captcha does not match.')
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target

    setLoginValue({ ...loginValue, [name]: value })
    // handleSubmit()
  }

  const handlePasswordChange = async (userId, newPassword) => {
    console.log('password change Succesfully')
  }
  const handleSubmit = async (values) => {
    if (validateCaptcha(loginValue.captcha) == false) {
      console.log('captcha doest matcha')
      setToastMsg('Captcha does not match.')
      setShowToast(true)
      setLoginValue({ ...loginValue, captcha: '' })

      return
    }
    const role = localStorage.getItem('roles')
    //--for encrypted password
    const key = 'wXhN%8T@hS$Z@Q'
    const CryptoJS = require('crypto-js')
    const password = document.getElementById('userPassword').value
    const encrypted = CryptoJS.AES.encrypt(password, key)
    console.log(loginValue.userName, 'User Id')
    console.log(encrypted.toString(), 'pass')
    const article = {
      servarthId: loginValue.userName,
      password: encrypted.toString(),
      // servarthId: 'REVARPM8102',
      // password: 'U2FsdGVkX19//z2Rgu8CDefCCeHBVoRVU6Cg7vLBKOs=',
    }

    await axios
      // http://localhost:8091/echawdi/api/authenticateUserByUsernameAndPassword
      .post(`${URLS.AuthURL}/authenticateUserByUsernameAndPassword`, article)
      .then((res) => {
        //try {
        //alert('fetch data from api')
        let testStatus = res.status

        if (testStatus === 200 && validateCaptcha(loginValue.captcha) == true) {
          const data = res.data

          let firstLogin = false // Assuming this flag will come from the actual response data if needed
          if (firstLogin) {
            // Open the password change modal and don't navigate away
            setShowChangePasswordModal(true)
            return // Stop further execution
          }

          localStorage.setItem('token', data.token) // Explicitly setting token from response
          localStorage.setItem('expiryDate', data.expiryTime) // New field for expiration

          const rolesToStore = Array.isArray(data.roles)
            ? data.roles[0]
            : JSON.stringify(data.roles)

          localStorage.setItem('fullName', data.fullName)
          localStorage.setItem('servarthId', data.servarthId)
          localStorage.setItem('districtCode', data.districtCode)
          localStorage.setItem('districtName', data.districtName)
          localStorage.setItem('talukaCode', data.talukaCode)
          localStorage.setItem('talukaName', data.talukaName) // Null in sample, but stored for consistency
          localStorage.setItem('marathiName', data.marathiName)
          localStorage.setItem('desg', data.desg) // Null in sample, but stored for consistency
          localStorage.setItem('echDbName', data.echDbName)
          localStorage.setItem('echSchemaName', data.echSchemaName)
          localStorage.setItem('mhrDbName', data.mhrDbName)
          localStorage.setItem('mhrSchemaName', data.mhrSchemaName)
          localStorage.setItem('echHost', data.echHost)
          localStorage.setItem('mhrHost', data.mhrHost)

          // Arrays stored as JSON strings
          localStorage.setItem('revenueYear', JSON.stringify(data.revenueYear))
          localStorage.setItem('villageForInspection', JSON.stringify(data.villageForInspection)) // NEW
          localStorage.setItem('challanHeads', JSON.stringify(data.challanHeads))
          localStorage.setItem(
            'selectedVillageData',
            JSON.stringify([{ ...data.villageForInspection[0] }]),
          )
          // Storing the processed role string
          localStorage.setItem('roles', rolesToStore)

          // Data not in the new response (like niranks) is removed or set to null
          localStorage.removeItem('niranks')
          // If you need to store niranks, ensure the key is correct in the API response.

          // --------------------------------------------------------------------------
          // --- UPDATING REDUX STATE ---
          // --------------------------------------------------------------------------

          dispatch(
            addHomepageDetails({
              ...homepageState,
              servarthId: data.servarthId,
              districtCode: data.districtCode,
              districtName: data.districtName,
              talukaCode: data.talukaCode,
              talukaName: data.talukaName,
              marathiName: data.marathiName,
              desg: data.desg,
              revenueYear1: data.revenueYear,
              villageData: data.villageForInspection, // Updated to use villageForInspection
            }),
          )

          // --------------------------------------------------------------------------

          authLogin(data.token, data.expiryTime)
          navigate('/dashboard')
          setLoginstatus(true)
        } else {
          //alert('Captch not match')
          setShowToast(true)
          setToastMsg('Captcha does not match.')
          setLoginValue({ ...loginValue, captcha: '' })
          loadCaptchaEnginge(6, 'skyblue') // Reload captcha on failure
        }
      })
      .catch((err) => {
        console.log(err)
        // Check for specific error response status code or message if available
        if (err.response && err.response.status === 401) {
          setToastMsg('Bad credentials. Please check username or password.')
        } else {
          setToastMsg('An error occurred during login.')
        }
        setShowToast(true)
        // Reload captcha on failed API call
        loadCaptchaEnginge(6, 'skyblue')
      })
  }
  const togglePassword = () => {
    if (passwordType === 'password') {
      setPasswordType('text')
      return
    }
    setPasswordType('password')
  }

  // useEffect(() => {
  //   handleSubmit()
  // }, [])
  useEffect(() => {
    loadCaptchaEnginge(6, 'skyblue')
  }, [validated])

  return (
    <>
      {/* <CContainer fluid> */}
      {/* <LanguageSelector /> */}
      {showChangePasswordModal && (
        <ChangePasswordModal
          userId={loginValue.userName}
          onClose={() => setShowChangePasswordModal(false)}
          onPasswordChange={handlePasswordChange}
        />
      )}
      <Toast />

      <CRow className="loginscreen">
        <CCol md={8} xs={12}>
          <div
            className="bg-light min-vh-100 d-flex flex-row align-items-center justify-content-end"
            style={{
              backgroundImage: `url(${Background})`,
              //  width: '3105.7817',
              // height: '2453.0112',
              // width: '100vw',
              // height: '50vh',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              backgroundSize: '66vw 100vh',
              // position: 'relative',
            }}
          ></div>
        </CCol>
        {showToast && <ToasterMessage message={toastMsg} color="warning" />}
        {loginstatus && <ErrorSuccessToast message="Successfully logged in." color="primary" />}
        {/* <CContainer style={{ position: 'absolute', right: 0, top: '50%' }}> */}
        {/* <CRow className="justify-content-center"> */}
        <CCol md={4} xs={12}>
          <LanguageSelector />
          <CCardGroup>
            <CCard className="p-4">
              <CCardBody>
                <CForm
                  className="row g-3 needs-validation"
                  noValidate
                  validated={validated}
                  //onSubmit={handleLogin}
                >
                  {/* <h2> Inspection Module e-Chawadi </h2> */}
                  <h2> Inspection Module e-Chawadi </h2>
                  <p className="text-medium-emphasis"> Sign In to your account </p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      id="userId"
                      placeholder={t('Username')}
                      autoComplete="username"
                      name="userName"
                      className={` ${warnpassword ? 'warning' : ''} ${type ? 'type_password' : ''}`}
                      value={loginValue.userName}
                      onChange={handleChange}
                      feedbackInvalid="Please provide a user name."
                      required
                    />
                  </CInputGroup>
                  {userErr && <span color="red"> Your user name is invalid </span>}
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      //type="password"
                      type={passwordType}
                      id="userPassword"
                      placeholder={t('Password')}
                      autoComplete="current-password"
                      name="password"
                      value={loginValue.password}
                      onChange={handleChange}
                      feedbackInvalid="Please provide a password."
                      required
                    />

                    <Button variant="outlined" style={{ borderLeft: '0' }} onClick={togglePassword}>
                      {passwordType === 'password' ? (
                        <VisibilityOffOutlinedIcon color="#87CEEB" />
                      ) : (
                        <RemoveRedEyeOutlinedIcon color="#87CEEB" />
                      )}
                    </Button>
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <LoadCanvasTemplate />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilClosedCaptioning} />
                    </CInputGroupText>
                    <CFormInput
                      type="text"
                      id="userCaptcha"
                      placeholder={t('Captcha')}
                      name="captcha"
                      value={loginValue.captcha}
                      onChange={handleChange}
                      // feedbackInvalid={
                      //   validateCaptcha(loginValue.captcha) == true
                      //     ? 'please write same captcha'
                      //     : 'Please provide a captcha.'
                      // }
                      required
                      // tooltipFeedback
                    />
                  </CInputGroup>
                  <div className="d-grid gap-2 col-12 mx-auto">
                    {/* <CRow> */}
                    {/* <CCol style={{ textAlign: 'center' }}> */}
                    <CButton color="primary" className="px-4" onClick={handleSubmit}>
                      {t('login')}
                    </CButton>
                    {/* </CCol> */}
                    {/* </CRow> */}
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCardGroup>
        </CCol>
      </CRow>
    </>
  )
}

export default Login
