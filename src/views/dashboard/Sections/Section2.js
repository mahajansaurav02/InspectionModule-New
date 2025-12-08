import React from 'react'
import '../Dashboard.css'
import DetailsCard from '../ReusableComponents/DetailsCard'
import { CCol, CContainer, CRow } from '@coreui/react'
import DescriptionIcon from '@mui/icons-material/Description'
import Diversity3Icon from '@mui/icons-material/Diversity3'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import LanguageSelector from '../../../components/language-selector'
import { Trans, useTranslation } from 'react-i18next'

const Section2 = ({ count1A, count1B, count2A, count2B, count3A, count3B }) => {
  const { t } = useTranslation('dashboard')
  return (
    <CContainer fluid style={{ justifyContent: 'space-evenly', padding: 10 }}>
      <CRow>
        <CCol
          md={4}
          style={{ display: 'flex', flexDirection: 'column', textAlign: 'center', padding: 20 }}
        >
          <CRow className="example_d" md={12}>
            {/* एकूण खातेदार संख्या */}
            {t('t1')}
          </CRow>
          <CRow>
            <CCol md={6}>
              <DetailsCard
                label="१ ऑगस्ट २०२३ रोजी"
                count={count1A ? count1A : 0}
                icon={<DescriptionIcon />}
              />
            </CCol>
            <CCol md={6}>
              <DetailsCard
                label="आजची संख्या"
                count={count1B ? count1B : 0}
                icon={<DescriptionIcon />}
              />
            </CCol>
          </CRow>
        </CCol>
        <CCol
          md={4}
          style={{ display: 'flex', flexDirection: 'column', textAlign: 'center', padding: 20 }}
        >
          <CRow className="example_d" md={12}>
            एकूण ७/१२ संख्या
          </CRow>
          <CRow>
            <CCol md={6}>
              <DetailsCard
                label="१ ऑगस्ट २०२३ रोजी"
                count={count2A ? count2A : 0}
                icon={<Diversity3Icon />}
              />
            </CCol>
            <CCol md={6}>
              <DetailsCard
                label="आजची संख्या"
                count={count2B ? count2B : 0}
                icon={<Diversity3Icon />}
              />
            </CCol>
          </CRow>
        </CCol>
        <CCol
          md={4}
          style={{ display: 'flex', flexDirection: 'column', textAlign: 'center', padding: 20 }}
        >
          <CRow className="example_d" md={12}>
            वसुली
          </CRow>
          <CRow>
            <CCol md={6}>
              <DetailsCard
                label="जमाबंदी प्रमाणे"
                count={count3A ? count3A : 0}
                icon={<DescriptionIcon />}
                topHeader="प्रपत्र-अ"
              />
            </CCol>
            <CCol md={6}>
              <DetailsCard
                label="उद्दिष्ट"
                count={count3B ? count3B : 0}
                icon={<EmojiEventsIcon />}
                topHeader="प्रपत्र-अ"
              />
            </CCol>
          </CRow>
        </CCol>
      </CRow>
    </CContainer>
  )
}

export default Section2
