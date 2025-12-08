import { configureStore } from '@reduxjs/toolkit'
import UserDetailsReducer from './slices/UserSlice'
import InspectionReducer from './slices/InspectionSlice'
import HomepageSlice from './slices/HomepageSlice'
import InspectionOnlineReducer from './slices/InspectionOnlineSlice'

const store = configureStore({
  reducer: {
    user: UserDetailsReducer,
    inspection: InspectionReducer,
    inspectionOnline: InspectionOnlineReducer,
    homepage: HomepageSlice,
  },
})

export default store









//---------------------------------------------------------default
// import { createStore } from 'redux'

// const initialState = {
//   sidebarShow: true,
// }

// const changeState = (state = initialState, { type, ...rest }) => {
//   switch (type) {
//     case 'set':
//       return { ...state, ...rest }
//     default:
//       return state
//   }
// }

// const store = createStore(changeState)
// export default store

