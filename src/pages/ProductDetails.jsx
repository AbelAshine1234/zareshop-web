import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import styles from './ProductDetails.module.scss'
import { fetchProductById } from '../features/products/clientProductsSlice'
import { addItem } from '../features/cart/cartSlice'

export default function ProductDetails() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { current, currentLoading, currentError } = useSelector((s) => s.clientProducts)
  const [qty, setQty] = useState(1)
  const [activeIdx, setActiveIdx] = useState(0)

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

  const images = useMemo(() => {
    const arr = Array.isArray(current.images) ? current.images : []
    const urls = arr.map((im) => im.image_url || im.url).filter(Boolean)
    return urls.length ? urls : ['https://via.placeholder.com/800x600?text=No+Image']
  }, [current])

  const mainImg = images[activeIdx] || images[0]

  return (
    <section className={`container ${styles.wrapper}`}>
      <div className={styles.grid}>
        <div className={styles.gallery}>
          <div className={styles.mainImgWrap}>
            <img className={styles.mainImg} src={mainImg} alt={current.name} />
          </div>
          <div className={styles.thumbs}>
            {images.map((u, i) => (
              <button
                key={i}
                type="button"
                className={`${styles.thumb} ${i === activeIdx ? styles.activeThumb : ''}`}
                onClick={() => setActiveIdx(i)}
              >
                <img src={u} alt={`${current.name}-${i}`} />
              </button>
            ))}
          </div>
        </div>
        <div>
          <h1 className={styles.title}>{current.name}</h1>
          <div className={styles.badgeRow}>
            {current.vendor?.name && <span className={styles.badge}>🏪 {current.vendor.name}</span>}
            {current.category?.name && <span className={styles.badge}>🗂 {current.category.name}</span>}
            {current.rating?.rating && <span className={styles.badge}>⭐ {current.rating.rating}</span>}
            {current.sold_in_bulk && <span className={styles.badge}>📦 Bulk</span>}
            {current.has_discount && <span className={styles.badge}>💚 Discount</span>}
          </div>
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

          <div className={styles.buyBox}>
            <div className={styles.qtyRow}>
              <div className={styles.qty}>
                <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))}>−</button>
                <input type="number" min={1} value={qty} onChange={(e)=> setQty(Math.max(1, Number(e.target.value)||1))} />
                <button type="button" onClick={() => setQty((q) => q + 1)}>+</button>
              </div>
              <div style={{ color: '#6b7280', fontSize: 14 }}>In stock: {current.stock ?? '—'}</div>
            </div>
            <div className={styles.actions}>
              <button
                className="button buttonPrimary"
                onClick={() => {
                  dispatch(addItem({ id: current.id, name: current.name, price: current.price || 0, qty, image: mainImg }))
                }}
              >
                Add to Cart
              </button>
              <button
                className="button buttonGhost"
                onClick={() => {
                  dispatch(addItem({ id: current.id, name: current.name, price: current.price || 0, qty, image: mainImg }))
                  // Optionally navigate to checkout page here
                }}
              >
                Order Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
