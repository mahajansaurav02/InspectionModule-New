import Cookies from 'js-cookie'

/**
 * Utility functions to manage authentication tokens using cookies.
 * This ensures better security against XSS attacks compared to localStorage.
 */

// Saves the access token in a strict same-site cookie
export const setAccessToken = (token) => {
  Cookies.set('accessToken', token, { sameSite: 'strict' })
}

// NEW: Saves the encodedKey as the refreshToken
export const setRefreshToken = (token) => {
  Cookies.set('refreshToken', token, {
    sameSite: 'strict',
    path: '/',
  })
}

// Retrieves the access token from the cookie
export const getAccessToken = () => {
  return Cookies.get('accessToken')
}

// Retrieves the refresh token (set by the frontend from the login response's encodedKey)
export const getRefreshToken = () => {
  const refreshToken = Cookies.get('refreshToken')
  console.log('🔍 Retrieved refresh token from cookie: ', refreshToken)
  // console.log()
  return Cookies.get('refreshToken')
}

// Clears all authentication cookies during logout
export const clearAllTokens = () => {
  console.log('🔥 Alert: Cookies are being cleared right now!')
  Cookies.remove('accessToken')
  Cookies.remove('refreshToken')
}
