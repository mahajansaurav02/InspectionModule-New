import React from 'react';
import { CButton, CSpinner } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilPrint, cilCloudDownload } from '@coreui/icons';

const PrintUtility = ({ onPrint, onDownload, loading }) => {
    return (
        <div className="print-actions no-print">
            
            <div className="text-center d-flex justify-content-center align-items-center gap-3 flex-wrap mt-4   ">
                
                <CButton
                    color="warning"
                    onClick={onPrint}
                    className="mb-2 d-flex align-items-center justify-content-center gap-2"
                    disabled={loading}
                    style={{ minWidth: '180px' }}
                >
                    {loading ? (
                        <>
                            <CSpinner component="span" size="sm" />
                            प्रत तयार होत आहे...
                        </>
                    ) : (
                        <>
                            <CIcon icon={cilPrint} />
                            थेट प्रिंट करा
                        </>
                    )}
                </CButton>

                <CButton
                    color="success"
                    onClick={onDownload}
                    className="mb-2 d-flex align-items-center justify-content-center gap-2"
                    disabled={loading}
                    style={{ minWidth: '180px' }}
                >
                    {loading ? (
                        <>
                            <CSpinner component="span" size="sm" />
                            प्रत तयार होत आहे...
                        </>
                    ) : (
                        <>
                            <CIcon icon={cilCloudDownload} />
                            PDF डाउनलोड करा
                        </>
                    )}
                </CButton>
            
            </div>

            <div className="mt-3 text-muted small text-center">
                टीप: प्रिंट करताना ब्राउझरच्या प्रिंट सेटिंगमध्ये हेडर आणि फूटर काढून टाका.
            </div>
        </div>
    );
};

export default PrintUtility;
