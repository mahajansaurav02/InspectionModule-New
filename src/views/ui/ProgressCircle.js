import React, { useEffect, useState } from 'react'
import styles from './ProgressCircle.module.css'

const ProgressCircle = ({ progress, total }) => {
  const radius = 50
  const circumference = 2 * Math.PI * radius

  // final completed percentage (used ONLY for color)
  const completedPercentage =
    total === 0 ? 0 : (progress / total) * 100

  // animated values
  const [animatedPercent, setAnimatedPercent] = useState(0)
  const [animatedCount, setAnimatedCount] = useState(0)

  useEffect(() => {
    let start = null
    const duration = 1200

    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3)

    const animate = (timestamp) => {
      if (!start) start = timestamp
      const elapsed = timestamp - start
      const progressRatio = Math.min(elapsed / duration, 1)
      const eased = easeOutCubic(progressRatio)

      setAnimatedPercent(eased * completedPercentage)
      setAnimatedCount(Math.round(eased * progress))

      if (progressRatio < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [completedPercentage, progress])

  const strokeDashoffset =
    circumference - (animatedPercent / 100) * circumference

  // ✅ COLOR RULES (your exact requirement)
  const getColor = (value) => {
    if (value >= 100) return '#2e7d32' // Dark Green
    if (value < 25) return '#f44336'   // Red
    if (value < 40) return '#ff9800'   // Orange
    return '#4caf50'                   // Green
  }

  // color decided ONLY by completed percentage
  const color = getColor(completedPercentage)

  return (
    <div className={styles.progressContainer}>
      <svg width="120" height="120" viewBox="0 0 120 120">
        <defs>
          <linearGradient id="progressGradient" x1="1" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} />
            <stop offset="100%" stopColor="#ffffff" />
          </linearGradient>
        </defs>

        {/* Background circle */}
        <circle
          cx="60"
          cy="60"
          r={radius}
          className={styles.bgCircle}
        />

        {/* Progress circle */}
        <circle
          cx="60"
          cy="60"
          r={radius}
          className={styles.progressCircle}
          style={{
            strokeDasharray: circumference,
            strokeDashoffset,
            stroke: 'url(#progressGradient)',
          }}
        />

        {/* Percentage text */}
        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          className={styles.percentText}
        >
          {Math.round(animatedPercent)}%
        </text>
      </svg>

      <div className={styles.countText}>
        {animatedCount} of {total}
      </div>
    </div>
  )
}

export default ProgressCircle
