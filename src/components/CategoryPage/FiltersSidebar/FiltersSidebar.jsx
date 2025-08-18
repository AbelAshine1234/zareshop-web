import React from 'react'
import { FaChevronDown, FaChevronRight } from 'react-icons/fa'
import styles from './FiltersSidebar.module.scss'

export default function FiltersSidebar({ 
  expandedCategories, 
  onToggleCategory, 
  filters, 
  onFilterChange,
  subcategories 
}) {
  return (
    <aside className={styles.filtersSidebar}>
      <div className={styles.filterSection}>
        <h3 className={styles.filterTitle}>Categories</h3>
        <div className={styles.categoryPath}>
          <button className={styles.backButton}>&lt; Electronics</button>
          <button className={styles.backButton}>&lt; Phones</button>
          <span className={styles.currentCategory}>Mobile phones</span>
        </div>
        <div className={styles.subcategories}>
          {Object.entries(subcategories).map(([category, items]) => (
            <div key={category} className={styles.categoryGroup}>
              <button 
                className={styles.categoryHeader}
                onClick={() => onToggleCategory(category)}
              >
                <span>{category}</span>
                {expandedCategories[category] ? 
                  <FaChevronDown className={styles.chevron} /> : 
                  <FaChevronRight className={styles.chevron} />
                }
              </button>
              {expandedCategories[category] && (
                <div className={styles.categoryItems}>
                  {items.map((item, index) => (
                    <button key={index} className={styles.subcategoryLink}>
                      {item}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
          <button className={styles.showMore}>Show more</button>
        </div>
      </div>

      <div className={styles.filterSection}>
        <h3 className={styles.filterTitle}>State</h3>
        <div className={styles.filterButtons}>
          <button 
            className={`${styles.filterBtn} ${filters.state === 'any' ? styles.active : ''}`}
            onClick={() => onFilterChange('state', 'any')}
          >
            Any
          </button>
          <button 
            className={`${styles.filterBtn} ${filters.state === 'new' ? styles.active : ''}`}
            onClick={() => onFilterChange('state', 'new')}
          >
            New
          </button>
          <button 
            className={`${styles.filterBtn} ${filters.state === 'used' ? styles.active : ''}`}
            onClick={() => onFilterChange('state', 'used')}
          >
            Used
          </button>
        </div>
      </div>

      <div className={styles.filterSection}>
        <h3 className={styles.filterTitle}>Stock</h3>
        <label className={styles.checkboxLabel}>
          <input 
            type="checkbox" 
            checked={filters.sale}
            onChange={(e) => onFilterChange('sale', e.target.checked)}
          />
          <span className={styles.checkboxText}>Sale</span>
        </label>
      </div>

      <div className={styles.filterSection}>
        <h3 className={styles.filterTitle}>Price</h3>
        <div className={styles.priceInputs}>
          <div className={styles.priceField}>
            <input 
              type="number" 
              placeholder="From" 
              value={filters.priceFrom}
              onChange={(e) => onFilterChange('priceFrom', e.target.value)}
              className={styles.priceInput}
            />
            <span className={styles.currency}>Р</span>
          </div>
          <div className={styles.priceField}>
            <input 
              type="number" 
              placeholder="to" 
              value={filters.priceTo}
              onChange={(e) => onFilterChange('priceTo', e.target.value)}
              className={styles.priceInput}
            />
            <span className={styles.currency}>Р</span>
          </div>
        </div>
      </div>

      <div className={styles.filterSection}>
        <h3 className={styles.filterTitle}>Sellers</h3>
        <div className={styles.filterButtons}>
          <button 
            className={`${styles.filterBtn} ${filters.sellers === 'all' ? styles.active : ''}`}
            onClick={() => onFilterChange('sellers', 'all')}
          >
            All
          </button>
          <button 
            className={`${styles.filterBtn} ${filters.sellers === 'private' ? styles.active : ''}`}
            onClick={() => onFilterChange('sellers', 'private')}
          >
            Private
          </button>
          <button 
            className={`${styles.filterBtn} ${filters.sellers === 'companies' ? styles.active : ''}`}
            onClick={() => onFilterChange('sellers', 'companies')}
          >
            Companies
          </button>
        </div>
      </div>

      <div className={styles.filterSection}>
        <label className={styles.checkboxLabel}>
          <input 
            type="checkbox" 
            checked={filters.rating}
            onChange={(e) => onFilterChange('rating', e.target.checked)}
          />
          <span className={styles.checkboxText}>4 stars and above</span>
        </label>
      </div>

      <button className={styles.showMoreBtn}>
        Show more than 1 thousand ads
      </button>
    </aside>
  )
}
