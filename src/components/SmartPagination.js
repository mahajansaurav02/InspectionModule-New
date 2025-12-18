import React from 'react'
import { CPagination, CPaginationItem, CRow, CCol } from '@coreui/react'

const getPaginationPages = (currentPage, totalPages) => {
  const pages = []
  const maxVisible = 5

  let start = Math.max(1, currentPage - 2)
  let end = Math.min(totalPages, currentPage + 2)

  if (currentPage <= 3) {
    start = 1
    end = Math.min(totalPages, maxVisible)
  }

  if (currentPage >= totalPages - 2) {
    start = Math.max(1, totalPages - (maxVisible - 1))
    end = totalPages
  }

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  return pages
}

const SmartPagination = ({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
}) => {
  if (totalPages <= 1) return null

  return (
    <CRow className="mt-3">
      <CCol md={6} className="d-flex align-items-center">
        <div className="dataTables_info">
          {totalItems} नोंदींपैकी {(currentPage - 1) * itemsPerPage + 1} ते{' '}
          {Math.min(currentPage * itemsPerPage, totalItems)} नोंदी दाखवत आहे.
        </div>
      </CCol>

      <CCol md={6} className="d-flex justify-content-end">
        <CPagination align="end" size="sm" className="mb-0">

          {/* Prev */}
          <CPaginationItem
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
          >
            मागे जा
          </CPaginationItem>

          {/* First */}
          {currentPage > 3 && (
            <>
              <CPaginationItem onClick={() => onPageChange(1)}>1</CPaginationItem>
              <CPaginationItem disabled>…</CPaginationItem>
            </>
          )}

          {/* Middle */}
          {getPaginationPages(currentPage, totalPages).map((page) => (
            <CPaginationItem
              key={page}
              active={page === currentPage}
              onClick={() => onPageChange(page)}
            >
              {page}
            </CPaginationItem>
          ))}

          {/* Last */}
          {currentPage < totalPages - 2 && (
            <>
              <CPaginationItem disabled>…</CPaginationItem>
              <CPaginationItem onClick={() => onPageChange(totalPages)}>
                {totalPages}
              </CPaginationItem>
            </>
          )}

          {/* Next */}
          <CPaginationItem
            disabled={currentPage === totalPages}
            onClick={() => onPageChange(currentPage + 1)}
          >
            पुढे जा
          </CPaginationItem>

        </CPagination>
      </CCol>
    </CRow>
  )
}

export default SmartPagination
