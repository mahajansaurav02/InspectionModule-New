import React from 'react'
import { CDropdown, CDropdownHeader, CDropdownMenu, CDropdownToggle } from '@coreui/react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import Logout from '../logout'

const AppHeaderDropdown = () => {
  const userName = localStorage.getItem('marathiName')
  const fullName = localStorage.getItem('fullName')

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle
        caret={false}
        className="p-0"
        style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          backgroundColor: '#007bff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'transform 0.2s',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
      >
        <AccountCircleIcon style={{ color: '#fff', fontSize: '28px' }} />
      </CDropdownToggle>

      <CDropdownMenu
        className="shadow rounded-3 p-3"
        placement="bottom-end"
        style={{ minWidth: '220px', backgroundColor: '#f9f9f9' }}
      >
        <CDropdownHeader
          className="fw-bold py-2 px-2 rounded-top text-white"
          style={{ backgroundColor: '#007bff' }}
        >
          Account
        </CDropdownHeader>

        <div className="text-center my-3">
          <div
            style={{
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              backgroundColor: '#e0f0ff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 8px auto',
            }}
          >
            <AccountCircleIcon style={{ color: '#007bff', fontSize: '28px' }} />
          </div>
          <h6 className="mb-0">{fullName ? fullName : 'NA'}</h6>
          <br />
          <h6 style={{ fontSize: '15px' }} className="mb-0">
            {userName ? userName : 'User'}
          </h6>
          <small className="text-muted">Welcome back!</small>
        </div>

        <div className="d-flex justify-content-center mt-3">
          <Logout />
        </div>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
