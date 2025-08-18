import React, { useState, useEffect, useRef } from 'react'
import { FaChevronRight } from 'react-icons/fa'
import { CATEGORIES_DATA } from '../../data'
import styles from './CategoryNavigation.module.scss'

export default function AllCategoriesPopup({ isOpen, onClose, buttonPosition }) {
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES_DATA[0])
  const modalRef = useRef(null)
  const [modalHeight, setModalHeight] = useState(0)

  const handleCategorySelect = (category) => {
    setSelectedCategory(category)
  }

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose && onClose()
    }
  }

  useEffect(() => {
    if (!isOpen) return
    const measure = () => {
      if (modalRef.current) {
        setModalHeight(modalRef.current.offsetHeight || 0)
      }
    }
    measure()
    let ro
    if (window.ResizeObserver && modalRef.current) {
      ro = new ResizeObserver(measure)
      ro.observe(modalRef.current)
    }
    window.addEventListener('resize', measure)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('resize', measure)
      if (ro) ro.disconnect()
      document.body.style.overflow = previousOverflow
    }
  }, [isOpen])

  return (
    <div
      className={styles.overlay}
      style={{ display: isOpen ? 'flex' : 'none' }}
      onClick={handleOverlayClick}
      aria-hidden={!isOpen}
    >
      {isOpen && (() => {
        const top = buttonPosition.top || 0
        return (
          <div
            className={styles.shade}
            onClick={onClose}
            style={{ top, left: 0, right: 0, bottom: 0 }}
          />
        )
      })()}
      <div 
        className={styles.modal}
        style={{
          top: buttonPosition.top || 0,
          left: buttonPosition.left || 0,
          width: buttonPosition.width || 'auto'
        }}
        ref={modalRef}
      >
        <div className={styles.content}>
          <div className={styles.categoriesList}>
            {CATEGORIES_DATA.map((category) => (
              <div
                key={category.id}
                className={`${styles.categoryItem} ${selectedCategory?.id === category.id ? styles.active : ''}`}
                onMouseEnter={() => handleCategorySelect(category)}
              >
                <img src={category.image} alt={category.name} className={styles.categoryThumb} />
                <span className={styles.categoryName}>{category.name}</span>
                <FaChevronRight className={styles.arrow} />
              </div>
            ))}
          </div>
          <div className={styles.subcategoriesView}>
            <div className={styles.subcategoryHeader}>
              <h3>{selectedCategory?.name}</h3>
              <FaChevronRight className={styles.headerArrow} />
            </div>
            <div className={styles.subcategoriesList}>
              <div className={styles.categoryImageSection}>
                <div className={styles.categoryImage}>
                  <div className={styles.imagePlaceholder}>
                    <img src={selectedCategory?.image} alt={selectedCategory?.name} className={styles.categoryMainImage} />
                  </div>
                  <div className={styles.imageText}>
                    <h4>{selectedCategory?.name}</h4>
                    <p>Browse {selectedCategory?.subcategories.length} categories</p>
                  </div>
                </div>
              </div>
              {selectedCategory?.subcategories.map((subcategory, index) => (
                <div key={index} className={styles.subcategoryGroup}>
                  <h4 className={styles.subcategoryTitle}>{subcategory.name}:</h4>
                  <div className={styles.subcategoryItems}>
                    {subcategory.items.map((item, itemIndex) => (
                      <div key={itemIndex} className={styles.subcategoryItem}>
                        <div className={styles.itemName}>{item.name || item}</div>
                        {item.subItems && (
                          <div className={styles.subItems}>
                            {item.subItems.map((subItem, subIndex) => (
                              <span key={subIndex} className={styles.subItem}>{subItem}</span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              {selectedCategory?.id === 'services' && (
                <div className={styles.servicesSection}>
                  <h4 className={styles.servicesTitle}>Services:</h4>
                  <div className={styles.servicesItems}>
                    <div className={styles.serviceItem}>Category catalog</div>
                    <div className={styles.serviceItem}>Item valuation</div>
                    <div className={styles.serviceItem}>Magazine</div>
                    <div className={styles.serviceItem}>Verification services</div>
                    <div className={styles.serviceItem}>Purchase agreement</div>
                    <div className={styles.serviceItem}>Zareshop Auction</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


