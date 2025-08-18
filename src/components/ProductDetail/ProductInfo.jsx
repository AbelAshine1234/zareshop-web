import { FaPhone, FaHeart, FaStickyNote } from 'react-icons/fa';
import styles from './ProductInfo.module.scss';

const ProductInfo = ({ product, seller }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US').format(price);
  };

  return (
    <div className={styles.rightColumn}>
      <div className={styles.priceSection}>
        <div className={styles.price}>
          {formatPrice(product.price)} {product.currency}
        </div>
      </div>

      <div className={styles.contactButtons}>
        <button className={styles.phoneButton}>
          <FaPhone />
          Show phone number
          <span className={styles.phoneMask}>8 XXX XXX-XX-XX</span>
        </button>
        <button className={styles.messageButton}>
          Write a message
          <span className={styles.messageSubtext}>Answers in about 30 minutes</span>
        </button>
      </div>

      <div className={styles.sellerInfo}>
        <div className={styles.sellerHeader}>
          <div className={styles.sellerName}>
            {seller.name}
            <span className={styles.sellerIcon}>{seller.icon}</span>
          </div>
          <div className={styles.sellerRating}>
            <span className={styles.rating}>{seller.rating}</span>
            <span className={styles.stars}>★★★★★</span>
            <span className={styles.reviews}>({seller.reviews} reviews)</span>
          </div>
          <div className={styles.sellerType}>{seller.type}</div>
          <button className={styles.followButton}>Follow the seller</button>
          <div className={styles.contactPerson}>Contact person {seller.contactPerson}</div>
        </div>
      </div>

      <div className={styles.askSeller}>
        <div className={styles.messageInput}>
          <input type="text" placeholder="Hello!" />
          <button className={styles.sendButton}>📤</button>
        </div>
      </div>

    </div>
  );
};

export default ProductInfo;
