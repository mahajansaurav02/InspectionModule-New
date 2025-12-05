

import React, { useState, useRef } from 'react';
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
    CAlert
} from '@coreui/react';
import '@coreui/coreui/dist/css/coreui.min.css';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import './InspectionReport.css';

// API कॉल करण्यासाठी डमी डेटा (Mock Data)
const mockApiData = {
    tapasaniAdhikariName: 'श्री. रमेश पाटील',
    tapasaniAdhikariPadnam: 'उप विभागीय अधिकारी',
    tapasaniDinanck: '05/12/2025',
    sajacheNaw: 'शिवनगर',
    gramMahsulAdhikariName: 'श्रीमती. अंजली कुलकर्णी',
    gawacheNaw: 'रामपूर',
    ferfarData: [
        { kramank: 1, tapshil: 'आदेश फेरफार', sherat: 'फेरफार क्र. 456' },
        { kramank: 2, tapshil: 'कलम 155 नुसार केलेले फेरफार', sherat: 'निरंक' },
        { kramank: 3, tapshil: 'इतर फेरफार या टेम्प्लेटने केलेले फेरफार', sherat: 'फेरफार क्र. 12, 13, 14' },
        { kramank: 4, tapshil: 'तांत्रिक कारणास्तव नामंजूर केलेले फेरफार', sherat: 'संख्या 2' },
        { kramank: 5, tapshil: 'रि-एन्ट्री केलेले फेरफार', sherat: 'संख्या 1' },
        { kramank: 6, tapshil: 'नियंत्रीत सत्ता प्रकार असलेले भूमापन क्रमांकवर घेण्यात आलेले फेरफार', sherat: 'संख्या 3' },
        { kramank: 7, tapshil: 'स्थगिती असलेले फेरफार', sherat: 'निरंक' },
        { kramank: 8, tapshil: 'टेंप्लेट फेरफार', sherat: 'संख्या 5' },
    ],
    eHakkArjData: {
        trutiPurttaArj: 'अर्ज क्र. 789',
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
        itarMahsul045: { mangni: 50000, vasuli: 48000, percentage: 96.00 },
        uddishtanusar: { mangni: 200000, vasuli: 193000, percentage: 96.50 },
        ekun: { mangni: 400000, vasuli: 386000, percentage: 96.50 },
    },
    sarvSadharanShera: ':-  सोबत सलग्न करण्यात आले आहे.',
    purttatekkaritaMudde: '1. ई-हक्क प्रणालीतील 90 दिवसांपेक्षा जास्त प्रलंबित असलेले अर्ज तत्काळ निकाली काढावे.',
};

// डमी API कॉल फंक्शन
const fetchInspectionData = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockApiData);
        }, 1500);
    });
};

