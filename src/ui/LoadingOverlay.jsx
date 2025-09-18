import React from 'react'
import { useSelector } from 'react-redux'
import styles from './LoadingOverlay.module.scss'

export default function LoadingOverlay() {
  const { isOpen, message } = useSelector(s => s.loading)
  if (!isOpen) return null
  return (
    <div className={styles.overlay}>
      <div className={styles.box}>
        <div className={styles.stage}>
          <div className={styles.logo}>
            <span className={styles.spark} />
            <span className={styles.spark} />
            <span className={styles.spark} />
            <span className={styles.spark} />
          </div>
        </div>
        <div className={styles.strip}>
          <div className={styles.msg}>{message || 'Loading...'}</div>
        </div>
      </div>
    </div>
  )
}
