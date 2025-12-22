import React, { useState, useEffect } from 'react'
import {
  CNavbar,
  CContainer,
  CNavbarBrand,
  CNavbarText,
} from '@coreui/react'
import { useNavigate } from 'react-router-dom'

import { cilBalanceScale, cilCalendar, cilClock } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { IoArrowBackOutline } from 'react-icons/io5';

// Helper function to format the current time
const formatTime = (date) => {
  const options = {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  };
  return date.toLocaleTimeString('en-IN', options);
};

// Helper function to format the current date
const formatDate = (date) => {
    const options = {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    };
    return date.toLocaleDateString('en-IN', options);
}


const FerfarNavbar = () => {
  // 1. Set the initial state using the actual current time when the component loads
  const [liveTime, setLiveTime] = useState(formatTime(new Date()));
  const [liveDate, setLiveDate] = useState(formatDate(new Date()));
  const navigate = useNavigate()

  // 2. useEffect to update the time by getting a new Date() every second
  useEffect(() => {
    const timerId = setInterval(() => {
        const now = new Date(); // ALWAYS get the current, up-to-date time
        
        setLiveTime(formatTime(now));
        setLiveDate(formatDate(now));
    }, 1000);

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(timerId);
  }, []); // Empty dependency array means this runs once on mount/reload

  // --- Static/Mock Data for Contextual Labels ---
  const contextData = {
    district: 'नागपूर (Nagpur)',
    taluka: 'कुही (Kuhi)',
    village: 'भिवजपूर (Bhivajpur)',
  }

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
      // Using the cohesive Blue background color
      style={{
    background: 'linear-gradient(90deg, #02024f 0%, #0b3c91 40%, #0e6ba8 70%, #1fb6e0 100%)', position:'sticky', top:'0', zIndex:'1030'
  }}
      colorScheme="dark" 
      className="text-white shadow-lg py-2"
      placement="top"
    >
      <CContainer fluid>
        {/* Left Section: Brand/Title */}
        <CNavbarBrand   className="me-auto text-white fw-bold d-flex align-items-center">
             <span
                        onClick={() => navigate(-1)}
                        style={{
                          cursor: 'pointer',
                          fontSize: '22px',
                          color: 'white',
                          transition: 'all 0.25s ease',
                          marginRight: '30px'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'translateX(-4px) scale(1.1)'
                          e.currentTarget.style.opacity = '0.85'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'none'
                          e.currentTarget.style.opacity = '1'
                        }}
                      >
                        <IoArrowBackOutline />
                      </span>
          <CIcon icon={cilBalanceScale} size="lg" className="me-2" />
          <span style={{ fontSize: '1.25rem' }}>
          
            ग्राम महसूल अधिकारी दप्तर तपासणी प्रणाली</span>
        </CNavbarBrand>

        {/* Right Section: Dynamic Context & Live Time */}
        <CNavbarText className="d-flex align-items-center text-light">
          
          {/* 1. Contextual Data: District, Taluka, Village */}
          {/* <ContextLabel label="जिल्हा" value={contextData.district} />
          <ContextLabel label="तालुका" value={contextData.taluka} />
          <ContextLabel label="गाव" value={contextData.village} />
           */}
          {/* Separator Line */}
          <div className="vr mx-3" style={{ opacity: 0.5 }} />

          {/* 2. Live Date & Time */}
          <div className="d-flex align-items-center">
            {/* Date */}
            <div className="d-flex align-items-center me-3">
                <CIcon icon={cilCalendar} size="sm" className="me-1 text-warning" />
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