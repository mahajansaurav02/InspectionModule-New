import React from 'react'
import styles from './ProgressCircle.module.css'

const ProgressCircle = ({ progress, total }) => {
  const radius = 50 // Radius of the circle
  const circumference = 2 * Math.PI * radius // Full circumference

  // Calculate percentage
  const percentage = total === 0 ? 0 : (progress / total) * 100

  // Calculate the visible portion of the stroke
  // The progress circle stroke will start from the top and fill clockwise
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  // Function to determine color based on percentage
  const getColorForProgress = (value) => {
    if (value < 25) {
      return '#f44336' // Red
    } else if (value < 50) {
      return '#ff9800' // Orange
    } else if (value < 75) {
      return '#ffeb3b' // Yellow
    } else {
      return '#4caf50' // Green
    }
  }

  const statusColor = getColorForProgress(percentage)

  return (
    <div className={styles.progressContainer}>
      <svg
        className={styles.progressBar}
        width="120" // SVG width
        height="120" // SVG height
        viewBox="0 0 120 120" // Viewbox should match width/height for easy scaling
      >
        {/* Background circle */}
        <circle
          className={styles.progressBackground}
          cx="60" // Center X (half of 120)
          cy="60" // Center Y (half of 120)
          r={radius}
        />
        {/* Progress circle */}
        <circle
          className={styles.progressCircle}
          cx="60"
          cy="60"
          r={radius}
          style={{
            strokeDasharray: circumference, // This sets the total length of the stroke
            strokeDashoffset: strokeDashoffset, // This controls how much of the stroke is visible
            stroke: statusColor, // Dynamic color based on progress
          }}
        />
      </svg>
      <div className={styles.progressStatus}>
        <div className={styles.progressLabel}>Status</div>
        <div className={styles.progressCount}>{`${progress} of ${total}`}</div>
      </div>
    </div>
  )
}

export default ProgressCircle
