import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addInspectionDetailsOnline, selectState } from '../../../../slices/InspectionOnlineSlice'
import InfoIcon from '@mui/icons-material/Info'

import {
  CButton,
  CFormCheck,
  CFormTextarea,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CTable,
  CTableBody,
  CTooltip,
  CTabPane,
  CTabContent,
  CNavLink,
  CNavItem,
  CNav,
} from '@coreui/react'
import VillageForm1ATable from './SectionTables/VillageForm1ATable'
import VillageForm1Btable from './SectionTables/VillageForm1BTable'
import VillageForm1CTable from './SectionTables/VillageForm1CTable'
import VillageForm1DTable from './SectionTables/VillageForm1DTable'
import VillageForm1ETable from './SectionTables/VillageForm1ETable'
import VillageForm1LiveTable from './SectionTables/VillageForm1LiveTable'
import VillageForm1ODCTable from './SectionTables/VillageForm1ODCTable'
import VillageForm1ODCDiffTable from './SectionTables/VillageForm1ODCDiffTable'
import VillageForm4Table from './SectionTables/VillageForm4Table'
import VillageForm2Table from './SectionTables/VillageForm2Table'
import VillageForm3Table from './SectionTables/VillageForm3Table'
import VillageForm5Table from './SectionTables/VillageForm5table'
import VillageForm6Table from './SectionTables/VillageForm6Table'
import VillageForm6ATable from './SectionTables/VillageForm6ATable'
import VillageForm6BTable from './SectionTables/VillageForm6BTable'
import VillageForm6CTable from './SectionTables/VillageForm6CTable'
import VillageForm6DTable from './SectionTables/VillageForm6DTable'
import ReusableDependencyQue from './ReusableComponents/ReusableDependencyQue'
import VillageForm7ATable from './SectionTables/VillageForm7ATable'
import VillageForm7BTable from './SectionTables/VillageForm7BTable'
import VillageForm8ATable from './SectionTables/VillageForm8ATable'
import VillageForm8BTable from './SectionTables/VillageForm8BTable'
import VillageForm8CTable from './SectionTables/VillageForm8CTable'
import VillageForm8DTable from './SectionTables/VillageForm8DTable'
import VillageForm14Table from './SectionTables/VillageForm14Table'
import VillageForm15Table from './SectionTables/VillageForm15Table'
import VillageForm17Table from './SectionTables/VillageForm17Table'
import VillageForm19Table from './SectionTables/VillageForm19Table'
import VillageForm7FerfarTable from './SectionTables/VillageForm7FerfarTable'
import VillageForm7NZaleleTable from './SectionTables/VillageForm7NZaleleTable'
import VillageForm7AhawalTable from './SectionTables/VillageForm7AhawalTable'
import VillageForm7_7_12Table from './SectionTables/VillageForm7_7_12Table'
import axios from 'axios'
import Base64 from 'crypto-js/enc-base64'
// import { AES, enc, CryptoJS } from 'crypto-js'
import CryptoJS from 'crypto-js'

