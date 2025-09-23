import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import s from './VendorDetail.module.scss'
import { addItem } from '../features/cart/cartSlice'

// Mock vendor data (same as BuyFromVendors)
const mockVendors = [
  {
    id: 101,
    name: 'Ninace Traders',
    address: 'Addis Ababa, Bole',
    categories: [1, 2],
    subcategories: [11, 12, 21, 22],
    posted: 1328,
    sold: 8240,
    completion: 98.5,
    online: true,
    since: '2022-03-01',
    payment: ['Cash', 'Telebirr', 'Bank Transfer'],
    rating: 4.9,
    verified: true,
    coverImage: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=800&auto=format&fit=crop',
    description: 'Leading electronics and fashion retailer in Bole with over 2 years of experience. We specialize in premium products and fast delivery.',
    phone: '+251911234567',
    email: 'contact@ninacetraders.com',
    website: 'www.ninacetraders.com',
    products: [
      { id: 1, name: 'iPhone 14 Pro', price: 85000, image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?q=80&w=400&auto=format&fit=crop' },
      { id: 2, name: 'Samsung Galaxy S23', price: 72000, image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=400&auto=format&fit=crop' },
      { id: 3, name: 'MacBook Air M2', price: 125000, image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=400&auto=format&fit=crop' },
      { id: 4, name: 'Designer Handbag', price: 15000, image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=400&auto=format&fit=crop' },
    ]
  },
  {
    id: 102,
    name: 'ByBit Imports',
    address: 'Addis Ababa, Piassa',
    categories: [1, 3],
    subcategories: [13, 31, 32],
    posted: 2156,
    sold: 15830,
    completion: 96.2,
    online: false,
    since: '2021-11-10',
    payment: ['Bank Transfer', 'Telebirr'],
    rating: 4.7,
    verified: true,
    coverImage: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?q=80&w=800&auto=format&fit=crop',
    description: 'Premium electronics and home appliances importer. Trusted by thousands of customers across Ethiopia.',
    phone: '+251922345678',
    email: 'info@bybitimports.et',
    website: 'www.bybitimports.et',
    products: [
      { id: 5, name: 'Dell XPS 15', price: 95000, image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=400&auto=format&fit=crop' },
      { id: 6, name: 'LG OLED TV 55"', price: 180000, image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?q=80&w=400&auto=format&fit=crop' },
      { id: 7, name: 'Refrigerator', price: 45000, image: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?q=80&w=400&auto=format&fit=crop' },
      { id: 8, name: 'Washing Machine', price: 35000, image: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?q=80&w=400&auto=format&fit=crop' },
    ]
  },
  // Add more vendors as needed...
]

export default function VendorDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const vendor = mockVendors.find(v => v.id === parseInt(id))
  
  if (!vendor) {
    return (
      <section className={`container ${s.page}`}>
        <button className={s.backBtn} onClick={() => navigate('/vendors/buy')}>
          <span>←</span><span>Back to Vendors</span>
        </button>
        <div className={s.card}>
          <h1>Vendor not found</h1>
          <p>The vendor you're looking for doesn't exist.</p>
        </div>
      </section>
    )
  }

  return (
    <section className={`container ${s.page}`}>
      <button className={s.backBtn} onClick={() => navigate('/vendors/buy')}>
        <span>←</span><span>Back to Vendors</span>
      </button>

      <div className={s.hero}>
        <img src={vendor.coverImage} alt={vendor.name} className={s.coverImage} />
        <div className={s.heroOverlay}>
          <div className={s.heroContent}>
            <h1 className={s.vendorName}>{vendor.name}</h1>
            <div className={s.heroMeta}>
              <span style={{ color: '#fbbf24', fontSize: 16, fontWeight: 700 }}>
                ⭐ {vendor.rating}
              </span>
              {vendor.verified && <span className={`${s.badge} ${s.badgeVerified}`}>✓ Verified</span>}
              {vendor.online ? 
                <span className={`${s.badge} ${s.badgeOnline}`}>🟢 Online</span> : 
                <span className={`${s.badge} ${s.badgeOffline}`}>🔴 Offline</span>
              }
              <span className={s.badge} style={{ background: 'rgba(255,255,255,0.2)', color: 'white' }}>
                📍 {vendor.address}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className={s.content}>
        <main className={s.main}>
          <div className={s.card}>
            <h2 className={s.sectionTitle}>Performance Statistics</h2>
            <div className={s.stats}>
              <div className={s.stat}>
                <div className={s.statLabel}>Total Sold</div>
                <div className={s.statValue}>{vendor.sold.toLocaleString()}</div>
              </div>
              <div className={s.stat}>
                <div className={s.statLabel}>Products Posted</div>
                <div className={s.statValue}>{vendor.posted.toLocaleString()}</div>
              </div>
              <div className={s.stat}>
                <div className={s.statLabel}>Completion Rate</div>
                <div className={s.statValue}>{vendor.completion}%</div>
              </div>
            </div>
          </div>

          <div className={s.card}>
            <h2 className={s.sectionTitle}>About {vendor.name}</h2>
            <p style={{ color: '#6b7280', lineHeight: 1.6, marginBottom: 16 }}>
              {vendor.description}
            </p>
            <div style={{ fontSize: 14, color: '#9ca3af' }}>
              Operating since {new Date(vendor.since).getFullYear()}
            </div>
          </div>

          <div className={s.card}>
            <h2 className={s.sectionTitle}>Featured Products</h2>
            <div className={s.products}>
              {vendor.products.map(product => (
                <div key={product.id} className={s.productCard}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className={s.productImage}
                    onClick={() => navigate(`/products/${product.id}`)}
                    style={{ cursor: 'pointer' }}
                  />
                  <div
                    className={s.productName}
                    onClick={() => navigate(`/products/${product.id}`)}
                    style={{ cursor: 'pointer' }}
                  >
                    {product.name}
                  </div>
                  <div className={s.productPrice}>ETB {product.price.toLocaleString()}</div>
                  <div className={s.actions}>
                    <button
                      className={`${s.btn} ${s.btnPrimary}`}
                      onClick={() => dispatch(addItem({ id: product.id, name: product.name, price: product.price, qty: 1, image: product.image }))}
                    >
                      Add to Cart
                    </button>
                    <button
                      className={s.btn}
                      onClick={() => dispatch(addItem({ id: product.id, name: product.name, price: product.price, qty: 1, image: product.image }))}
                    >
                      Order
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>

        <aside className={s.sidebar}>
          <div className={s.card}>
            <h3 className={s.sectionTitle}>Quick Actions</h3>
            <div className={s.actions}>
              <button className={`${s.btn} ${s.btnPrimary}`}>Add to Cart</button>
              <button className={s.btn}>Order</button>
            </div>
          </div>

          <div className={s.card}>
            <h3 className={s.sectionTitle}>Payment Methods</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {vendor.payment.map(method => (
                <div key={method} style={{ 
                  padding: 8, 
                  background: '#f0fdf4', 
                  border: '1px solid #a7f3d0', 
                  borderRadius: 8,
                  fontSize: 14,
                  fontWeight: 600,
                  color: '#065f46'
                }}>
                  💳 {method}
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </section>
  )
}
