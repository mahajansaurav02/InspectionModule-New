import React, { useState, useRef } from 'react'
import {
  CContainer,
  CRow,
  CCol,
  CCard,
  CCardHeader,
  CCardBody,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CButton,
  CSpinner,
  CAlert,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CModalTitle,
} from '@coreui/react'
import '@coreui/coreui/dist/css/coreui.min.css'
import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'
import './InspectionReport.css'

// Import new components
import InspectionPrint from '../InspectionPrint/InspectionPrint'
import PrintUtility from '../InspectionPrint/PrintUtility'
import InspectionRemarksPrint from '../InspectionPrint/InspectionRemarksPrint'

// Your existing mock data remains the same...
const mockApiData = {
  tapasaniAdhikariName: 'श्री. रमेश पाटील',
  tapasaniAdhikariPadnam: 'उप विभागीय अधिकारी',
  tapasaniDinanck: '05/12/2025',
  sajacheNaw: 'शिवनगर',
  gramMahsulAdhikariName: 'श्रीमती. अंजली कुलकर्णी',
  gawacheNaw: 'रामपूर',
  ferfarData: [
    { kramank: 1, tapshil: 'आदेश फेरफार', sherat: 'फेरफार क्र. 324/456/789/101/112' },
    { kramank: 2, tapshil: 'कलम 155 नुसार केलेले फेरफार', sherat: 'निरंक' },
    {
      kramank: 3,
      tapshil: 'इतर फेरफार या टेम्प्लेटने केलेले फेरफार',
      sherat: 'फेरफार क्र. 545/767',
    },
    {
      kramank: 4,
      tapshil: 'तांत्रिक कारणास्तव नामंजूर केलेले फेरफार',
      sherat: 'फेरफार क्र. 23/98',
    },
    { kramank: 5, tapshil: 'रि-एन्ट्री केलेले फेरफार', sherat: 'फेरफार क्र. 876/434' },
    {
      kramank: 6,
      tapshil: 'नियंत्रीत सत्ता प्रकार असलेले भूमापन क्रमांकवर घेण्यात आलेले फेरफार',
      sherat: 'फेरफार क्र. 324/456',
    },
    { kramank: 7, tapshil: 'स्थगिती असलेले फेरफार', sherat: 'फेरफार क्र. 324/456' },
    { kramank: 8, tapshil: 'टेंप्लेट फेरफार', sherat: 'निरंक' },
  ],
  eHakkArjData: {
    trutiPurttaArj: '4',

    // ARRAY
    trutiArjList: [
      {
        id: 1,
        tapshil: 'भूधारकास परत पाठविण्यात आलेले अर्ज ',
        arjNo: 'अर्ज क्र.789',
        shera: 'मृत्यू दाखला अस्पष्ट आहे, पुन्हा अपलोड करा.',
      },
      {
        id: 1,
        tapshil: 'भूधारकास परत पाठविण्यात आलेले अर्ज ',
        arjNo: '125',
        shera: 'मृत्यू दाखला अस्पष्ट आहे, पुन्हा अपलोड करा.000',
      },
      {
        id: 1,
        tapshil: 'भूधारकास परत पाठविण्यात आलेले अर्ज ',
        arjNo: '252',
        // shera: 'मृत्यू दाखला अस्पष्ट आहे, पुन्हा अपलोड करा.',
      },
      {
        id: 1,
        tapshil: 'भूधारकास परत पाठविण्यात आलेले अर्ज ',
        arjNo: '1156',
        // shera: 'मृत्यू दाखला अस्पष्ट आहे, पुन्हा अपलोड करा.',
      },
    ],
    pralambitArj: {
      '180 दिवसापेक्षा जास्त': 0,
      '90 ते 180 दिवसातील': 2,
      '30 ते 90 दिवसातील': 5,
      '30 दिवसा पेक्षा कमी': 10,
    },
  },
  eChawadiData: {
    gawNamunaPurna: { nirank: 3, kamkajPurna: 7, aghoshanaKeliNaslele: 2 },
    mangniRakkamKamiKhatedar: 5,
    akrushakDarBharlaKay: 'होय',
    akrushakDarRakkam: '10 पैसे',
    akarbandTapshil: { upAdhikshakNotAvail: 3 },
  },
  vasuliData: {
    jaminMahsul029: { mangni: 150000, vasuli: 145000, percentage: 96.67 },
    itarMahsul045: { mangni: 50000, vasuli: 48000, percentage: 96.0 },
    uddishtanusar: { mangni: 200000, vasuli: 193000, percentage: 96.5 },
    ekun: { mangni: 400000, vasuli: 386000, percentage: 96.5 },
  },
  sarvSadharanShera: ':-  सोबत सलग्न करण्यात आले आहे.',
  purttatekkaritaMudde:
    '1. ई-हक्क प्रणालीतील 90 दिवसांपेक्षा जास्त प्रलंबित असलेले अर्ज तत्काळ निकाली काढावे.',
}

const mockRemarkData = {
  adeshFerfarRemark: [
    {
      mutNo: 324,
      remark: 'अधिक तपासणी आवश्यक आहे.',
    },
    {
      mutNo: 456,
      remark: 'सर्व फेरफार योग्य आहेत.',
    },
    {
      mutNo: 789,
      remark: 'काही फेरफार चुकीचे आहेत, दुरुस्ती करा.',
    },
    {
      mutNo: 101,
      remark: 'फेरफारांची नोंदणी वेळेवर झाली नाही.',
    },
    {
      mutNo: 112,
      remark: 'फेरफारांसाठी आवश्यक कागदपत्रे सादर करा.',
    },
  ],
  kalam155FerfarRemark: [
    {
      mutNo: 545,
      remark: 'अधिक तपासणी आवश्यक आहे.',
    },
    {
      mutNo: 767,
      remark: 'सर्व फेरफार योग्य आहेत.',
    },
  ],
  reEntryFerfarRemark: [
    {
      mutNo: 876,
      remark: 'अधिक तपासणी आवश्यक आहे.',
    },
    {
      mutNo: 434,
      remark: 'सर्व फेरफार योग्य आहेत.',
    },
  ],
  rejectedFerfarRemark: [
    {
      mutNo: 23,
      remark: 'अधिक तपासणी आवश्यक आहे.',
    },
    {
      mutNo: 98,
      remark: 'सर्व फेरफार योग्य आहेत.',
    },
  ],
  itarFerfarRemark: [
    {
      mutNo: 125,
      remark: 'अधिक तपासणी आवश्यक आहे.',
    },
    {
      mutNo: 675,
      remark: 'सर्व फेरफार योग्य आहेत.',
    },
  ],
  niyantritFerfarRemark: [
    {
      mutNo: 324,
      remark: 'अधिक तपासणी आवश्यक आहे.',
    },
    {
      mutNo: 456,
      remark: 'सर्व फेरफार योग्य आहेत.',
    },
  ],
  sthagitiFerfarRemark: [
    {
      mutNo: 324,
      remark: 'अधिक तपासणी आवश्यक आहे.',
    },
    {
      mutNo: 456,
      remark: 'सर्व फेरफार योग्य आहेत.',
    },
  ],
  templateFerfarRemark: [],
}

