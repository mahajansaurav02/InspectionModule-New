import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CContainer, CHeader, CHeaderBrand, CHeaderNav, CHeaderToggler } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilMenu } from '@coreui/icons';
import { Typography } from '@mui/material';
import { selectState } from '../slices/HomepageSlice';
import { AppHeaderDropdown } from './header';
import Section1 from 'src/views/dashboard/Sections/Section1';
import './header/AppHeaderModern.css';
import { Heading4 } from 'lucide-react';

const AppHeader = () => {
    const dispatch = useDispatch();
    const sidebarShow = useSelector((state) => state.sidebarShow);
    const state = useSelector(selectState);

    const [dropdownVal, setDropdownVal] = useState({
        village: '',
        villageCode: '',
        cCode: '',
        revenueYear: '',
    });

    return (
        <CHeader position="sticky" className="modern-app-header">
            <CContainer fluid className="modern-header-container">

                {/* Left Section: Brand & Toggler */}
                <div className="modern-left-section">


                    <CHeaderBrand to="/" className="modern-brand">

                        <h4 className="main-text">
                            ग्राम महसूल अधिकारी दप्तर तपासणी प्रणाली
                        </h4>
                    </CHeaderBrand>
                </div>


                {/* Center Section: Compact Section1 Form */}
                <div className="modern-center-section">
                    <div className="compact-form-container">
                        <Section1
                            setDropdownVal={setDropdownVal}
                            dropdownVal={dropdownVal}
                            compact
                        />

                    </div>
                </div>

                {/* Right Section: User Profile */}
                <CHeaderNav className="modern-right-section">
                    <AppHeaderDropdown />
                </CHeaderNav>
            </CContainer>

            {/* Decorative accent line */}
            <div className="header-accent"></div>
        </CHeader>
    );
};

export default AppHeader;