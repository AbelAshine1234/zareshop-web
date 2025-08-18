import React from 'react'
import styles from './LoadingSpinner.module.scss'

const LoadingSpinner = ({ size = 'medium', message = 'Loading...' }) => {
  return (
    <div className={styles.container}>
      <div className={`${styles.spinner} ${styles[size]}`}>
        <div className={styles.bounce1}></div>
        <div className={styles.bounce2}></div>
        <div className={styles.bounce3}></div>
      </div>
      {message && <p className={styles.message}>{message}</p>}
    </div>
  )
}

export default React.memo(LoadingSpinner)
