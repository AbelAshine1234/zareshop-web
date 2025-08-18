import React, { useState } from 'react'
import { FaStar, FaUser, FaThumbsUp, FaThumbsDown } from 'react-icons/fa'
import { MOCK_REVIEWS, RATING_DISTRIBUTION } from '../../data'
import styles from './SupplierReviews.module.scss'

export default function SupplierReviews({ supplier }) {
  const [showAllReviews, setShowAllReviews] = useState(false)
  const [sortBy, setSortBy] = useState('newest')
  const [filterBy, setFilterBy] = useState('all')
  

  const totalRatings = Object.values(RATING_DISTRIBUTION).reduce((sum, count) => sum + count, 0)
  const maxRatingCount = Math.max(...Object.values(RATING_DISTRIBUTION))
  
  const displayedReviews = showAllReviews ? MOCK_REVIEWS : MOCK_REVIEWS.slice(0, 3)

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <FaStar 
        key={index} 
        className={`${styles.star} ${index < rating ? styles.starFilled : styles.starEmpty}`} 
      />
    ))
  }

  return (
    <div className={styles.reviewsSection}>
      <div className={styles.reviewsHeader}>
        <h3 className={styles.reviewsTitle}>Reviews of {supplier.name}</h3>
        <div className={styles.ratingSummary}>
          <div className={styles.ratingValue}>{supplier.rating}</div>
          <div className={styles.ratingStars}>
            {renderStars(Math.floor(supplier.rating))}
          </div>
          <div className={styles.ratingCount}>based on {totalRatings} ratings</div>
        </div>
        <button className={styles.writeReviewBtn}>Write a review</button>
      </div>

      {/* Rating Distribution */}
      <div className={styles.ratingBreakdown}>
        <div className={styles.ratingDistribution}>
          {[5, 4, 3, 2, 1].map((stars) => (
            <div key={stars} className={styles.ratingRow}>
              <div className={styles.starLabel}>
                {stars} star{stars !== 1 ? 's' : ''}
              </div>
              <div className={styles.starIcons}>
                {renderStars(stars)}
              </div>
              <div className={styles.ratingBar}>
                <div 
                  className={styles.ratingBarFill}
                  style={{ 
                    width: `${(RATING_DISTRIBUTION[stars] / maxRatingCount) * 100}%`,
                    backgroundColor: RATING_DISTRIBUTION[stars] > 0 ? '#6c757d' : '#e9ecef'
                  }}
                ></div>
              </div>
              <div className={styles.ratingCount}>
                {RATING_DISTRIBUTION[stars]}
              </div>
            </div>
          ))}
        </div>
        
        <div className={styles.ratingExplanation}>
          <p>The rating is the arithmetic mean of user ratings. <a href="#" className={styles.learnMoreLink}>Learn more</a></p>
        </div>
      </div>

      {/* Review Filters */}
      <div className={styles.reviewFilters}>
        <button 
          className={`${styles.filterBtn} ${sortBy === 'newest' ? styles.filterBtnActive : ''}`}
          onClick={() => setSortBy(sortBy === 'newest' ? 'oldest' : 'newest')}
        >
          New ones first ↓↑
        </button>
        <button 
          className={`${styles.filterBtn} ${filterBy === 'photos' ? styles.filterBtnActive : ''}`}
          onClick={() => setFilterBy(filterBy === 'photos' ? 'all' : 'photos')}
        >
          Only with photos
        </button>
      </div>

      <div className={styles.reviewsList}>
        {displayedReviews.map((review) => (
          <div key={review.id} className={styles.reviewItem}>
            <div className={styles.reviewHeader}>
              <div className={styles.reviewUser}>
                <img src={review.avatar} alt={review.user} className={styles.userAvatar} />
                <div className={styles.userInfo}>
                  <div className={styles.userName}>
                    {review.user}
                    {review.verified && <span className={styles.verifiedBadge}>✓</span>}
                  </div>
                  <div className={styles.reviewMeta}>
                    <div className={styles.reviewRating}>
                      {renderStars(review.rating)}
                    </div>
                    <span className={styles.reviewDate}>{review.date}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className={styles.reviewContent}>
              <p className={styles.reviewComment}>{review.comment}</p>
            </div>
            
            <div className={styles.reviewActions}>
              <button className={styles.helpfulBtn}>
                <FaThumbsUp className={styles.helpfulIcon} />
                Helpful ({review.helpful})
              </button>
              <button className={styles.notHelpfulBtn}>
                <FaThumbsDown className={styles.helpfulIcon} />
              </button>
            </div>
          </div>
        ))}
      </div>

        {MOCK_REVIEWS.length > 3 && (
        <div className={styles.reviewsFooter}>
          <button 
            className={styles.showMoreBtn}
            onClick={() => setShowAllReviews(!showAllReviews)}
          >
            {showAllReviews ? 'Show less' : `Show all ${MOCK_REVIEWS.length} reviews`}
          </button>
        </div>
      )}
    </div>
  )
}
