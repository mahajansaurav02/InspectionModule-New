import React, { useEffect, useState, useCallback, useMemo } from 'react'
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

  // Memoize these values to prevent unnecessary recalculations
  const inspectionVillages = useMemo(() => getInspectionVillages(), [])
  const revenueYearList = useMemo(() => getRevenueYearsList(state?.revenueYear1), [state?.revenueYear1])

  const firstVillage = useMemo(() => inspectionVillages[0], [inspectionVillages])
  const firstRevenueYear = useMemo(() => revenueYearList[0], [revenueYearList])

  // Get selected village data from localStorage only once
  const [selectedMainVillage, setSelectedMainVillage] = useState(() => {
    try {
      const selectedVillage = localStorage.getItem('selectedVillageData')
      const villageName = selectedVillage ? JSON.parse(selectedVillage) : null
      return villageName && villageName[0]?.villageName ? villageName[0].villageName : ''
    } catch (error) {
      console.error('Error parsing selectedVillageData:', error)
      return ''
    }
  })

  const [localDisplayData, setLocalDisplayData] = useState(() => ({
    districtName: localStorage.getItem('districtName') || firstVillage?.distMarathiName || '',
    talukaName: localStorage.getItem('talukaName') || firstVillage?.talukaMarathiName || '',
    village: dropdownVal.village ?? (firstVillage?.villageName || ''),
    revenueYear: dropdownVal.revenueYear ?? (firstRevenueYear?.revenueYear || ''),
  }))

  // Initialize dropdown values only once on mount
  useEffect(() => {
    let shouldUpdate = false
    
    if (inspectionVillages.length > 0 && !dropdownVal.village && firstVillage) {
      setDropdownVal(prev => ({
        ...prev,
        village: firstVillage.villageName,
        villageCode: firstVillage.lgdCode,
        cCode: firstVillage.cCode,
        districtCode: firstVillage.districtCode,
        talukaCode: firstVillage.talukaCode,
      }))
      
      setLocalDisplayData(prev => ({
        ...prev,
        village: firstVillage.villageName,
        districtName: firstVillage.distMarathiName,
        talukaName: firstVillage.talukaMarathiName,
      }))
      
      setSelectedMainVillage(firstVillage.villageName)
      shouldUpdate = true
    }

    if (revenueYearList.length > 0 && !dropdownVal.revenueYear && firstRevenueYear) {
      setDropdownVal(prev => ({
        ...prev,
        revenueYear: firstRevenueYear.revenueYear,
      }))
      shouldUpdate = true
    }

    // Only run this effect once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // Empty dependency array - runs only once on mount

  // Use useCallback to memoize the handleChange function
  const handleChange = useCallback((e) => {
    const { name, value } = e?.target

    if (name === 'revenueYear') {
      setLocalDisplayData(prev => ({ ...prev, revenueYear: value }))
      setDropdownVal(prev => ({ ...prev, revenueYear: value }))
    } else if (name === 'village') {
      const selectedVillageData = inspectionVillages.find(u => u.villageName === value)
      
      if (selectedVillageData) {
        // Batch state updates
        setDropdownVal(prev => ({
          ...prev,
          village: value,
          villageCode: selectedVillageData.lgdCode,
          cCode: selectedVillageData.cCode,
          districtCode: selectedVillageData.districtCode,
          talukaCode: selectedVillageData.talukaCode,
        }))

        setLocalDisplayData(prev => ({
          ...prev,
          village: value,
          districtName: selectedVillageData.distMarathiName,
          talukaName: selectedVillageData.talukaMarathiName,
        }))

        setSelectedMainVillage(value)
        
        // Update localStorage
        try {
          localStorage.setItem('selectedVillageData', JSON.stringify([{ ...selectedVillageData }]))
        } catch (error) {
          console.error('Error saving to localStorage:', error)
        }
      }
    }
  }, [inspectionVillages, setDropdownVal])

  // Get current revenue year value
  const currentRevenueYear = useMemo(() => 
    dropdownVal.revenueYear || localDisplayData.revenueYear || '2024-25',
    [dropdownVal.revenueYear, localDisplayData.revenueYear]
  )

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
                  value={selectedMainVillage || localDisplayData.village}
                  onChange={handleChange}
                >
                  {inspectionVillages.map((val) => (
                    <MenuItem key={val?.cCode || val?.villageName} value={val?.villageName}>
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
                  value={currentRevenueYear}
                  onChange={handleChange}
                >
                  {revenueYearList.map((year) => (
                    <MenuItem 
                      key={year?.revenueYear} 
                      value={year?.revenueYear}
                    >
                      {year?.revenueYear}
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

export default React.memo(Section1) // Wrap with React.memo to prevent unnecessary re-renders