import React from 'react'
import {
  CDropdown,
  CDropdownHeader,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import Logout from '../logout'

const AppHeaderDropdown = () => {
  const userName = localStorage.getItem('marathiName')
  const fullName = localStorage.getItem('fullName')

  return (
    <CDropdown variant="nav-item" alignment="end">
      {/* 🔹 Avatar Button */}
      <CDropdownToggle
        caret={false}
        className="p-0 border-0 bg-transparent"
      >
        <div
          style={{
            width: '30px',
            height: '30px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #4facfe, #00f2fe)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
            cursor: 'pointer',
            transition: 'all 0.25s ease',
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.transform = 'scale(1.08)')
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.transform = 'scale(1)')
          }
        >
          <AccountCircleIcon style={{ color: '#fff', fontSize: 20  }} />
        </div>
      </CDropdownToggle>

      {/* 🔹 Dropdown Menu */}
      <CDropdownMenu
        placement="bottom-end"
        className="border-0 shadow-lg rounded-4 p-0"
        style={{
          minWidth: '260px',
          background: 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(8px)',
        }}
      >
        {/* Header */}
        <CDropdownHeader
          className="text-white text-center py-3 rounded-top"
          style={{
            background: 'linear-gradient(135deg, #4facfe, #00f2fe)',
          }}
        >
          <strong>My Account</strong>
        </CDropdownHeader>

        {/* User Info */}
        <div className="text-center px-3 py-4">
          <div
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #e0f7ff, #f0fbff)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 10px',
              boxShadow: 'inset 0 0 6px rgba(0,0,0,0.1)',
            }}
          >
            <AccountCircleIcon style={{ fontSize: 34, color: '#007bff' }} />
          </div>

          <h6 className="mb-1 fw-bold text-dark">
            {fullName || 'NA'}
          </h6>

          <div
            style={{
              fontSize: '14px',
              color: '#555',
              marginBottom: '4px',
            }}
          >
            {userName || 'User'}
          </div>

          <small className="text-muted">Welcome back 👋</small>
        </div>

        {/* Divider */}
        <div
          style={{
            height: '1px',
            backgroundColor: '#eee',
            margin: '0 16px',
          }}
        />

        {/* Logout */}
        <div className="d-flex justify-content-center py-3">
          <Logout />
        </div>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
