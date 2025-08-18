import React from 'react'
import styles from './PageHeader.module.scss'

export default function PageHeader({ categoryName, totalItems, activeTab, onTabChange }) {
  return (
    <div className={styles.pageHeader}>
      <h1 className={styles.pageTitle}>
        {categoryName} <span className={styles.itemCount}>{totalItems}</span>
      </h1>
      
      {/* Tabs */}
      <div className={styles.tabs}>
        <button 
          className={`${styles.tab} ${activeTab === 'announcements' ? styles.active : ''}`}
          onClick={() => onTabChange('announcements')}
        >
          Announcements
        </button>
        <button 
          className={`${styles.tab} ${activeTab === 'suppliers' ? styles.active : ''}`}
          onClick={() => onTabChange('suppliers')}
        >
          Suppliers
        </button>
      </div>
    </div>
  )
}
