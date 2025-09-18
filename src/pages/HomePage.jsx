import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './HomePage.module.scss'
import { fetchProducts } from '../features/products/clientProductsSlice'

export default function HomePage() {
  const dispatch = useDispatch()
  const { items, loading, error, pagination } = useSelector((s) => s.clientProducts)

  useEffect(() => {
    dispatch(fetchProducts({ page: 1, limit: 20 }))
  }, [dispatch])

  return (
    <div className={`container ${styles.page}`}>
      <div className={styles.headerRow}>
        <h1 className={styles.title}>Latest Products</h1>
        <div className={styles.subtitle}>Fresh arrivals from verified vendors</div>
      </div>

      {loading && <div className={styles.subtitle}>Loading products…</div>}
      {error && <div className={styles.subtitle} style={{ color: '#b91c1c' }}>{error}</div>}

      {!loading && !error && (
        <div className={styles.listings}>
          {items.map((p) => {
            const img = Array.isArray(p.images) && p.images.length > 0 ? (p.images[0].image_url || p.images[0].url) : '/placeholder.png'
            return (
              <article key={p.id} className={styles.listingCard}>
                <img className={styles.listingThumb} src={img} alt={p.name} />
                <div className={styles.listingBody}>
                  <div className={styles.listingTitle} title={p.name}>{p.name}</div>
                  <div className={styles.listingMeta}>
                    <div className={styles.price}>ETB {Number(p.price || 0).toLocaleString()}</div>
                    <div className={styles.metaRight}>{p.category?.name || '—'}</div>
                  </div>
                  <div className={styles.badgeRow}>
                    <span className={styles.badge}>{p.vendor?.name || 'Vendor'}</span>
                    {p.rating?.rating && <span className={styles.badge}>⭐ {p.rating.rating}</span>}
                  </div>
                </div>
                <a className={styles.cardLink} href={`/products/${encodeURIComponent(p.id)}`} aria-label={`View ${p.name}`}></a>
              </article>
            )
          })}
        </div>
      )}
    </div>
  )
}
