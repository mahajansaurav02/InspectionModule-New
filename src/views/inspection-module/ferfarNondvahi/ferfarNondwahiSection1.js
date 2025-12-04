import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CContainer, CTooltip } from '@coreui/react';
import InfoIcon from '@mui/icons-material/Info';
import styles from './FerfarHome.module.css';
import ProgressCircle from 'src/views/ui/ProgressCircle';

function FerfarNondwahiSection1() {
  const navigate = useNavigate();

  const options = [
    { label: 'आदेश फेरफार', progress: 20, total: 100, route: '/ferfarNondvahi/order-ferfar', tooltip: 'ग्राम महसूल अधिकारी यांनी upload केलेली आदेशाची प्रत, फेरफाराचा अंमल झाले नंतर तयार होणारा ७/१२ ची प्रत आणि फेरफाराची प्रत हे तपासणी अधिकारी यांना उपलब्ध होणार आहेत.' },
    { label: 'कलम 155 नुसार केलेले फेरफार', progress: 50, total: 200, route: '/ferfarNondvahi/section-155', tooltip: 'तहसीलदार यांनी प्ररित केलेल्या आदेशाची प्रत, फेरफाराचा अंमल झाले नंतर तयार होणारा ७/१२ ची प्रत आणि फेरफाराची प्रत हे तपासणी अधिकारी यांना उपलब्ध होणार आहेत.' },
    { label: 'इतर फेरफार या टेम्प्लेटने केलेले फेरफार', progress: 4, total: 20, route: '/ferfarNondvahi/other-ferfar', tooltip: 'फेरफार प्रकाराचा templet प्रणाली मध्ये उपलब्ध असतानाही सर्व प्रकारचे ‘इतर फेरफार’ या templet चा वापर करून घेतले गेलेले फेरफार उपलब्ध असणार.' },
    { label: 'तांत्रिक कारणास्तव नामंजूर केलेले फेरफार', progress: 80, total: 80, route: '/ferfarNondvahi/rejected-ferfar', tooltip: 'सर्व फेरफार जे तांत्रिक कारणास्तव नामंजूर केले आहेत त्याची पुर्वालोकन ची प्रत व ७/१२ ,गाव नमूना ६ तपासणी अधिकारी यांना उपलब्ध होणार आहेत.' },
    { label: 'रि-एन्ट्री केलेले फेरफार', progress: 22, total: 69, route: '/ferfarNondvahi/reentry-ferfar', tooltip: 'मंडळ अधिकारी यांनी ग्राम महसूल अधिकारी यांना पूर्वलोकन नामंजूर शेरा नमूद करून परत केलेले सर्व फेरफार  उपलब्ध होणार आहेत.' },
    { label: 'नियंत्रीत सत्ता प्रकार असलेले भूमापन क्रमांकवर घेण्यात आलेले फेरफार ', progress: 22, total: 85, route: '/ferfarNondvahi/niyantrit-ferfar', tooltip: 'गाव नमुना एक-क मधील नियंत्रीत सत्ता प्रकार असलेले भूमापन क्रमांकवर घेण्यात आलेले सर्व फेरफार तपासणी अधिकारी यांना उपलब्ध करून देण्यात आले आहे.' },
    { label: 'स्थगिती असलेले फेरफार', progress: 58 , total: 250, route: '/ferfarNondvahi/sthagiti-ferfar', tooltip: 'आदेश फेरफार,कलम १५५,रि-एन्ट्री,तांत्रिक कारणाने नामंजूर केलेले फेरफार,इतर फेरफार या टेम्प्लेट वापरून केलेले फेरफार व्यतिरिक्त (दिनांक १ ऑगस्ट २०२४ ते ३१ जुलै २०२४ या कालावधीतील) फेरफार टेम्प्लेट चा वापर करून घेण्यात आलेले सर्व फेरफार उपलब्ध आहे. उदा.खरेदी,वारस,गहाणखत,मृत्युपत्र' },
    { label: 'टेंप्लेट फेरफार', progress: 8, total: 158, route: '/ferfarNondvahi/template-ferfar', tooltip: 'आदेश फेरफार,कलम १५५,रि-एन्ट्री,तांत्रिक कारणाने नामंजूर केलेले फेरफार,इतर फेरफार या टेम्प्लेट वापरून केलेले फेरफार व्यतिरिक्त (दिनांक १ ऑगस्ट २०२४ ते ३१ जुलै २०२४ या कालावधीतील) फेरफार टेम्प्लेट चा वापर करून घेण्यात आलेले सर्व फेरफार उपलब्ध आहे. उदा.खरेदी,वारस,गहाणखत,मृत्युपत्र' },

  ];

  return (
    <CContainer className={styles.container}>
      <div className={styles.headerWrapper}>
        <h2 className={styles.header}>फेरफार निवडा</h2>
      </div>

      <div className={styles.cardGrid}>
        {options.map((option, index) => (
          <div className={styles.card} key={index}>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>{option.label}</h3>
              <CTooltip content={option.tooltip} placement="top">
                <span className={styles.infoButton} aria-label="अधिक माहिती">
                  <InfoIcon fontSize="small" />
                </span>
              </CTooltip>
            </div>
            
            {/* New container for the progress circle and button */}
            <div className={styles.cardContentBody}>
              <div className={styles.cardProgressInfo}>
                <ProgressCircle
                  progress={option.progress}
                  total={option.total}
                />
              </div>
              
              <button
                className={styles.button}
                onClick={() => navigate(option.route)}
              >
                निवडा
              </button>
            </div>
          </div>
        ))}
      </div>
    </CContainer>
  );
}

export default FerfarNondwahiSection1;