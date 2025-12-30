import React, { useEffect, useState } from 'react'
import { CContainer } from '@coreui/react'
import { FormControl, TextField, Grid, Box, Paper, Divider, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import { selectState } from '../../../slices/HomepageSlice'
import { useTranslation } from 'react-i18next'
import { styled } from '@mui/material/styles'
import '../Dashboard.css'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'

const StyledPaper = styled(Paper)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
  backgroundColor: '#f9f9f9',
  marginBlock: theme.spacing(1),
}))

const CustomSelect = styled(Select)(({ theme }) => ({
  '& .MuiSelect-select': {
    padding: '8px 10px',
    minHeight: '1.4375em',
  },
  '&.MuiOutlinedInput-root': {
    borderRadius: theme.shape.borderRadius,
    '& fieldset': {
      borderColor: '#a0a0a0',
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main,
      borderWidth: '2px',
    },
  },
}))

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: theme.shape.borderRadius,
    backgroundColor: '#fcfcfc',
  },
  '& .MuiOutlinedInput-root.Mui-disabled': {
    backgroundColor: '#fcfcfc',
    color: theme.palette.text.primary,
    WebkitTextFillColor: theme.palette.text.primary,
    opacity: 1,
  },
}))

const getInspectionVillages = () => {
  try {
    const data = localStorage.getItem('villageForInspection')
    return data ? JSON.parse(data) : []
  } catch (error) {
    console.error('Error parsing villageForInspection from localStorage:', error)
    return []
  }
}

const getRevenueYearsList = (stateRevenueYear1) => {
  if (Array.isArray(stateRevenueYear1) && stateRevenueYear1.length > 0) {
    return stateRevenueYear1
  }

  try {
    const data = localStorage.getItem('revenueYear')
    if (data && data.startsWith('[')) {
      const parsedData = JSON.parse(data)
      return Array.isArray(parsedData) ? parsedData : []
    }
  } catch (error) {
    console.error('Error parsing revenueYear array from localStorage:', error)
  }
  return []
}

