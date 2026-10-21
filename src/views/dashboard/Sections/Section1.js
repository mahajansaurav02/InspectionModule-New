
import React, { useEffect, useMemo, useState } from 'react'
import { CContainer } from '@coreui/react'
import {
  FormControl,
  TextField,
  Grid,
  Box,
  Paper,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import '../Dashboard.css'

// ---------- Styles ----------

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
}))

// ---------- Helpers ----------

const readLocalStorage = (key, fallback = null) => {
  try {
    const value = localStorage.getItem(key)
    return value ? JSON.parse(value) : fallback
  } catch {
    return fallback
  }
}

const getInspectionVillages = () => {
  const data = readLocalStorage('villageList', [])
  return Array.isArray(data) ? data : []
}

const getRevenueYearsList = () => {
  const data = readLocalStorage('revenueYear', [])
  return Array.isArray(data) ? data : []
}

// ---------- Component ----------

const Section1 = ({
  setDropdownVal,
  dropdownVal = {},
  compact = false,
}) => {
  const inspectionVillages = useMemo(
    () => getInspectionVillages(),
    []
  )

  const revenueYearList = useMemo(
    () => getRevenueYearsList(),
    []
  )

  const selectedVillageData = readLocalStorage(
    'selectedVillageData',
    []
  )

  const savedVillage = Array.isArray(selectedVillageData)
    ? selectedVillageData[0]
    : selectedVillageData

  const firstVillage = inspectionVillages[0]

  // villageCode contains the Marathi village name.
  // villageName contains the numeric village ID.
  const [selectedVillageId, setSelectedVillageId] = useState(
    String(
      savedVillage?.villageName ??
      dropdownVal.villageId ??
      firstVillage?.villageName ??
      ''
    )
  )

  const revenueYears = revenueYearList
    .map((item) =>
      typeof item === 'string'
        ? item
        : item?.revenueYear
    )
    .filter(Boolean)

  const availableYears = revenueYears.length
    ? revenueYears
    : ['2023-24', '2024-25', '2025-26', '2026-27']

  const selectedYear =
    localStorage.getItem('selectedRevenueYear') ||
    localStorage.getItem('Ry') ||
    dropdownVal.revenueYear ||
    availableYears[0] ||
    ''

  const [revenueYear, setRevenueYear] = useState(selectedYear)

  const currentVillage =
    inspectionVillages.find(
      (village) =>
        String(village.villageName) === selectedVillageId
    ) || firstVillage

  const [localDisplayData, setLocalDisplayData] = useState({
    districtName:
      localStorage.getItem('districtName') || '',
    talukaName:
      localStorage.getItem('talukaName') || '',
  })

  // ---------- Initial selection ----------

  useEffect(() => {
    if (!currentVillage) return

    const villageId = String(currentVillage.villageName)

    setSelectedVillageId(villageId)

    setLocalDisplayData({
      districtName:
        localStorage.getItem('districtName') ||
        currentVillage.distMarathiName ||
        '',
      talukaName:
        localStorage.getItem('talukaName') ||
        currentVillage.talukaMarathiName ||
        '',
    })

    setDropdownVal?.((prev) => ({
      ...prev,
      village: currentVillage.villageCode,
      villageId: currentVillage.villageName,
      villageCode: currentVillage.villageCode,
      cCode: currentVillage.cCode,
      lgdCode: currentVillage.lgdCode?.trim(),
      sajjaCode: currentVillage.sajjaCode,
      sajjaName: currentVillage.sajjaName?.trim(),
      circleCode: currentVillage.circleCode,
      circleName: currentVillage.circleName,
      districtCode: currentVillage.distCode,
      talukaCode: currentVillage.talukaCode,
      niranks: currentVillage.niranks ?? [],
    }))
  }, [currentVillage?.cCode, setDropdownVal])

  // ---------- Handle dropdown changes ----------

  const handleChange = (event) => {
    const { name, value } = event.target

    if (name === 'village') {
      const selected = inspectionVillages.find(
        (village) =>
          String(village.villageName) === String(value)
      )

      if (!selected) return

      setSelectedVillageId(String(selected.villageName))

      // Save the complete original object.
      localStorage.setItem(
        'selectedVillageData',
        JSON.stringify([selected])
      )

      localStorage.setItem(
        'selectedVillage',
        selected.villageCode
      )

      setLocalDisplayData({
        districtName:
          localStorage.getItem('districtName') ||
          selected.distMarathiName ||
          '',
        talukaName:
          localStorage.getItem('talukaName') ||
          selected.talukaMarathiName ||
          '',
      })

      setDropdownVal?.((prev) => ({
        ...prev,
        village: selected.villageCode,
        villageId: selected.villageName,
        villageCode: selected.villageCode,
        cCode: selected.cCode,
        lgdCode: selected.lgdCode?.trim(),
        sajjaCode: selected.sajjaCode,
        sajjaName: selected.sajjaName?.trim(),
        circleCode: selected.circleCode,
        circleName: selected.circleName,
        districtCode: selected.distCode,
        talukaCode: selected.talukaCode,
        niranks: selected.niranks ?? [],
      }))
    }

    if (name === 'revenueYear') {
      setRevenueYear(value)

      localStorage.setItem('Ry', value)
      localStorage.setItem('selectedRevenueYear', value)

      setDropdownVal?.((prev) => ({
        ...prev,
        revenueYear: value,
      }))
    }
  }

  // ---------- UI ----------

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
            {/* District */}
            <Grid
              item
              xs={compact ? 'auto' : 12}
              sm={compact ? 'auto' : 6}
              md={compact ? 'auto' : 3}
            >
              <FormControl size="small" sx={{ minWidth: 120 }}>
                <StyledTextField
                  label="जिल्हा"
                  value={localDisplayData.districtName}
                  size="small"
                  disabled
                />
              </FormControl>
            </Grid>

            {/* Taluka */}
            <Grid
              item
              xs={compact ? 'auto' : 12}
              sm={compact ? 'auto' : 6}
              md={compact ? 'auto' : 3}
            >
              <FormControl size="small" sx={{ minWidth: 120 }}>
                <StyledTextField
                  label="तालुका"
                  value={localDisplayData.talukaName}
                  size="small"
                  disabled
                />
              </FormControl>
            </Grid>

            {/* Village */}
            <Grid
              item
              xs={compact ? 'auto' : 12}
              sm={compact ? 'auto' : 6}
              md={compact ? 'auto' : 3}
            >
              <FormControl size="small" sx={{ minWidth: 150 }}>
                <InputLabel id="village-label" size="small">
                  गाव
                </InputLabel>

                <CustomSelect
                  labelId="village-label"
                  label="गाव"
                  name="village"
                  value={selectedVillageId}
                  onChange={handleChange}
                  size="small"
                >
                  {inspectionVillages.map((village) => (
                    <MenuItem
                      key={village.cCode}
                      value={String(village.villageName)}
                    >
                      {village.villageName}
                    </MenuItem>
                  ))}
                </CustomSelect>
              </FormControl>
            </Grid>

            {/* Revenue Year */}
            <Grid
              item
              xs={compact ? 'auto' : 12}
              sm={compact ? 'auto' : 6}
              md={compact ? 'auto' : 3}
            >
              <FormControl size="small" sx={{ minWidth: 130 }}>
                <InputLabel
                  id="revenue-year-label"
                  size="small"
                >
                  महसूल वर्ष
                </InputLabel>

                <CustomSelect
                  labelId="revenue-year-label"
                  label="महसूल वर्ष"
                  name="revenueYear"
                  value={revenueYear}
                  onChange={handleChange}
                  size="small"
                >
                  {availableYears.map((year) => (
                    <MenuItem key={year} value={year}>
                      {year}
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
