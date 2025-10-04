import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import styles from './WishlistPage.module.scss'
import { fetchWishlist, removeFromWishlist } from '../../features/wishlist/wishlistSlice'
import { selectWishlistItems } from '../../store/selectors'
import { Link } from 'react-router-dom'

const WishlistPage = React.memo(() => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { loading, error } = useSelector((s) => s.wishlist)
  const items = useSelector(selectWishlistItems)

  useEffect(() => {
    if (!items || items.length === 0) {
      dispatch(fetchWishlist())
    }
  }, [dispatch])

  return (
    <div className={styles.page}>
      <div className="container">
        <h1 className={styles.title}>{t('navigation.favorites') || 'Favorites'}</h1>

        {loading && <div className={styles.info}>{t('common:loading') || 'Loading...'}</div>}
        {error && <div className={styles.error}>{error}</div>}

        {!loading && (!items || items.length === 0) && (
          <div className={styles.empty}>{t('favorites.empty') || 'Your wishlist is empty.'}</div>
        )}

        {!loading && items && items.length > 0 && (
          <div className={styles.grid}>
            {items.filter(Boolean).map((p) => {
              const id = p?.id || p?._id || p
              const name = p?.name || p?.title || `#${id}`
              const price = Number(p?.price || 0).toLocaleString()
              const img = Array.isArray(p?.images) && p.images.length > 0
                ? p.images[0].image_url || p.images[0].url
                : (p?.image || 'https://via.placeholder.com/240x180?text=No+Image')

              return (
                <div key={id} className={styles.card}>
                  <Link to={`/product/${id}`} className={styles.thumbWrap}>
                    <img src={img} alt={name} className={styles.thumb} />
                  </Link>
                  <div className={styles.body}>
                    <Link to={`/product/${id}`} className={styles.name}>{name}</Link>
                    <div className={styles.price}>{t('currency')} {price}</div>
                    <button className={styles.removeBtn} onClick={() => dispatch(removeFromWishlist(id))}>
                      {t('favorites.remove') || 'Remove'}
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
})

WishlistPage.displayName = 'WishlistPage'

export default WishlistPage
