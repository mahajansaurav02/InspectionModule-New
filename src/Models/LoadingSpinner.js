import React from 'react'
import styles from './LoadingSpinner.module.css'

const LoadingSpinner = ({ message = 'Loading...', fullscreen = false }) => {
  return (
    <div
      className={`${styles['spinner-container']} ${
        fullscreen ? styles['fullscreen'] : ''
      }`}
    >
      <div className={styles['spinner']}>
        {/* The bouncing dots animation */}
        <div className={styles['dot-1']}></div>
        <div className={styles['dot-2']}></div>
        <div className={styles['dot-3']}></div>
      </div>
      <span className={styles['spinner-message']}>
        {message}
      </span>
    </div>
  )
}

export default LoadingSpinner