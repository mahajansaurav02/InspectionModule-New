import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './EHakkaSection.module.css'; 
import { CIcon } from '@coreui/icons-react';
import { cilChevronBottom } from '@coreui/icons';

function EHakkaSection() {
  const navigate = useNavigate();
  const [expandedCardId, setExpandedCardId] = useState(null);

  // Mock data for cards
  const mainCards = [
    { 
      id: 'card1', 
      title: 'त्रुटीपूर्ततेसाठी भूधारकास परत पाठविण्यात आलेल्या अर्जांची तपासणी',
      subCards: [
        { id: 'main1', title: 'किमान ५ तपासणी करणे अनिवार्य आहे' },
      ]
    },
    { 
      id: 'card2', 
      title: 'तलाठी स्तरावर फेरफाराकरीता प्रलंबित अर्जांची तपासणी', 
      subCards: [
        { id: '1', title: '१८० दिवसापेक्षा जास्त दिवस प्रलंबित', description: '(१००% तपासणी अनिवार्य)' },
        { id: '2', title: '९० ते १८०  दिवसातील प्रलंबित', description: '(१००% तपासणी अनिवार्य)' },
        { id: '3', title: '३० ते ९० दिवसातील प्रलंबित', description: '(किमान ५०% तपासणी अनिवार्य)' },
        { id: '4', title: '३० दिवसा पेक्षा कमी दिवस प्रलंबित', description: '(तपासणी आवश्यक नाही)' },
      ]
    },
  ];

  const handleHeaderClick = (id) => {
    setExpandedCardId(expandedCardId === id ? null : id);
  };

  const handleSubCardClick = (id) => {
    if (id === 'main1') {
      navigate(`/e-hakka-kamkaj-tapasani/info-truti-arj`);
    } else {
      navigate(`/e-hakka-kamkaj-tapasani/info/${id}`);
    }
  };

  return (
    <>
      <div className={styles.headerWrapper}>
        <div className={styles.header}>
          इ - हक्क प्रणाली कामकाज तपासणी (Online)
        </div>
      </div>

      <div className={styles['cards-container']}>
        {mainCards.map((card) => (
          <div key={card.id} className={styles['main-card-accordion']}>
            <div 
              className={styles['accordion-header']} 
              onClick={() => handleHeaderClick(card.id)}
            >
              <h2 className={styles['accordion-title']}>{card.title}</h2>
              <CIcon 
                icon={cilChevronBottom} 
                className={`${styles['accordion-icon']} ${expandedCardId === card.id ? styles.expanded : ''}`}
              />
            </div>
            
            <div 
              className={`${styles['accordion-body']} ${expandedCardId === card.id ? styles.open : ''}`}
            >
              {card.subCards.map((subCard) => (
                <div 
                  key={subCard.id} 
                  className={styles['sub-card']}
                  onClick={() => handleSubCardClick(subCard.id)}
                >
                  <h3 className={styles['sub-card-title']}>{subCard.title}</h3>
                  <p className={styles['sub-card-description']}>{subCard.description}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}  

export default EHakkaSection;