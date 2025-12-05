import React from 'react'
import CIcon from '@coreui/icons-react'
import { 
  cilSpeedometer,        // Dashboard
  cilFile,             
  cilLayers,           
  cilCloudDownload,   
  cilLaptop,           
  cilBook,            
  cilWindowMaximize,  
  cilListRich ,
  cilNewspaper,
  cilNotes         
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  // ------------------------- 1. DASHBOARD -------------------------
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    // Added a custom class for styling the active/hover state
    className: 'nav-item-active-accent', 
  },

  // ------------------------- 2. MODULE TITLE -------------------------
  {
    component: CNavTitle,
    name: 'MODULE',
    className: 'nav-title-custom',
  },
  
  // ------------------------- 3. INSPECTION MODULE GROUP -------------------------
  {
    component: CNavGroup,
    name: 'निरिक्षण मॉड्यूल', // Using a generic name shown in one of your screenshots
    icon: <CIcon icon={cilWindowMaximize} customClassName="nav-icon" />,
    
    // Add an item to represent the main module entry if needed (like the "संक्षिप्त दफ्तर तपासणी" text)
    // If your screenshots show a top-level link, add it here:
    // to: '/inspection-module', 

    items: [
      {
        component: CNavItem,
        name: 'फेरफार नोंदवही तपासणी',
        to: '/inspection-module/ferfarNondvahi/ferfarNondwahiSection1',
        icon: <CIcon icon={cilFile} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'इ -हक्क प्रणाली कामकाज तपासणी',
        to: '/inspection-module/e-hakka-kamkaj-tapasani/eHakkaSection',
        icon: <CIcon icon={cilLayers} customClassName="nav-icon" />,
      },
      // {
      //   component: CNavItem,
      //   name: 'ODC अहवाल तपासणी',
      //   to: '/inspection-module/ODC-ahval-tapasani/odcAhvalTapasani',
      //   icon: <CIcon icon={cilCloudDownload} customClassName="nav-icon" />,
      // },
      {
        component: CNavItem,
        name: 'ई-चावडी कामकाज तपासणी',
        to: '/inspection-module/E-chawadi-kamkaj-tapasani/EChawadiKamkajTap',
        icon: <CIcon icon={cilLaptop} customClassName="nav-icon" />,
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'अहवाल', // Using a generic name shown in one of your screenshots
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
    
    // Add an item to represent the main module entry if needed (like the "संक्षिप्त दफ्तर तपासणी" text)
    // If your screenshots show a top-level link, add it here:
    // to: '/inspection-module', 

    items: [
      {
        component: CNavItem,
        name: 'तपासणी अहवाल ',
        to: '/reports/Inspection-report/InspectionReport',
        icon: <CIcon icon={cilNewspaper} customClassName="nav-icon" />,
      },

    ],
  },
  // You can add the rest of your commented-out modules (OCR, Mandal Office, Taluka Office) 
  // following this improved structure with relevant icons.
]

export default _nav