const fetchInspectionData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockApiData)
    }, 1500)
  })
}

const fetchFerfarInspectionData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockRemarkData)
    }, 1500)
  })
}

const InspectionReport = () => {
  const [reportData, setReportData] = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const componentRef = useRef()
  const printComponentRef = useRef()

  const [ferfarRemarkList, setFerfarRemarkList] = useState({})
  const [eChawadiRemarks, setEChawadiRemarks] = useState({})
  const [vasuliRemarks, setVasuliRemarks] = useState('')
  const [eHakkRemarks, setEHakkRemarks] = useState({})

  const [showAbhiprayModal, setShowAbhiprayModal] = useState(false)
  const [activeRemarkType, setActiveRemarkType] = useState(null)
  const [activeRemarkData, setActiveRemarkData] = useState([])

  let VillageData = localStorage.getItem('selectedVillageData')
  let selectedVillageData = JSON.parse(VillageData)
  const fullName = localStorage.getItem('fullName')

  let {
    cCode,
    distMarathiName,
    districtCode,
    lgdCode,
    talukaCode,
    talukaMarathiName,
    villageName,
  } = selectedVillageData[0]

  const handleGetData = async () => {
    setLoading(true)
    setError(null)
    setReportData({})

    try {
      const data = await fetchInspectionData()
      const remarkData = await fetchFerfarInspectionData()

      // Organize ferfar remarks by kramank
      const organizedFerfarRemarks = {}
      const remarkKeys = [
        'adeshFerfarRemark',
        'kalam155FerfarRemark',
        'itarFerfarRemark',
        'rejectedFerfarRemark',
        'reEntryFerfarRemark',
        'niyantritFerfarRemark',
        'sthagitiFerfarRemark',
        'templateFerfarRemark',
      ]

      remarkKeys.forEach((key, index) => {
        if (remarkData[key]) {
          organizedFerfarRemarks[index + 1] = remarkData[key]
        }
      })

      setReportData(data)
      setFerfarRemarkList(organizedFerfarRemarks)

      // Set mock remarks for other sections
      setEChawadiRemarks({
        gawNamunaPurna: {
          nirank: 'निरंक केलेले नमुने योग्यरित्या प्रक्रिया झाले आहेत.',
          kamkajPurna: 'कामकाज पूर्ण नमुन्यांवर योग्य कारवाई करण्यात आली आहे.',
          aghoshanaKeliNaslele: 'काही नमुन्यांवर घोषणा करण्यात विलंब आहे.',
        },
        mangniRakkamKamiKhatedar: 'मागणी निश्चितीनंतरच्या दुरुस्ती योग्य आहेत.',
        akrushakDarBharlaKay: 'अकृषक दर योग्यरित्या भरला आहे.',
        akarbandTapshil: 'आकारबंद तपशीलात काही विसंगती आढळल्या.',
      })

      setVasuliRemarks('वसुली प्रक्रिया यशस्वीरित्या पार पाडली गेली आहे. टक्केवारी योग्य आहे.')

      setEHakkRemarks({
        trutiPurtta: 'त्रुटीपूर्ततेसाठी परत पाठवलेले अर्ज योग्यरित्या हाताळले गेले.',
        pralambitArj: 'प्रलंबित अर्जांवर लक्ष केंद्रित करून लवकर निकाल काढावेत.',
      })
    } catch (apiError) {
      console.error('Error fetching inspection data:', apiError)
      setError('डेटा मिळवण्यात त्रुटी आली. कृपया नंतर प्रयत्न करा.')
    } finally {
      setLoading(false)
    }
  }

  const handleViewFerfarRemark = (kramank) => {
    setActiveRemarkType(`ferfar-${kramank}`)
    setActiveRemarkData(ferfarRemarkList[kramank] || [])
    setShowAbhiprayModal(true)
  }

  const handleViewAbhipray = (section) => {
    switch (section) {
      case 'ehakk':
        setActiveRemarkType('ehakk')
        setActiveRemarkData([{ remark: eHakkRemarks.pralambitArj }])
        break
      case 'echawadi':
        setActiveRemarkType('echawadi')
        setActiveRemarkData([
          { remark: eChawadiRemarks?.gawNamunaPurna?.nirank || 'शेरा उपलब्ध नाही' },
        ])
        break
      case 'vasuli':
        setActiveRemarkType('vasuli')
        setActiveRemarkData([{ remark: vasuliRemarks }])
        break
      default:
        if (section?.vasuliData) {
          setActiveRemarkType('vasuli')
          setActiveRemarkData([{ remark: vasuliRemarks }])
        }
    }
    setShowAbhiprayModal(true)
  }
  const handleDownloadPdf = () => {
    if (!reportData.tapasaniAdhikariName) {
      setError('कृपया प्रथम "अहवाल तयार करा" बटण दाबा.')
      return
    }

    setLoading(true)
    setError(null)

    // Get both report containers
    const mainReportContainer = document.getElementById('main-report-container')
    const remarksReportContainer = document.getElementById('remarks-report-container')

    if (!mainReportContainer || !remarksReportContainer) {
      setError('रिपोर्ट सापडली नाही.')
      setLoading(false)
      return
    }

    // Get the HTML content from both containers
    const mainReportHTML = mainReportContainer.innerHTML
    const remarksReportHTML = remarksReportContainer.innerHTML

    // Create the HTML content with BOTH reports
    const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>निरीक्षण रिपोर्ट - ${reportData.gawacheNaw}</title>
            <meta charset="UTF-8">
            <style>
                /* A4 Page Settings */
                @page {
                    size: A4 portrait;
                    margin: 15mm 10mm;
                }
                
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }
                
                body {
                    width: 210mm;
                    min-height: 297mm;
                    margin: 0 auto;
                    padding: 0;
                    background: white;
                    font-family: Arial, sans-serif;
                    font-size: 10pt;
                    line-height: 1.3;
                }
                
                /* Main container */
                .main-container {
                    padding: 15mm 10mm;
                    width: 100%;
                }
                
                /* Card styling */
                .card {
                    width: 100% !important;
                    max-width: 100% !important;
                    border: 1px solid #000 !important;
                    margin-bottom: 15px !important;
                    box-shadow: none !important;
                    page-break-inside: avoid;
                }
                
                .card-header {
                    background-color: #f8f9fa !important;
                    border-bottom: 2px solid #000 !important;
                    padding: 12px !important;
                    text-align: center;
                }
                
                .card-header h2 {
                    margin: 0 !important;
                    font-size: 18pt !important;
                    font-weight: bold;
                }
                
                .card-body {
                    padding: 15px !important;
                    width: 100% !important;
                }
                
                /* Table styling - CRITICAL for page breaks */
                table {
                    width: 100% !important;
                    max-width: 100% !important;
                    border-collapse: collapse !important;
                    border: 1px solid #000 !important;
                    margin: 10px 0 15px 0 !important;
                    font-size: 9pt !important;
                    page-break-inside: auto !important;
                }
                
                /* Force table rows to stay together on same page */
                tr {
                    page-break-inside: avoid !important;
                    page-break-after: auto !important;
                }
                
                th, td {
                    border: 1px solid #000 !important;
                    padding: 6px 8px !important;
                    word-wrap: break-word;
                }
                
                th {
                    background-color: #f2f2f2 !important;
                    font-weight: bold !important;
                }
                
                /* Section headers */
                h4 {
                    margin: 15px 0 8px 0 !important;
                    font-size: 12pt !important;
                    color: #000 !important;
                    page-break-after: avoid;
                }
                
                /* Horizontal rules */
                hr {
                    border-top: 2px solid #000 !important;
                    margin: 12px 0 !important;
                }
                
                /* Row and column styling */
                .row {
                    width: 100% !important;
                    margin-bottom: 8px !important;
                }
                
                .col {
                    padding: 0 5px !important;
                }
                
                /* Hide non-print elements */
                .no-print, .remark-btn, button, .btn {
                    display: none !important;
                }
                
                /* Print view specific */
                .print-view {
                    width: 100% !important;
                    max-width: 100% !important;
                }
                
                /* Page break control classes */
                .always-break {
                    page-break-before: always !important;
                }
                
                .avoid-break {
                    page-break-inside: avoid !important;
                }
                
                /* Force tables to move to next page if they don't fit */
                .table-container {
                    page-break-inside: avoid !important;
                }
                
                /* Compact styling for better fit */
                .compact-table {
                    font-size: 8.5pt !important;
                }
                
                .compact-table th,
                .compact-table td {
                    padding: 4px 6px !important;
                }
                
                /* Ensure no element overflows */
                * {
                    overflow-wrap: break-word;
                    word-wrap: break-word;
                }
                
                /* Page break for remarks report */
                .remarks-section {
                    page-break-before: always !important;
                    margin-top: 20mm !important;
                }
                
                /* Media print specific rules */
                @media print {
                    body {
                        padding: 0 !important;
                        margin: 0 !important;
                        width: 210mm !important;
                    }
                    
                    .main-container {
                        padding: 15mm 10mm !important;
                    }
                    
                    /* Force entire tables to stay together */
                    table {
                        page-break-inside: avoid !important;
                    }
                    
                    /* Prevent orphans and widows */
                    p, h1, h2, h3, h4 {
                        page-break-after: avoid;
                        page-break-inside: avoid;
                    }
                    
                    /* Section breaks */
                    .section-break {
                        page-break-before: always;
                    }
                }
            </style>
        </head>
        <body>
            <div class="main-container">
                <!-- Main Report -->
                <div class="print-view">
                    ${mainReportHTML}
                </div>
                
                <!-- Page break before remarks -->
                <div style="page-break-before: always; height: 0;"></div>
                
                <!-- Remarks Report -->
                <div class="print-view remarks-section">
                    ${remarksReportHTML}
                </div>
            </div>
            
            <script src="https://html2canvas.hertzen.com/dist/html2canvas.min.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
            <script>
                window.onload = function() {
                    // Add table protection after DOM loads
                    setTimeout(function() {
                        // Function to protect tables from page breaks
                        function protectTablesFromPageBreaks() {
                            const tables = document.querySelectorAll('table');
                            
                            tables.forEach(table => {
                                // Check table height
                                const tableHeight = table.offsetHeight;
                                const pageHeight = 1122; // A4 height in pixels at 96 DPI
                                
                                // If table is tall, try to make it more compact
                                if (tableHeight > pageHeight * 0.6) {
                                    table.classList.add('compact-table');
                                }
                                
                                // Check individual rows for page break issues
                                const rows = table.querySelectorAll('tr');
                                let currentPageBottom = 0;
                                
                                rows.forEach((row, index) => {
                                    const rowRect = row.getBoundingClientRect();
                                    const rowBottom = rowRect.bottom;
                                    
                                    // If row is near page bottom, add page break before table
                                    if (rowBottom > pageHeight * 0.85 && index === 0) {
                                        table.style.pageBreakBefore = 'always';
                                    }
                                });
                            });
                        }
                        
                        // Apply table protection
                        protectTablesFromPageBreaks();
                        
                        // Wait a bit more for styles to apply
                        setTimeout(function() {
                            // Generate PDF
                            const element = document.body;
                            
                            html2canvas(element, {
                                scale: 2,
                                useCORS: true,
                                backgroundColor: '#ffffff',
                                logging: false,
                                width: element.scrollWidth,
                                height: element.scrollHeight,
                                windowWidth: element.scrollWidth,
                                windowHeight: element.scrollHeight,
                                onclone: function(clonedDoc) {
                                    // Apply print styles to cloned document
                                    const style = clonedDoc.createElement('style');
                                    style.innerHTML = \`
                                        /* Force table rows to stay together */
                                        tr {
                                            page-break-inside: avoid !important;
                                            break-inside: avoid !important;
                                        }
                                        
                                        /* Prevent table splitting */
                                        table {
                                            page-break-inside: avoid !important;
                                            break-inside: avoid !important;
                                        }
                                        
                                        /* Compact tables for better fit */
                                        .compact-table {
                                            font-size: 8.5pt !important;
                                        }
                                        
                                        .compact-table th,
                                        .compact-table td {
                                            padding: 4px 6px !important;
                                        }
                                    \`;
                                    clonedDoc.head.appendChild(style);
                                }
                            }).then(canvas => {
                                const imgData = canvas.toDataURL('image/jpeg', 0.95);
                                const pdf = new jspdf.jsPDF({
                                    orientation: 'portrait',
                                    unit: 'mm',
                                    format: 'a4'
                                });
                                
                                const pageWidth = pdf.internal.pageSize.getWidth();
                                const pageHeight = pdf.internal.pageSize.getHeight();
                                
                                // Calculate image dimensions to fit page width
                                const imgWidth = pageWidth;
                                const imgHeight = (canvas.height * imgWidth) / canvas.width;
                                
                                // Add first page
                                pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight);
                                
                                // Handle multiple pages
                                let heightLeft = imgHeight;
                                let position = 0;
                                let pageCount = 1;
                                
                                if (heightLeft > pageHeight) {
                                    while (heightLeft > 0) {
                                        position = -pageHeight * pageCount;
                                        pdf.addPage();
                                        pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
                                        heightLeft -= pageHeight;
                                        pageCount++;
                                    }
                                }
                                
                                pdf.save('निरीक्षण_रिपोर्ट_शेरा_यादी.pdf');
                                
                                // Close the window after saving
                                setTimeout(() => window.close(), 1000);
                            }).catch(error => {
                                console.error('PDF generation error:', error);
                                alert('PDF तयार करताना त्रुटी आली.');
                                window.close();
                            });
                        }, 500);
                    }, 500);
                }
            </script>
        </body>
        </html>
    `

    // Open new window and write content
    const printWindow = window.open('', '_blank')
    printWindow.document.write(htmlContent)
    printWindow.document.close()

    // Wait for window to load
    printWindow.onload = function () {
      setTimeout(() => {
        setLoading(false)
      }, 4000)
    }

    setLoading(false)
  }

  const handlePrintDirectly = () => {
    const mainReportHTML = document.getElementById('main-report-container')?.innerHTML || ''
    const remarksReportHTML = document.getElementById('remarks-report-container')?.innerHTML || ''

    const printWindow = window.open('', '_blank')

    const printContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>निरीक्षण रिपोर्ट - ${reportData.gawacheNaw}</title>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@coreui/coreui/dist/css/coreui.min.css">
            <style>
                /* A4 Page Settings */
                @page {
                    size: A4 portrait;
                    margin: 20mm 15mm;
                }
                
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }
                
                body {
                    width: 210mm;
                    min-height: 297mm;
                    margin: 0 auto;
                    padding: 0;
                    background: white;
                    font-family: Arial, sans-serif;
                    font-size: 11pt;
                    line-height: 1.4;
                }
                
                /* Print container */
                .print-container {
                    padding: 20mm 15mm;
                    width: 100%;
                }
                
                /* Card styling */
                .card {
                    width: 100% !important;
                    max-width: 100% !important;
                    border: 1px solid #000 !important;
                    margin-bottom: 20px !important;
                    box-shadow: none !important;
                    page-break-inside: avoid;
                }
                
                .card-header {
                    background-color: #f8f9fa !important;
                    border-bottom: 2px solid #000 !important;
                    padding: 15px !important;
                    text-align: center;
                }
                
                .card-header h2 {
                    margin: 0 !important;
                    font-size: 20pt !important;
                    font-weight: bold;
                }
                
                .card-body {
                    padding: 20px !important;
                    width: 100% !important;
                }
                
                /* Table styling */
                table {
                    width: 100% !important;
                    max-width: 100% !important;
                    border-collapse: collapse !important;
                    border: 1px solid #000 !important;
                    margin: 12px 0 18px 0 !important;
                    font-size: 10pt !important;
                    page-break-inside: auto !important;
                }
                
                /* Prevent table row breaks */
                tr {
                    page-break-inside: avoid !important;
                    page-break-after: auto !important;
                }
                
                th, td {
                    border: 1px solid #000 !important;
                    padding: 8px 10px !important;
                    word-wrap: break-word;
                }
                
                th {
                    background-color: #f2f2f2 !important;
                    font-weight: bold !important;
                }
                
                /* Section headers */
                h4 {
                    margin: 18px 0 12px 0 !important;
                    font-size: 14pt !important;
                    color: #000 !important;
                    page-break-after: avoid;
                }
                
                /* Horizontal rules */
                hr {
                    border-top: 2px solid #000 !important;
                    margin: 15px 0 !important;
                }
                
                /* Hide non-print elements */
                .no-print, .remark-btn, button, .btn {
                    display: none !important;
                }
                
                /* Signature section - FIXED */
                .signature-section {
                    margin-top: 50px !important;
                    padding-top: 20px !important;
                    border-top: 1px solid #000 !important;
                    width: 100% !important;
                }
                
                .signature-container {
                    display: flex !important;
                    justify-content: flex-end !important;
                    align-items: flex-start !important;
                    width: 100% !important;
                    margin-top: 40px !important;
                    page-break-inside: avoid;
                }
                
                .signature-space {
                    width: 300px !important;
                    text-align: right !important;
                    padding-right: 20px !important;
                }
                
                .signature-title {
                    font-weight: bold !important;
                    margin-bottom: 10px !important;
                    font-size: 12pt !important;
                }
                
                .signature-name {
                    margin-top: 60px !important; /* Space for signature */
                    font-weight: normal !important;
                    font-size: 11pt !important;
                    line-height: 1.5 !important;
                }
                
                .signature-line {
                    border-top: 1px solid #000 !important;
                    margin-top: 80px !important;
                    width: 250px !important;
                    margin-left: auto !important;
                }
                
                /* Stamp area */
                .stamp-area {
                    position: relative;
                    margin-top: 100px;
                    height: 100px;
                }
                
                /* Page break control */
                .page-break {
                    page-break-before: always;
                    height: 0;
                    margin: 0;
                    padding: 0;
                }
                
                .remarks-section {
                    page-break-before: always !important;
                    margin-top: 30mm !important;
                }
                
                /* Responsive text */
                p {
                    margin-bottom: 8px !important;
                }
                
                /* Report header info */
                .report-header .row {
                    margin-bottom: 10px !important;
                }
                
                .report-header p {
                    margin-bottom: 6px !important;
                }
                
                /* Media print specific rules */
                @media print {
                    body {
                        padding: 0 !important;
                        margin: 0 !important;
                        width: 210mm !important;
                        -webkit-print-color-adjust: exact;
                        print-color-adjust: exact;
                    }
                    
                    .print-container {
                        padding: 20mm 15mm !important;
                    }
                    
                    /* Force tables to stay together */
                    table {
                        page-break-inside: avoid !important;
                    }
                    
                    /* Ensure signature stays on same page as last content */
                    .signature-container {
                        page-break-inside: avoid !important;
                    }
                    
                    /* Page margins */
                    @page :first {
                        margin-top: 20mm;
                    }
                    
                    @page {
                        margin: 20mm 15mm;
                    }
                    
                    /* Hide URL and page info */
                    @page {
                        @bottom-right {
                            content: "";
                        }
                        @top-right {
                            content: "";
                        }
                    }
                }
                
                /* Compact view for better fit */
                .compact-table {
                    font-size: 9.5pt !important;
                }
                
                .compact-table th,
                .compact-table td {
                    padding: 6px 8px !important;
                }
            </style>
        </head>
        <body>
            <div class="print-container">
                <!-- Main Report -->
                <div class="main-report">
                    ${mainReportHTML}
                </div>
                
                <!-- Page break before remarks -->
                <div class="page-break"></div>
                
                <!-- Remarks Report -->
                <div class="remarks-report remarks-section">
                    ${remarksReportHTML}
                </div>
            </div>
            
            <script>
                window.onload = function() {
                    // Add page break protection for tables
                    setTimeout(function() {
                        // Add compact class to all tables
                        const tables = document.querySelectorAll('table');
                        tables.forEach(table => {
                            table.classList.add('compact-table');
                        });
                        
                        // Ensure signature is properly aligned
                        const signatureContainers = document.querySelectorAll('.signature');
                        signatureContainers.forEach(container => {
                            // Wrap signature in proper container
                            const signatureHTML = container.innerHTML;
                            container.innerHTML = \`
                                <div class="signature-container">
                                    <div class="signature-space">
                                        <div class="signature-title">तपासणी अधिकाऱ्याचे नाव व पदनाम:</div>
                                        <div class="signature-name">\${signatureHTML.replace('तपासणी अधिकाऱ्याचे नाव व पदनाम:', '').trim()}</div>
                                        <div class="signature-line"></div>
                                    </div>
                                </div>
                            \`;
                        });
                        
                        // Add stamp area space
                        const cardBodies = document.querySelectorAll('.card-body');
                        cardBodies.forEach(body => {
                            const lastChild = body.lastElementChild;
                            if (lastChild && lastChild.classList.contains('signature-container')) {
                                const stampArea = document.createElement('div');
                                stampArea.className = 'stamp-area';
                                stampArea.innerHTML = '<div style="text-align: right; font-size: 10pt; color: #666; margin-top: 30px;">शुभेच्छा / मुद्रा स्थान</div>';
                                body.appendChild(stampArea);
                            }
                        });
                        
                        // Print after everything is ready
                        setTimeout(function() {
                            window.print();
                            setTimeout(function() {
                                window.close();
                            }, 1000);
                        }, 1000);
                    }, 500);
                }
            </script>
        </body>
        </html>
    `

    printWindow.document.write(printContent)
    printWindow.document.close()
  }

  // Abhipray button cell component
  const AbhiprayButtonCell = (abhipray, section) => (
    <CTableDataCell className="text-center">
      <CButton
        className="remark-btn no-print"
        color="primary"
        size="sm"
        onClick={() => handleViewAbhipray(section)}
      >
        अभिप्राय बघा
      </CButton>
    </CTableDataCell>
  )

  if (!reportData.tapasaniAdhikariName && !loading) {
    return (
      <CContainer className="inspection-container">
        <CCard>
          <CCardHeader className="headerName">
            <h2 className="mb-0">ग्राम महसूल अधिकारी दप्तर निरीक्षण टिप्पणी.</h2>
          </CCardHeader>
          <CCardBody className="text-center p-5">
            <CRow className="mb-3 report-header">
              <CCol md={6}>
                <p>
                  <strong>तपासणी अधिकारी यांचे नाव आणि पदनाम:</strong> {fullName}
                </p>
              </CCol>
              <CCol md={6}>
                <p>
                  <strong>तपासणी दिनांक:</strong> {reportData.tapasaniDinanck}
                </p>
              </CCol>
              <CCol md={6}>
                <p>
                  <strong>साजाचे नाव:</strong> {villageName}
                </p>
              </CCol>
              <CCol md={6}>
                <p>
                  <strong>ग्राम महसूल अधिकाऱ्याचे नाव:</strong> {reportData.sajacheNaw}
                </p>
              </CCol>
              <CCol md={6}>
                <p>
                  <strong>गावाचे नाव:</strong> {villageName} तालुका - {talukaMarathiName} जिल्हा -{' '}
                  {distMarathiName}
                </p>
              </CCol>
            </CRow>
            {error && (
              <CAlert color="danger" className="mb-3">
                {error}
              </CAlert>
            )}

            <CButton color="primary" className="remark-btn" onClick={handleGetData}>
              अहवाल तयार करा
            </CButton>
          </CCardBody>
        </CCard>
      </CContainer>
    )
  }

  return (
    <>
      {/* Main Report View */}
      <CContainer className="inspection-container">
        <CCard className="shadow-lg" ref={componentRef}>
          <CCardBody>
            {error && (
              <CAlert color="danger" className="mb-3">
                {error}
              </CAlert>
            )}

            <div className="p-3 report-content">
              {loading ? (
                <div className="text-center p-5">
                  <CSpinner color="primary" />
                  <p className="mt-2">डेटा लोड होत आहे...</p>
                </div>
              ) : (
                <>
                  <CRow className="mb-3 report-header">
                    <CCol md={6}>
                      <p>
                        <strong>तपासणी अधिकारी यांचे नाव आणि पदनाम:</strong>{' '}
                        {reportData.tapasaniAdhikariName} ({reportData.tapasaniAdhikariPadnam})
                      </p>
                    </CCol>
                    <CCol md={6}>
                      <p>
                        <strong>तपासणी दिनांक:</strong> {reportData.tapasaniDinanck}
                      </p>
                    </CCol>
                    <CCol md={6}>
                      <p>
                        <strong>साजाचे नाव:</strong> {reportData.sajacheNaw}
                      </p>
                    </CCol>
                    <CCol md={6}>
                      <p>
                        <strong>ग्राम महसूल अधिकाऱ्याचे नाव:</strong>{' '}
                        {reportData.gramMahsulAdhikariName}
                      </p>
                    </CCol>
                    <CCol md={6}>
                      <p>
                        <strong>गावाचे नाव:</strong> {reportData.gawacheNaw}
                      </p>
                    </CCol>
                  </CRow>

                  <hr />

                  <h4 className="mt-4 text-primary">अ. फेरफार तपासणी</h4>
                  <CTable striped bordered responsive className="text-center">
                    <CTableHead>
                      <CTableRow className="bg-light">
                        <CTableHeaderCell scope="col">अ.क्र.</CTableHeaderCell>
                        <CTableHeaderCell scope="col" className="text-start">
                          प्रकार
                        </CTableHeaderCell>
                        <CTableHeaderCell scope="col">तपशील</CTableHeaderCell>
                        <CTableHeaderCell scope="col">शेरा</CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      {reportData.ferfarData?.map((item, index) => (
                        <CTableRow key={index}>
                          <CTableHeaderCell scope="row">{item.kramank}.</CTableHeaderCell>
                          <CTableDataCell className="text-start">{item.tapshil}</CTableDataCell>
                          <CTableDataCell>{item.sherat}</CTableDataCell>
                          <CTableDataCell>
                            <CButton
                              color="primary"
                              className="remark-btn no-print"
                              size="sm"
                              onClick={() => handleViewFerfarRemark(item.kramank)}
                            >
                              अभिप्राय बघा
                            </CButton>
                          </CTableDataCell>
                        </CTableRow>
                      ))}
                    </CTableBody>
                  </CTable>

                  <hr />

                  <h4 className="mt-4 text-primary">ब. ई-हक्क प्रणाली मधील अर्ज तपासणी</h4>
                  {/* ... Inside return (...) ... */}

                  <CRow className="mb-3">
                    <CCol xs={12}>
                      <p>
                        <strong>
                          १. त्रुटीपूर्ततेसाठी भूधारकास परत पाठविण्यात आलेल्या अर्जांची तपासणी (अर्ज
                          क्र.):
                        </strong>{' '}
                        {/* Count */}
                        {reportData.eHakkArjData?.trutiArjList?.length || 0}
                      </p>

                      <CTable striped bordered responsive className="text-center">
                        <CTableHead>
                          <CTableRow className="bg-light">
                            <CTableHeaderCell style={{ width: '60%' }} className="text-start">
                              तपशील
                            </CTableHeaderCell>
                            <CTableHeaderCell style={{ width: '120px' }}>
                              अर्ज क्र.
                            </CTableHeaderCell>
                            <CTableHeaderCell style={{ width: '14%' }}>शेरा</CTableHeaderCell>
                          </CTableRow>
                        </CTableHead>
                        <CTableBody>
                          {/* LOGIC: Check if list exists */}
                          {reportData.eHakkArjData?.trutiArjList?.length > 0 ? (
                            <CTableRow className="bg-light-subtle">
                              {/* Column 1: Static Title */}
                              <CTableDataCell className="text-start">
                                त्रुटीपूर्ततेसाठी भूधारकास परत पाठविण्यात आलेले अर्ज
                              </CTableDataCell>

                              {/* Column 2: All Numbers Comma Separated */}
                              <CTableDataCell>
                                {reportData.eHakkArjData.trutiArjList
                                  .map((item) => item.arjNo)
                                  .join(', ')}
                              </CTableDataCell>

                              {/* Column 3: Button to open Modal with ALL Items */}
                              <CTableDataCell>
                                <CButton
                                  color="primary"
                                  className="remark-btn no-print"
                                  size="sm"
                                  onClick={() => {
                                    // NEW LOGIC: Pass the whole list and use a special type
                                    setActiveRemarkType('ehakk-truti')
                                    setActiveRemarkData(reportData.eHakkArjData.trutiArjList)
                                    setShowAbhiprayModal(true)
                                  }}
                                >
                                  अभिप्राय बघा
                                </CButton>
                              </CTableDataCell>
                            </CTableRow>
                          ) : (
                            <CTableRow>
                              <CTableDataCell colSpan={3} className="text-muted">
                                माहिती उपलब्ध नाही
                              </CTableDataCell>
                            </CTableRow>
                          )}
                        </CTableBody>
                      </CTable>
                    </CCol>
                  </CRow>

                  <CRow>
                    <CCol xs={12}>
                      <p>
                        <strong>
                          २. तलाठी स्तरावर फेरफाराकरीता प्रलंबित अर्जांची तपासणी (अर्ज संख्या):
                        </strong>
                      </p>
                      <CTable bordered className="text-center">
                        <CTableHead>
                          <CTableRow className="bg-light">
                            <CTableHeaderCell style={{ width: '21%' }}>
                              {' '}
                              १८० दिवसापेक्षा जास्त दिवस प्रलंबित{' '}
                            </CTableHeaderCell>
                            <CTableHeaderCell style={{ width: '21%' }}>
                              ९० ते १८० दिवसातील प्रलंबित
                            </CTableHeaderCell>
                            <CTableHeaderCell style={{ width: '21%' }}>
                              ३० ते ९० दिवसातील प्रलंबित
                            </CTableHeaderCell>
                            <CTableHeaderCell style={{ width: '21%' }}>
                              ३० दिवसा पेक्षा कमी दिवस प्रलंबित
                            </CTableHeaderCell>
                            <CTableHeaderCell style={{ width: '14%' }}>शेरा</CTableHeaderCell>
                          </CTableRow>
                        </CTableHead>
                        <CTableBody>
                          <CTableRow>
                            <CTableDataCell>
                              {reportData.eHakkArjData?.pralambitArj['180 दिवसापेक्षा जास्त']}
                            </CTableDataCell>
                            <CTableDataCell>
                              {reportData.eHakkArjData?.pralambitArj['90 ते 180 दिवसातील']}
                            </CTableDataCell>
                            <CTableDataCell>
                              {reportData.eHakkArjData?.pralambitArj['30 ते 90 दिवसातील']}
                            </CTableDataCell>
                            <CTableDataCell>
                              {reportData.eHakkArjData?.pralambitArj['30 दिवसा पेक्षा कमी']}
                            </CTableDataCell>
                            <CTableDataCell>
                              <CButton
                                color="primary"
                                className="remark-btn no-print"
                                size="sm"
                                onClick={() => handleViewAbhipray('ehakk')}
                              >
                                अभिप्राय बघा
                              </CButton>
                            </CTableDataCell>
                          </CTableRow>
                        </CTableBody>
                      </CTable>
                    </CCol>
                  </CRow>

                  <hr />

                  <h4 className="mt-4 text-primary">क. ई-चावडी प्रणाली मधील तपासणी</h4>
                  <CTable striped bordered responsive className="text-center">
                    <CTableHead>
                      <CTableRow className="bg-light">
                        <CTableHeaderCell style={{ width: '5%' }}>अ.क्र.</CTableHeaderCell>
                        <CTableHeaderCell style={{ width: '55%' }} className="text-start">
                          तपशील
                        </CTableHeaderCell>
                        <CTableHeaderCell style={{ width: '20%' }}>संख्या</CTableHeaderCell>
                        <CTableHeaderCell style={{ width: '14%' }}>शेरा</CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      <CTableRow className="bg-light-subtle">
                        <CTableHeaderCell scope="row">१.</CTableHeaderCell>
                        <CTableDataCell className="text-start fw-bold" colSpan={4}>
                          गावातील गाव नमुना पूर्ण भरण्याची घोषणा केलेले गाव नमुना संख्या:
                        </CTableDataCell>
                      </CTableRow>
                      <CTableRow>
                        <CTableDataCell></CTableDataCell>
                        <CTableDataCell className="text-start ps-5">
                          I) निरंक केलेले नमुना संख्या:
                        </CTableDataCell>
                        <CTableDataCell>
                          {reportData.eChawadiData?.gawNamunaPurna.nirank}
                        </CTableDataCell>
                        {AbhiprayButtonCell(
                          reportData.eChawadiData?.gawNamunaPurna?.nirank,
                          'echawadi',
                        )}
                      </CTableRow>
                      <CTableRow>
                        <CTableDataCell></CTableDataCell>
                        <CTableDataCell className="text-start ps-5">
                          II) कामकाज पूर्ण नमुना संख्या:
                        </CTableDataCell>
                        <CTableDataCell>
                          {reportData.eChawadiData?.gawNamunaPurna.kamkajPurna}
                        </CTableDataCell>
                        {AbhiprayButtonCell(
                          reportData.eChawadiData?.gawNamunaPurna?.kamkajPurna,
                          'echawadi',
                        )}
                      </CTableRow>
                      <CTableRow>
                        <CTableDataCell></CTableDataCell>
                        <CTableDataCell className="text-start ps-5">
                          III) निरंक/कामकाज संपल्याची घोषणा न केलेल्या नमुन्याची संख्या:
                        </CTableDataCell>
                        <CTableDataCell>
                          {reportData.eChawadiData?.gawNamunaPurna.aghoshanaKeliNaslele}
                        </CTableDataCell>
                        {AbhiprayButtonCell(
                          reportData.eChawadiData?.gawNamunaPurna?.aghoshanaKeliNaslele,
                          'echawadi',
                        )}
                      </CTableRow>

                      <CTableRow>
                        <CTableHeaderCell scope="row">२.</CTableHeaderCell>
                        <CTableDataCell className="text-start">
                          गावातील मागणी निश्चिती केल्यानंतर दुरुस्ती करण्यात आलेल्या खातेदारांची
                          संख्या:
                        </CTableDataCell>
                        <CTableDataCell>
                          {reportData.eChawadiData?.mangniRakkamKamiKhatedar}
                        </CTableDataCell>
                        {AbhiprayButtonCell(
                          reportData.eChawadiData?.mangniRakkamKamiKhatedar,
                          'echawadi',
                        )}
                      </CTableRow>

                      <CTableRow>
                        <CTableHeaderCell scope="row">३.</CTableHeaderCell>
                        <CTableDataCell className="text-start">
                          गावाचा अकृषक दर भरला आहे काय ?
                        </CTableDataCell>
                        <CTableDataCell>
                          {reportData.eChawadiData?.akrushakDarBharlaKay} (दर (प्रति चौ.मी):{' '}
                          {reportData.eChawadiData?.akrushakDarRakkam})
                        </CTableDataCell>
                        {AbhiprayButtonCell(
                          reportData.eChawadiData?.akrushakDarBharlaKay,
                          'echawadi',
                        )}
                      </CTableRow>

                      <CTableRow>
                        <CTableHeaderCell scope="row">४.</CTableHeaderCell>
                        <CTableDataCell className="text-start">
                          उप-अधीक्षक, भूमिअभिलेख आकारबंद तपशील:
                          <br />
                          **(तलाठी दप्तरात उपलब्ध असलेले भूमापन क्रमांक परंतु उप-अधीक्षक यांच्या
                          आकारबंद मध्ये उपलब्ध नसलेले भूमापन संख्या)**
                        </CTableDataCell>
                        <CTableDataCell>
                          {reportData.eChawadiData?.akarbandTapshil.upAdhikshakNotAvail}
                        </CTableDataCell>
                        {AbhiprayButtonCell(reportData.eChawadiData?.akarbandTapshil, 'echawadi')}
                      </CTableRow>
                    </CTableBody>
                  </CTable>

                  <hr />

                  <h4 className="mt-4 text-primary">ड. वसुली बाबत तपशील</h4>
                  <CTable bordered responsive className="text-center">
                    <CTableHead>
                      <CTableRow className="bg-light">
                        <CTableHeaderCell>तपशील</CTableHeaderCell>
                        <CTableHeaderCell>मागणी</CTableHeaderCell>
                        <CTableHeaderCell>वसुली</CTableHeaderCell>
                        <CTableHeaderCell>टक्केवारी</CTableHeaderCell>
                        <CTableHeaderCell style={{ width: '14%' }}>शेरा</CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      <CTableRow>
                        <CTableDataCell className="text-start">
                          जमीन महसूल वसुली (०२९)
                        </CTableDataCell>
                        <CTableDataCell>
                          {reportData.vasuliData?.jaminMahsul029.mangni}
                        </CTableDataCell>
                        <CTableDataCell>
                          {reportData.vasuliData?.jaminMahsul029.vasuli}
                        </CTableDataCell>
                        <CTableDataCell>
                          {reportData.vasuliData?.jaminMahsul029.percentage}%
                        </CTableDataCell>
                        <CTableDataCell rowSpan={3} className="align-middle">
                          <CButton
                            className="remark-btn no-print"
                            color="primary"
                            size="sm"
                            onClick={() => handleViewAbhipray('vasuli')}
                          >
                            अभिप्राय बघा
                          </CButton>
                        </CTableDataCell>
                      </CTableRow>
                      <CTableRow>
                        <CTableDataCell className="text-start">
                          इतर जमीन महसूल वसुली (०४५)
                        </CTableDataCell>
                        <CTableDataCell>
                          {reportData.vasuliData?.itarMahsul045.mangni}
                        </CTableDataCell>
                        <CTableDataCell>
                          {reportData.vasuliData?.itarMahsul045.vasuli}
                        </CTableDataCell>
                        <CTableDataCell>
                          {reportData.vasuliData?.itarMahsul045.percentage}%
                        </CTableDataCell>
                      </CTableRow>

                      <CTableRow>
                        <CTableDataCell className="text-start">उद्दिष्टानुसार वसुली</CTableDataCell>
                        <CTableDataCell>
                          {reportData.vasuliData?.uddishtanusar.mangni}
                        </CTableDataCell>
                        <CTableDataCell>
                          {reportData.vasuliData?.uddishtanusar.vasuli}
                        </CTableDataCell>
                        <CTableDataCell>
                          {reportData.vasuliData?.uddishtanusar.percentage}%
                        </CTableDataCell>
                      </CTableRow>

                      <CTableRow className="bg-warning">
                        <CTableHeaderCell className="text-start">एकूण</CTableHeaderCell>
                        <CTableHeaderCell>{reportData.vasuliData?.ekun.mangni}</CTableHeaderCell>
                        <CTableHeaderCell>{reportData.vasuliData?.ekun.vasuli}</CTableHeaderCell>
                        <CTableHeaderCell colSpan={2}>
                          {reportData.vasuliData?.ekun.percentage}%
                        </CTableHeaderCell>
                      </CTableRow>
                    </CTableBody>
                  </CTable>

                  <hr />

                  <CRow className="mt-4">
                    <CCol xs={12}>
                      <p>
                        <strong>तपसणी अधिकाऱ्याचा सर्वसाधारण शेरा:</strong>{' '}
                        {reportData.sarvSadharanShera}
                      </p>
                    </CCol>
                    <CCol xs={12}>
                      <p>
                        <strong>पुर्ततेकरिता मुद्दे क्रमांक:</strong>{' '}
                        {reportData.purttatekkaritaMudde}
                      </p>
                    </CCol>
                  </CRow>
                  <CRow className="mt-5  text-end">
                    <CCol className="signature" xs={12}>
                      <p className="mb-0">
                        <strong>तपासणी अधिकाऱ्याचे नाव व पदनाम:</strong>
                      </p>
                      <p className="mb-0">
                        {reportData.tapasaniAdhikariName} ({reportData.tapasaniAdhikariPadnam})
                      </p>
                    </CCol>
                  </CRow>
                </>
              )}
            </div>
          </CCardBody>
        </CCard>

        {/* Print Utility Component */}
        {reportData.tapasaniAdhikariName && (
          <PrintUtility
            onPrint={handlePrintDirectly}
            onDownload={handleDownloadPdf}
            loading={loading}
          />
        )}

        <div>
          {/* Hidden Main Report for printing */}
          <div id="main-report-container" style={{ display: 'none' }}>
            <InspectionPrint
              reportData={reportData}
              ferfarRemarkList={ferfarRemarkList}
              eChawadiRemarks={eChawadiRemarks}
              vasuliRemarks={vasuliRemarks}
              eHakkRemarks={eHakkRemarks}
              printMode={true}
            />
          </div>

          {/* Hidden Remarks Report for printing */}
          <div id="remarks-report-container" style={{ display: 'none' }}>
            <InspectionRemarksPrint
              reportData={reportData}
              ferfarRemarkList={ferfarRemarkList}
              eChawadiRemarks={eChawadiRemarks}
              vasuliRemarks={vasuliRemarks}
              eHakkRemarks={eHakkRemarks}
            />
          </div>
        </div>
      </CContainer>

      {/* Modal for Viewing Remarks */}
      {showAbhiprayModal && (
        <CModal
          visible={showAbhiprayModal}
          onClose={() => {
            setShowAbhiprayModal(false)
            setActiveRemarkType(null)
            setActiveRemarkData([])
          }}
          size="lg"
          alignment="center"
          className="no-print"
        >
          <CModalHeader className="bg-primary text-white">
            <CModalTitle>
              {activeRemarkType?.startsWith('ferfar')
                ? 'फेरफार तपासणी अभिप्राय'
                : activeRemarkType === 'ehakk'
                ? 'ई-हक्क अभिप्राय'
                : activeRemarkType === 'echawadi'
                ? 'ई-चावडी अभिप्राय'
                : activeRemarkType === 'vasuli'
                ? 'वसुली अभिप्राय'
                : 'अभिप्राय'}
            </CModalTitle>
          </CModalHeader>
          {/*=============================================sejal change below code =================================================================  */}
          <CModalBody className="px-4 py-3">
            {/* ================= HEADER SECTION ================= */}

            {/* 1. FERFAR HEADER */}
            {activeRemarkType?.startsWith('ferfar') ? (
              <div className="d-flex align-items-center gap-3 mb-2 px-3">
                <div style={{ width: '120px' }}>
                  <strong>फेरफार क्र.</strong>
                </div>
                <div className="flex-grow-1">
                  <strong>शेरा</strong>
                </div>
              </div>
            ) : activeRemarkType === 'ehakk-truti' ? (
              // 2. EHAKK TRUTI HEADER
              <div className="d-flex align-items-center gap-3 mb-2 px-3">
                <div style={{ width: '120px' }}>
                  <strong>अर्ज क्र.</strong>
                </div>
                <div className="flex-grow-1">
                  <strong>शेरा</strong>
                </div>
              </div>
            ) : (
              // 3. GENERIC HEADER (Vasuli, Chawadi)
              <div className="mb-2 px-3">
                <strong>शेरा</strong>
              </div>
            )}

            {/* ================= CONTENT SECTION ================= */}

            {activeRemarkData?.length > 0 ? (
              <>
                {/* 1. FERFAR CONTENT LOGIC (Uses mutNo & remark) */}
                {activeRemarkType?.startsWith('ferfar')
                  ? activeRemarkData.map((item, index) => (
                      <div
                        key={index}
                        className="d-flex align-items-start gap-3 mb-3 p-3 bg-light rounded"
                      >
                        <div style={{ width: '120px' }}>
                          {item.mutNo && <span className="badge bg-primary">{item.mutNo}</span>}
                        </div>
                        <div className="flex-grow-1">{item.remark}</div>
                      </div>
                    ))
                  : activeRemarkType === 'ehakk-truti'
                  ? // 2. EHAKK TRUTI CONTENT LOGIC )
                    activeRemarkData.map((item, index) => (
                      <div
                        key={index}
                        className="d-flex align-items-start gap-3 mb-3 p-3 bg-light rounded"
                      >
                        <div style={{ width: '120px' }}>
                          {item.arjNo && <span className="badge bg-primary">{item.arjNo}</span>}
                        </div>
                        {/* Note: Using 'shera' here as per your dummy data */}
                        <div className="flex-grow-1">{item.shera || 'शेरा उपलब्ध नाही'}</div>
                      </div>
                    ))
                  : // 3. GENERIC CONTENT LOGIC (Uses remark)
                    activeRemarkData.map((item, index) => (
                      <div key={index} className="mb-3 p-3 bg-light rounded">
                        {item.remark}
                      </div>
                    ))}
              </>
            ) : (
              <div className="text-center text-muted py-4">शेरा उपलब्ध नाही</div>
            )}
          </CModalBody>
          {/* ======================================================================================================================== */}

          <CModalFooter>
            <CButton
              color="secondary"
              size="sm"
              variant="outline"
              onClick={() => {
                setShowAbhiprayModal(false)
                setActiveRemarkType(null)
                setActiveRemarkData([])
              }}
            >
              बंद करा
            </CButton>
          </CModalFooter>
        </CModal>
      )}
    </>
  )
}

export default InspectionReport
