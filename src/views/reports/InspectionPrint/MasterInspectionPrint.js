import React from 'react'

const MasterInspectionPrint = ({
  reportData,
  sequentialFerfarList,
  ferfarRemarkList,
  eChawadiRemarks,
  vasuliRemarks,
  eHakkRemarks,
  vasuliDetails,
  revenueTargetData,
  akrushakData,
}) => {
  // Helpers
  const getRemarkType = (type) => {
    if (type === 1 || type === '1' || type === 'साधारण') return 'साधारण'
    if (type === 2 || type === '2' || type === 'गंभीर') return 'गंभीर'
    if (type === 3 || type === '3' || type === 'अतीगंभीर') return 'अतीगंभीर'
    return '-'
  }

  const getPercentage = (mangni, vasuli) => {
    if (!mangni || mangni === 0) return '0%'
    return `${((vasuli / mangni) * 100).toFixed(2)}%`
  }

  const totalDemandAll =
    (Number(vasuliDetails?.jaminMahsul029?.mangni) || 0) +
    (Number(vasuliDetails?.itarMahsul045?.mangni) || 0) +
    (Number(revenueTargetData?.annualVillageTarget) || 0)

  const totalCollectedAll =
    (Number(vasuliDetails?.jaminMahsul029?.vasuli) || 0) +
    (Number(vasuliDetails?.itarMahsul045?.vasuli) || 0) +
    (Number(revenueTargetData?.grandTotal) || 0)

  const totalPercentageAll = totalDemandAll
    ? ((totalCollectedAll / totalDemandAll) * 100).toFixed(2)
    : 0

  // Print Styles
  const printStyles = `
    .print-wrapper { font-family: 'Arial', sans-serif; font-size: 14px; color: #000; line-height: 1.5; }
    .print-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; page-break-inside: auto; }
    .print-table th, .print-table td { border: 1px solid #000; padding: 6px 10px; text-align: left; vertical-align: top; }
    .print-table th { background-color: #f2f2f2; font-weight: bold; text-align: center; }
    .text-center { text-align: center; }
    .text-end { text-align: right; }
    .fw-bold { font-weight: bold; }
    .page-break { page-break-before: always; }
    .section-title { font-size: 16px; font-weight: bold; margin: 15px 0 10px 0; text-decoration: underline; }
    h2, h3 { text-align: center; margin: 5px 0; }
    .info-grid { display: flex; flex-wrap: wrap; margin-bottom: 20px; }
    .info-item { width: 50%; padding: 5px 0; }
  `

  return (
    <div className="print-wrapper">
      <style>{printStyles}</style>

      {/* ======================= PAGE 1 : MAIN REPORT ======================= */}
      <h2>ग्राम महसूल अधिकारी दप्तर निरीक्षण टिप्पणी</h2>
      <hr style={{ border: '1px solid #000', marginBottom: '20px' }} />

      <div className="info-grid">
        <div className="info-item">
          <strong>तपासणी अधिकाऱ्याचे नाव व पदनाम:</strong> {reportData.tapasaniAdhikariName || '-'}{' '}
          ({reportData.tapasaniAdhikariPadnam || '-'})
        </div>
        <div className="info-item">
          <strong>तपासणी दिनांक:</strong> {reportData.tapasaniDinanck || '-'}
        </div>
        <div className="info-item">
          <strong>साजाचे नाव:</strong> {reportData.sajacheNaw || '-'}
        </div>
        <div className="info-item">
          <strong>ग्राम महसूल अधिकाऱ्याचे नाव:</strong> {reportData.gramMahsulAdhikariName || '-'}
        </div>
        <div className="info-item" style={{ width: '100%' }}>
          <strong>गावाचे नाव:</strong> {reportData.gawacheNaw || '-'}
        </div>
      </div>

      {/* A. Ferfar Tapasani */}
      <div className="section-title">अ. फेरफार तपासणी</div>
      <table className="print-table text-center">
        <thead>
          <tr>
            <th width="10%">अ.क्र.</th>
            <th width="40%">तपशील</th>
            <th width="50%">फेरफार क्रमांक</th>
          </tr>
        </thead>
        <tbody>
          {sequentialFerfarList?.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td style={{ textAlign: 'left' }}>
                {item.ferfarType === 1
                  ? 'आदेश फेरफार'
                  : item.ferfarType === 2
                  ? 'कलम 155 नुसार केलेले फेरफार'
                  : item.ferfarType === 3
                  ? 'इतर फेरफार या टेम्प्लेटने केलेले फेरफार'
                  : item.ferfarType === 4
                  ? 'तांत्रिक कारणास्तव नामंजूर केलेले फेरफार'
                  : item.ferfarType === 5
                  ? 'रि-एन्ट्री केलेले फेरफार'
                  : item.ferfarType === 6
                  ? 'नियंत्रीत सत्ता प्रकार असलेले भूमापन क्रमांकवर घेण्यात आलेले फेरफार'
                  : item.ferfarType === 7
                  ? 'स्थगिती असलेले फेरफार'
                  : 'टेंप्लेट फेरफार'}
              </td>
              <td>{item.mutNos?.length > 0 ? item.mutNos.join(', ') : '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* B. E-Hakk Tapasani */}
      <div className="section-title">ब. ई-हक्क प्रणाली मधील अर्ज तपासणी</div>
      <p className="fw-bold mb-1">
        १. त्रुटीपूर्ततेसाठी भूधारकास परत पाठविण्यात आलेल्या अर्जांची तपासणी (अर्ज संख्या):{' '}
        {reportData.eHakkArjData?.trutiArjList?.length || 0}
      </p>

      {/* 1. Truti Arj Table */}
      <table className="print-table text-center">
        <thead>
          <tr>
            <th width="60%">तपशील</th>
            <th width="40%">अर्ज क्र.</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ textAlign: 'left' }}>
              त्रुटीपूर्ततेसाठी भूधारकास परत पाठविण्यात आलेले अर्ज
            </td>
            <td>
              {reportData.eHakkArjData?.trutiArjList?.length > 0
                ? reportData.eHakkArjData.trutiArjList.map((item) => item.arjNo).join(', ')
                : '-'}
            </td>
          </tr>
        </tbody>
      </table>

      <p className="fw-bold mt-3 mb-1">
        २. तलाठी स्तरावर फेरफाराकरीता प्रलंबित अर्जांची तपासणी (अर्ज संख्या):
      </p>
      <table className="print-table text-center">
        <thead>
          <tr>
            <th>१८० दिवसापेक्षा जास्त प्रलंबित</th>
            <th>९० ते १८० दिवसातील प्रलंबित</th>
            <th>३० ते ९० दिवसातील प्रलंबित</th>
            <th>३० दिवसा पेक्षा कमी प्रलंबित</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              {reportData.eHakkArjData?.pralambitArjList?.filter(
                (i) =>
                  i.ehakkatype &&
                  (i.ehakkatype.includes('180') || i.ehakkatype.includes('१८०')) &&
                  i.ehakkatype.includes('जास्त'),
              ).length || 0}
            </td>
            <td>
              {reportData.eHakkArjData?.pralambitArjList?.filter(
                (i) =>
                  i.ehakkatype &&
                  (i.ehakkatype.includes('90') || i.ehakkatype.includes('९०')) &&
                  (i.ehakkatype.includes('180') || i.ehakkatype.includes('१८०')),
              ).length || 0}
            </td>
            <td>
              {reportData.eHakkArjData?.pralambitArjList?.filter(
                (i) =>
                  i.ehakkatype &&
                  (i.ehakkatype.includes('30') || i.ehakkatype.includes('३०')) &&
                  (i.ehakkatype.includes('90') || i.ehakkatype.includes('९०')),
              ).length || 0}
            </td>
            <td>
              {reportData.eHakkArjData?.pralambitArjList?.filter(
                (i) =>
                  i.ehakkatype &&
                  (i.ehakkatype.includes('30') || i.ehakkatype.includes('३०')) &&
                  i.ehakkatype.includes('कमी'),
              ).length || 0}
            </td>
          </tr>
        </tbody>
      </table>

      {/* C. E-Chawadi */}
      <div className="section-title">क. ई-चावडी प्रणाली मधील तपासणी</div>
      <table className="print-table">
        <thead>
          <tr>
            <th width="10%">अ.क्र.</th>
            <th width="70%">तपशील</th>
            <th width="20%">संख्या / शेरा</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="text-center">१</td>
            <td>
              गावातील गाव नमुना पूर्ण भरण्याची घोषणा केलेले गाव नमुना संख्या:
              <br />
              I) निरंक केलेले नमुना संख्या:
              <br />
              II) कामकाज पूर्ण नमुना संख्या:
              <br />
              III) घोषणा न केलेल्या नमुन्याची संख्या:
            </td>
            <td className="text-center">
              <br />
              {reportData.eChawadiData?.gawNamunaPurna?.nirank || 0}
              <br />
              {reportData.eChawadiData?.gawNamunaPurna?.kamkajPurna || 0}
              <br />
              {reportData.eChawadiData?.gawNamunaPurna?.aghoshanaKeliNaslele || 0}
            </td>
          </tr>
          <tr>
            <td className="text-center">२</td>
            <td>गावातील मागणी निश्चिती केल्यानंतर दुरुस्ती करण्यात आलेल्या खातेदारांची संख्या</td>
            <td className="text-center">
              {reportData.eChawadiData?.mangniRakkamKamiKhatedar || 0}
            </td>
          </tr>

          <tr>
            <td className="text-center">३</td>
            <td>गावाचा अकृषक दर भरला आहे काय ?</td>
            <td className="text-center">
              {akrushakData?.declaration === 'N' ? 'नाही' : 'होय'} (दर (प्रति चौ.मी):{' '}
              {akrushakData?.nprate > 0
                ? `${akrushakData.nprate} रुपये`
                : akrushakData?.mnparate > 0
                ? `${akrushakData.mnparate} रुपये`
                : akrushakData?.tenpaise > 0
                ? `${akrushakData.tenpaise} पैसे`
                : akrushakData?.fivepaise > 0
                ? `${akrushakData.fivepaise} पैसे`
                : '-'}
              )
            </td>
          </tr>

          <tr>
            <td className="text-center">४</td>
            <td>
              उप-अधीक्षक, भूमिअभिलेख आकारबंद तपशील (तलाठी दप्तरात उपलब्ध परंतु आकारबंद मध्ये नसलेले)
            </td>
            <td className="text-center">
              {reportData.eChawadiData?.akarbandTapshil?.upAdhikshakNotAvail || 0}
            </td>
          </tr>
        </tbody>
      </table>

      {/* D. Vasuli */}
      <div className="section-title">ड. वसुली बाबत तपशील</div>
      <table className="print-table text-center">
        <thead>
          <tr>
            <th>तपशील</th>
            <th>मागणी</th>
            <th>वसुली</th>
            <th>टक्केवारी</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ textAlign: 'left' }}>जमीन महसूल वसुली (०२९)</td>
            <td>{vasuliDetails?.jaminMahsul029?.mangni || 0}</td>
            <td>{vasuliDetails?.jaminMahsul029?.vasuli || 0}</td>
            <td>{vasuliDetails?.jaminMahsul029?.percentage || 0}%</td>
          </tr>
          <tr>
            <td style={{ textAlign: 'left' }}>इतर जमीन महसूल वसुली (०४५)</td>
            <td>{vasuliDetails?.itarMahsul045?.mangni || 0}</td>
            <td>{vasuliDetails?.itarMahsul045?.vasuli || 0}</td>
            <td>{vasuliDetails?.itarMahsul045?.percentage || 0}%</td>
          </tr>
          <tr>
            <td style={{ textAlign: 'left' }}>उद्दिष्टानुसार वसुली</td>
            <td>{revenueTargetData?.annualVillageTarget || 0}</td>
            <td>{revenueTargetData?.grandTotal || 0}</td>
            <td>
              {getPercentage(revenueTargetData?.annualVillageTarget, revenueTargetData?.grandTotal)}
            </td>
          </tr>
          <tr style={{ fontWeight: 'bold', backgroundColor: '#f9f9f9' }}>
            <td style={{ textAlign: 'left' }}>एकूण</td>
            <td>{totalDemandAll}</td>
            <td>{totalCollectedAll}</td>
            <td>{totalPercentageAll}%</td>
          </tr>
        </tbody>
      </table>

      {/* ======================= PAGE 2 : ANNEXURE (REMARKS) ======================= */}
      <div className="page-break"></div>

      <h3>परिशिष्ट - १</h3>
      <h2>ग्राम महसूल अधिकारी दप्तर तपासणी - सविस्तर शेरा व अभिप्राय</h2>
      <hr style={{ border: '1px solid #000', marginBottom: '20px' }} />

      {/* A. Ferfar Remarks - SEPARATE TABLES FOR EACH TYPE */}
      <div className="section-title mb-3">अ. फेरफार तपासणी शेरा</div>
      {(() => {
        // तुझा ओरिजिनल डेटा sequentialFerfarList मधून येत आहे, ferfarRemarkList मधून नाही!
        let anyRemarksFound = false

        const typeNames = {
          1: 'आदेश फेरफार',
          2: 'कलम 155 नुसार केलेले फेरफार',
          3: 'इतर फेरफार या टेम्प्लेटने केलेले फेरफार',
          4: 'तांत्रिक कारणास्तव नामंजूर केलेले फेरफार',
          5: 'रि-एन्ट्री केलेले फेरफार',
          6: 'नियंत्रीत सत्ता प्रकार असलेले भूमापन क्रमांकवर घेण्यात आलेले फेरफार',
          7: 'स्थगिती असलेले फेरफार',
          8: 'टेंप्लेट फेरफार',
        }

        const tables = sequentialFerfarList?.map((item) => {
          // item.data मध्येच तुझे ओरिजिनल शेरे आहेत (जसे जुन्या कोडमध्ये होते)
          const remarksArray = item.data || []

          // ज्या फेरफारांना शेरा दिलाय फक्त तेच फिल्टर करा
          const validRemarks = remarksArray.filter((rem) => rem.remark && rem.remark.trim() !== '')

          if (validRemarks.length > 0) {
            anyRemarksFound = true
            return (
              <div key={item.ferfarType} style={{ marginBottom: '20px' }}>
                <p className="fw-bold mb-2" style={{ fontSize: '15px' }}>
                  ♦ {typeNames[item.ferfarType] || 'फेरफार प्रकार'}:
                </p>
                <table className="print-table mb-0">
                  <thead>
                    <tr>
                      <th width="20%">फेरफार क्र.</th>
                      <th width="20%">प्रकार</th>
                      <th width="60%">शेरा</th>
                    </tr>
                  </thead>
                  <tbody>
                    {validRemarks.map((rem, idx) => (
                      <tr key={idx}>
                        {/* जुन्या कोडप्रमाणे अचूक mutNo आणि remark */}
                        <td className="text-center fw-bold">{rem.mutNo || '-'}</td>
                        <td className="text-center">{getRemarkType(rem.typeOfRemark)}</td>
                        <td>{rem.remark}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          }
          return null
        })

        // जर कोणत्याही प्रकारच्या फेरफाराला शेरा नसेल
        if (!anyRemarksFound) {
          return (
            <div
              className="text-center p-2 mb-3"
              style={{ border: '1px dotted #000', color: '#333' }}
            >
              फेरफार शेरा उपलब्ध नाही
            </div>
          )
        }

        return tables
      })()}

      {/* B. e-Hakk Remarks */}
      <div className="section-title mt-4">ब. ई-हक्क प्रणाली शेरा</div>
      <p className="fw-bold mb-1">
        १. त्रुटीपूर्ततेसाठी भूधारकास परत पाठविण्यात आलेल्या अर्जांची तपासणी:
      </p>
      <table className="print-table">
        <thead>
          <tr>
            <th width="20%">अर्ज क्र.</th>
            <th width="20%">प्रकार</th>
            <th width="60%">शेरा</th>
          </tr>
        </thead>
        <tbody>
          {(() => {
            const trutiList = reportData.eHakkArjData?.trutiArjList || []
            const withRemarks = trutiList.filter((item) => item.remark && item.remark.trim() !== '')
            if (withRemarks.length > 0) {
              return withRemarks.map((item, idx) => (
                <tr key={idx}>
                  <td className="text-center fw-bold">{item.arjNo}</td>
                  <td className="text-center">{getRemarkType(item.typeOfRemark)}</td>
                  <td>{item.remark}</td>
                </tr>
              ))
            } else {
              return (
                <tr>
                  <td colSpan="3" className="text-center text-muted">
                    {eHakkRemarks?.trutiPurtta || 'शेरा उपलब्ध नाही'}
                  </td>
                </tr>
              )
            }
          })()}
        </tbody>
      </table>

      <p className="fw-bold mb-1">२. तलाठी स्तरावर फेरफाराकरीता प्रलंबित अर्जांची तपासणी:</p>
      <table className="print-table">
        <thead>
          <tr>
            <th width="15%">अर्ज क्र.</th>
            <th width="35%">प्रलंबित प्रकार</th>
            <th width="15%">प्रकार</th>
            <th width="35%">शेरा</th>
          </tr>
        </thead>
        <tbody>
          {(() => {
            const pralambitList = reportData.eHakkArjData?.pralambitArjList || []
            const withRemarks = pralambitList.filter(
              (item) => item.remark && item.remark.trim() !== '',
            )
            if (withRemarks.length > 0) {
              return withRemarks.map((item, idx) => (
                <tr key={idx}>
                  <td className="text-center fw-bold">{item.applicationId}</td>
                  <td>{item.ehakkatype}</td>
                  <td className="text-center">{getRemarkType(item.remarkType)}</td>
                  <td>{item.remark}</td>
                </tr>
              ))
            } else {
              return (
                <tr>
                  <td colSpan="4" className="text-center text-muted">
                    प्रलंबित अर्जांचे शेरा उपलब्ध नाहीत
                  </td>
                </tr>
              )
            }
          })()}
        </tbody>
      </table>

      {/* C & D. e-Chawadi & Vasuli Remarks */}
      <div className="section-title">क. ई-चावडी व ड. वसुली बाबत शेरा</div>
      <table className="print-table">
        <tbody>
          <tr>
            <td width="30%" className="fw-bold">
              ई-चावडी (गाव नमुना पूर्ण)
            </td>
            <td>
              I) निरंक: {eChawadiRemarks?.gawNamunaPurna?.nirank || '-'} <br />
              II) कामकाज पूर्ण: {eChawadiRemarks?.gawNamunaPurna?.kamkajPurna || '-'} <br />
              III) अघोषणा: {eChawadiRemarks?.gawNamunaPurna?.aghoshanaKeliNaslele || '-'}
            </td>
          </tr>
          <tr>
            <td className="fw-bold">मागणी निश्चितीनंतर दुरुस्ती</td>
            <td>{eChawadiRemarks?.mangniRakkamKamiKhatedar || '-'}</td>
          </tr>
          <tr>
            <td className="fw-bold">अकृषक दर तपासणी</td>
            <td>{eChawadiRemarks?.akrushakDarBharlaKay || '-'}</td>
          </tr>
          <tr>
            <td className="fw-bold">वसुली बाबत शेरा</td>
            <td>{vasuliRemarks || '-'}</td>
          </tr>
        </tbody>
      </table>

      {/* FINAL REMARKS & SIGNATURE */}
      <div style={{ marginTop: '30px' }}>
        <p className="fw-bold mb-1">इ. सर्वसाधारण शेरा:</p>
        <p style={{ paddingLeft: '20px' }}>{reportData.sarvSadharanShera || '-'}</p>

        <p className="fw-bold mb-1 mt-3">फ. पुर्ततेकरिता मुद्दे:</p>
        <p style={{ paddingLeft: '20px' }}>{reportData.purttatekkaritaMudde || '-'}</p>
      </div>

      <div
        style={{ marginTop: '80px', display: 'flex', justifyContent: 'flex-end', width: '100%' }}
      >
        <div style={{ textAlign: 'center', width: '300px' }}>
          <p style={{ marginBottom: '60px' }}>(सही व शिक्क्यासाठी जागा)</p>
          <hr style={{ border: '1px solid #000', width: '80%', margin: '0 auto' }} />
          <p className="fw-bold mt-2 mb-0">तपासणी अधिकाऱ्याची सही</p>
          <p className="mb-0">नाव: {reportData.tapasaniAdhikariName}</p>
          <p>पदनाम: ({reportData.tapasaniAdhikariPadnam})</p>
        </div>
      </div>
    </div>
  )
}

export default MasterInspectionPrint
