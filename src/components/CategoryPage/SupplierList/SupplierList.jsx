import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FaStar, FaMapMarkerAlt } from 'react-icons/fa'
import styles from './SupplierList.module.scss'

export default function SupplierList({ suppliers }) {
  const navigate = useNavigate()

  const handleSupplierClick = (supplierId) => {
    navigate(`/supplier/${supplierId}`)
  }

  return (
    <div className={styles.suppliersList}>
      {suppliers.map((supplier) => (
        <div 
          key={supplier.id} 
          className={styles.supplierCard}
          onClick={() => handleSupplierClick(supplier.id)}
        >
          {/* Left side - Supplier Info */}
          <div className={styles.supplierHeader}>
            <img src={supplier.logo} alt={supplier.name} className={styles.supplierLogo} />
            <div className={styles.supplierInfo}>
              <h3 className={styles.supplierName}>{supplier.name}</h3>
              <div className={styles.supplierRating}>
                <FaStar className={styles.starIcon} />
                {supplier.rating} ({supplier.reviews})
              </div>
              <div className={styles.supplierLocation}>
                <FaMapMarkerAlt />
                {supplier.location}
              </div>
              <div className={styles.supplierCategory}>
                {supplier.category}
              </div>
              {supplier.verified && (
                <div className={styles.verifiedBadge}>Verified</div>
              )}
            </div>
          </div>
          
          {/* Right side - Product Preview */}
          <div className={styles.supplierContent}>
            <div className={styles.productPreview}>
              <h4 className={styles.previewTitle}>Latest Products</h4>
              <div className={styles.productGrid}>
                <div className={styles.productItem}>
                  <img src="https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=80&h=80&fit=crop" alt="Product" className={styles.productThumb} />
                  <div className={styles.productInfo}>
                    <span className={styles.productName}>iPhone 16 Pro Max</span>
                    <span className={styles.productPrice}>104,990 ₽</span>
                  </div>
                </div>
                <div className={styles.productItem}>
                  <img src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=80&h=80&fit=crop" alt="Product" className={styles.productThumb} />
                  <div className={styles.productInfo}>
                    <span className={styles.productName}>Samsung Galaxy S25</span>
                    <span className={styles.productPrice}>89,990 ₽</span>
                  </div>
                </div>
              </div>
              <button 
                className={styles.viewAllBtn}
                onClick={(e) => {
                  e.stopPropagation()
                  handleSupplierClick(supplier.id)
                }}
              >
                View all products →
              </button>
            </div>
            
            <div className={styles.supplierActions}>
              <button className={styles.writeBtn}>
                Write
              </button>
              <button className={styles.phoneBtn}>
                Show phone number
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
