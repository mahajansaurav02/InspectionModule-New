import React from 'react';
import FerfarNavbar from '../ferfarNondvahi/ferfarSections/FerfarNavbar'
// Ensure you've run: npm install bootstrap-icons
import 'bootstrap-icons/font/bootstrap-icons.css'; 

function MisInspection() {
   const tableData = [
      { pad: 'जिल्हाधिकारी ', totalVillages: 6, inspected: 5, pending: 1, error: 0 },
      { pad: 'अपर जिल्हाधिकारी  ', totalVillages: 8, inspected: 2, pending: 6, error: 0 },
      { pad: 'उप जिल्हाधिकारी  ', totalVillages: 12, inspected: 9, pending: 3, error: 0 },
      { pad: 'तहसीलदार', totalVillages: 15, inspected: 5, pending: 10, error: 0 },
      { pad: 'नायब तहसीलदार', totalVillages: 18, inspected: 2, pending: 16, error: 0 },
      { pad: 'मंडळ अधिकारी', totalVillages: 25, inspected: 8, pending: 17, error: 0 },
  ];

  const totals = tableData.reduce((acc, curr) => ({
    total: acc.total + curr.totalVillages,
    inspected: acc.inspected + curr.inspected,
    pending: acc.pending + curr.pending,
    error: acc.error + curr.error
  }), { total: 0, inspected: 0, pending: 0, error: 0 });

  return (
    <div className="bg-light min-vh-100">
      <FerfarNavbar />

      <div className="container mt-3"> {/* Reduced top margin */}
        
        {/* Compact Header */}
        <div className="d-flex align-items-center justify-content-between mb-3">
          <h4 className="fw-bold text-dark mb-0">
            <i className="bi bi-file-earmark-bar-graph text-primary me-2"></i>
            दप्तर तपासणी प्रगती अहवाल
          </h4>
          <span className="badge bg-white text-dark border shadow-sm px-3 py-2">
            दिनांक: {new Date().toLocaleDateString('mr-IN')}
          </span>
        </div>

        {/* Small Summary Strip */}
        <div className="row g-2 mb-3">
          <CompactStat color="primary" label="एकूण" value={totals.total} icon="bi-house" />
          <CompactStat color="success" label="पूर्ण" value={totals.inspected} icon="bi-check-lg" />
          <CompactStat color="warning" label="प्रलंबित" value={totals.pending} icon="bi-hourglass-split" />
          <CompactStat color="danger" label="त्रुटी" value={totals.error} icon="bi-exclamation-octagon" />
        </div>

        {/* Tight Table Card */}
        <div className="card shadow-sm border-0">
          <div className="table-responsive">
            <table className="table table-sm table-hover align-middle mb-0">
              <thead className="table-light">
                <tr className="small text-muted">
                  <th className="ps-3 py-2">पद / हुद्दा</th>
                  <th className="text-center">एकूण गावे</th>
                  <th className="text-center">पूर्ण तपासणी</th>
                  <th className="text-center">प्रलंबित</th>
                  <th className="text-center">त्रुटी</th>
                  <th className="text-center pe-3" style={{width: '150px'}}>प्रगती</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((item, index) => {
                  const percentage = Math.round((item.inspected / item.totalVillages) * 100);
                  return (
                    <tr key={index}>
                      <td className="ps-3 fw-bold text-secondary">{item.pad}</td>
                      <td className="text-center fw-semibold">{item.totalVillages}</td>
                      <td className="text-center">
                        <span className="text-success fw-bold">{item.inspected}</span>
                      </td>
                      <td className="text-center">
                        <span className="text-warning-emphasis fw-bold">{item.pending}</span>
                      </td>
                      <td className="text-center">
                        <span className="text-danger fw-bold">{item.error}</span>
                      </td>
                      <td className="pe-3">
                        <div className="d-flex align-items-center">
                          <div className="progress flex-grow-1" style={{ height: '6px' }}>
                            <div 
                              className={`progress-bar bg-${percentage > 70 ? 'success' : 'primary'}`} 
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                          <small className="ms-2 fw-bold">{percentage}%</small>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <style>{`
        .table > :not(caption) > * > * { padding: 0.75rem 0.5rem; }
        .bg-light { background-color: #f8f9fa !important; }
        .text-warning-emphasis { color: #856404 !important; }
        .progress { border-radius: 10px; background-color: #e9ecef; }
      `}</style>
    </div>
  );
}

// Compact version of the Stat Card
const CompactStat = ({ color, label, value, icon }) => (
  <div className="col-6 col-md-3">
    <div className={`card border-0 shadow-sm border-bottom border-3 border-${color}`}>
      <div className="card-body py-2 px-3">
        <div className="d-flex align-items-center justify-content-between">
          <div>
            <div className="text-muted small fw-semibold uppercase">{label}</div>
            <h5 className="fw-bold mb-0">{value}</h5>
          </div>
          <i className={`bi ${icon} text-${color} fs-4 opacity-50`}></i>
        </div>
      </div>
    </div>
  </div>
);

export default MisInspection;