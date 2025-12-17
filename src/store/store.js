import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import homepageReducer from './slices/homepageSlice' // example

const store = configureStore({
  reducer: {
    auth: authReducer,          // ✅ MUST be here
    // homepage: homepageReducer,  // other reducers
  },
})

export default store
