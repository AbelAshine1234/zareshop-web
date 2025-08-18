import React, { useRef } from 'react'
import { FaBars, FaSearch, FaMapMarkerAlt } from 'react-icons/fa'
import styles from './SearchHeader.module.scss'
import zareLogo from '../../assets/images/zareshop.png'

export default function SearchHeader({ containerRef, onOpenAllCategories }) {
  const allCatBtnRef = useRef(null)

  const handleOpenAllCategories = () => {
    const btn = allCatBtnRef.current
    const layout = containerRef?.current
    if (btn && layout) {
      const btnRect = btn.getBoundingClientRect()
      const layoutRect = layout.getBoundingClientRect()
      const position = {
        top: btnRect.bottom + window.scrollY + 10,
        left: layoutRect.left + window.scrollX,
        width: layoutRect.width
      }
      onOpenAllCategories && onOpenAllCategories(position)
    } else {
      onOpenAllCategories && onOpenAllCategories({ top: 0, left: 0, width: 0 })
    }
  }

  return (
    <div className={styles.searchSection}>
      <div className={styles.searchContainer}>
        <div className={styles.logoSection} data-logo-section>
          <div className={styles.zareshopLogo}>
            <img className={styles.logoImg} src={zareLogo} alt="Zareshop" />
          </div>
        </div>
        <div className={`${styles.searchBar} searchBar`}>
          <button 
            className={styles.allCategoriesBtn}
            ref={allCatBtnRef}
            onClick={handleOpenAllCategories}
          >
            <FaBars className={styles.menuIcon} />
            <FaSearch className={styles.searchIcon} />
            All categories
          </button>
          <input type="text" placeholder="Search ads" className={styles.searchInput} />
          <button className={styles.searchBtn}>Find</button>
        </div>
        <div className={`${styles.locationSection} locationSection`}>
          <FaMapMarkerAlt className={styles.locationIcon} />
          <span className={styles.locationText}>In all regions</span>
        </div>
      </div>
    </div>
  )
}


