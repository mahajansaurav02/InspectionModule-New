import React, { useState } from 'react'
import { FaEye, FaInfoCircle } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import './EChawadiKamkajTap.css'

function EChawadiKamkajTap() {
  const navigate = useNavigate()

  // State to manage the tooltip
  const [tooltip, setTooltip] = useState({
    isVisible: false,
    text: '',
    position: { x: 0, y: 0 },
  })

  const cards = [
    {
      title: 'गावातील गाव नमुना पूर्ण भरण्याची घोषणा केलेले गाव नमुना संख्या',
      tooltipText:
        'तपासणी अधिकारी यांना सदर गावातील निरंक/काम पूर्ण  घोषणा केलेल्या गाव नमुन्यांची माहिती उपलब्ध होणार आहे.',
      onClick: () => navigate('/e-chawadi-kamkaj-tapasani/nirank-namuna-tapasani'),
    },
    {
      title: 'गावातील मागणी निश्चिती करताना दुरुस्तीद्वारे मागणी रक्कम कमी केलेल्या खातेदार संख्या',
      tooltipText:
        'तपासणी अधिकारी यांना मागणीची दुरुस्ती (मागणी रक्कम कमी/जास्त )केलेल्या खात्यांचा अहवाल उपलब्ध होणार आहे.',
      onClick: () => navigate('/e-chawadi-kamkaj-tapasani/magani-durusti-report'),
    },
    {
      title: 'अकृषक दर नमूद केल्याची तपासणी',
      tooltipText:
        'तपासणी अधिकारी यांना सदर गावाचे DBA यांनी ५ पैसे, १० पैसे असे अकृषिक दर भरून घोषणा केली आहे का तसेच, नगरपालिका आणि महानगरपालिका गावे निवडून त्याचे गटनिहाय अकृषिक दर भरून घोषणा केली आहे कि नाही याची माहिती उपलब्ध होणार आहे.',
      onClick: () => navigate('/e-chawadi-kamkaj-tapasani/akrushaki-dar-tapasani'),
    },
    {
      title: 'वसूली बाबत तपशील',
      tooltipText:
        'गावात जमीन महसूल व संकीर्ण प्रकारातील मागणी किती आहे व आजपर्यंत त्यामध्ये किती वसुली झालेली आहे, त्याचा अहवाल तपासणीसाठी उपलब्ध होणार आहे.',
      onClick: () => navigate('/e-chawadi-kamkaj-tapasani/vasuli-tapsil'),
    },
    {
      title: 'उप-अधीक्षक, भूमिअभिलेख आकारबंद तपशील',
      tooltipText:
        '1.आकारबंद (गाव नमुना क्र. १)Dyslr :उप-अधीक्षक, भूमिअभिलेख यांनी हस्तलिखित नुसार आकारबंद भरलेला आहे. त्याचा अहवाल तपासणीसाठी उपलब्ध होणार आहे.  2.आकारबंद (गाव नमुना क्र. १) Dyslr कमी केलेलं भूमापन क्रमांक: उप-अधीक्षक, भूमिअभिलेख यांनी हस्तलिखित नुसार आकारबंद मध्ये ग्राम महसूल अधिकारी यांच्या कडील आकारबंद live नुसार उपलब्ध नसलेले भूमापन क्रमांक कमी करण्यात आले आहे. त्याचा अहवाल तपासणीसाठी उपलब्ध होणार आहे.',
      onClick: () => navigate('/e-chawadi-kamkaj-tapasani/dyslr-akarband'),
    },
  ]

  const handleMouseEnter = (e, text) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setTooltip({
      isVisible: true,
      text: text,
      position: { x: rect.left + rect.width / 2, y: rect.top - 10 },
    })
  }

  const handleMouseLeave = () => {
    setTooltip({ ...tooltip, isVisible: false })
  }

  return (
    <div className="echawadi-container">
      <div className="echawadi-title-wrapper">
        <h1 className="echawadi-title">ई-चावडी कामकाज तपासणी</h1>
      </div>

      <div className="cards-wrapper">
        {cards.map((card, index) => (
          <div className="echawadi-card" key={index}>
            <div className="card-header">
              <h2 className="card-title">{card.title}</h2>
              <div
                className="info-icon-wrapper"
                onMouseEnter={(e) => handleMouseEnter(e, card.tooltipText)}
                onMouseLeave={handleMouseLeave}
              >
                <FaInfoCircle className="info-icon" />
              </div>
            </div>
            <button className="paha-button" onClick={card.onClick}>
              <FaEye /> पहा
            </button>
          </div>
        ))}
      </div>

      {tooltip.isVisible && (
        <div
          className="global-tooltip"
          style={{ left: tooltip.position.x, top: tooltip.position.y }}
        >
          {tooltip.text}
        </div>
      )}
    </div>
  )
}

export default EChawadiKamkajTap
