import React from 'react'
import {
  CModal,
  CModalBody,
  CButton,
  CSpinner,
} from '@coreui/react'
import { FaCheckCircle, FaExclamationCircle } from 'react-icons/fa'
// Note: Ensure you have 'animate.css' installed or add a CDN link in your index.html 
// for the "animate__animated" classes to work beautifully.

const ConfirmSubmitModal = ({
  visible,
  loading = false,
  success = false,
  title = 'पुष्टीकरण',
  message = 'तुम्ही अभिप्राय जतन करण्यास तयार आहात का?',
  successMessage = 'यशस्वीरित्या सादर झाले!',
  onCancel,
  onConfirm,
}) => {
  return (
    <CModal
      visible={visible}
      alignment="center"
      backdrop="static"
      // Using custom class for soft edges and deep shadow
      className="border-0 shadow-lg rounded-4 overflow-hidden"
      onClose={!loading && !success ? onCancel : undefined}
    >
      <CModalBody className="p-3 text-center">
        {loading ? (
          <div className="py-4">
            <CSpinner 
              color="primary" 
              variant="grow" 
              style={{ width: '4rem', height: '4rem', borderWidth: '4px' }} 
              className="mb-4 shadow-sm" 
            />
            <h4 className="fw-bold text-dark mt-2">प्रक्रिया सुरू आहे...</h4>
            <p className="text-muted">आम्ही तुमचा अभिप्राय सुरक्षितपणे जतन करत आहोत.</p>
          </div>
        ) : success ? (
          <div className="animate__animated animate__backInDown">
            <div className="d-inline-flex p-4 rounded-circle bg-success bg-opacity-10 mb-4">
              <FaCheckCircle size={70} className="text-success" />
            </div>
            <h3 className="fw-bolder text-dark mb-2">{successMessage}</h3>
            <p className="text-secondary fs-6">काही क्षणात तुम्हाला रिडायरेक्ट केले जाईल...</p>
          </div>
        ) : (
          <div className="animate__animated animate__fadeIn">
            <div className="d-inline-flex p-4 rounded-circle bg-warning bg-opacity-10 mb-4">
              <FaExclamationCircle size={60} className="text-success" />
            </div>
            <h3 className="fw-bolder text-dark mb-3">{title}</h3>
            <p className="text-muted fs-5 px-3">
              {message}
            </p>
            
            <div className="d-flex justify-content-center gap-3 mt-5">
              <CButton 
                color="light" 
                className="px-5 py-2 rounded-pill fw-semibold text-secondary shadow-sm"
                onClick={onCancel}
                style={{ border: '1px solid #eee' }}
              >
                रद्द करा
              </CButton>
              <CButton 
                color="primary" 
                className="px-5 py-2 rounded-pill fw-bold shadow-lg"
                onClick={onConfirm}
              >
                होय, जतन करा
              </CButton>
            </div>
          </div>
        )}
      </CModalBody>
    </CModal>
  )
}

export default ConfirmSubmitModal