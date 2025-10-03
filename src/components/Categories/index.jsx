import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import LazyImage from '../shared/LazyImage'
import styles from './Categories.module.scss'
import useCategories from '../../hooks/useCategories'
import { BASE_URL } from '../../api/api'

const CategoryCard = React.memo(({ category }) => (
  <Link 
    className={styles.card} 
    to={`/category/${category.id}`} 
    aria-label={category.title}
  >
    <div className={styles.title}>{category.title}</div>
    <div className={styles.thumb}>
      <LazyImage 
        src={category.img} 
        alt={category.title}
        placeholder="https://via.placeholder.com/320x200?text=Loading"
      />
    </div>
  </Link>
))

CategoryCard.displayName = 'CategoryCard'

const Categories = React.memo(() => {
  const { categories, loading, error, refresh } = useCategories(true)

  const resolveImage = (url) => {
    if (!url) return undefined
    // Already absolute
    if (/^https?:\/\//i.test(url)) return url
    // Join with BASE_URL (which already includes the API base) but images may be served from same host root
    // If your backend serves images under `/uploads`, ensure the url includes that prefix
    const prefix = BASE_URL?.replace(/\/$/, '') || ''
    const path = url.startsWith('/') ? url : `/${url}`
    return `${prefix}${path}`
  }

  const items = useMemo(() => (categories || []).map((c) => {
    const rawImg =
      c.image_url ||
      c.imageUrl ||
      c.image ||
      c.thumbnail ||
      c.icon ||
      (c.media && (c.media.cover || c.media.thumbnail))

    return {
      id: c.id || c._id || c.slug,
      title: c.name || c.title,
      img: resolveImage(rawImg),
    }
  }), [categories])

  return (
    <section className={styles.categories}>
      <div className={styles.container}>
        {loading && (
          <div className={styles.grid} aria-busy="true">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className={styles.card} style={{ opacity: 0.5 }} />
            ))}
          </div>
        )}
        {!loading && error && (
          <div style={{ textAlign: 'center', padding: '16px' }}>
            <p>{error}</p>
            <button onClick={refresh} className={styles.primaryBtn || ''}>Retry</button>
          </div>
        )}
        {!loading && !error && (
          <div className={styles.grid}>
            {items.length === 0 ? (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '16px' }}>No categories</div>
            ) : (
              items.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))
            )}
          </div>
        )}
      </div>
    </section>
  )
})

Categories.displayName = 'Categories'

export default Categories


