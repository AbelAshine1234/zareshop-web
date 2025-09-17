import React from 'react'
import styles from './ProductDetails.module.scss'

export default function ProductDetails() {
  const product = {
    id: '1',
    name: 'Leather Bag',
    price: 1500,
    img: 'https://images.unsplash.com/photo-1547949003-9792a18a2601?q=80&w=1200&auto=format&fit=crop',
    description: 'Elegant Ethiopian leather bag crafted with premium materials and fair practices.',
  }

  return (
    <section className={`container ${styles.wrapper}`}>
      <div className={styles.grid}>
        <div>
          <img src={product.img} alt={product.name} style={{ width: '100%', borderRadius: 14 }} />
        </div>
        <div>
          <h1 className={styles.title}>{product.name}</h1>
          <div className={styles.price}>ETB {product.price}</div>
          <p className={styles.desc}>{product.description}</p>
          <div className={styles.actions}>
            <button className="button buttonPrimary">Add to Cart</button>
            <button className="button buttonGhost">Buy Now</button>
          </div>
        </div>
      </div>
    </section>
  )
}
