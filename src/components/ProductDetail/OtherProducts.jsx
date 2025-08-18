import { useNavigate } from 'react-router-dom';
import styles from './OtherProducts.module.scss';

const OtherProducts = ({ products }) => {
  const navigate = useNavigate();
  
  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    // Handle favorite logic here
  };

  return (
    <div className={styles.otherAnnouncements}>
      <h2 className={styles.announcementsTitle}>Other company announcements</h2>
      <div className={styles.productsGrid}>
        {products.map((product) => (
          <div 
            key={product.id} 
            className={styles.productCard} 
            onClick={() => handleProductClick(product.id)}
          >
            <div className={styles.productImage}>
              <img src={product.image} alt={product.title} />
            </div>
            <div className={styles.productInfo}>
              <h3 className={styles.productTitle}>{product.title}</h3>
              <div className={styles.productPrice}>
                {new Intl.NumberFormat('en-US').format(product.price)} {product.currency}
              </div>
              <div className={styles.productLocation}>{product.location}</div>
              <div className={styles.productDate}>{product.datePosted}</div>
            </div>
            <button 
              className={styles.favoriteButton} 
              onClick={handleFavoriteClick}
            >
              ♡
            </button>
          </div>
        ))}
      </div>
      <button className={styles.showMoreButton}>Show more ads</button>
    </div>
  );
};

export default OtherProducts;
