import { CButton, CFormCheck, CFormTextarea, CTooltip } from '@coreui/react'
import React from 'react'
import InfoIcon from '@mui/icons-material/Info'

const ReusableDependencyQue = ({
  queNo,
  queTitle,
  queTitleDesc = null,
  queDescription,
  state,
  handleChange,
  showTable,
  handleShowTable,
  remarksName,
  remarks,
  tooltipContent,
}) => {
  const customTooltipStyle = {
    '--cui-tooltip-bg': 'var(--cui-primary)',
    '--cui-tooltip-max-width': '1050px', // Set max width as per requirement
  }
  return (
    <>
      <tr>
        <th rowSpan={state == 'होय' ? 2 : 1}>{queNo}</th>
        <th rowSpan={state == 'होय' ? 2 : 1}>
          <span>{queTitle} </span>
          <br /> <span>{queTitleDesc == null ? '' : `(${queTitleDesc})`}</span>
        </th>
        <td style={{ width: '30vw' }} rowSpan={state == 'होय' ? 2 : 1}>
          {queDescription}
          <CTooltip content={tooltipContent} placement="left" style={customTooltipStyle}>
            <InfoIcon />
          </CTooltip>
        </td>
        <td style={{ textAlign: 'left' }}>
          <span style={{ display: 'flex', justifyContent: 'space-around' }}>
            <CButton onClick={() => handleShowTable(showTable)} color="success" variant="outline">
              {`${queTitle} पहा`}
            </CButton>
          </span>
        </td>
        <td>
          <CFormCheck
            type="radio"
            name={showTable}
            id="8c11"
            value="होय"
            label="होय"
            checked={state == 'होय'}
            onChange={handleChange}
          />
        </td>
        <td>
          <CFormCheck
            type="radio"
            name={showTable}
            id="8c22"
            value="नाही"
            label="नाही"
            checked={state == 'नाही'}
            onChange={handleChange}
          />
        </td>
      </tr>
      {state == 'होय' && (
        <tr>
          {/* <CTooltip content={tooltipContent} placement="left" style={customTooltipStyle}> */}
          <td colSpan={3}>
            <CFormTextarea
              type="text"
              placeholder="शेरा..."
              name={remarksName}
              rows={3}
              value={remarks}
              onChange={handleChange}
            />
          </td>
          {/* </CTooltip> */}
        </tr>
      )}
    </>
  )
}

export default ReusableDependencyQue
