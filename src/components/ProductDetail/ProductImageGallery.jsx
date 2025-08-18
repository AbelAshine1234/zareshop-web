import { useState } from 'react';
import styles from './ProductImageGallery.module.scss';

const ProductImageGallery = ({ images, thumbnails }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleThumbnailClick = (index) => {
    setCurrentImageIndex(index);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className={styles.imageGallery}>
      <div className={styles.mainImage}>
        <img 
          src={images[currentImageIndex]} 
          alt={`Product image ${currentImageIndex + 1}`}
          className={styles.currentImage}
        />
        {images.length > 1 && (
          <>
            <button 
              className={styles.prevButton}
              onClick={handlePrevImage}
              aria-label="Previous image"
            >
              ‹
            </button>
            <button 
              className={styles.nextButton}
              onClick={handleNextImage}
              aria-label="Next image"
            >
              ›
            </button>
          </>
        )}
      </div>
      
      {thumbnails && thumbnails.length > 1 && (
        <div className={styles.thumbnails}>
          {thumbnails.map((thumbnail, index) => (
            <button
              key={index}
              className={`${styles.thumbnail} ${
                index === currentImageIndex ? styles.active : ''
              }`}
              onClick={() => handleThumbnailClick(index)}
            >
              <img src={thumbnail} alt={`Thumbnail ${index + 1}`} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductImageGallery;
