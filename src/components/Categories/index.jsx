import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import useCategories from '../../hooks/queries/useCategories'
import LazyImage from '../shared/LazyImage'
import styles from './Categories.module.scss'
import LoadingSpinner from '../shared/LoadingSpinner'

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
  const { data, isLoading, isError, error, refetch } = useCategories()
  const resolveImage = (url) => {
    if (!url) return undefined
    // Already absolute
    if (/^https?:\/\//i.test(url)) return url
    const prefix = ''
    const path = url.startsWith('/') ? url : `/${url}`
    return `${prefix}${path}`
  }

  const items = useMemo(() => (data || []).map((c) => {
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
  }), [data])

  return (
    <section className={styles.categories}>
      <div className={styles.container}>
        {isLoading && (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '24px' }}>
            <LoadingSpinner size="small" message="Loading categories..." />
          </div>
        )}
        {!isLoading && isError && (
          <div style={{ textAlign: 'center', padding: '16px' }}>
            <p>{error?.message || 'Failed to load categories'}</p>
            <button onClick={() => refetch()} className={styles.primaryBtn || ''}>Retry</button>
          </div>
        )}
        {!isLoading && !isError && (
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