const InspectionReport = () => {
    const [reportData, setReportData] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const componentRef = useRef(); // PDF साठी कॉम्पोनेंटचा संदर्भ

    // डेटा मिळवण्यासाठी फंक्शन
    const handleGetData = async () => {
        setLoading(true);
        setError(null);
        setReportData({});
        try {
            const data = await fetchInspectionData();
            setReportData(data);
        } catch (apiError) {
            console.error('Error fetching inspection data:', apiError);
            setError('डेटा मिळवण्यात त्रुटी आली. कृपया नंतर प्रयत्न करा.');
        } finally {
            setLoading(false);
        }
    };

    // 📄 PDF डाउनलोड करण्यासाठी नवीन फंक्शन (html2canvas आणि jspdf वापरून)
   const handleDownloadPdf = () => {
        const input = componentRef.current; 
        if (!input) {
            setError('रिपोर्ट कॉम्पोनेंट लोड झालेला नाही. कृपया प्रयत्न करा.');
            return;
        }

        setLoading(true);

        // **प्रिंटिंग मार्जिन सेटिंग्ज (mm मध्ये)**
        const MARGIN = 10;
        const A4_WIDTH_MM = 210;
        const A4_HEIGHT_MM = 297;
        const CONTENT_WIDTH_MM = A4_WIDTH_MM - 2 * MARGIN; // 190mm 
        const PAGE_CONTENT_HEIGHT = A4_HEIGHT_MM - 2 * MARGIN; // 277mm 

        html2canvas(input, { scale: 2, useCORS: true }) 
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF('p', 'mm', 'a4'); 

                // कॅनव्हासची उंची मार्जिनमध्ये बसविण्यासाठी
                const imgHeightMM = canvas.height * CONTENT_WIDTH_MM / canvas.width;
                const totalPages = Math.ceil(imgHeightMM / PAGE_CONTENT_HEIGHT);

                for (let i = 0; i < totalPages; i++) {
                    // प्रत्येक पानासाठी Y-अक्ष (Y-axis) ऑफसेट
                    const offset = -(i * PAGE_CONTENT_HEIGHT);
                    
                    if (i > 0) {
                        pdf.addPage();
                    }

                    // इमेजला मार्जिनसह PDF वर जोडा
                    pdf.addImage(
                        imgData, 
                        'PNG', 
                        MARGIN,             // X-position (Left Margin)
                        offset + MARGIN,    // Y-position (Adjusted for offset + Top Margin)
                        CONTENT_WIDTH_MM,   // Width
                        imgHeightMM         // Height
                    );
                }

                // **हा भाग बदलला आहे: थेट प्रिंट डायलॉग उघडण्यासाठी**
                
                // 1. autoPrint() वापरून प्रिंट कमांड सक्रिय करा
                pdf.autoPrint(); 
                
                // 2. PDF नवीन टॅबमध्ये उघडा
                // 'dataurlnewwindow' PDF ला बेस 64 data URL म्हणून नवीन टॅबमध्ये उघडतो आणि autoPrint मुळे प्रिंट विंडो ट्रिगर होते.
                window.open(pdf.output('bloburl'), '_blank');
                
                setLoading(false);
            })
            .catch(err => {
                console.error("PDF Generation Error: ", err);
                setError('PDF तयार करताना त्रुटी आली. (कन्सोल पहा)');
                setLoading(false);
            });
    };

    // डेटा नसल्यास रिकामा (Blank) स्क्रीन
    if (!reportData.tapasaniAdhikariName && !loading) {
        return (
            <CContainer className="inspection-container">
                <CCard>
                    <CCardHeader className="text-center bg-primary text-white">
                        <h2 className="mb-0">ग्राम महसूल अधिकारी दप्तर निरीक्षण टिप्पणी.</h2>
                    </CCardHeader>
                    <CCardBody className="text-center p-5">


                          <CRow className="mb-3 report-header">
                                    <CCol md={6}>
                                        <p><strong>तपासणी अधिकारी यांचे नाव आणि पदनाम:</strong> {reportData.tapasaniAdhikariName} ({reportData.tapasaniAdhikariPadnam})</p>
                                    </CCol>
                                    <CCol md={6}>
                                        <p><strong>तपासणी दिनांक:</strong> {reportData.tapasaniDinanck}</p>
                                    </CCol>
                                    <CCol md={6}>
                                        <p><strong>साजाचे नाव:</strong> {reportData.sajacheNaw}</p>
                                    </CCol>
                                    <CCol md={6}>
                                        <p><strong>ग्राम महसूल अधिकाऱ्याचे नाव:</strong> {reportData.gramMahsulAdhikariName}</p>
                                    </CCol>
                                    <CCol md={6}>
                                        <p><strong>गावाचे नाव:</strong> {reportData.gawacheNaw}</p>
                                    </CCol>
                                </CRow>
                        {error && <CAlert color="danger" className="mb-3">{error}</CAlert>}
                        
                        <CButton color="primary" onClick={handleGetData}>
                            अहवाल तयार करा 
                        </CButton>
                    </CCardBody>
                </CCard>
            </CContainer>
        );
    }

    return (
        <CContainer className="inspection-container">
            {/* **componentRef** संपूर्ण CCard वर सेट करा, ज्यामुळे हेडिंग (Heading) कॅप्चर होईल */}
            <CCard className="shadow-lg" ref={componentRef}>
                <CCardHeader className="text-center bg-info text-white">
                    <h2 className="mb-0">ग्राम महसूल अधिकारी दप्तर निरीक्षण टिप्पणी.</h2>
                </CCardHeader>
                <CCardBody>
                    {error && <CAlert color="danger" className="mb-3">{error}</CAlert>}

                    {/* Report Content */}
                    <div className="p-3 report-content">
                        {loading ? (
                            <div className="text-center p-5">
                                <CSpinner color="primary" />
                                <p className="mt-2">डेटा लोड होत आहे...</p>
                            </div>
                        ) : (
                            <>
                                {/* शीर्षकाचे तपशील */}
                                <CRow className="mb-3 report-header">
                                    <CCol md={6}>
                                        <p><strong>तपासणी अधिकारी यांचे नाव आणि पदनाम:</strong> {reportData.tapasaniAdhikariName} ({reportData.tapasaniAdhikariPadnam})</p>
                                    </CCol>
                                    <CCol md={6}>
                                        <p><strong>तपासणी दिनांक:</strong> {reportData.tapasaniDinanck}</p>
                                    </CCol>
                                    <CCol md={6}>
                                        <p><strong>साजाचे नाव:</strong> {reportData.sajacheNaw}</p>
                                    </CCol>
                                    <CCol md={6}>
                                        <p><strong>ग्राम महसूल अधिकाऱ्याचे नाव:</strong> {reportData.gramMahsulAdhikariName}</p>
                                    </CCol>
                                    <CCol md={6}>
                                        <p><strong>गावाचे नाव:</strong> {reportData.gawacheNaw}</p>
                                    </CCol>
                                </CRow>

                                <hr />

                                {/* अ. फेरफार तपासणी */}
                                <h4 className="mt-4 text-primary">अ. फेरफार तपासणी</h4>
                                <CTable striped bordered responsive className="text-center">
                                    <CTableHead>
                                        <CTableRow className="bg-light">
                                            <CTableHeaderCell scope="col">अ.क्र.</CTableHeaderCell>
                                            <CTableHeaderCell scope="col" className="text-start">तपशील</CTableHeaderCell>
                                            <CTableHeaderCell scope="col">तपासणी शेरा</CTableHeaderCell>
                                        </CTableRow>
                                    </CTableHead>
                                    <CTableBody>
                                        {reportData.ferfarData?.map((item, index) => (
                                            <CTableRow key={index}>
                                                <CTableHeaderCell scope="row">{item.kramank}.</CTableHeaderCell>
                                                <CTableDataCell className="text-start">{item.tapshil}</CTableDataCell>
                                                <CTableDataCell>{item.sherat}</CTableDataCell>
                                            </CTableRow>
                                        ))}
                                    </CTableBody>
                                </CTable>

                                <hr />

                                {/* ब. ई-हक्क प्रणाली मधील अर्ज तपासणी */}
                                <h4 className="mt-4 text-primary">ब. ई-हक्क प्रणाली मधील अर्ज तपासणी</h4>
                                <CRow className="mb-3">
                                    <CCol xs={12}>
                                        <p><strong>१. त्रुटीपूर्ततेसाठी भूधारकास परत पाठविण्यात आलेल्या अर्जांची तपासणी:</strong> {reportData.eHakkArjData?.trutiPurttaArj}</p>
                                    </CCol>
                                </CRow>
                                <CRow>
                                    <CCol xs={12}>
                                        <p><strong>२. तलाठी स्तरावर फेरफाराकरीता प्रलंबित अर्जांची तपासणी:</strong></p>
                                        <CTable bordered className="text-center">
                                            <CTableHead>
                                                <CTableRow className="bg-light">
                                                    <CTableHeaderCell>१८० दिवसापेक्षा जास्त दिवस प्रलंबित</CTableHeaderCell>
                                                    <CTableHeaderCell>९० ते १८० दिवसातील प्रलंबित</CTableHeaderCell>
                                                    <CTableHeaderCell>३० ते ९० दिवसातील प्रलंबित</CTableHeaderCell>
                                                    <CTableHeaderCell>३० दिवसा पेक्षा कमी दिवस प्रलंबित</CTableHeaderCell>
                                                </CTableRow>
                                            </CTableHead>
                                            <CTableBody>
                                                <CTableRow>
                                                    <CTableDataCell>{reportData.eHakkArjData?.pralambitArj['180 दिवसापेक्षा जास्त']}</CTableDataCell>
                                                    <CTableDataCell>{reportData.eHakkArjData?.pralambitArj['90 ते 180 दिवसातील']}</CTableDataCell>
                                                    <CTableDataCell>{reportData.eHakkArjData?.pralambitArj['30 ते 90 दिवसातील']}</CTableDataCell>
                                                    <CTableDataCell>{reportData.eHakkArjData?.pralambitArj['30 दिवसा पेक्षा कमी']}</CTableDataCell>
                                                </CTableRow>
                                            </CTableBody>
                                        </CTable>
                                    </CCol>
                                </CRow>

                                <hr />

                                {/* क. ई-चावडी प्रणाली मधील तपासणी */}
<h4 className="mt-4 text-primary">ब. ई-हक्क प्रणाली मधील अर्ज तपासणी</h4>
{/* ... (Your previous code for B. E-Hakk) */}
<CRow className="mb-3">
    <CCol xs={12}>
        <p><strong>१. त्रुटीपूर्ततेसाठी भूधारकास परत पाठविण्यात आलेल्या अर्जांची तपासणी:</strong> {reportData.eHakkArjData?.trutiPurttaArj}</p>
    </CCol>
</CRow>
<CRow>
    <CCol xs={12}>
        <p><strong>२. तलाठी स्तरावर फेरफाराकरीता प्रलंबित अर्जांची तपासणी:</strong></p>
        <CTable bordered className="text-center">
            <CTableHead>
                <CTableRow className="bg-light">
                    <CTableHeaderCell>१८० दिवसापेक्षा जास्त दिवस प्रलंबित</CTableHeaderCell>
                    <CTableHeaderCell>९० ते १८० दिवसातील प्रलंबित</CTableHeaderCell>
                    <CTableHeaderCell>३० ते ९० दिवसातील प्रलंबित</CTableHeaderCell>
                    <CTableHeaderCell>३० दिवसा पेक्षा कमी दिवस प्रलंबित</CTableHeaderCell>
                </CTableRow>
            </CTableHead>
            <CTableBody>
                <CTableRow>
                    <CTableDataCell>{reportData.eHakkArjData?.pralambitArj['180 दिवसापेक्षा जास्त']}</CTableDataCell>
                    <CTableDataCell>{reportData.eHakkArjData?.pralambitArj['90 ते 180 दिवसातील']}</CTableDataCell>
                    <CTableDataCell>{reportData.eHakkArjData?.pralambitArj['30 ते 90 दिवसातील']}</CTableDataCell>
                    <CTableDataCell>{reportData.eHakkArjData?.pralambitArj['30 दिवसा पेक्षा कमी']}</CTableDataCell>
                </CTableRow>
            </CTableBody>
        </CTable>
    </CCol>
</CRow>

<hr />

{/* **क. ई-चावडी प्रणाली मधील तपासणी (UPDATED TABLE STRUCTURE)** */}
<h4 className="mt-4 text-primary">क. ई-चावडी प्रणाली मधील तपासणी</h4>
<CTable striped bordered responsive className="text-center">
    <CTableHead>
        <CTableRow className="bg-light">
            <CTableHeaderCell style={{ width: '5%' }}>अ.क्र.</CTableHeaderCell>
            <CTableHeaderCell style={{ width: '70%' }} className="text-start">तपशील</CTableHeaderCell>
            <CTableHeaderCell style={{ width: '25%' }}>संख्या/शेरा</CTableHeaderCell>
        </CTableRow>
    </CTableHead>
    <CTableBody>
        {/* १. गाव नमुना पूर्ण भरण्याची घोषणा */}
        <CTableRow className="bg-light-subtle">
            <CTableHeaderCell scope="row">१.</CTableHeaderCell>
            <CTableDataCell className="text-start" colSpan={2} style={{fontWeight: 'bold'}}>गावातील गाव नमुना पूर्ण भरण्याची घोषणा केलेले गाव नमुना संख्या:</CTableDataCell>
        </CTableRow>
        <CTableRow>
            <CTableDataCell></CTableDataCell>
            <CTableDataCell className="text-start ps-5">I) निरंक केलेले नमुना संख्या:</CTableDataCell>
            <CTableDataCell>{reportData.eChawadiData?.gawNamunaPurna.nirank}</CTableDataCell>
        </CTableRow>
        <CTableRow>
            <CTableDataCell></CTableDataCell>
            <CTableDataCell className="text-start ps-5">II) कामकाज पूर्ण नमुना संख्या:</CTableDataCell>
            <CTableDataCell>{reportData.eChawadiData?.gawNamunaPurna.kamkajPurna}</CTableDataCell>
        </CTableRow>
        <CTableRow>
            <CTableDataCell></CTableDataCell>
            <CTableDataCell className="text-start ps-5">III) निरंक किवा कामकाज संपल्याची घोषणा न केलेल्या नमुन्याची संख्या:</CTableDataCell>
            <CTableDataCell>{reportData.eChawadiData?.gawNamunaPurna.aghoshanaKeliNaslele}</CTableDataCell>
        </CTableRow>
        
        {/* २. मागणी निश्चिती करताना दुरुस्ती */}
        <CTableRow>
            <CTableHeaderCell scope="row">२.</CTableHeaderCell>
            <CTableDataCell className="text-start">गावातील मागणी निश्चिती करताना दुरुस्तीद्वारे मागणी रक्कम कमी केलेल्या खातेदार संख्या:</CTableDataCell>
            <CTableDataCell>{reportData.eChawadiData?.mangniRakkamKamiKhatedar}</CTableDataCell>
        </CTableRow>

        {/* ३. अकृषक दर */}
        <CTableRow>
            <CTableHeaderCell scope="row">३.</CTableHeaderCell>
            <CTableDataCell className="text-start">गावाचा अकृषक दर भरला आहे. काय ?</CTableDataCell>
            <CTableDataCell>{reportData.eChawadiData?.akrushakDarBharlaKay} (दर: {reportData.eChawadiData?.akrushakDarRakkam})</CTableDataCell>
        </CTableRow>

        {/* ४. आकारबंद तपशील */}
        <CTableRow>
            <CTableHeaderCell scope="row">४.</CTableHeaderCell>
            <CTableDataCell className="text-start">
                उप-अधीक्षक, भूमिअभिलेख आकारबंद तपशील: 
                <br/> 
                **(तलाठी दप्तरात उपलब्ध असलेले भूमापन क्रमांक परंतु उप-अधीक्षक यांच्या आकारबंद मध्ये उपलब्ध नसलेले भूमापन संख्या)**
            </CTableDataCell>
            <CTableDataCell>{reportData.eChawadiData?.akarbandTapshil.upAdhikshakNotAvail}</CTableDataCell>
        </CTableRow>
    </CTableBody>
