import React from 'react'
import { FaSearch, FaFilter } from 'react-icons/fa'
import styles from './SearchSection.module.scss'

export default function SearchSection({ 
  searchQuery, 
  onSearch 
}) {
  return (
    <div className={styles.searchSection}>
      <div className={styles.searchContainer}>
        <FaSearch className={styles.searchIcon} />
        <input
          type="text"
          placeholder="Search in profile"
          value={searchQuery}
          onChange={(e) => onSearch(e.target.value)}
          className={styles.searchInput}
        />
        <FaFilter className={styles.filterIcon} />
      </div>
      <button className={styles.searchBtn}>
        Find
      </button>
    </div>
  )
}
