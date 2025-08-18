import React, { useState, useCallback } from 'react'
import { useIntersectionObserver } from '../../hooks'
import styles from './LazyImage.module.scss'

const LazyImage = React.memo(({ 
  src, 
  alt, 
  className = '', 
  placeholder = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkxvYWRpbmcuLi48L3RleHQ+PC9zdmc+',
  onLoad,
  onError,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [imgRef, isInView] = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '50px'
  })

  const handleLoad = useCallback((e) => {
    setIsLoaded(true)
    onLoad?.(e)
  }, [onLoad])

  const handleError = useCallback((e) => {
    setHasError(true)
    onError?.(e)
  }, [onError])

  return (
    <div 
      ref={imgRef} 
      className={`${styles.container} ${className}`}
      {...props}
    >
      {!isInView ? (
        <img
          src={placeholder}
          alt=""
          className={`${styles.image} ${styles.placeholder}`}
          loading="lazy"
        />
      ) : (
        <>
          {!isLoaded && !hasError && (
            <img
              src={placeholder}
              alt=""
              className={`${styles.image} ${styles.placeholder}`}
              loading="lazy"
            />
          )}
          <img
            src={hasError ? placeholder : src}
            alt={alt}
            className={`${styles.image} ${isLoaded ? styles.loaded : styles.loading}`}
            onLoad={handleLoad}
            onError={handleError}
            loading="lazy"
            decoding="async"
          />
        </>
      )}
    </div>
  )
})

LazyImage.displayName = 'LazyImage'

export default LazyImage
