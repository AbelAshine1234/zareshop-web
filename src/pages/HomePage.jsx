import React from 'react'
import styles from './HomePage.module.scss'

const categories = [
  { id: 'fashion', name: 'Fashion', count: 124, img: 'https://images.unsplash.com/photo-1520975922203-bc4e1317a33f?q=80&w=1400&auto=format&fit=crop' },
  { id: 'electronics', name: 'Electronics', count: 96, img: 'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1400&auto=format&fit=crop' },
  { id: 'home', name: 'Home & Living', count: 78, img: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?q=80&w=1400&auto=format&fit=crop' },
  { id: 'beauty', name: 'Beauty', count: 52, img: 'https://images.unsplash.com/photo-1505575972945-338c3fddeeb6?q=80&w=1400&auto=format&fit=crop' },
  { id: 'grocery', name: 'Grocery', count: 88, img: 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?q=80&w=1400&auto=format&fit=crop' },
  { id: 'sports', name: 'Sports', count: 41, img: 'https://images.unsplash.com/photo-1502810190503-8303352d0f0e?q=80&w=1400&auto=format&fit=crop' },
  { id: 'kids', name: 'Kids', count: 37, img: 'https://images.unsplash.com/photo-1501735971522-5a0747c1bb8e?q=80&w=1400&auto=format&fit=crop' },
  { id: 'automotive', name: 'Automotive', count: 22, img: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1400&auto=format&fit=crop' },
  { id: 'books', name: 'Books', count: 64, img: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=1400&auto=format&fit=crop' },
  { id: 'health', name: 'Health', count: 33, img: 'https://images.unsplash.com/photo-1510627498534-cf7e9002facc?q=80&w=1400&auto=format&fit=crop' },
  { id: 'handmade', name: 'Handmade', count: 28, img: 'https://images.unsplash.com/photo-1520975693416-35e1c0e9c8cd?q=80&w=1400&auto=format&fit=crop' },
  { id: 'computers', name: 'Computers', count: 45, img: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1400&auto=format&fit=crop' },
]

// Jiji-style latest listings (mock data)
const listings = [
  { id: 'L-001', title: 'iPhone 12 Pro Max', price: 42000, img: 'https://images.unsplash.com/photo-1603899121308-44c5630677e1?q=80&w=1200&auto=format&fit=crop', location: 'Addis Ababa', time: '2h' },
  { id: 'L-002', title: 'Toyota Vitz 2008', price: 780000, img: 'https://images.unsplash.com/photo-1549921296-3b4a4f6f9a5a?q=80&w=1200&auto=format&fit=crop', location: 'Addis Ababa', time: '1d' },
  { id: 'L-003', title: 'Samsung 55" 4K TV', price: 38000, img: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1200&auto=format&fit=crop', location: 'Adama', time: '5h' },
  { id: 'L-004', title: 'Dell XPS 13', price: 85000, img: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1200&auto=format&fit=crop', location: 'Bahir Dar', time: '3h' },
  { id: 'L-005', title: 'Sofa Set (3+2+1)', price: 30000, img: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?q=80&w=1200&auto=format&fit=crop', location: 'Addis Ababa', time: '6h' },
  { id: 'L-006', title: 'Electric Bicycle', price: 27000, img: 'https://images.unsplash.com/photo-1502810190503-8303352d0f0e?q=80&w=1200&auto=format&fit=crop', location: 'Hawassa', time: '1d' },
  { id: 'L-007', title: 'PlayStation 5', price: 52000, img: 'https://images.unsplash.com/photo-1606813907291-76a5a0b43a3f?q=80&w=1200&auto=format&fit=crop', location: 'Mekelle', time: '4h' },
  { id: 'L-008', title: 'Baby Stroller', price: 6500, img: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1200&auto=format&fit=crop', location: 'Addis Ababa', time: '7h' },
  { id: 'L-009', title: 'Office Desk', price: 9500, img: 'https://images.unsplash.com/photo-1503602642458-232111445657?q=80&w=1200&auto=format&fit=crop', location: 'Dire Dawa', time: '1d' },
  { id: 'L-010', title: 'Canon EOS M50', price: 38000, img: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1200&auto=format&fit=crop', location: 'Gondar', time: '3h' },
  { id: 'L-011', title: 'Kitchen Blender', price: 2200, img: 'https://images.unsplash.com/photo-1556912167-f556f1f39dfc?q=80&w=1200&auto=format&fit=crop', location: 'Addis Ababa', time: '2h' },
  { id: 'L-012', title: 'Mountain Bike', price: 16000, img: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?q=80&w=1200&auto=format&fit=crop', location: 'Bahir Dar', time: '8h' },
  { id: 'L-013', title: 'Gaming Laptop RTX', price: 120000, img: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1200&auto=format&fit=crop', location: 'Addis Ababa', time: '1h' },
  { id: 'L-014', title: 'Air Jordan Sneakers', price: 5500, img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop', location: 'Adama', time: '10h' },
  { id: 'L-015', title: 'Books Bundle', price: 1200, img: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=1200&auto=format&fit=crop', location: 'Jimma', time: '1d' },
  { id: 'L-016', title: 'LG Washing Machine', price: 28000, img: 'https://images.unsplash.com/photo-1568254183919-78a4f43a2871?q=80&w=1200&auto=format&fit=crop', location: 'Addis Ababa', time: '9h' },
  { id: 'L-017', title: 'Desk Chair Ergonomic', price: 7800, img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1200&auto=format&fit=crop', location: 'Hawassa', time: '2d' },
  { id: 'L-018', title: 'Huawei Mate 40', price: 36000, img: 'https://images.unsplash.com/photo-1600180758890-6b94519a8ba6?q=80&w=1200&auto=format&fit=crop', location: 'Addis Ababa', time: '5h' },
]

export default function HomePage() {
  return (
    <div className={`container ${styles.page}`}>
      <div className={styles.headerRow}>
        <h1 className={styles.title}>Shop by Category</h1>
        <div className={styles.subtitle}>Browse all departments like Amazon</div>
      </div>

      <div className={styles.grid}>
        {categories.map((c) => (
          <article key={c.id} className={styles.catCard}>
            <img className={styles.thumb} src={c.img} alt={c.name} />
            <div className={styles.body}>
              <div className={styles.name}>{c.name}</div>
              <div className={styles.count}>{c.count} items</div>
            </div>
            <a className={styles.cardLink} href={`/products?category=${encodeURIComponent(c.id)}`} aria-label={`View ${c.name}`}></a>
          </article>
        ))}
      </div>

      {/* Jiji-style latest listings */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.h2}>Latest listings</h2>
          <a href="/products" className={styles.seeAll}>See all</a>
        </div>
        <div className={styles.listings}>
          {listings.map((l) => (
            <article key={l.id} className={styles.listingCard}>
              <img className={styles.listingThumb} src={l.img} alt={l.title} />
              <div className={styles.listingBody}>
                <div className={styles.listingTitle} title={l.title}>{l.title}</div>
                <div className={styles.listingMeta}>
                  <div className={styles.price}>ETB {l.price.toLocaleString()}</div>
                  <div className={styles.metaRight}>{l.location} • {l.time}</div>
                </div>
                <div className={styles.badgeRow}>
                  <span className={styles.badge}>Verified</span>
                  <span className={styles.badge}>Delivery</span>
                </div>
              </div>
              <a className={styles.cardLink} href={`/products/${encodeURIComponent(l.id)}`} aria-label={`View ${l.title}`}></a>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
