import React from 'react'
import styles from './ProductList.module.scss'

const mockProducts = Array.from({ length: 12 }).map((_, i) => ({
  id: String(i + 1),
  name: ['Leather Bag', 'Organic Coffee', 'Wireless Earbuds', 'Smart Watch'][i % 4] + ' ' + (i + 1),
  price: [1500, 450, 2200, 3200][i % 4],
  img: [
    'https://images.unsplash.com/photo-1547949003-9792a18a2601?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1507133750040-4a8f5702157a?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1517433456452-f9633a875f6f?q=80&w=1200&auto=format&fit=crop',
  ][i % 4],
}))

export default function ProductList() {
  return (
    <section className="container" style={{ padding: '48px 0' }}>
      <div className={styles.toolbar}>
        <input className={styles.search} placeholder="Search products" />
        <div className={styles.filters}>
          <button className="button buttonGhost">Price</button>
          <button className="button buttonGhost">Category</button>
          <button className="button buttonGhost">Newest</button>
        </div>
      </div>

      <div className={styles.grid}>
        {mockProducts.map(p => (
          <div key={p.id} className={styles.card}>
            <img src={p.img} alt={p.name} style={{ height: 176, width: '100%', objectFit: 'cover' }} />
            <div className={styles.body}>
              <div className={styles.name} title={p.name}>{p.name}</div>
              <div className={styles.price}>ETB {p.price}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
