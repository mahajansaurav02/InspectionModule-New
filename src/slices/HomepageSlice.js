import { createSlice } from '@reduxjs/toolkit'

const HomepageSlice = createSlice({
  name: 'homepage',
  initialState: {
    talukaName: '',
    talukaCode: '',
    servarthId: '',
    districtCode: '',
    districtName: '',
    marathiName: '',
    desg: '',
    revenueYear1: [],
    villageData: [],
  },
  reducers: {
    addHomepageDetails: (state, { payload }) => {
      return { ...payload }
    },
  },
})
export const { addHomepageDetails } = HomepageSlice?.actions

export const selectState = (state) => state?.homepage

export default HomepageSlice.reducer
