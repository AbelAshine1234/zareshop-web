import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import styles from './Recommendations.module.scss'
import LazyImage from '../shared/LazyImage'

const RecommendationCard = React.memo(({ product }) => {
  const { t } = useTranslation()
  
  const imageUrl = useMemo(() => {
    if (Array.isArray(product.images) && product.images.length > 0) {
      return product.images[0].image_url || product.images[0].url
    }
    return 'https://via.placeholder.com/200x150?text=No+Image'
  }, [product.images])

  const formattedPrice = useMemo(() => {
    return Number(product.price || 0).toLocaleString()
  }, [product.price])

  return (
    <Link to={`/product/${product.id}`} className={styles.recommendationCard}>
      <LazyImage 
        src={imageUrl}
        alt={product.name}
        className={styles.recThumb}
        placeholder="https://via.placeholder.com/200x150?text=Loading"
      />
      <div className={styles.recBody}>
        <div className={styles.recTitle}>{product.name}</div>
        <div className={styles.recPrice}>{t('currency')} {formattedPrice}</div>
        <div className={styles.recLocation}>{product.category?.name || t('products.category')}</div>
      </div>
    </Link>
  )
})

RecommendationCard.displayName = 'RecommendationCard'

const Recommendations = React.memo(({ loading, error, items }) => {
  const { t } = useTranslation()
  
  const renderedItems = useMemo(() => {
    if (loading || !items?.length) return null
    
    return items.map((product) => (
      <RecommendationCard key={product.id} product={product} />
    ))
  }, [items, loading])

  if (loading) return null

  return (
    <div className={styles.recommendationsSection}>
      <h2 className={styles.recommendationsTitle}>
        {t('products.recommendations')}
        {error && items?.length > 0 && (
          <span style={{ fontSize: '0.7rem', color: '#666', fontWeight: 'normal' }}>
            {' '}({t('messages.apiOffline')})
          </span>
        )}
      </h2>
      <div className={styles.recommendationsList}>
        {renderedItems}
      </div>
    </div>
  )
})

Recommendations.displayName = 'Recommendations'

export default Recommendations


