import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './EHakkaSection.module.css'
import { CIcon } from '@coreui/icons-react'
import { cilChevronBottom } from '@coreui/icons'

function EHakkaSection() {
  const navigate = useNavigate()
  const [expandedCardId, setExpandedCardId] = useState('card2')

  const mainCards = [
    {
      id: 'card1',
      title: 'त्रुटीपूर्ततेसाठी भूधारकास परत पाठविण्यात आलेल्या अर्जांची तपासणी',
      subCards: [
        { 
          id: 'main1', 
          title: 'किमान ५ तपासणी करणे अनिवार्य आहे', 
          description: 'दैनिक लक्ष्यांक', 
          priority: 'priorityLow' 
        }
      ],
    },
    {
      id: 'card2',
      title: 'तलाठी स्तरावर फेरफाराकरीता प्रलंबित अर्जांची तपासणी',
      subCards: [
        { id: '1', title: '१८० दिवसापेक्षा जास्त प्रलंबित', description: '१००% तपासणी अनिवार्य', priority: 'priorityHigh' },
        { id: '2', title: '९० ते १८० दिवसातील प्रलंबित', description: '१००% तपासणी अनिवार्य', priority: 'priorityHigh' },
        { id: '3', title: '३० ते ९० दिवसातील प्रलंबित', description: 'किमान ५०% तपासणी अनिवार्य', priority: 'priorityMedium' },
        { id: '4', title: '३० दिवसा पेक्षा कमी प्रलंबित', description: 'नियमित देखरेख', priority: '' },
      ],
    },
  ]

  return (
    <div className={styles.pageWrapper}>
        <h1 className='echawadi-title'>इ - हक्क प्रणाली कामकाज तपासणी</h1>

      <div className={styles.cardsContainer}>
        {mainCards.map((card) => (
          <div key={card.id} className={styles.mainCardAccordion}>
            <div 
              className={styles.accordionHeader} 
              onClick={() => setExpandedCardId(expandedCardId === card.id ? null : card.id)}
            >
              <h2 className={styles.accordionTitle}>{card.title}</h2>
              <CIcon
                icon={cilChevronBottom}
                className={`${styles.accordionIcon} ${expandedCardId === card.id ? styles.expanded : ''}`}
                size="lg"
              />
            </div>

            <div className={`${styles.accordionBody} ${expandedCardId === card.id ? styles.open : ''}`}>
              <div className={styles.subCardGrid}>
                {card.subCards.map((subCard) => (
                  <div
                    key={subCard.id}
                    className={`${styles.subCard} ${subCard.priority ? styles[subCard.priority] : ''}`}
                    onClick={() => navigate(subCard.id === 'main1' ? '/e-hakka-kamkaj-tapasani/info-truti-arj' : `/e-hakka-kamkaj-tapasani/info/${subCard.id}`)}
                  >
                    <h3 className={styles.subCardTitle}>{subCard.title}</h3>
                    {subCard.description && (
                      <p className={styles.subCardDescription}>{subCard.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default EHakkaSection