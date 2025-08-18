import React from 'react'
import { FaStar, FaMapMarkerAlt, FaCalendarAlt, FaCheck, FaShoppingCart, FaTruck } from 'react-icons/fa'
import styles from './SupplierProfile.module.scss'

export default function SupplierProfile({ supplier }) {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('ru-RU').format(price)
  }

  return (
    <div className={styles.profile}>
      {/* Profile Picture and Basic Info */}
      <div className={styles.profileHeader}>
        <div className={styles.profileImageContainer}>
          <img src={supplier.logo} alt={supplier.name} className={styles.profileImage} />
        </div>
        <h2 className={styles.supplierName}>{supplier.name}</h2>
        
        <div className={styles.rating}>
          <FaStar className={styles.starIcon} />
          <span className={styles.ratingValue}>{supplier.rating}</span>
          <span className={styles.reviews}>({supplier.reviews} reviews)</span>
        </div>
        
        <div className={styles.socialStats}>
          <span>{supplier.subscribers} subscribers</span>
          <span>{supplier.following} following</span>
        </div>
        
        <div className={styles.joinDate}>
          <FaCalendarAlt className={styles.icon} />
          On Avito since {supplier.joinDate}
        </div>
      </div>

      {/* Badges */}
      <div className={styles.badges}>
        {supplier.badges.map((badge, index) => (
          <div key={index} className={styles.badge} style={{ backgroundColor: badge.color }}>
            <span className={styles.badgeIcon}>{badge.icon}</span>
            <span className={styles.badgeText}>{badge.text}</span>
          </div>
        ))}
        <button className={styles.showAllBtn}>Show all</button>
      </div>

      {/* Response Time */}
      <div className={styles.responseTime}>
        Answers in about {supplier.responseTime}
      </div>

      {/* Action Buttons */}
      <div className={styles.actions}>
        <button className={styles.writeBtn}>
          Write
        </button>
        <button className={styles.subscribeBtn}>
          Subscribe
        </button>
      </div>

      {/* Additional Info */}
      <div className={styles.additionalInfo}>
        <div className={styles.infoItem}>
          <strong>Location:</strong>
          <div className={styles.location}>
            <FaMapMarkerAlt className={styles.icon} />
            {supplier.location}
          </div>
        </div>
        
        <div className={styles.infoItem}>
          <strong>Specialties:</strong>
          <div className={styles.specialties}>
            {supplier.specialties.map((specialty, index) => (
              <span key={index} className={styles.specialty}>{specialty}</span>
            ))}
          </div>
        </div>
        
        <div className={styles.infoItem}>
          <strong>Delivery:</strong>
          <span>{supplier.delivery}</span>
        </div>
        
        <div className={styles.infoItem}>
          <strong>Return Policy:</strong>
          <span>{supplier.returnPolicy}</span>
        </div>
        
        <div className={styles.infoItem}>
          <strong>Contact:</strong>
          <span>{supplier.contact}</span>
        </div>
        
        <div className={styles.infoItem}>
          <strong>Website:</strong>
          <a href={`https://${supplier.website}`} target="_blank" rel="noopener noreferrer">
            {supplier.website}
          </a>
        </div>
      </div>
    </div>
  )
}
