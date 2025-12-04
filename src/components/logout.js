import React from 'react'
import { CDropdownItem } from '@coreui/react'
import { cilAccountLogout } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { useNavigate } from 'react-router-dom'

const Logout = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    
   localStorage.clear();
  sessionStorage.clear(); 

    navigate('/Login')
  }

  return (
    <CDropdownItem
      onClick={handleLogout}
      style={{
        cursor: 'pointer',
        color: '#dc3545', // Bootstrap danger red
        fontWeight: '500',
        display: 'flex',
        alignItems: 'center',
        transition: 'all 0.2s ease-in-out',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = '#f8d7da'
        e.currentTarget.style.color = '#b02a37'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'transparent'
        e.currentTarget.style.color = '#dc3545'
      }}
    >
      <CIcon
        icon={cilAccountLogout}
        className="me-2"
        style={{ fontSize: '18px',marginRight:'5px' }}
      />
      Logout
      
    </CDropdownItem>
  )
}

export default Logout
