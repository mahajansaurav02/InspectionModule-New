import axios from 'axios'
import {
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  clearAllTokens,
} from '../utils/cookieUtils'
import URLS from '../URLS'
import { toast, Bounce } from 'react-toastify'
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
    console.log('➡️ Access Token retrieved from interceptor: ', token)
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
        // const refreshToken = '60307fba-45c2-4907-8c30-7fb1b813c2a8'
        if (!refreshToken) {
          throw new Error('No refresh token available==============')
        }
        console.log('🔄 Refreshing token using refresh token: ', refreshToken)
        const refreshUrl = `${URLS.AuthURL}/refreshtoken?refreshToken=${refreshToken}`
        const refreshResponse = await axios.post(refreshUrl, null, { withCredentials: true })

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
        const errorStatus = refreshError.response?.status

        // Clear the failed requests queue and reset the refreshing state
        processQueue(refreshError, null)
        isRefreshing = false

        // 1. If a 500 Internal Server Error occurs: Show an toast, DO NOT clear cookies
        if (errorStatus === 500) {
          setTimeout(() => {
            toast.error('Network error, please try again later.', {
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
          }, 500)
        }
        // 2. If a 403 Forbidden Error occurs: Clear cookies, clear storage, and logout
        else if (errorStatus === 403) {
          clearAllTokens()
          localStorage.clear()
          window.location.href = '/Login'
        }
        // 3. Default fallback for any other unhandled errors
        // else {
        //   clearAllTokens()
        // }

        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  },
)

//       } catch (refreshError) {
//         // If the refresh token itself is expired, force logout
//         processQueue(refreshError, null)
//         isRefreshing = false
//         clearAllTokens()
//         // localStorage.clear()
//         // window.location.href = '/Login'
//         return Promise.reject(refreshError)
//       }
//     }

//     return Promise.reject(error)
//   },
// )

export default api
