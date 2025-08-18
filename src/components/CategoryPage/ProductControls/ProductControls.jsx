import React from 'react'
import { FaThLarge, FaList, FaEye } from 'react-icons/fa'
import styles from './ProductControls.module.scss'

export default function ProductControls({ 
  viewMode, 
  onViewModeChange, 
  sortBy, 
  onSortChange 
}) {
  return (
    <div className={styles.controls}>
      <div className={styles.controlsLeft}>
        <div className={styles.viewControls}>
          <button 
            className={`${styles.viewBtn} ${viewMode === 'grid' ? styles.active : ''}`}
            onClick={() => onViewModeChange('grid')}
          >
            <FaThLarge />
          </button>
          <button 
            className={`${styles.viewBtn} ${viewMode === 'list' ? styles.active : ''}`}
            onClick={() => onViewModeChange('list')}
          >
            <FaList />
          </button>
        </div>
        <select 
          className={styles.sortSelect}
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
        >
          <option value="relevance">Sorting</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="newest">Newest First</option>
        </select>
      </div>
      <a href="#" className={styles.saveSearch}>
        <FaEye />
        Save search
      </a>
    </div>
  )
}
