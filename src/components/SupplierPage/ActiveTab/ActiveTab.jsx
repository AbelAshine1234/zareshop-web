import React from 'react'
import styles from './ActiveTab.module.scss'

export default function ActiveTab({ count }) {
  return (
    <div className={styles.activeTabSection}>
      <div className={styles.activeTab}>
        <span className={styles.tabLabel}>Active</span>
        <span className={styles.tabCount}>{count}</span>
        <div className={styles.tabIndicator}></div>
      </div>
      <div className={styles.tabLine}></div>
    </div>
  )
}
