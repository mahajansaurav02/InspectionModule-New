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
  //const history = useHistory()
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

  // const { authLogin } = useState('Auth');
  // const { details } = useState('details');

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
    // console.log(expiryDate, 'expiryDate==>');
    const currentTime = new Date().getTime()
    // console.log('currentTime', currentTime);
    const adjExpirationTime = new Date(expiryDate).getTime()
    // console.log('adjExpirationTime', adjExpirationTime);
    const remainingDuration = adjExpirationTime - currentTime
    // console.log('remainingDuration', remainingDuration);
    return 300000000
  }

  const retrieveStoredToken = () => {
    const storedToken = localStorage.getItem('token')
    const storedExpirationDate = localStorage.getItem('expiryDate')
    // console.log('retrieveStoredToken-->>', storedToken, storedExpirationDate);

    const remainingTime = calculateRemainingTime(+storedExpirationDate)
    // console.log('retrieveStoredToken-remainingTime-->>', remainingTime);
    if (new Date().getTime() + remainingTime <= 30000) {
      //  localStorage.removeItem('token');
      // localStorage.removeItem('expiryDate');
      return null
    }
    return {
      token: storedToken,
      duration: remainingTime,
    }
  }
  const [token, setToken] = useState(initialToken)
  const tokenData = retrieveStoredToken()

  //let initialToastTimer;
  // initialToastTimer = tokenData.duration - 900000;

  if (tokenData) {
    initialToken = tokenData.token
  }
  useEffect(() => {
    if (tokenData) {
      //   console.log('Use Effect Log for Token.Duration', tokenData.duration);
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

    // if (logoutTimer) {
    //   clearTimeout(logoutTimer)
    // }
    // if (toastTimerL) {
    //   clearTimeout(toastTimerL)
    // }
  }

  const toastTimerF = () => {
    setToastTimer(true)
  }
  const authLogin = (tokenAfterLogin, expiryDate) => {
    // if (logoutTimer) {
    //   clearTimeout(logoutTimer)
    // }
    // if (toastTimerL) {
    //   clearTimeout(toastTimerL)
    // }
    setToastTimer(false)
    setToken(tokenAfterLogin)
    localStorage.setItem('token', tokenAfterLogin)
    const remainingTime = calculateRemainingTime(expiryDate)

    logoutTimer = setTimeout(logout, remainingTime)
    toastTimerL = setTimeout(toastTimerF, 20000)

    console.log('Remaining Time==>', remainingTime)
    console.log('logoutTimer==>', logoutTimer)
    console.log('toastTimerL==>', toastTimerL)

    sessionStorage.setItem('token', tokenAfterLogin)
    sessionStorage.setItem('expiryDate', expiryDate)
    //toastTimerL = setTimeout(toastTimerF, 20000)
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
      // navigate('/reports/auditForm')
      //history.push(`/reports/auditForm`)
    } else {
      //alert('Captch not match')
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
    // let user_captcha_value = document.getElementById('userCaptcha').value
    // var username = document.getElementById('userId').value

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
          let firstLogin = false
          if (firstLogin) {
            // Open the password change modal and don't navigate away
            setShowChangePasswordModal(true)
            return // Stop further execution
          }
          // console.log(res, 'status-----')
          //--Setting the value to local storage
          localStorage.setItem('challanHeads', JSON.stringify(res?.data?.challanHeads))
          localStorage.setItem('servarthId', res?.data?.servarthId)
          localStorage.setItem('districtCode', res?.data?.districtCode)
          localStorage.setItem('districtName', res?.data?.districtName)
          localStorage.setItem('talukaCode', res?.data?.talukaCode)
          localStorage.setItem('talukaName', res?.data?.talukaName)
          localStorage.setItem('marathiName', res?.data?.marathiName)
          localStorage.setItem('desg', res?.data?.desg)
          localStorage.setItem('echDbName', res?.data?.echDbName)
          localStorage.setItem('echSchemaName', res?.data?.echSchemaName)
          localStorage.setItem('mhrDbName', res?.data?.mhrDbName)
          localStorage.setItem('mhrSchemaName', res?.data?.mhrSchemaName)
          localStorage.setItem('echHost', res?.data?.echHost)
          localStorage.setItem('mhrHost', res?.data?.mhrHost)
          localStorage.setItem('revenueYear', JSON.stringify(res?.data?.revenueYear))
          localStorage.setItem('roles', res?.data?.roles)
          localStorage.setItem('niranks', res?.data?.niranks)
          localStorage.setItem('villageData', JSON.stringify(res?.data?.villages))

          dispatch(
            addHomepageDetails({
              ...homepageState,
              servarthId: res?.data?.servarthId,
              districtCode: res?.data?.districtCode,
              districtName: res?.data?.districtName,
              talukaCode: res?.data?.talukaCode,
              talukaName: res?.data?.talukaName,
              marathiName: res?.data?.marathiName,
              desg: res?.data?.desg,
              revenueYear1: res?.data?.revenueYear,
              villageData: res?.data?.villages,
            }),
          )
          // authLogin(res.data.token, 3600000);

          authLogin(res.data.token, 3600000)
          // console.log(details, 'status-----')
          // token, authLogin, logout, toastTimer
          //console.log(token, '--------1')
          //console.log(authLogin, '--------2')
          // console.log(logout,'--------3');
          //console.log(toastTimer, '--------4')

          //console.log(res, 'status-----')
          // navigate('/reports/auditForm')
          navigate('/dashboard')
          setLoginstatus(true)
        } else {
          //alert('Captch not match')
          setShowToast(true)
          setToastMsg('Captcha does not match.')
          setLoginValue({ ...loginValue, captcha: '' })
        }
      })
      .catch((err) => {
        console.log(err)
        if (err.status == 'FAILURE') {
          //errorToast('Bad credentials')
          setToastMsg('Bad credentials')
        }
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
  //   handleSubmit()
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
              //  width: '3105.7817',
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
                  <h2> {t('title')} </h2>
                  <p className="text-medium-emphasis"> {t('signInTitle')} </p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      id="userId"
                      placeholder={t('UsernamePlaceholder')}
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
                      placeholder={t('PasswordPlaceholder')}
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
                      placeholder={t('CaptchaPlaceholder')}
                      name="captcha"
                      value={loginValue.captcha}
                      onChange={handleChange}
                      // feedbackInvalid={
                      //   validateCaptcha(loginValue.captcha) == true
                      //     ? 'please write same captcha'
                      //     : 'Please provide a captcha.'
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
