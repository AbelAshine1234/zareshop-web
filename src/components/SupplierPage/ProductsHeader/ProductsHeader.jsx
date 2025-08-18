import React from 'react'
import ActiveTab from '../ActiveTab/ActiveTab'
import SearchSection from '../SearchSection/SearchSection'
import styles from './ProductsHeader.module.scss'

export default function ProductsHeader({ 
  productsCount, 
  searchQuery, 
  onSearch 
}) {
  return (
    <div className={styles.productsHeaderSection}>
      <ActiveTab count={productsCount} />
      <SearchSection 
        searchQuery={searchQuery}
        onSearch={onSearch}
      />
    </div>
  )
}
