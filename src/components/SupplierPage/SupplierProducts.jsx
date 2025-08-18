import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FaEye, FaImages } from 'react-icons/fa'
import styles from './SupplierProducts.module.scss'

export default function SupplierProducts({ products, searchQuery, sortBy }) {
  const navigate = useNavigate()
  
  const formatPrice = (price) => {
    return new Intl.NumberFormat('ru-RU').format(price)
  }
  
  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`)
  }

  const formatDate = (dateString) => {
    return dateString
  }

  const getPriceTagColor = (tag) => {
    switch (tag) {
      case 'The price is below market':
        return '#28a745'
      case 'Market price':
        return '#6c757d'
      default:
        return '#007bff'
    }
  }

  return (
    <div className={styles.productsContainer}>
      {searchQuery && (
        <div className={styles.searchResults}>
          <p>Search results for "{searchQuery}"</p>
        </div>
      )}

      <div className={styles.productsGrid}>
        {products.map((product) => (
          <div 
            key={product.id} 
            className={styles.productCard}
            onClick={() => handleProductClick(product.id)}
          >
            <div className={styles.productImageContainer}>
              <img 
                src={product.image} 
                alt={product.title}
                className={styles.productImage}
              />
              {product.hasMultipleImages && (
                <div className={styles.imageCount}>
                  <FaImages className={styles.imageIcon} />
                  {product.imageCount}
                </div>
              )}
              {product.priceTag && (
                <div 
                  className={styles.priceTag}
                  style={{ backgroundColor: getPriceTagColor(product.priceTag) }}
                >
                  {product.priceTag}
                </div>
              )}
            </div>
            
            <div className={styles.productInfo}>
              <h4 className={styles.productTitle}>{product.title}</h4>
              <div className={styles.productPrice}>
                {formatPrice(product.price)} ₽
              </div>
              <div className={styles.productLocation}>
                {product.location}
              </div>
              <div className={styles.productMeta}>
                <span className={styles.postedDate}>
                  {formatDate(product.postedDate)}
                </span>
                <div className={styles.productStats}>
                  <span className={styles.views}>
                    <FaEye className={styles.viewsIcon} />
                    {product.views}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {products.length === 0 && (
        <div className={styles.noProducts}>
          <h3>No products found</h3>
          <p>This supplier doesn't have any products listed yet.</p>
        </div>
      )}
    </div>
  )
}
