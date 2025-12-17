import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isAuthenticated: false,
  token: null,
  expiryTime: null,
  user: null,
  roles: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true
      state.token = action.payload.token
      state.expiryTime = action.payload.expiryTime
      state.user = action.payload.user
      state.roles = action.payload.roles
    },
    logout: (state) => {
      return initialState
    },
  },
})

export const { loginSuccess, logout } = authSlice.actions
export default authSlice.reducer