import { Decrypt, Encrypt } from '../Sections/SectionTables/crypto'
import { Height } from '@mui/icons-material'
const Section1 = () => {
  const [visible, setVisible] = useState(false)
  const [selectedTable, setSelectedtable] = useState('')
  const dispatch = useDispatch()
  const reduxInspectionState = useSelector(selectState)
  const [activeKey, setActiveKey] = useState(1)

  let talukCode = JSON.parse(localStorage.getItem('talukaCode'))
  let districtCode = JSON.parse(localStorage.getItem('districtCode'))
  let villageData = JSON.parse(localStorage.getItem('villageData'))
  const token = 'FCk6WvUiq70RKTpnwf0ASuMWl2ki6rXdhCFaaYFOfOhIXNoeC3dL6YnHWwRPS1Jy'

  const decryptData = (ciphertext, key, iv) => {
    const decrypted = CryptoJS.AES.decrypt(ciphertext, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    })
    return decrypted.toString(CryptoJS.enc.Utf8)
  }

  const getFerfarData = async () => {
    try {
      console.log('Fetching Ferfar Data...')

      // Manually defined formdata (for testing)
      const formdata = {
        district_code: '9',
        taluka_code: '4',
        ccode: '270900044090300000',
      }

      // API call
      const response = await axios.post(
        'https://api.mahabhumi.gov.in/api/eferfar/dsd_dataunsign_mis_live',
        formdata,
        {
          headers: {
            Authorization:
              'Bearer FCk6WvUiq70RKTpnwf0ASuMWl2ki6rXdhCFaaYFOfOhIXNoeC3dL6YnHWwRPS1Jy',
            'API-KEY': 'f3c040ae-4264-f1d1-ac58-486e2453',
            'SECRET-KEY': '9z3g7YaHCzwj4diHacM2Cdt8Cg1FOYVLjh2nOtRjGBz67Ygh3UiYzwcOe5By',
            'Content-Type': 'application/json',
          },
        },
      )

      // Log response
      console.log(response.data.data, 'Response Data')

      // Base64 encode response data
      const base64 = btoa(response.data.data)
      console.log(base64, '---base64')

      // Decrypt data
      const key = 'hCFaaYFOfOhIXNoeC3dL6YnHWwRPS1Jy'
      const iv = 'C3dL6YnHWwRPS1Jy'
      const keyWA = CryptoJS.enc.Utf8.parse(key)
      const ivWA = CryptoJS.enc.Utf8.parse(iv)

      const decryptedData = decryptData(base64, keyWA, ivWA)
      console.log(decryptedData, 'Decrypted Data')
    } catch (error) {
      if (error.response) {
        console.error('Server Error:', error.response.data)
      } else if (error.request) {
        console.error('Network Error:', error.request)
      } else {
        console.error('Error:', error.message)
      }
    }
  }

  // Call the function
  getFerfarData()

  // Call the function
  getFerfarData()

  const handleChange = (e) => {
    const { name, value } = e?.target

    if (name == 'que1' && value == 'नाही') {
      dispatch(
        addInspectionDetailsOnline({
          ...reduxInspectionState,
          que1: {
            ...reduxInspectionState?.que1,
            [name]: value,
            remarksQue1: '',
          },
        }),
      )
    } else if (name == 'que1' || name == 'remarksQue1') {
      dispatch(
        addInspectionDetailsOnline({
          ...reduxInspectionState,
          que1: { ...reduxInspectionState?.que1, [name]: value },
        }),
      )
    }

    if (name == 'que1a' && value == 'नाही') {
      dispatch(
        addInspectionDetailsOnline({
          ...reduxInspectionState,
          que1a: {
            ...reduxInspectionState?.que1a,
            [name]: value,
            remarksQue1a: '',
          },
        }),
      )
    } else if (name == 'que1a' || name == 'remarksQue1a') {
      dispatch(
        addInspectionDetailsOnline({
          ...reduxInspectionState,
          que1a: { ...reduxInspectionState?.que1a, [name]: value },
        }),
      )
    }

    if (name == 'que1b' && value == 'नाही') {
      dispatch(
        addInspectionDetailsOnline({
          ...reduxInspectionState,
          que1b: {
            ...reduxInspectionState?.que1b,
            [name]: value,
            remarksQue1b: '',
          },
        }),
      )
    } else if (name == 'que1b' || name == 'remarksQue1b') {
      dispatch(
        addInspectionDetailsOnline({
          ...reduxInspectionState,
          que1b: { ...reduxInspectionState?.que1b, [name]: value },
        }),
      )
    }

    if (name == 'que1c' && value == 'नाही') {
      dispatch(
        addInspectionDetailsOnline({
          ...reduxInspectionState,
          que1c: {
            ...reduxInspectionState?.que1c,
            [name]: value,
            remarksQue1c: '',
          },
        }),
      )
    } else if (name == 'que1c' || name == 'remarksQue1c') {
      dispatch(
        addInspectionDetailsOnline({
          ...reduxInspectionState,
          que1c: { ...reduxInspectionState?.que1c, [name]: value },
        }),
      )
    }

    if (name == 'que1d' && value == 'नाही') {
      dispatch(
        addInspectionDetailsOnline({
          ...reduxInspectionState,
          que1d: {
            ...reduxInspectionState?.que1d,
            [name]: value,
            remarksQue1d: '',
          },
        }),
      )
    } else if (name == 'que1d' || name == 'remarksQue1d') {
      dispatch(
        addInspectionDetailsOnline({
          ...reduxInspectionState,
          que1d: { ...reduxInspectionState?.que1d, [name]: value },
        }),
      )
    }

    if (name == 'que1e' && value == 'नाही') {
      dispatch(
        addInspectionDetailsOnline({
          ...reduxInspectionState,
          que1e: {
            ...reduxInspectionState?.que1e,
            [name]: value,
            remarksQue1e: '',
          },
        }),
      )
    } else if (name == 'que1e' || name == 'remarksQue1e') {
      dispatch(
        addInspectionDetailsOnline({
          ...reduxInspectionState,
          que1e: { ...reduxInspectionState?.que1e, [name]: value },
        }),
      )
    }

    if (name == 'que7' && value == 'नाही') {
      dispatch(
        addInspectionDetailsOnline({
          ...reduxInspectionState,
          que7: {
            ...reduxInspectionState?.que7,
            [name]: value,
            remarksQue7: '',
          },
        }),
      )
    } else if (name == 'que7' || name == 'remarksQue7') {
      dispatch(
        addInspectionDetailsOnline({
          ...reduxInspectionState,
          que7: { ...reduxInspectionState?.que7, [name]: value },
        }),
      )
    }

    if (name == 'que8' && value == 'नाही') {
      dispatch(
        addInspectionDetailsOnline({
          ...reduxInspectionState,
          que8: {
            ...reduxInspectionState?.que8,
            [name]: value,
            remarksQue8: '',
          },
        }),
      )
    } else if (name == 'que8' || name == 'remarksQue8') {
      dispatch(
        addInspectionDetailsOnline({
          ...reduxInspectionState,
          que8: { ...reduxInspectionState?.que8, [name]: value },
        }),
      )
    }

    if (name == 'que9' && value == 'नाही') {
      dispatch(
        addInspectionDetailsOnline({
          ...reduxInspectionState,
          que9: {
            ...reduxInspectionState?.que9,
            [name]: value,
            remarksQue9: '',
          },
        }),
      )
    } else if (name == 'que9' || name == 'remarksQue9') {
      dispatch(
        addInspectionDetailsOnline({
          ...reduxInspectionState,
          que9: { ...reduxInspectionState?.que9, [name]: value },
        }),
      )
    }

    if (name == 'que10' && value == 'नाही') {
      dispatch(
        addInspectionDetailsOnline({
          ...reduxInspectionState,
          que10: {
            ...reduxInspectionState?.que10,
            [name]: value,
            remarksQue10: '',
          },
        }),
      )
    } else if (name == 'que10' || name == 'remarksQue10') {
      dispatch(
        addInspectionDetailsOnline({
          ...reduxInspectionState,
          que10: { ...reduxInspectionState?.que10, [name]: value },
        }),
      )
    }

    if (name == 'que11' && value == 'नाही') {
      dispatch(
        addInspectionDetailsOnline({
          ...reduxInspectionState,
          que11: {
            ...reduxInspectionState?.que11,
            [name]: value,
            remarksQue11: '',
          },
        }),
      )
    } else if (name == 'que11' || name == 'remarksQue11') {
      dispatch(
        addInspectionDetailsOnline({
          ...reduxInspectionState,
          que11: { ...reduxInspectionState?.que11, [name]: value },
        }),
      )
    }

    if (name == 'que11a' && value == 'नाही') {
      dispatch(
        addInspectionDetailsOnline({
          ...reduxInspectionState,
          que11a: {
            ...reduxInspectionState?.que11a,
            [name]: value,
            remarksQue11a: '',
          },
        }),
      )
    } else if (name == 'que11a' || name == 'remarksQue11a') {
      dispatch(
        addInspectionDetailsOnline({
          ...reduxInspectionState,
          que11a: { ...reduxInspectionState?.que11a, [name]: value },
        }),
      )
    }

    if (name == 'que11b' && value == 'नाही') {
      dispatch(
        addInspectionDetailsOnline({
          ...reduxInspectionState,
          que11b: {
            ...reduxInspectionState?.que11b,
            [name]: value,
            remarksQue11b: '',
          },
        }),
      )
    } else if (name == 'que11b' || name == 'remarksQue11b') {
      dispatch(
        addInspectionDetailsOnline({
          ...reduxInspectionState,
          que11b: { ...reduxInspectionState?.que11b, [name]: value },
        }),
      )
    }

    if (name == 'que11c' && value == 'नाही') {
      dispatch(
        addInspectionDetailsOnline({
          ...reduxInspectionState,
          que11c: {
            ...reduxInspectionState?.que11c,
            [name]: value,
            remarksQue11c: '',
          },
        }),
      )
    } else if (name == 'que11c' || name == 'remarksQue11c') {
      dispatch(
        addInspectionDetailsOnline({
          ...reduxInspectionState,
          que11c: { ...reduxInspectionState?.que11c, [name]: value },
        }),
      )
    }

    if (name == 'que11d' && value == 'नाही') {
      dispatch(
        addInspectionDetailsOnline({
          ...reduxInspectionState,
          que11d: {
            ...reduxInspectionState?.que11d,
            [name]: value,
            remarksQue11d: '',
          },
        }),
      )
    } else if (name == 'que11d' || name == 'remarksQue11d') {
      dispatch(
        addInspectionDetailsOnline({
          ...reduxInspectionState,
          que11d: { ...reduxInspectionState?.que11d, [name]: value },
        }),
      )
    }

    // if (name == 'que16_1' && value == 'नाही') {
    //   dispatch(
    //     addInspectionDetailsOnline({
    //       ...reduxInspectionState,
    //       que16: [
    //         ...reduxInspectionState?.que16,
    //         {
    //           [name]: value,
    //           remarksQue16_1: '',
    //         },
    //       ],
    //     }),
    //   )
    // } else if (name == 'que16_1' || name == 'remarksQue16_1') {
    //   dispatch(
    //     addInspectionDetailsOnline({
    //       ...reduxInspectionState,
    //       que16: [...reduxInspectionState?.que16, { [name]: value }],
    //     }),
    //   )
    // }

    if (name == 'que16_1' && value == 'नाही') {
      dispatch(
        addInspectionDetailsOnline({
          ...reduxInspectionState,
          que16_1: {
            ...reduxInspectionState?.que16_1,
            [name]: value,
            remarksQue16_1: '',
          },
        }),
      )
    } else if (name == 'que16_1' || name == 'remarksQue16_1') {
      dispatch(
        addInspectionDetailsOnline({
          ...reduxInspectionState,
          que16_1: { ...reduxInspectionState?.que16_1, [name]: value },
        }),
      )
    }

    if (name == 'que16_2' && value == 'नाही') {
      dispatch(
        addInspectionDetailsOnline({
          ...reduxInspectionState,
          que16_2: {
            ...reduxInspectionState?.que16_2,
            [name]: value,
            remarksQue16_2: '',
          },
        }),
      )
    } else if (name == 'que16_2' || name == 'remarksQue16_2') {
      dispatch(
        addInspectionDetailsOnline({
          ...reduxInspectionState,
          que16_2: { ...reduxInspectionState?.que16_2, [name]: value },
        }),
      )
    }

    if (name == 'que16a' && value == 'नाही') {
      dispatch(
        addInspectionDetailsOnline({
          ...reduxInspectionState,
          que16a: {
            ...reduxInspectionState?.que16a,
            [name]: value,
            remarksQue16a: '',
          },
        }),
      )
    } else if (name == 'que16a' || name == 'remarksQue16a') {
      dispatch(
        addInspectionDetailsOnline({
          ...reduxInspectionState,
          que16a: { ...reduxInspectionState?.que16a, [name]: value },
        }),
      )
    }

    if (name == 'que16b' && value == 'नाही') {
      dispatch(
        addInspectionDetailsOnline({
          ...reduxInspectionState,
          que16b: {
            ...reduxInspectionState?.que16b,
            [name]: value,
            remarksQue16b: '',
          },
        }),
      )
    } else if (name == 'que16b' || name == 'remarksQue16b') {
      dispatch(
        addInspectionDetailsOnline({
          ...reduxInspectionState,
          que16b: { ...reduxInspectionState?.que16b, [name]: value },
        }),
      )
    }

    if (name == 'que19a' && value == 'नाही') {
      dispatch(
        addInspectionDetailsOnline({
          ...reduxInspectionState,
          que19a: {
            ...reduxInspectionState?.que19a,
            [name]: value,
            remarksQue19a: '',
          },
        }),
      )
    } else if (name == 'que19a' || name == 'remarksQue19a') {
      dispatch(
        addInspectionDetailsOnline({
          ...reduxInspectionState,
          que19a: { ...reduxInspectionState?.que19a, [name]: value },
        }),
      )
    }

    if (name == 'que19b' && value == 'नाही') {
      dispatch(
        addInspectionDetailsOnline({
          ...reduxInspectionState,
          que19b: {
            ...reduxInspectionState?.que19b,
            [name]: value,
            remarksQue19b: '',
          },
        }),
      )
    } else if (name == 'que19b' || name == 'remarksQue19b') {
      dispatch(
        addInspectionDetailsOnline({
          ...reduxInspectionState,
          que19b: { ...reduxInspectionState?.que19b, [name]: value },
        }),
      )
    }

    if (name == 'que19c' && value == 'नाही') {
      dispatch(
        addInspectionDetailsOnline({
          ...reduxInspectionState,
          que19c: {
            ...reduxInspectionState?.que19c,
            [name]: value,
            remarksQue19c: '',
          },
        }),
      )
    } else if (name == 'que19c' || name == 'remarksQue19c') {
      dispatch(
        addInspectionDetailsOnline({
          ...reduxInspectionState,
          que19c: { ...reduxInspectionState?.que19c, [name]: value },
        }),
      )
    }

    if (name == 'que19d' && value == 'नाही') {
      dispatch(
        addInspectionDetailsOnline({
          ...reduxInspectionState,
          que19d: {
            ...reduxInspectionState?.que19d,
            [name]: value,
            remarksQue19d: '',
          },
        }),
      )
    } else if (name == 'que19d' || name == 'remarksQue19d') {
      dispatch(
        addInspectionDetailsOnline({
          ...reduxInspectionState,
          que19d: { ...reduxInspectionState?.que19d, [name]: value },
        }),
      )
    }

    if (name == 'que24' && value == 'नाही') {
      dispatch(
        addInspectionDetailsOnline({
          ...reduxInspectionState,
          que24: {
            ...reduxInspectionState?.que24,
            [name]: value,
            remarksQue24: '',
          },
        }),
      )
    } else if (name == 'que24' || name == 'remarksQue24') {
      dispatch(
        addInspectionDetailsOnline({
          ...reduxInspectionState,
          que24: { ...reduxInspectionState?.que24, [name]: value },
        }),
      )
    }

    if (name == 'que25' && value == 'नाही') {
      dispatch(
        addInspectionDetailsOnline({
          ...reduxInspectionState,
          que25: {
            ...reduxInspectionState?.que25,
            [name]: value,
            remarksQue25: '',
          },
        }),
      )
    } else if (name == 'que25' || name == 'remarksQue25') {
      dispatch(
        addInspectionDetailsOnline({
          ...reduxInspectionState,
          que25: { ...reduxInspectionState?.que25, [name]: value },
        }),
      )
    }

    if (name == 'que26' && value == 'नाही') {
      dispatch(
        addInspectionDetailsOnline({
          ...reduxInspectionState,
          que26: {
            ...reduxInspectionState?.que26,
            [name]: value,
            remarksQue26: '',
          },
        }),
      )
    } else if (name == 'que26' || name == 'remarksQue26') {
      dispatch(
        addInspectionDetailsOnline({
          ...reduxInspectionState,
          que26: { ...reduxInspectionState?.que26, [name]: value },
        }),
      )
    }

    if (name == 'que27' && value == 'नाही') {
      dispatch(
        addInspectionDetailsOnline({
          ...reduxInspectionState,
          que27: {
            ...reduxInspectionState?.que27,
            [name]: value,
            remarksQue27: '',
          },
        }),
      )
    } else if (name == 'que27' || name == 'remarksQue27') {
      dispatch(
        addInspectionDetailsOnline({
          ...reduxInspectionState,
          que27: { ...reduxInspectionState?.que27, [name]: value },
        }),
      )
    }
  }

  const handleShowTable = (val) => {
    setSelectedtable(val)
    console.info('valie show table ', selectedTable)
    setVisible(!visible)
  }

  const customTooltipStyle = {
    '--cui-tooltip-bg': 'var(--cui-primary)',
    '--cui-tooltip-max-width': '500px', // Set max width as per requirement
  }
  return (
    <>
      <CModal
        backdrop="static"
        alignment="center"
        size="xl"
        fullscreen="xxl"
        visible={visible}
        onClose={() => setVisible(false)}
        aria-labelledby="LiveDemoExampleLabel"
      >
        <CModalHeader onClose={() => setVisible(false)}>
          <CModalTitle id="LiveDemoExampleLabel">
            {selectedTable == 'que1Live' && 'गाव नमुना १-Live तक्ता'}
            {selectedTable == 'que1ODC' && 'गाव नमुना १-ODC तक्ता'}
            {selectedTable == 'que1ODCDiff' && 'गाव नमुना १-ODC Diffrence तक्ता'}
            {selectedTable == 'que1a' && 'गाव नमुना १-अ तक्ता'}
            {selectedTable == 'que1b' && 'गाव नमुना १-ब तक्ता'}
            {selectedTable == 'que1c' && 'गाव नमुना १-क तक्ता'}
            {selectedTable == 'que1d' && 'गाव नमुना १-ड तक्ता'}
            {selectedTable == 'que1e' && 'गाव नमुना १-ई तक्ता'}
            {selectedTable == 'que7' && 'गाव नमुना २ तक्ता'}
            {selectedTable == 'que8' && 'गाव नमुना ३ तक्ता'}
            {selectedTable == 'que9' && 'गाव नमुना ४ तक्ता'}
            {selectedTable == 'que10' && 'गाव नमुना ५ तक्ता'}
            {selectedTable == 'que11' && 'गाव नमुना ६ तक्ता'}
            {selectedTable == 'que11a' && 'गाव नमुना ६अ तक्ता'}
            {selectedTable == 'que11b' && 'गाव नमुना ६ब तक्ता'}
            {selectedTable == 'que11c' && 'गाव नमुना ६क तक्ता'}
            {selectedTable == 'que11d' && 'गाव नमुना ६ड तक्ता'}
            {selectedTable == 'que16' && 'गाव नमुना ७ तक्ता'}
            {selectedTable == 'que16a' && 'गाव नमुना ७अ तक्ता'}
            {selectedTable == 'que16ferfar' && 'गाव नमुना ७ फेरफार तक्ता'}
            {selectedTable == 'que16nzalele' && 'गाव नमुना ७ नझालेले तक्ता'}
            {selectedTable == 'que16ahawal' && 'गाव नमुना ७ अहवाल तक्ता'}
            {selectedTable == 'que16b' && 'गाव नमुना ७ब तक्ता'}
            {selectedTable == 'que19a' && 'गाव नमुना ८अ तक्ता'}
            {selectedTable == 'que19b' && 'गाव नमुना ८ब तक्ता'}
            {selectedTable == 'que19c' && 'गाव नमुना ८क तक्ता'}
            {selectedTable == 'que19d' && 'गाव नमुना ८ड तक्ता'}
            {selectedTable == 'que24' && 'गाव नमुना 14 तक्ता'}
            {selectedTable == 'que25' && 'गाव नमुना 15 तक्ता'}
            {selectedTable == 'que26' && 'गाव नमुना 17 तक्ता'}
            {selectedTable == 'que27' && 'गाव नमुना 19 तक्ता'}
          </CModalTitle>
        </CModalHeader>
        <CModalBody style={{ overflow: selectedTable == 'que8' ? 'auto' : 'visible' }}>
          {selectedTable == 'que1Live' && <VillageForm1LiveTable />}
          {selectedTable == 'que1ODC' && <VillageForm1ODCTable />}
          {selectedTable == 'que1ODCDiff' && <VillageForm1ODCDiffTable />}
          {selectedTable == 'que1a' && <VillageForm1ATable />}
          {selectedTable == 'que1b' && <VillageForm1Btable />}
          {selectedTable == 'que1c' && <VillageForm1CTable />}
          {selectedTable == 'que1d' && <VillageForm1DTable />}
          {selectedTable == 'que1e' && <VillageForm1ETable />}
          {selectedTable == 'que7' && <VillageForm2Table />}
          {selectedTable == 'que8' && <VillageForm3Table />}
          {selectedTable == 'que9' && <VillageForm4Table />}
          {selectedTable == 'que10' && <VillageForm5Table />}
          {selectedTable == 'que11' && <VillageForm6Table />}
          {selectedTable == 'que11a' && <VillageForm6ATable />}
          {selectedTable == 'que11b' && <VillageForm6BTable />}
          {selectedTable == 'que11c' && <VillageForm6CTable />}
          {selectedTable == 'que11d' && <VillageForm6DTable />}
          {selectedTable == 'que16ferfar' && <VillageForm7FerfarTable />}
          {selectedTable == 'que16nzalele' && <VillageForm7NZaleleTable />}
          {selectedTable == 'que16ahawal' && <VillageForm7AhawalTable />}
          {selectedTable == 'que16a' && <VillageForm7ATable />}
          {selectedTable == 'que16' && <VillageForm7_7_12Table />}
          {selectedTable == 'que16b' && <VillageForm7BTable />}
          {selectedTable == 'que19a' && <VillageForm8ATable />}
          {selectedTable == 'que19b' && <VillageForm8BTable />}
          {selectedTable == 'que19c' && <VillageForm8CTable />}
          {selectedTable == 'que19d' && <VillageForm8DTable />}
          {selectedTable == 'que24' && <VillageForm14Table />}
          {selectedTable == 'que25' && <VillageForm15Table />}
          {selectedTable == 'que26' && <VillageForm17Table />}
          {selectedTable == 'que27' && <VillageForm19Table />}
        </CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={() => setVisible(false)}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>
      {/* <CNav variant="pills" role="tablist">
        <CNavItem>
          <CNavLink active={activeKey === 1} onClick={() => setActiveKey(1)}>
            मागणी निचीती
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink active={activeKey === 2} onClick={() => setActiveKey(2)}>
            गाव नमुने
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink active={activeKey === 3} onClick={() => setActiveKey(3)}>
            ई - फेरफार
          </CNavLink>
        </CNavItem>
      </CNav> */}
      {/* <CTabContent>
        <CTabPane role="tabpanel" aria-labelledby="home-tab" visible={activeKey === 1}>
          <ul>
            <li>8b Form</li>
          </ul>
        </CTabPane>
        <CTabPane
          role="tabpanel"
          aria-labelledby="profile-tab"
          visible={activeKey === 2}
        ></CTabPane>
        <CTabPane role="tabpanel" aria-labelledby="contact-tab" visible={activeKey === 3}>
          <ul>
            <li>नोंदणीकृत </li>
            <li>अनोंदणीकृत </li>
            <li>प्रलंबित</li>
            <li>विवाद ग्रस्त</li>
          </ul>
        </CTabPane>
      </CTabContent> */}

      <CTable bordered>
        <thead>
          <tr>
            <th colSpan={6} style={{ textAlign: 'center' }}>
              गाव नमुना १-अ ते ई (online दप्तराची तपासणी)
            </th>
          </tr>
        </thead>
        <CTableBody>
          {/*---------------------------------------------------------------------Que No.1---*/}
          <tr>
            <th rowSpan={reduxInspectionState?.que1?.que1 == 'होय' ? 2 : 1}>1</th>
            <th rowSpan={reduxInspectionState?.que1?.que1 == 'होय' ? 2 : 1}>गाव नमुना १</th>
            <td
              style={{ width: '30vw' }}
              rowSpan={reduxInspectionState?.que1?.que1 == 'होय' ? 2 : 1}
            >
              गाव नमुना १ (आकारबंद) मधील सर्वे/गा. क्र. मध्ये क्षेत्राची तफावत आहे काय?
              <CTooltip
                placement="right"
                style={customTooltipStyle}
                trigger={['hover', 'focus']}
                content={
                  <div>
                    <ol style={{ padding: '10px', margin: '0' }}>
                      <li>
                        गाव नमुना १ (आकारबंद) live आणि गाव नमुना १ (आकारबंद) यामधील फरक तपासून
                        त्यामधील धारणा प्रकार,क्षेत्र, पो.ख.,आकार, मधील फरक असलेले भूमापन क्र. च्या
                        दुरुस्ती करिता सक्षम अधिकारी यांचा आदेश प्राप्त करून कलम ११५ किवा Odc मधील
                        आकारबंद दुरुस्ती पर्याय वापरावा.
                      </li>
                      {/* <li>
                        एकसारखे(Duplicate) असलेल्या सर्व्हे क्रमांकाची यादी तपासा असे असल्यास दुबार
                        सर्वे दुरुस्तीची कार्यवाही तपासावी. odc अहवाल २४. एकसारखे असलेल्या सर्व्हे
                        क्रमांकाची यादी तपासणी करिता hyperlink उपलब्ध करून द्यावी .
                      </li>
                      <li>
                        तहसीलदार यांनी परवानगी दिलेले शेती सातबारा वरील क्षेत्र २० हे.आर.चौ.मी
                        पेक्षा जास्त किंवा बिनशेती सातबारा वरील क्षेत्र ९९ आर.चौ.मी पेक्षा जास्त
                        असलेले सर्व्हे योग्य आहेत का याची तपासणी करावी. odc अहवाल ३१. तहसीलदार यांनी
                        परवानगी दिलेले शेती सातबारा वरील क्षेत्र २० हे.आर.चौ.मी पेक्षा जास्त किंवा
                        बिनशेती सातबारा वरील क्षेत्र ९९ आर.चौ.मी पेक्षा जास्त असलेले सर्व्हे ची यादी
                        उपलब्ध करून द्यावी.{' '}
                      </li>
                      <li>
                        गाव नमुना ७ वरील एकुण आकारणी व ७/१२ वरील खात्यांच्या एकुण आकारणीचा फ़रक. हा
                        अहवाल उपलब्ध करून द्यावा. त्यातील ०.०१ पेक्षा जास्त आकारणीतील फरक दुरुस्त
                        करून घ्यावा. अहवाल ३८. गाव नमुना ७ वरील एकुण आकारणी व ७/१२ वरील खात्यांच्या
                        एकुण आकारणीचा फ़रक हा अहवाल उपलब्ध करून द्यावा.
                      </li> */}
                    </ol>
                  </div>
                }
              >
                <InfoIcon />
              </CTooltip>
            </td>
            <td style={{ textAlign: 'center' }}>
              <span style={{ display: 'flex', justifyContent: 'space-around' }}>
                <CButton
                  onClick={() => handleShowTable('que1Live')}
                  color="success"
                  variant="outline"
                >
                  Live
                </CButton>
                <CButton
                  onClick={() => handleShowTable('que1ODC')}
                  color="success"
                  variant="outline"
                >
                  ODC
                </CButton>
                <CButton
                  onClick={() => handleShowTable('que1ODCDiff')}
                  color="success"
                  variant="outline"
                >
                  Difference
                </CButton>
              </span>
            </td>
            <td>
              <CFormCheck
                type="radio"
                name="que1"
                id="8c11"
                value="होय"
                label="होय"
                checked={reduxInspectionState?.que1?.que1 == 'होय'}
                onChange={handleChange}
              />
            </td>
            <td>
              <CFormCheck
                type="radio"
                name="que1"
                id="8c22"
                value="नाही"
                label="नाही"
                checked={reduxInspectionState?.que1?.que1 == 'नाही'}
                onChange={handleChange}
              />
            </td>
          </tr>
          {reduxInspectionState?.que1?.que1 == 'होय' && (
            <tr>
              <td colSpan={3}>
                <CFormTextarea
                  type="text"
                  placeholder="शेरा..."
                  name="remarksQue1"
                  rows={3}
                  value={reduxInspectionState?.que1?.remarksQue1}
                  onChange={handleChange}
                />
              </td>
            </tr>
          )}

          {/*---------------------------------------------------------------------Que No.1a---*/}
          <ReusableDependencyQue
            queNo={2}
            queTitle="गाव नमुना १-अ"
            queTitleDesc="वन जमिनींची नोंदवही"
            queDescription="सदर गावात वन जमिनी आहेत का ?"
            state={reduxInspectionState?.que1a?.que1a}
            handleChange={handleChange}
            showTable="que1a"
            handleShowTable={handleShowTable}
            remarksName="remarksQue1a"
            remarks={reduxInspectionState?.que1a?.remarksQue1a}
            tooltipContent={
              <div>
                <ol style={{ padding: '10px', margin: '0' }}>
                  <li>
                    सर्व भूमापन क्रमांक तपासून खाजगी आणि वन विभागाचे नाव एकत्रित नमूद आहे काय ?
                    तपासून क.जा.प. प्राप्त करून आदेशाने ७/१२ चे विभाजन करणे गरजेचे आहे
                  </li>
                  {/* <li>
                  भूमापन क्रमांक नसलेले  परंतु वनक्रमांक असलेला १अ  तपासणी करावा 
                  </li>
                  <li>
                  गाव नमुना नं.  अ स्तंभ क्रमांक ६ वन जमावबंदी अधिकाऱ्याने काही अधिकार अभिलेखीत केले आहेत काय.
                  </li> */}
                </ol>
              </div>
            }
          />

          {/*---------------------------------------------------------------------Que No.1b---*/}
          <ReusableDependencyQue
            queNo={3}
            queTitle="गाव नमुना १-ब"
            queTitleDesc="बिन भोगवटयाच्या(सरकारी)जमिनींची नोंदवही"
            queDescription="सदर गावात बिन भोगवटयाच्या जमिनी आहेत का ?"
            state={reduxInspectionState?.que1b?.que1b}
            handleChange={handleChange}
            showTable="que1b"
            handleShowTable={handleShowTable}
            remarksName="remarksQue1b"
            remarks={reduxInspectionState?.que1b?.remarksQue1b}
            tooltipContent={
              <div>
                <ol style={{ padding: '10px', margin: '0' }}>
                  {/* <li>
                  १ब नोंदवहीमधील बिनभोगवट्याच्या सरकारी मालकीच्या जमिनींच्या किमान ३ नोंदी ७/१२ वरून तपासून भूमापन क्रमांक नमूद करावेत.                  </li>
                  <li>
                  २	१ब मध्ये समाविष्ट सरकार भूधारणा असलेल्या भूमापन क्रमांकासाठी भूधारणेचा उपप्रकार निवडणे गरजेचे आहे .सरकार भूधारणेचे २ उप भूधारणा प्रकार आहे.१.सार्वजनिक मार्गाधिकार व विशेषाधिकार २.सरकार स्वतः
                  </li> */}
                  <li>
                    अहवाल क्रमांक ४३अ - सरकार खात्यामध्ये सोबत अन्य खाजगी व्यक्ती असू नयेत असे
                    असल्यास कलम १५५ च्या आदेशाने खाता दुरुस्ती हा पर्याय वापरून दुरुस्ती करणे गरजेचे
                    आहे.{' '}
                  </li>
                  <li>
                    अहवाल क्रमांक ४३ब - एकाच ७/१२ वर सरकार खाते व खाजगी व्यक्तीची जमीन असू नये अशा
                    सूचना सन २००२ मधेच दिल्या आहेत त्यासाठी योग्य प्रक्रियेने अथवा आदेशाने ७/१२ चे
                    विभाजन करणे गरजेचे आहे.{' '}
                  </li>
                </ol>
              </div>
            }
          />

          {/*---------------------------------------------------------------------Que No.1c---*/}
          <ReusableDependencyQue
            queNo={4}
            queTitle="गाव नमुना १-क"
            queDescription="सदर गावात बिन भोगवटयाच्या जमिनी आहेत का ?"
            state={reduxInspectionState?.que1c?.que1c}
            handleChange={handleChange}
            showTable="que1c"
            handleShowTable={handleShowTable}
            remarksName="remarksQue1c"
            remarks={reduxInspectionState?.que1c?.remarksQue1c}
            tooltipContent={
              <div>
                <ol style={{ padding: '10px', margin: '0' }}>
                  {/* <li>
                  गाव नमुना १क या नोंदवहीमधील विविध कायद्यान्वये भोगवटादार वर्ग- २ म्हणून प्रदान जमिनीच्या किमान ३ नोंदी ७/१२ वरून तपासून भूमापन क्रमांक नमूद करावेत.                  </li>
                  <li>
                  	गाव नमुना १क या नोंदवहीमधील ग्रा. पं. कडे निहित जमिनींची किमान ३ नोंदी ७/१२ वरून तपासून भूमापन क्रमांक नमूद करावेत.	-                  </li>
                  <li>
                  गाव नमुना १क ची गा.न.नं १ चा गोषवारामध्ये असेलेले वर्गनिहाय क्षेत्र काढले आहे काय? (उदा.  वतन, कु.का. व पुनर्वसन इ.)                    </li> */}
                  <li>
                    तलाठी यांनी १क च्या शासन निर्णयाप्रमाणे १ ते १६ उपप्रकारापैकी योग्य उपप्रकार
                    निवडला आहे का ? तपासून तहसीलदार यांच्या स्तरावर गाव नमुना १-क चे व्यस्थापन
                    करण्यात यावे.{' '}
                  </li>
                  <li>
                    १क च्या शासन निर्णयाप्रमाणे १ ते १६ उपप्रकारापैकी निवडलेला उपप्रकाराचा शेरा ७/१२
                    च्या इतर अधिकारात येतो तरीही तलाठी यांनी अतिरिक्त शेरा समाविष्ट केलेला आहे का?
                    हे तपासावे दुरुस्ती असल्यास कलम १५५ च्या उप-प्रकार दुरुस्ती सुविधा मधून दुरुस्ती
                    करण्यात यावे.{' '}
                  </li>
                  <li>Odc अहवाल क्रमांक २५ आणि २६ तपासून दुरुस्ती करावे. </li>
                  {/* <li>
                  १क च्या भूमापन क्रमांकासाठी फेरफार किंवा दुय्यम निबंधक यांचेकडील दस्त नोंदणीकरीता तहसिलदार यांनी दिलेल्या मान्यतेचे आदेश तपासावेत. 
                                                        </li>
                  <li>
                  भोगवटादार- १ व उपप्रकार नसलेले परंतु १क मध्ये असलेले भूमापन क्रमांक तपासावे 
                                                        </li>
                  <li>
                  भोगवटादार - २ असलेले परंतु १क नसलेले भूमापन क्रमांक तपासा 
                                                        </li>
                  <li>
                  नव्याने  भोगवटादार - १ चे भोगवटादार - २ झालेले भूमापन क्रमांक आदेशाच्या दिनांकावरून तपासावे. 
                                                        </li> */}
                </ol>
              </div>
            }
          />

          {/*---------------------------------------------------------------------Que No.1d---*/}
          <ReusableDependencyQue
            queNo={5}
            queTitle="गाव नमुना १-ड"
            queTitleDesc="कुळवहिवाट कायदा आणि महाराष्ट्र शेतजमीन (जमीनधारणेची कमाल मर्यादा) अधिनियम,१९६१
            यांच्या उपबंधानुसार अतिरीक म्हणुन घोषित केलेल्या जमिनी दर्शविणारी नोंदवही"
            queDescription="सदर गावात कुळवहिवाट कायदा आणि महाराष्ट्र शेतजमीन (जमीनधारणेची कमाल मर्यादा)
            अधिनियम,१९६१ यांच्या उपबंधानुसार अतिरीक म्हणुन घोषित केलेल्या जमिनी आहेत का ?"
            state={reduxInspectionState?.que1d?.que1d}
            handleChange={handleChange}
            showTable="que1d"
            handleShowTable={handleShowTable}
            remarksName="remarksQue1d"
            remarks={reduxInspectionState?.que1d?.remarksQue1d}
            tooltipContent="       सक्षम अधिकारी यांचा आदेश क्रमांक आणि दिनांक नमूद केले आहे काय ? तपासावे"
          />

          {/*---------------------------------------------------------------------Que No.9e---*/}
          {/* <ReusableDependencyQue
            queNo={6}
            queTitle="गाव नमुना १-ई"
            queTitleDesc="अतिक्रमण नोंदवही"
            queDescription="सदर गावात अतिक्रमण नोंदवही केलेली आहेत का ?"
            state={reduxInspectionState?.que1e?.que1e}
            handleChange={handleChange}
            showTable="que1e"
            handleShowTable={handleShowTable}
            remarksName="remarksQue1e"
            remarks={reduxInspectionState?.que1e?.remarksQue1e}
            tooltipContent="१.चालू वर्षात अतिक्रमण नोंद आहे काय ?असल्यास कार्यवाही करणायात नमूद करा. 
            २.यापूर्वी अतिक्रमण कढण्यात आल्याचा आदेश व दिनांक नमूद केले आहे का ?"
          /> */}

          {/* ------------------------Question2 */}
          {/*---------------------------------------------------------------------Que No.7---*/}
          <ReusableDependencyQue
            queNo={6}
            queTitle="गाव नमुना २"
            queTitleDesc="अकृषिक महसुलाची नोंदवही"
            queDescription="सदर गावात अकृषिक महसुलाची नोंदवही केलेली आहेत का ?"
            state={reduxInspectionState?.que7?.que7}
            handleChange={handleChange}
            showTable="que7"
            handleShowTable={handleShowTable}
            remarksName="remarksQue7"
            remarks={reduxInspectionState?.que7?.remarksQue7}
            tooltipContent={
              <div>
                <ol style={{ padding: '10px', margin: '0' }}>
                  <li>सक्षम अधिकारी यांचा आदेश क्रमांक आणि दिनांक नमूद केले आहे काय ? तपासावे</li>
                  <li>
                    क. जा. प. न झालेले बिनशेती आदेशाच्या नोंदी ७/१२ वर इतर हक्कात अचूक नोंदविल्या
                    आहेत काय? आणि वसुली करिता त्याची नोंद गाव नमुना १७ मध्ये केली आहे का?
                  </li>
                  <li>
                    गावठाणातील अक्षरी भूमापन क्रमांक असलेले किंवा नसलेले सर्व गट क्रमांक ज्यांना सी
                    टी एस नंबर मिळाला आहे असे सातबारा बंद केल्या गेल्याची खात्री करणे.
                  </li>
                  <li>तालुका नमुना क्रमांक २ मधील अनुक्रमांक नोंदविला आहे काय.</li>
                  <li>
                    गाव नमुना दोनचा गोषवारा गाव नमुना एक च्या तेरजेशी जुळतो का याची खात्री करणे
                  </li>
                  <li>
                    ५ वर्षापेक्षा कमी कालावधीचे (तात्पुरते बिनशेती ) याची नोंद गाव नमुना ४ ला घ्यावी{' '}
                  </li>
                  <li>
                    गाव नमुना दोनच्या स्तंभ ११ मध्ये शेरा सादरी अकृषिक वापराचा दिनांक नमूद करावा
                    (अकृषिक वापर दिलेल्या मुदतीत सुरु झाला नाही तर असा खातेदार म ज म १९६६ चे कलम ३२९
                    अन्वये शास्तीस पात्र होतो .सबब सदरची माहिती अचूक भरावी)
                  </li>
                </ol>
              </div>
            }
          />

          {/* 1.	  कब्जेदार  सदरी देवाच्या नावा शिवाय व्यक्तीचे नाव दाखल आहे काय याची खात्री करा.
2.	गाव नमुना तीनला असणाऱ्या नोंदी गाव नमुना सात बारा भोगवटादार सादरी देवस्थान चे नाव असल्याची खात्री करणे  */}

          {/*---------------------------------------------------------------------Que No.8---*/}
          <ReusableDependencyQue
            queNo={7}
            queTitle="गाव नमुना ३"
            queTitleDesc="इनाम पत्रक"
            queDescription="सदर गावात इनाम पत्रक आहेत का ?"
            state={reduxInspectionState?.que8?.que8}
            handleChange={handleChange}
            showTable="que8"
            handleShowTable={handleShowTable}
            remarksName="remarksQue8"
            remarks={reduxInspectionState?.que8?.remarksQue8}
            tooltipContent={
              <div>
                <ol style={{ padding: '10px', margin: '0' }}>
                  {/* <li>
                  खाजगी देवस्थान असल्यास गाव नमुना 3 ला नोंदी घेवू नयेत	      </li> */}
                  <li>
                    कब्जेदार सदरी देवाच्या नावा शिवाय व्यक्तीचे नाव दाखल आहे काय याची खात्री करा.{' '}
                  </li>
                  <li>
                    गाव नमुना तीनला असणाऱ्या नोंदी गाव नमुना सात बारा भोगवटादार सादरी देवस्थान चे
                    नाव असल्याची खात्री करणे
                  </li>
                  {/* <li>
                गाव नमुना १ क आणि 3 यांचा मेळ घ्यावा.                 
                  </li>
                <li>
                देवस्थान इनाम बाबत -वहिवाटदारात बदल हा धर्मादाय आयुक्त यांचेकडील आदेशाने झाला आहे काय? 
                                    </li>
                <li>
                विश्वस्थ संस्था स्थापन करण्यात आली आहे का ? 
                                                      </li> */}
                </ol>
              </div>
            }
          />

          {/*---------------------------------------------------------------------Que No.9---*/}
          {/* <ReusableDependencyQue
            queNo={9}
            queTitle="गाव नमुना ४"
            queTitleDesc="सिवाई आमदनी -- सिवाई जमाबंदी"
            queDescription="सदर गावात संकिर्ण जमीन महसुलाची नोंदवही आहेत का ?"
            state={reduxInspectionState?.que9?.que9}
            handleChange={handleChange}
            showTable="que9"
            handleShowTable={handleShowTable}
            remarksName="remarksQue9"
            remarks={reduxInspectionState?.que9?.remarksQue9}
            tooltipContent="१.सदर गावात वन जमिन असल्यास वन क्रमांक नमूद आहे का ? 
            २.७/१२ वन विभागाच्या नावाने आहे किंवा नाही ? 
            ३.वनाला प्रकार योग्य असची असल्याची खात्री करा ?"
          /> */}

          {/*---------------------------------------------------------------------Que No.10---*/}
          {/* <ReusableDependencyQue
            queNo={10}
            queTitle="गाव नमुना ५"
            queTitleDesc="ठरावबंद - किस्तबंदी खतावणी जमाबंदी पत्रक"
            queDescription="सदर गावात क्षेत्र आणि महसूल यांचा सर्वसाधारण गोषवारा जुळतो का ?"
            state={reduxInspectionState?.que10?.que10}
            handleChange={handleChange}
            showTable="que10"
            handleShowTable={handleShowTable}
            remarksName="remarksQue10"
            remarks={reduxInspectionState?.que10?.remarksQue10}
            tooltipContent="गा.न. ५"
          /> */}

          {/* ------------------------Question6 */}
          {/*---------------------------------------------------------------Que No.11----*/}
          <ReusableDependencyQue
            queNo={11}
            queTitle="गाव नमुना ६"
            // queTitleDesc="ठरावबंद - किस्तबंदी खतावणी जमाबंदी पत्रक"
            queDescription="सदर गावातील फेरफारांची नोंदवही तपासा ?"
            state={reduxInspectionState?.que11?.que11}
            handleChange={handleChange}
            showTable="que11"
            handleShowTable={handleShowTable}
            remarksName="remarksQue11"
            remarks={reduxInspectionState?.que11?.remarksQue11}
            tooltipContent={
              <div style={{ width: '100%', boxSizing: 'border-box' }}>
                <h5>[A] आदेशानुसार फेरफार</h5>
                <ol>
                  <li>
                    आदेशाप्रमाणे नोंद घेतली आहे का? (आदेश फेरफार ची यादी hyperlink मध्ये उपलब्ध करून
                    देणेत यावी.)
                  </li>
                  <li>
                    आदेश फेरफारशी संबंधित सर्व दस्तऐवज (आदेश व अनुषंगिक कागदपत्रे ) अपलोड केले
                    असल्याची खात्री करा.
                  </li>
                  <li>
                    कजाप/आकारफोड/फाळणीबारा ची नोंद आदेश दस्तऐवज (7/12 बंद करणे ) व आदेशाने नविन 7/12
                    तयार करणे अथवा कलम 155 च्मया आदेशाने नवीन ७/१२ तयर करणे या पर्यायांचा वापर करून
                    तयार केलेले नाहीत याची तपासणी करावी. (सदर फेरफार जुना ७/१२ बंद करून नवीन पोट
                    हिस्से तयार करणे या फेरफार प्रकारातून घेणे बंधनकारक आहे)
                  </li>
                  <li>नामंजूर केलेले आदेश फेरफार तपासा</li>
                  <li>
                    आदेश फेरफार निर्णयास प्रलंबित ठेवला आहे का? असल्यास प्रलंबित असल्याचे कारण
                    तपासा.
                  </li>
                  <li>
                    आदेशावर स्थगिती आदेश असल्यास स्थगितीची इ फेरफार आज्ञावली मध्ये नोंदणी केली आहे
                    काय (असे फेरफार तसेच अपलोड केलेले आदेश पाहण्यास उपलब्ध करून द्यावेत)
                  </li>
                </ol>

                <h5>[B] कलम १५५ ची सुविधा वापरून तयार केलेले फेरफार</h5>
                <ol>
                  <li>
                    कलम 155 च्या दुरुस्ती करणे कामी पारीत झालेला आदेश, इतर अनुषंगिक कागदपत्रे व
                    परिशिष्ट क दस्तऐवज अपलोड करणे या पर्यायात अपलोड केले असल्याची खात्री करणे. (
                    मेनू पर्यायातील फेरफार संबंधी अपलोड केलेले दस्तऐवज पाहणे या पर्यायातून दस्तऐवज
                    पाहता येतात ) ( कलम 155 चे फेरफार hyperlink ने उपलब्ध करून देणेत यावे){' '}
                  </li>
                  <li>
                    दस्तऐवज अपलोड करणे या पर्यायात अपलोड केलेल्या दस्तऐवज मधील तहसीलदार यांनी पारीत
                    केलेला आदेश तपासून कलम 155 &quot;लेखन प्रमाद दुरुस्ती&quot; च्या व्याख्येत सदर
                    दुरुस्ती समाविष्ट होत असल्याची खात्री करावी. ( कलम 155 च्या माहितीची hyperlink )
                  </li>

                  <li>
                    पारीत आदेशा प्रमाणे गाव नमुना ७ वर अपेक्षित अंमल आल्याची खात्री करावी. ( दस्तऐवज
                    अपलोड करणे या पर्यायात अपलोड केलेला आदेश व अहवाल या पर्यायातून ७/१२ तपासून
                    खात्री करावी.)
                  </li>
                </ol>

                <h5>[C] इतर प्रकार वापरून तयार केलेले फेरफार </h5>
                <ol>
                  <li>
                    &quot;इतर फेरफार&quot; या प्रकारामध्ये असे फेरफार नोंदवायचे असतात, ज्या
                    प्रकारासाठी ई-फेरफार प्रणालीमध्ये विशिष्ट टेम्पलेट उपलब्ध नाही.{' '}
                  </li>
                  <li>
                    जर एखादा फेरफार &quot;इतर फेरफार&quot; या प्रकारामधून नोंदवण्यात आलेला असेल, तर
                    संबंधित फेरफार निर्णयीत होई पर्यंत अशा भूमापन क्रमांकावर इतर कोणताही नविन फेरफार
                    नोंदविता येत नाही. तोपर्यंत संबंधित भूमापन क्रमांक प्रणालीमध्ये ब्लॉक
                    /प्रतिबंधित अवस्थेत राहतो.
                  </li>
                  <li>
                    ज्या फेरफार प्रकारासाठी ई-फेरफार प्रणालीमध्ये टेम्पलेट उपलब्ध आहे, तरीही असे
                    फेरफार सामान्य फेरफार प्रकारातील &quot;इतर फेरफार&quot; या प्रकारामधून
                    नोंदवण्यात आले आहेत काय? याची तपासणी करावी. असल्यास, अशा फेरफारांची संख्या नमूद
                    करावी. तसेच, प्रणालीतील टेम्पलेट उपलब्ध असताना &quot;इतर फेरफार&quot; प्रकाराचा
                    वापर करण्यामागील योग्य कारण स्पष्टपणे नमूद करावे.
                  </li>
                  <li>
                    जर &quot;इतर फेरफार&quot; या प्रकारामधून एखाद्या सर्वे क्रमांकावर फेरफार
                    नोंदवण्यात आला असेल आणि त्यासंदर्भात हरकत किंवा स्थगिती आदेश प्राप्त झाला असेल,
                    तर अशा स्थितीत संबंधित सर्वे क्रमांकावर SRO, PDE किंवा अनोंदणीकृत
                    दस्ताऐवजांमार्फत फेरफार नोंदविण्यात आल्यास, FIFO प्रणालीमुळे संपूर्ण गावाचे
                    कामकाज ब्लॉक स्थितीत येते. अशी परिस्थिती निर्माण झाली आहे काय?
                  </li>
                  <li>
                    जर वरीलप्रमाणे परिस्थिती उद्भवली असेल, तर संबंधित तलाठ्यांनी याबाबत वरिष्ठ
                    कार्यालयास तसेच जमाबंदी आयुक्त कार्यालयास अहवाल सादर केला आहे काय?
                  </li>
                  {/* <li>असल्यास तलाठी यांनी वरिष्ठ कार्यालय तसेच जमाबंदी आयुक्त कार्यालय येथे रिपोर्ट नोंदवला गेला आहे काय ? </li> */}
                </ol>

                <h5>[D] नामंजूर केकेले फेरफार (तांत्रिक कारण) </h5>
                <ol>
                  <li>
                    ई-फेरफार MIS मधील मंडळ अधिकारी निर्गत फेरफार नोंदी अहवाल (गावनिहाय) या अहवालात
                    काही फेरफारांचे पूर्वावलोकन दिसून येत नाही किंवा तांत्रिक कारणास्तव सदर फेरफार
                    नामंजूर करण्यात आलेले आहेत. अशा फेरफारांची माहिती संबंधित हायपरलिंकद्वारे उपलब्ध
                    करून देण्यात आलेली आहे.
                  </li>
                  <li>
                    सदर अहवालात संबंधित फेरफाराचे सर्वे क्रमांक, फेरफार क्रमांक, फेरफाराचे नाव,
                    फेरफार दिनांक तसेच मंडळ अधिकाऱ्यांची टिप्पणी यांचा समावेश करण्यात आलेला आहे
                  </li>
                  <li>
                    नायब तहसीलदार यांचे ई-फेरफार लॉगिनमध्ये नामंजूर फेरफारांचे पूर्वावलोकन उपलब्ध
                    करून देण्यात आलेले असून, सदर फेरफार व फेरफार रजिस्टर यांची पडताळणी करून, फेरफार
                    तांत्रिक कारणामुळे अथवा पूर्वावलोकनामध्ये अयोग्य असल्यामुळे नामंजूर करण्यात आले
                    आहेत का, याची सखोल तपासणी करण्यात यावी
                  </li>
                </ol>

                <h5>[E] रि-एन्ट्री केलेले फेरफार </h5>
                <ol>
                  <li>
                    ग्राम महसूल अधिकारी / मंडळ अधिकारी लॉगिनमध्ये री-एंट्री साठी मार्क केलेल्या
                    फेरफारांची तपासणी करावी. (हे फेरफार डॅशबोर्ड वर फिकट बदामी रंगाने दर्शविण्यात
                    आले आहेत)
                  </li>
                  <li>
                    सदर फेरफारासाठी नमूद करण्यात आलेले कारण योग्य, स्पष्ट व समर्थनास पात्र आहे का,
                    याची खातरजमा करावी.नमूद कारणाच्या अनुषंगाने प्रत्यक्ष वस्तुस्थितीची पडताळणी करून
                    री-एंट्रीची वैधता निश्चित करावी.
                  </li>
                </ol>
                <h5>[F] 📄 इ - हक्क</h5>
                <ol>
                  <li>
                    ग्राम महसूल अधिकारी यांचे कडील ई हक्क अर्जाची प्रलंबितता MIS वरून तपासा. (MIS
                    hyperlink देणेत यावी.)
                  </li>
                  <li>
                    {' '}
                    ई - हक्क MIS तपासावा. अर्ज नाकारण्याचे कारण व ग्राम महसूल अधिकारी यांचा शेरा MIS
                    मध्ये अर्ज क्रमांकानुसार नमूद असून नाकारण्याचे कारण व शेरा सुसंगत
                    असल्याची खात्री करा
                  </li>
                </ol>
              </div>
            }
          />

          {/*---------------------------------------------------------------Que No.11-A----*/}
          {/* <ReusableDependencyQue
            queNo={12}
            queTitle="गाव नमुना ६ अ"
            queTitleDesc="विवादग्रस्त प्रकरणांची नोंदवही"
            queDescription="सदर गावात विवादग्रस्त प्रकरणांची नोंद केली आहे का ?"
            state={reduxInspectionState?.que11a?.que11a}
            handleChange={handleChange}
            showTable="que11a"
            handleShowTable={handleShowTable}
            remarksName="remarksQue11a"
            remarks={reduxInspectionState?.que11a?.remarksQue11a}
            tooltipContent="गा.न. ६ अ"
          /> */}

          {/*---------------------------------------------------------------Que No.11-B----*/}
          {/* <ReusableDependencyQue
            queNo={13}
            queTitle="गाव नमुना ६ ब"
            // queTitleDesc="विवादग्रस्त प्रकरणांची नोंदवही"
            queDescription="सदर गावात विलंबशुल्क प्रकरणांची नोंद घेतली आहे का ?"
            state={reduxInspectionState?.que11b?.que11b}
            handleChange={handleChange}
            showTable="que11b"
            handleShowTable={handleShowTable}
            remarksName="remarksQue11b"
            remarks={reduxInspectionState?.que11b?.remarksQue11b}
            tooltipContent="गा.न. ६ ब"
          /> */}

          {/*---------------------------------------------------------------Que No.11-C----*/}
          {/* <ReusableDependencyQue
            queNo={14}
            queTitle="गाव नमुना ६ क"
            // queTitleDesc="विवादग्रस्त प्रकरणांची नोंदवही"
            queDescription="सदर गावामधील वारस प्रकरणाच्या नोंदी तपासा."
            state={reduxInspectionState?.que11c?.que11c}
            handleChange={handleChange}
            showTable="que11c"
            handleShowTable={handleShowTable}
            remarksName="remarksQue11c"
            remarks={reduxInspectionState?.que11c?.remarksQue11c}
            tooltipContent="गा.न. ६ क"
          /> */}

          {/*---------------------------------------------------------------Que No.11-D----*/}
          {/* <ReusableDependencyQue
            queNo={15}
            queTitle="गाव नमुना ६ ड"
            // queTitleDesc="विवादग्रस्त प्रकरणांची नोंदवही"
            queDescription="सदर गावात उपविभाग(पोतहिस्से) यांच्या नोंदी आहेत का ?"
            state={reduxInspectionState?.que11d?.que11d}
            handleChange={handleChange}
            showTable="que11d"
            handleShowTable={handleShowTable}
            remarksName="remarksQue11d"
            remarks={reduxInspectionState?.que11d?.remarksQue11d}
            tooltipContent="गा.न. ६ ड"
          /> */}

          {/*---------------------------------------------------------------Que No.16----*/}

          <tr>
            {/* <th rowSpan={reduxInspectionState?.que16_1?.que16_1 == 'होय' ? 3 : 1}>16</th> */}
            <th>8</th>
            <th>गाव नमुना ७</th>
            <td style={{ width: '30vw' }} colSpan={1}>
              गाव नमुना ७/१२ तपासणी
              <CTooltip
                placement="right"
                style={customTooltipStyle}
                trigger={['hover', 'focus']}
                content={
                  <div>
                    <ol style={{ padding: '10px', margin: '0' }}>
                      <li>
                        ODC प्रणाली मध्ये ज्या अहवालात भूमापन क्र. उपलब्ध आहे. त्या अहवालानुसार ई
                        फेरफार प्रणाली मधील कलम १५५ सुविधाचा वापर करून दुरुस्ती करण्यात यावी.{' '}
                      </li>
                    </ol>
                  </div>
                }
              >
                <InfoIcon />
              </CTooltip>
            </td>
            <td style={{ textAlign: 'center' }}>
              <CButton
                onClick={() => handleShowTable('que16')}
                color="success"
                variant="outline"
                style={{ textWrap: 'noWrap' }}
              >
                ७ / १२ पहा
              </CButton>
            </td>
            <td colSpan={2}></td>
            {/* <td colSpan={1}></td> */}
          </tr>
          <tr>
            <td rowSpan={reduxInspectionState?.que16_1?.que16_1 == 'होय' ? 2 : 1}></td>
            <td rowSpan={reduxInspectionState?.que16_1?.que16_1 == 'होय' ? 2 : 1}></td>
            <td rowSpan={reduxInspectionState?.que16_1?.que16_1 == 'होय' ? 2 : 1}>
              १) सदर गावात डाटा साईन न झालेले भूमापण क्र. आहे का ?
            </td>
            <td style={{ textAlign: 'center' }}>
              <span>
                <CButton
                  onClick={() => handleShowTable('que16ferfar')}
                  color="success"
                  variant="outline"
                  style={{ textWrap: 'noWrap', marginBottom: '8px' }}
                >
                  फेरफार पश्चात
                </CButton>
                <CButton
                  onClick={() => handleShowTable('que16nzalele')}
                  color="success"
                  variant="outline"
                  style={{ textWrap: 'noWrap' }}
                >
                  एकदाही नझालेले
                </CButton>
              </span>
            </td>
            <td>
              <CFormCheck
                type="radio"
                name="que16_1"
                id="8c11"
                value="होय"
                label="होय"
                checked={reduxInspectionState?.que16_1?.que16_1 == 'होय'}
                onChange={handleChange}
              />
            </td>
            <td>
              <CFormCheck
                type="radio"
                name="que16_1"
                id="8c22"
                value="नाही"
                label="नाही"
                checked={reduxInspectionState?.que16_1?.que16_1 == 'नाही'}
                onChange={handleChange}
              />
            </td>
          </tr>
          {reduxInspectionState?.que16_1?.que16_1 == 'होय' && (
            <tr>
              <CTooltip
                content="साईन न झालेले भूमापण टीप"
                placement="left"
                style={customTooltipStyle}
              >
                <td colSpan={3}>
                  <CFormTextarea
                    type="text"
                    placeholder="शेरा..."
                    name="remarksQue16_1"
                    rows={3}
                    value={reduxInspectionState?.que16_1?.remarksQue16_1}
                    onChange={handleChange}
                  />
                </td>
              </CTooltip>
            </tr>
          )}
          <tr>
            <td rowSpan={reduxInspectionState?.que16_2?.que16_2 == 'होय' ? 2 : 1}></td>
            <td rowSpan={reduxInspectionState?.que16_2?.que16_2 == 'होय' ? 2 : 1}></td>
            <td rowSpan={reduxInspectionState?.que16_2?.que16_2 == 'होय' ? 2 : 1}>
              २) सदर गावात विसंगत भूमापण क्रमांक आहे का ?
            </td>
            <td style={{ textAlign: 'center' }}>
              <span style={{ display: 'flex', justifyContent: 'space-around' }}>
                <CButton
                  onClick={() => handleShowTable('que16ahawal')}
                  color="success"
                  variant="outline"
                >
                  अहवाल
                </CButton>
              </span>
            </td>
            <td>
              <CFormCheck
                type="radio"
                name="que16_2"
                id="8c11"
                value="होय"
                label="होय"
                checked={reduxInspectionState?.que16_2?.que16_2 == 'होय'}
                onChange={handleChange}
              />
            </td>
            <td>
              <CFormCheck
                type="radio"
                name="que16_2"
                id="8c22"
                value="नाही"
                label="नाही"
                checked={reduxInspectionState?.que16_2?.que16_2 == 'नाही'}
                onChange={handleChange}
              />
            </td>
          </tr>
          {reduxInspectionState?.que16_2?.que16_2 == 'होय' && (
            <tr>
              <CTooltip
                content="विसंगत भूमापण क्रमांक टीप"
                placement="left"
                style={customTooltipStyle}
              >
                <td colSpan={3}>
                  <CFormTextarea
                    type="text"
                    placeholder="शेरा..."
                    name="remarksQue16_2"
                    rows={3}
                    value={reduxInspectionState?.que16_2?.remarksQue16_2}
                    onChange={handleChange}
                  />
                </td>
              </CTooltip>
            </tr>
          )}

          {/*---------------------------------------------------------------Que No.16-A----*/}
          {/* <ReusableDependencyQue
            queNo={17}
            queTitle="गाव नमुना ७ अ"
            queTitleDesc="कुळवहीवाट"
            queDescription="सदर गावात कुळवहीवाट नोंदवही मध्ये नोंदी आहेत का ?"
            state={reduxInspectionState?.que16a?.que16a}
            handleChange={handleChange}
            showTable="que16a"
            handleShowTable={handleShowTable}
            remarksName="remarksQue16a"
            remarks={reduxInspectionState?.que16a?.remarksQue16a}
            tooltipContent="गा.न. ७ अ"
          /> */}

          {/*---------------------------------------------------------------Que No.16-B----*/}
          {/* <ReusableDependencyQue
            queNo={18}
            queTitle="गाव नमुना ७ ब"
            // queTitleDesc="कुळवहीवाट"
            queDescription="सदर गाव मध्ये नोंदी आहेत का ?"
            state={reduxInspectionState?.que16b?.que16b}
            handleChange={handleChange}
            showTable="que16b"
            handleShowTable={handleShowTable}
            remarksName="remarksQue16b"
            remarks={reduxInspectionState?.que16b?.remarksQue16b}
            tooltipContent="गा.न. ७ ब"
          /> */}

          {/*---------------------------------------------------------------Que No.19-A----*/}
          <ReusableDependencyQue
            queNo={9}
            queTitle="गाव नमुना ८ अ"
            // queTitleDesc="कुळवहीवाट"
            queDescription="खाते प्रकार तपासा / खाते संदर्भात ODC मधील अहवाल पडताळणी करा."
            state={reduxInspectionState?.que19a?.que19a}
            handleChange={handleChange}
            showTable="que19a"
            handleShowTable={handleShowTable}
            remarksName="remarksQue19a"
            remarks={reduxInspectionState?.que19a?.remarksQue19a}
            tooltipContent="खाते प्रकार तपासा / खाते संदर्भात ODC मधील अहवाल पडताळणी करा.
