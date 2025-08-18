import React from 'react'
import { FaMapMarkerAlt } from 'react-icons/fa'
import styles from './SupplierHeader.module.scss'

export default function SupplierHeader({ 
  supplier
}) {
  return (
    <div className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.supplierInfoSection}>
          <div className={styles.supplierImageContainer}>
            <img src={supplier.logo} alt={supplier.name} className={styles.supplierImage} />
          </div>
          <div className={styles.supplierDetails}>
            <h1 className={styles.mainTitle}>
              {supplier.name}
            </h1>
            <p className={styles.subtitle}>
              {supplier.description}
              <a href="#" className={styles.learnMoreLink}>Find out more</a>
            </p>
            <div className={styles.supplierStats}>
              <div className={styles.statItem}>
                <span className={styles.statValue}>{supplier.rating}</span>
                <span className={styles.statLabel}>Rating</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statValue}>{supplier.reviews}</span>
                <span className={styles.statLabel}>Reviews</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statValue}>{supplier.activeAds}</span>
                <span className={styles.statLabel}>Active Ads</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Map Section */}
      <div className={styles.mapSection}>
        <div className={styles.mapContainer}>
          <div className={styles.mapHeader}>
            <h3>Location</h3>
            <p>{supplier.location}</p>
          </div>
          <div className={styles.mapPlaceholder}>
            <iframe
              src={`https://www.google.com/maps/embed/v1/place?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&q=${encodeURIComponent(supplier.location)}&zoom=15&maptype=roadmap`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Store Location Map"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