</CTable>

<hr />

                                {/* ड. वसुली बाबत तपशील */}
                                <h4 className="mt-4 text-primary">ड. वसुली बाबत तपशील</h4>
                                <CTable bordered responsive className="text-center">
                                    <CTableHead>
                                        <CTableRow className="bg-light">
                                            <CTableHeaderCell>तपशील</CTableHeaderCell>
                                            <CTableHeaderCell>मागणी</CTableHeaderCell>
                                            <CTableHeaderCell>वसुली</CTableHeaderCell>
                                            <CTableHeaderCell>टक्केवारी</CTableHeaderCell>
                                        </CTableRow>
                                    </CTableHead>
                                    <CTableBody>
                                        <CTableRow>
                                            <CTableDataCell className="text-start">जमीन महसूल वसुली (०२९)</CTableDataCell>
                                            <CTableDataCell>{reportData.vasuliData?.jaminMahsul029.mangni}</CTableDataCell>
                                            <CTableDataCell>{reportData.vasuliData?.jaminMahsul029.vasuli}</CTableDataCell>
                                            <CTableDataCell>{reportData.vasuliData?.jaminMahsul029.percentage}%</CTableDataCell>
                                        </CTableRow>
                                        <CTableRow>
                                            <CTableDataCell className="text-start">इतर जमीन महसूल वसुली (०४५)</CTableDataCell>
                                            <CTableDataCell>{reportData.vasuliData?.itarMahsul045.mangni}</CTableDataCell>
                                            <CTableDataCell>{reportData.vasuliData?.itarMahsul045.vasuli}</CTableDataCell>
                                            <CTableDataCell>{reportData.vasuliData?.itarMahsul045.percentage}%</CTableDataCell>
                                        </CTableRow>
                                        <CTableRow>
                                            <CTableDataCell className="text-start">उद्दिष्टानुसार वसुली</CTableDataCell>
                                            <CTableDataCell>{reportData.vasuliData?.uddishtanusar.mangni}</CTableDataCell>
                                            <CTableDataCell>{reportData.vasuliData?.uddishtanusar.vasuli}</CTableDataCell>
                                            <CTableDataCell>{reportData.vasuliData?.uddishtanusar.percentage}%</CTableDataCell>
                                        </CTableRow>
                                        <CTableRow className="bg-warning">
                                            <CTableHeaderCell className="text-start">एकूण</CTableHeaderCell>
                                            <CTableHeaderCell>{reportData.vasuliData?.ekun.mangni}</CTableHeaderCell>
                                            <CTableHeaderCell>{reportData.vasuliData?.ekun.vasuli}</CTableHeaderCell>
                                            <CTableHeaderCell>{reportData.vasuliData?.ekun.percentage}%</CTableHeaderCell>
                                        </CTableRow>
                                    </CTableBody>
                                </CTable>

                                <hr />

                                {/* शेरा आणि स्वाक्षरी */}
                                <CRow className="mt-4">
                                    <CCol xs={12}>
                                        <p><strong>तपसणी अधिकाऱ्याचा सर्वसाधारण शेरा:</strong> {reportData.sarvSadharanShera}</p>
                                    </CCol>
                                    <CCol xs={12}>
                                        <p><strong>पुर्ततेकरिता मुद्दे क्रमांक:</strong> {reportData.purttatekkaritaMudde}</p>
                                    </CCol>
                                </CRow>
                                <CRow className="mt-5 text-end">
                                    <CCol xs={12}>
                                        <p className="mb-0"><strong>तपासणी अधिकाऱ्याचे नाव व पदनाम:</strong></p>
                                        <p className="mt-0">{reportData.tapasaniAdhikariName} ({reportData.tapasaniAdhikariPadnam})</p>
                                    </CCol>
                                </CRow>
                            </>
                        )}
                    </div>
                </CCardBody>
            </CCard>

            {/* बटणे CCard च्या बाहेर हलवले, जेणेकरून ते PDF मध्ये येणार नाहीत */}
            <div className="text-center mt-4">
                <CButton color="info" onClick={handleGetData} className="me-3" disabled={loading}>
                    डेटा रिफ्रेश करा (Refresh Data)
                </CButton>
                {reportData.tapasaniAdhikariName && (
                    <CButton color="danger" onClick={handleDownloadPdf} disabled={loading}>
                        {loading ? (
                            <>
                                <CSpinner component="span" size="sm" aria-hidden="true" className="me-2" />
                                प्रत तयार होत आहे...
                            </>
                        ) : (
                            <>
                                <span className="me-2">⬇️</span>अहवालाची प्रत काढा  ( Print Report)
                            </>
                        )}
                    </CButton>
                )}
            </div>
        </CContainer>
    );
};

export default InspectionReport;