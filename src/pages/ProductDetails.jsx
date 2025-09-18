import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import styles from './ProductDetails.module.scss'
import { fetchProductById } from '../features/products/clientProductsSlice'

export default function ProductDetails() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { current, currentLoading, currentError } = useSelector((s) => s.clientProducts)

  useEffect(() => {
    if (id) dispatch(fetchProductById(id))
  }, [id, dispatch])

  if (currentLoading) {
    return (
      <section className={`container ${styles.wrapper}`}>
        <div className={styles.title}>Loading product…</div>
      </section>
    )
  }

  if (currentError) {
    return (
      <section className={`container ${styles.wrapper}`}>
        <div className={styles.title} style={{ color: '#b91c1c' }}>{currentError}</div>
      </section>
    )
  }

  if (!current) return null

  const img = Array.isArray(current.images) && current.images.length > 0
    ? (current.images[0].image_url || current.images[0].url)
    : 'https://via.placeholder.com/800x600?text=No+Image'

  return (
    <section className={`container ${styles.wrapper}`}>
      <div className={styles.grid}>
        <div>
          <img src={img} alt={current.name} style={{ width: '100%', borderRadius: 14 }} />
        </div>
        <div>
          <h1 className={styles.title}>{current.name}</h1>
          <div className={styles.price}>ETB {Number(current.price || 0).toLocaleString()}</div>
          <p className={styles.desc}>{current.description || '—'}</p>

          <div className={styles.metaRows}>
            <div><strong>Category:</strong> {current.category?.name || '—'}</div>
            <div><strong>Subcategory:</strong> {current.subcategory?.name || '—'}</div>
            <div><strong>Vendor:</strong> {current.vendor?.name || '—'}</div>
            {current.rating?.rating && <div><strong>Rating:</strong> ⭐ {current.rating.rating}</div>}
          </div>

          {Array.isArray(current.specs) && current.specs.length > 0 && (
            <div className={styles.specs}>
              <h3 className={styles.h3}>Specifications</h3>
              <ul>
                {current.specs.map((sp) => (
                  <li key={sp.id || sp.key}>
                    <strong>{sp.key}:</strong> {sp.value}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className={styles.actions}>
            <button className="button buttonPrimary">Add to Cart</button>
            <button className="button buttonGhost">Buy Now</button>
          </div>
        </div>
      </div>
    </section>
  )
}