अहवाल क्रमांक (७,२८,२८-अ,२८-ब,५,१७,४०,४१,) 
0"
          />

          {/*---------------------------------------------------------------Que No.19-B----*/}
          {/* <ReusableDependencyQue
            queNo={20}
            queTitle="गाव नमुना ८ ब"
            // queTitleDesc="कुळवहीवाट"
            queDescription="जमीन महसूल वसूली बाबत नोंदी तपासा."
            state={reduxInspectionState?.que19b?.que19b}
            handleChange={handleChange}
            showTable="que19b"
            handleShowTable={handleShowTable}
            remarksName="remarksQue19b"
            remarks={reduxInspectionState?.que19b?.remarksQue19b}
            tooltipContent="गा.न. ८ ब"
          /> */}

          {/*---------------------------------------------------------------Que No.19-C----*/}
          {/* <ReusableDependencyQue
            queNo={21}
            queTitle="गाव नमुना ८ क"
            // queTitleDesc="कुळवहीवाट"
            queDescription="सदर गावामधील संकीर्ण रोजगार हमी, शिक्षण कराच्या नोंदी तपासा."
            state={reduxInspectionState?.que19c?.que19c}
            handleChange={handleChange}
            showTable="que19c"
            handleShowTable={handleShowTable}
            remarksName="remarksQue19c"
            remarks={reduxInspectionState?.que19c?.remarksQue19c}
            tooltipContent="गा.न. ८ क"
          /> */}

          {/*---------------------------------------------------------------Que No.19-D----*/}
          {/* <ReusableDependencyQue
            queNo={22}
            queTitle="गाव नमुना ८ ड"
            // queTitleDesc="कुळवहीवाट"
            queDescription="सदर गावातील रोखनोंदवही तपासा."
            state={reduxInspectionState?.que19d?.que19d}
            handleChange={handleChange}
            showTable="que19d"
            handleShowTable={handleShowTable}
            remarksName="remarksQue19d"
            remarks={reduxInspectionState?.que19d?.remarksQue19d}
            tooltipContent="गा.न. ८ ड"
          /> */}

          {/*---------------------------------------------------------------Que No.24-----*/}
          {/* <ReusableDependencyQue
            queNo={24}
            queTitle="गाव नमुना १४"
            // queTitleDesc="कुळवहीवाट"
            queDescription="सदर गावातील पाणीपुरवठ्याचे साधने तपासा."
            state={reduxInspectionState?.que24?.que24}
            handleChange={handleChange}
            showTable="que24"
            handleShowTable={handleShowTable}
            remarksName="remarksQue24"
            remarks={reduxInspectionState?.que24?.remarksQue24}
            tooltipContent="पाणीपुरवठ्याचे साधने टीप"
          /> */}

          {/*---------------------------------------------------------------Que No.25-----*/}
          {/* <ReusableDependencyQue
            queNo={25}
            queTitle="गाव नमुना १५"
            // queTitleDesc="कुळवहीवाट"
            queDescription="सदर गावातील आवक जावक नोंदवही तपासा."
            state={reduxInspectionState?.que25?.que25}
            handleChange={handleChange}
            showTable="que25"
            handleShowTable={handleShowTable}
            remarksName="remarksQue25"
            remarks={reduxInspectionState?.que25?.remarksQue25}
            tooltipContent="आवक जावक नोंदवही टीप"
          /> */}

          {/*---------------------------------------------------------------Que No.26-----*/}
          {/* <ReusableDependencyQue
            queNo={26}
            queTitle="गाव नमुना १७"
            // queTitleDesc="कुळवहीवाट"
            queDescription="सदर गावातील संकीर्ण जमीन महासुलाच्या नोंदी प्रकरणनिहाय तपासा."
            state={reduxInspectionState?.que26?.que26}
            handleChange={handleChange}
            showTable="que26"
            handleShowTable={handleShowTable}
            remarksName="remarksQue26"
            remarks={reduxInspectionState?.que26?.remarksQue26}
            tooltipContent="संकीर्ण जमीन महासुलाच्या नोंदी प्रकरणनिहाय टीप"
          /> */}

          {/*---------------------------------------------------------------Que No.27-----*/}
          {/* <ReusableDependencyQue
            queNo={26}
            queTitle="गाव नमुना १९"
            // queTitleDesc="कुळवहीवाट"
            queDescription="सदर गावामध्ये तलाठी / मंडळ अधिकारी यांच्या ताब्यात असलेल्या सरकारी मालमत्तेची नोंदवही तपासा."
            state={reduxInspectionState?.que27?.que27}
            handleChange={handleChange}
            showTable="que27"
            handleShowTable={handleShowTable}
            remarksName="remarksQue27"
            remarks={reduxInspectionState?.que27?.remarksQue27}
            tooltipContent="सरकारी मालमत्तेची नोंदवही टीप"
          /> */}
        </CTableBody>
      </CTable>
    </>
  )
}

export default Section1