const Section1 = ({ setDropdownVal, dropdownVal = {}, compact = false }) => {
  const { t } = useTranslation('dashboard')
  const state = useSelector(selectState)

  const inspectionVillages = getInspectionVillages()
  const revenueYearList = getRevenueYearsList(state?.revenueYear1)

  const firstVillage = inspectionVillages[0]
  const firstRevenueYear = revenueYearList[0]
  const selectedVillage = localStorage.getItem('selectedVillageData')
  const villageName = JSON.parse(selectedVillage)
  const selectedMainVillage = villageName ? villageName[0]?.villageName || '' : ''
  const initialVillageName = dropdownVal.village ?? (firstVillage?.villageName || '')
  const initialRevenueYear = dropdownVal.revenueYear ?? (firstRevenueYear?.revenueYear || '')

  const [localDisplayData, setLocalDisplayData] = useState({
    districtName: localStorage.getItem('districtName') || firstVillage?.distMarathiName || '',
    talukaName: localStorage.getItem('talukaName') || firstVillage?.talukaMarathiName || '',
    village: initialVillageName,
    revenueYear: initialRevenueYear,
  })

  useEffect(() => {
    if (inspectionVillages.length > 0 && !dropdownVal.village) {
      setDropdownVal((prev) => ({
        ...prev,
        village: firstVillage.villageName,
        villageCode: firstVillage.lgdCode,
        cCode: firstVillage.cCode,
        districtCode: firstVillage.districtCode,
        talukaCode: firstVillage.talukaCode,
      }))

      setLocalDisplayData((prev) => ({
        ...prev,
        village: firstVillage.villageName,
        districtName: firstVillage.distMarathiName,
        talukaName: firstVillage.talukaMarathiName,
      }))
    }

    if (revenueYearList.length > 0 && !dropdownVal.revenueYear) {
      setDropdownVal((prev) => ({
        ...prev,
        revenueYear: firstRevenueYear.revenueYear,
      }))
    }
  }, [
    inspectionVillages.length,
    revenueYearList.length,
    dropdownVal.village,
    dropdownVal.revenueYear,
    setDropdownVal,
  ])

  const handleChange = (e) => {
    const { name, value } = e?.target

    if (name === 'revenueYear') {
      setLocalDisplayData((prev) => ({ ...prev, revenueYear: value }))
      setDropdownVal((prev) => ({ ...prev, revenueYear: value }))
    } else if (name === 'village') {
      const selctedVillageData = inspectionVillages.find((u) => u.villageName === value)
      console.log(selctedVillageData, 'checkkkk All data')
      localStorage.setItem('selectedVillageData', JSON.stringify([{ ...selctedVillageData }]))
      if (selctedVillageData) {
        setDropdownVal((prev) => ({
          ...prev,
          village: value,
          villageCode: selctedVillageData.lgdCode,
          cCode: selctedVillageData.cCode,
          districtCode: selctedVillageData.districtCode,
          talukaCode: selctedVillageData.talukaCode,
        }))

        setLocalDisplayData((prev) => ({
          ...prev,
          village: value,
          districtName: selctedVillageData.distMarathiName,
          talukaName: selctedVillageData.talukaMarathiName,
        }))
      }
    }
  }

  return (
    <CContainer fluid>
      <StyledPaper
        elevation={compact ? 0 : 2}
        sx={{
          boxShadow: compact ? 'none' : undefined,
          backgroundColor: compact ? 'transparent' : '#f9f9f9',
          marginBlock: compact ? 0 : 1,
          padding: compact ? 0 : 1,
        }}
      >
        <Box sx={{ p: compact ? 0 : 1 }}>
          <Grid
            container
            spacing={compact ? 1 : 2}
            alignItems="center"
            justifyContent="flex-start"
            wrap="wrap"
          >
            <Grid
              item
              xs={compact ? 'auto' : 12}
              sm={compact ? 'auto' : 6}
              md={compact ? 'auto' : 3}
            >
              <FormControl size="small" sx={{ minWidth: 100 }}>
                <StyledTextField
                  label="जिल्हा"
                  value={localDisplayData.districtName}
                  size="small"
                  disabled
                />
              </FormControl>
            </Grid>

            <Grid
              item
              xs={compact ? 'auto' : 12}
              sm={compact ? 'auto' : 6}
              md={compact ? 'auto' : 3}
            >
              <FormControl size="small" sx={{ minWidth: 100 }}>
                <StyledTextField
                  label="तालुका"
                  value={localDisplayData.talukaName}
                  size="small"
                  disabled
                />
              </FormControl>
            </Grid>

            <Grid
              item
              xs={compact ? 'auto' : 12}
              sm={compact ? 'auto' : 6}
              md={compact ? 'auto' : 3}
            >
              <FormControl size="small" sx={{ minWidth: 100 }}>
                <InputLabel id="village-label" size="small">
                  गाव
                </InputLabel>
                <CustomSelect
                  labelId="village-label"
                  name="village"
                  value={selectedMainVillage}
                  onChange={handleChange}
                >
                  {inspectionVillages.map((val) => (
                    <MenuItem key={val?.cCode} value={val?.villageName}>
                      {val?.villageName}
                    </MenuItem>
                  ))}
                </CustomSelect>
              </FormControl>
            </Grid>

            <Grid
              item
              xs={compact ? 'auto' : 12}
              sm={compact ? 'auto' : 6}
              md={compact ? 'auto' : 3}
            >
              <FormControl size="small" sx={{ minWidth: 100 }}>
                <InputLabel id="revenue-year-label" size="small">
                  महसूल वर्ष
                </InputLabel>
                <CustomSelect
                  labelId="revenue-year-label"
                  name="revenueYear"
                  value={'2024-25'}
                  onChange={handleChange}
                  defaultValue={'2024-25'}
                >
                  {revenueYearList.map((year) => (
                    <MenuItem defaultValue={'2024-25'} key={year?.revenueYear} value={'2024-25'}>
                      {'2024-25'}
                    </MenuItem>
                  ))}
                </CustomSelect>
              </FormControl>
            </Grid>
          </Grid>
        </Box>
      </StyledPaper>
    </CContainer>
  )
}

export default Section1
