import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";

const PrintWrapper = ({ children }) => {
  const printRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: "Inspection Report",
    pageStyle: `
      @page {
        size: letter;
        margin: 1 mm;
      }
      @media print {
        table {
          page-break-inside: avoid;
        }
        tr {
          page-break-inside: avoid;
        }
        .page-break {
          page-break-before: always;
        }
      }
    `
  });

  return (
    <>
      <button className="btn btn-success mt-3" onClick={handlePrint}>
        प्रिंट करा (Print Report)
      </button>

      <div ref={printRef}>
        {children}
      </div>
    </>
  );
};

export default PrintWrapper;
