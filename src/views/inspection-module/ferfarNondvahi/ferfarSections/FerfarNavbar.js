import React, { useState, useEffect } from 'react'
import {
  CNavbar,
  CContainer,
  CNavbarBrand,
  CNavbarText,
} from '@coreui/react'
import { cilBalanceScale, cilCalendar, cilClock } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

// Helper function to format the current time
const formatTime = (date) => {
  const options = {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true, // e.g., 06:26:11 PM
  };
  // Use current time from context
  return date.toLocaleTimeString('en-IN', options);
};

// Helper function to format the current date
const formatDate = (date) => {
    const options = {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    };
    // Example: 15 Dec 2025
    return date.toLocaleDateString('en-IN', options);
}


const FerfarNavbar = () => {
  // Use current time from context
  const initialDate = new Date('2025-12-15T18:26:11'); 
  
  // 1. State for Live Time
  const [liveTime, setLiveTime] = useState(formatTime(initialDate));
  const [liveDate, setLiveDate] = useState(formatDate(initialDate));

  // 2. useEffect to update time every second
  useEffect(() => {
    let secondsPassed = 0;
    const timerId = setInterval(() => {
        // Calculate current time based on the initial time and seconds passed
        const now = new Date(initialDate.getTime() + secondsPassed * 1000); 
        secondsPassed += 1; // Increment the counter
        
        setLiveTime(formatTime(now));
        setLiveDate(formatDate(now)); // Update date just in case it changes overnight (though unlikely in this context)
    }, 1000);

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(timerId);
  }, []); // Empty dependency array means this runs once on mount

  // --- Static/Mock Data for Contextual Labels ---

  // Helper component for context labels
  const ContextLabel = ({ label, value }) => (
    <div className="d-flex align-items-center me-4">
      <span className="fw-normal me-1" style={{ fontSize: '0.8rem', opacity: 0.8 }}>
        {label}:
      </span>
      <span className="fw-bold" style={{ fontSize: '0.9rem' }}>
        {value}
      </span>
    </div>
  );

  return (
    <CNavbar
      // 🎨 PRIMARY CHANGE: Use the Blue background color for consistency
      style={{ backgroundColor: '#007bff' }} // Standard Bootstrap primary blue, matching the app's headers
      colorScheme="dark" // Keeps text white
      className="text-white shadow-lg py-2" // Used shadow-lg for more separation from the white body
      placement="top"
    >
      <CContainer fluid>
        {/* Left Section: Brand/Title */}
        <CNavbarBrand href="#" className="me-auto text-white fw-bold d-flex align-items-center">
          <CIcon icon={cilBalanceScale} size="lg" className="me-2" />
          <span style={{ fontSize: '1.25rem' }}>ग्राम महसूल अधिकारी दप्तर तपासणी प्रणाली</span>
        </CNavbarBrand>

        {/* Right Section: Dynamic Context & Live Time */}
        <CNavbarText className="d-flex align-items-center text-light">
          
    
          {/* Separator Line */}
          <div className="vr mx-3" style={{ opacity: 0.5 }} />

          {/* 2. Live Date & Time */}
          <div className="d-flex align-items-center">
            {/* Date */}
            <div className="d-flex align-items-center me-3">
                <CIcon icon={cilCalendar} size="sm" className="me-1 text-warning" /> {/* Used text-warning for high contrast */}
                <span className="fw-bold" style={{ fontSize: '0.9rem' }}>
                    {liveDate}
                </span>
            </div>
            {/* Time */}
            <div className="d-flex align-items-center">
                <CIcon icon={cilClock} size="sm" className="me-1 text-danger" />
                <span className="fw-bold" style={{ fontSize: '0.9rem' }}>
                    {liveTime}
                </span>
            </div>
          </div>

        </CNavbarText>
      </CContainer>
    </CNavbar>
  )
}

export default FerfarNavbar