import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import LazyImage from '../shared/LazyImage'
import { CATEGORIES } from '../../data'
import styles from './Categories.module.scss'

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
  const renderedCategories = useMemo(() => 
    CATEGORIES.map((category) => (
      <CategoryCard key={category.id} category={category} />
    )), 
    []
  )

  return (
    <section className={styles.categories}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {renderedCategories}
        </div>
      </div>
    </section>
  )
})

Categories.displayName = 'Categories'

export default Categories


