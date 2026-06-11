import axios from 'axios'
import {
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  clearAllTokens,
} from '../utils/cookieUtils'
import URLS from '../URLS'

/**
 * Centralized Axios instance with request and response interceptors.
 * Handles automatic token attachment and seamless refresh-token flow on expiration.
 */

const api = axios.create({
  baseURL: URLS.BaseURL,
  withCredentials: true, // Ensures cross-origin requests include HttpOnly cookies
})

let isRefreshing = false
let failedQueue = []

// Helper function to process queued requests after a successful token refresh
const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error)
    } else {
      prom.resolve(token)
    }
  })
  failedQueue = []
}

// Request Interceptor: Attach Access Token and necessary headers to every request
api.interceptors.request.use(
  (config) => {
    const token = getAccessToken()
    console.log('➡️ API Call चाललाय! Interceptor मधून टोकन मिळाला: ', token)
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }

    // Attach dynamic configuration headers from localStorage
    config.headers['Accept-Language'] =
      localStorage.getItem('umi_locale') === 'ma-IN' ? 'mr-IN' : 'en-US'
    config.headers['echHost'] = localStorage.getItem('echHost')
    config.headers['mhrHost'] = localStorage.getItem('mhrHost')
    config.headers['echDbName'] = localStorage.getItem('echDbName')
    config.headers['echSchemaName'] = localStorage.getItem('echSchemaName')
    config.headers['servarthId'] = localStorage.getItem('servarthId')

    return config
  },
  (error) => Promise.reject(error),
)

// Response Interceptor: Handle 401/403 Unauthorized errors and trigger token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    // If token is expired/unauthorized and request hasn't been retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject })
        })
          .then((token) => {
            originalRequest.headers['Authorization'] = 'Bearer ' + token
            return api(originalRequest)
          })
          .catch((err) => Promise.reject(err))
      }

      originalRequest._retry = true
      isRefreshing = true

      try {
        const refreshToken = getRefreshToken()
        // const refreshToken = '2ea235e2-d846-4d6f-b0e4-17828fe6bf0c'
        if (!refreshToken) {
          throw new Error('No refresh token available==============')
        }
        console.log('🔄 Refreshing token using refresh token: ', refreshToken)
        const refreshUrl = `${URLS.AuthURL}/refreshtoken?refreshToken=${refreshToken}`
        const refreshResponse = await axios.post(refreshUrl, { withCredentials: true })

        const newAccessToken =
          refreshResponse.data.token || refreshResponse.data.accessToken || refreshResponse.data.jwt

        if (newAccessToken) {
          setAccessToken(newAccessToken)
        } else {
          throw new Error('Invalid token received from refresh API')
        }

        // Process paused requests with the new token
        processQueue(null, newAccessToken)
        isRefreshing = false

        // Replay the original failed request
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`
        return api(originalRequest)
      } catch (refreshError) {
        // If the refresh token itself is expired, force logout
        processQueue(refreshError, null)
        isRefreshing = false
        clearAllTokens()
        // localStorage.clear()
        // window.location.href = '/Login'
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  },
)

export default api
