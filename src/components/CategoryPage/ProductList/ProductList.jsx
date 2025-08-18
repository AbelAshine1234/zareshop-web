import React from 'react'
import { FaHeart, FaCamera, FaTruck, FaMapMarkerAlt, FaStar, FaPhone, FaComment, FaShare, FaEye } from 'react-icons/fa'
import styles from './ProductList.module.scss'

export default function ProductList({ products, viewMode }) {
  if (viewMode === 'list') {
    return (
      <div className={styles.productsList}>
        {products.map((product) => (
          <div key={product.id} className={styles.productCard}>
            <div className={styles.productImage}>
              <img src={product.image} alt={product.title} />
              {product.hasMultipleImages && (
                <div className={styles.multipleImages}>
                  <FaCamera />
                  <span>{product.imageCount}</span>
                </div>
              )}
              <button className={styles.favoriteBtn}>
                <FaHeart />
              </button>
            </div>
            
            <div className={styles.productInfo}>
              <div className={styles.productHeader}>
                <h3 className={styles.productTitle}>{product.title}</h3>
                <div className={styles.productMeta}>
                  <span className={styles.postedDate}>{product.postedDate}</span>
                  <span className={styles.views}>
                    <FaEye />
                    {product.views}
                  </span>
                </div>
              </div>
              
              <div className={styles.productPrice}>
                {product.price.toLocaleString()} Р
                {product.priceTag && (
                  <span className={`${styles.priceTag} ${product.priceTag === 'Market price' ? styles.marketPrice : styles.belowMarket}`}>
                    {product.priceTag}
                  </span>
                )}
              </div>
              
              <div className={styles.productDetails}>
                <span className={styles.condition}>{product.condition}</span>
                {product.screenSize && <span className={styles.screenSize}>{product.screenSize}</span>}
                <span className={styles.location}>
                  <FaMapMarkerAlt />
                  {product.location}
                </span>
              </div>
              
              {product.delivery && (
                <div className={styles.delivery}>
                  <FaTruck />
                  {product.delivery}
                </div>
              )}
              
              {product.returnPolicy && (
                <div className={styles.returnPolicy}>{product.returnPolicy}</div>
              )}
              
              <div className={styles.productDescription}>
                {product.description.length > 120 
                  ? `${product.description.substring(0, 120)}...` 
                  : product.description
                }
              </div>
            </div>
            
            <div className={styles.sellerInfo}>
              <div className={styles.sellerHeader}>
                <img src={product.seller.logo} alt={product.seller.name} className={styles.sellerLogo} />
                <div className={styles.sellerDetails}>
                  <div className={styles.sellerName}>{product.seller.name}</div>
                  <div className={styles.sellerRating}>
                    <FaStar className={styles.starIcon} />
                    {product.seller.rating} ({product.seller.reviews})
                  </div>
                  {product.seller.verified && (
                    <div className={styles.verifiedTag}>Verified</div>
                  )}
                  {product.seller.reliable && (
                    <div className={styles.reliableTag}>Reliable</div>
                  )}
                  {product.helping && (
                    <div className={styles.helpingTag}>{product.helping}</div>
                  )}
                </div>
              </div>
              
              <div className={styles.sellerActions}>
                <button className={styles.phoneBtn}>
                  <FaPhone />
                  Call
                </button>
                <button className={styles.messageBtn}>
                  <FaComment />
                  Message
                </button>
                <button className={styles.shareBtn}>
                  <FaShare />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className={styles.productsGrid}>
      {products.map((product) => (
        <div key={product.id} className={styles.gridCard}>
          <div className={styles.gridImage}>
            <img src={product.image} alt={product.title} />
            {product.hasMultipleImages && (
              <div className={styles.multipleImages}>
                <FaCamera />
                <span>{product.imageCount}</span>
              </div>
            )}
            {product.priceTag === 'Delivery only' && (
              <div className={styles.deliveryTag}>
                {product.priceTag}
              </div>
            )}
            {product.priceTag === 'Market price' && (
              <div className={styles.marketPriceTag}>
                {product.priceTag}
              </div>
            )}
            <button className={styles.favoriteBtn}>
              <FaHeart />
            </button>
          </div>
          
          <div className={styles.gridContent}>
            <div className={styles.gridHeader}>
              <h3 className={styles.gridTitle}>{product.title}</h3>
              <div className={styles.gridMeta}>
                <span className={styles.postedDate}>{product.postedDate}</span>
                <span className={styles.views}>
                  <FaEye />
                  {product.views}
                </span>
              </div>
            </div>
            
            <div className={`${styles.gridPrice} ${product.isHighlighted ? styles.highlighted : ''}`}>
              {product.price.toLocaleString()} Р
              {product.priceTag && (
                <span className={`${styles.priceTag} ${product.priceTag === 'Market price' ? styles.marketPrice : styles.deliveryOnly}`}>
                  {product.priceTag}
                </span>
              )}
            </div>
            
            <div className={styles.gridDetails}>
              <span className={styles.condition}>{product.condition}</span>
              {product.screenSize && <span className={styles.screenSize}>{product.screenSize}</span>}
              <span className={styles.location}>
                <FaMapMarkerAlt />
                {product.location}
              </span>
            </div>
            
            {product.delivery && (
              <div className={styles.delivery}>
                <FaTruck />
                {product.delivery}
              </div>
            )}
            
            {product.returnPolicy && (
              <div className={styles.returnPolicy}>{product.returnPolicy}</div>
            )}
            
            <div className={styles.sellerInfo}>
              <img src={product.seller.logo} alt={product.seller.name} className={styles.sellerLogo} />
              <div className={styles.sellerName}>{product.seller.name}</div>
              <div className={styles.sellerRating}>
                <FaStar className={styles.starIcon} />
                {product.seller.rating}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
