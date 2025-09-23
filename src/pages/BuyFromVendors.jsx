import React, { useMemo, useState } from 'react'
import s from './BuyFromVendors.module.scss'

// Mock taxonomy
const mockCategories = [
  { id: 1, name: 'Electronics', subcategories: [
    { id: 11, name: 'Phones' },
    { id: 12, name: 'TVs' },
    { id: 13, name: 'Laptops' },
  ]},
  { id: 2, name: 'Fashion', subcategories: [
    { id: 21, name: 'Men' },
    { id: 22, name: 'Women' },
    { id: 23, name: 'Shoes' },
  ]},
  { id: 3, name: 'Home', subcategories: [
    { id: 31, name: 'Furniture' },
    { id: 32, name: 'Appliances' },
  ]},
]

// Mock vendors — style like exchange P2P merchant listings
const mockVendors = [
  {
    id: 101,
    name: 'Ninace Traders',
    address: 'Addis Ababa, Bole',
    categories: [1, 2],
    subcategories: [11, 12, 21, 22],
    posted: 1328, // total products posted
    sold: 8240,  // total units sold
    completion: 98.5, // fulfillment rate
    online: true,
    since: '2022-03-01',
    payment: ['Cash', 'Telebirr', 'Bank Transfer'],
    rating: 4.9,
    verified: true,
    coverImage: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=800&auto=format&fit=crop',
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
  },
  {
    id: 103,
    name: 'Habesha Fashion Hub',
    address: 'Adama, Nazret',
    categories: [2],
    subcategories: [21, 22, 23],
    posted: 3540,
    sold: 21560,
    completion: 94.8,
    online: true,
    since: '2020-08-20',
    payment: ['Cash', 'Telebirr'],
    rating: 4.8,
    verified: true,
    coverImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 104,
    name: 'Tech Oasis Pro',
    address: 'Hawassa, SNNPR',
    categories: [1],
    subcategories: [11, 13],
    posted: 820,
    sold: 4400,
    completion: 97.1,
    online: true,
    since: '2023-02-15',
    payment: ['Bank Transfer', 'Cash'],
    rating: 4.6,
    verified: false,
    coverImage: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 105,
    name: 'Binance Electronics',
    address: 'Dire Dawa',
    categories: [1],
    subcategories: [11, 12, 13],
    posted: 1890,
    sold: 12670,
    completion: 99.1,
    online: true,
    since: '2019-05-12',
    payment: ['Bank Transfer', 'Telebirr', 'Cash'],
    rating: 4.9,
    verified: true,
    coverImage: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 106,
    name: 'Merkato Mega Store',
    address: 'Addis Ababa, Merkato',
    categories: [1, 2, 3],
    subcategories: [11, 12, 13, 21, 22, 23, 31, 32],
    posted: 5240,
    sold: 34580,
    completion: 93.4,
    online: true,
    since: '2018-01-08',
    payment: ['Cash', 'Telebirr'],
    rating: 4.5,
    verified: true,
    coverImage: 'https://images.unsplash.com/photo-1555529902-ce3d4d58c1b5?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 107,
    name: 'Sheger Home & Living',
    address: 'Addis Ababa, CMC',
    categories: [3],
    subcategories: [31, 32],
    posted: 1456,
    sold: 7890,
    completion: 95.7,
    online: false,
    since: '2021-09-03',
    payment: ['Bank Transfer'],
    rating: 4.4,
    verified: true,
    coverImage: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 108,
    name: 'Bahir Dar Boutique',
    address: 'Bahir Dar, Amhara',
    categories: [2],
    subcategories: [21, 22, 23],
    posted: 890,
    sold: 3240,
    completion: 91.8,
    online: true,
    since: '2022-11-20',
    payment: ['Cash', 'Telebirr'],
    rating: 4.3,
    verified: false,
    coverImage: 'https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 109,
    name: 'Mekelle Tech Hub',
    address: 'Mekelle, Tigray',
    categories: [1],
    subcategories: [11, 13],
    posted: 567,
    sold: 2180,
    completion: 96.9,
    online: true,
    since: '2023-07-14',
    payment: ['Bank Transfer', 'Cash'],
    rating: 4.7,
    verified: true,
    coverImage: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 110,
    name: 'Jimma Coffee & More',
    address: 'Jimma, Oromia',
    categories: [3],
    subcategories: [31, 32],
    posted: 234,
    sold: 890,
    completion: 88.5,
    online: false,
    since: '2023-12-01',
    payment: ['Cash'],
    rating: 4.1,
    verified: false,
    coverImage: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800&auto=format&fit=crop',
  },
]

// Mock used items data
const mockUsedItems = [
  {
    id: 201,
    title: 'iPhone 12 Pro - Excellent Condition',
    price: 45000,
    originalPrice: 85000,
    condition: 'Excellent',
    seller: 'Ahmed Hassan',
    location: 'Addis Ababa, Bole',
    posted: '2 hours ago',
    images: ['https://images.unsplash.com/photo-1592750475338-74b7b21085ab?q=80&w=400&auto=format&fit=crop'],
    category: 1,
    subcategory: 11,
    verified: true,
    negotiable: true,
  },
  {
    id: 202,
    title: 'MacBook Air M1 - Like New',
    price: 75000,
    originalPrice: 125000,
    condition: 'Like New',
    seller: 'Sarah Tekle',
    location: 'Addis Ababa, CMC',
    posted: '5 hours ago',
    images: ['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=400&auto=format&fit=crop'],
    category: 1,
    subcategory: 13,
    verified: true,
    negotiable: false,
  },
  {
    id: 203,
    title: 'Toyota Corolla 2018 - Good Condition',
    price: 850000,
    originalPrice: 1200000,
    condition: 'Good',
    seller: 'Dawit Motors',
    location: 'Adama',
    posted: '1 day ago',
    images: ['https://images.unsplash.com/photo-1549921296-3b4a4f6f9a5a?q=80&w=400&auto=format&fit=crop'],
    category: 4,
    subcategory: 41,
    verified: true,
    negotiable: true,
  },
  {
    id: 204,
    title: 'Designer Sofa Set - Fair Condition',
    price: 18000,
    originalPrice: 35000,
    condition: 'Fair',
    seller: 'Meron Furniture',
    location: 'Bahir Dar',
    posted: '3 days ago',
    images: ['https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=400&auto=format&fit=crop'],
    category: 3,
    subcategory: 31,
    verified: false,
    negotiable: true,
  },
  {
    id: 205,
    title: 'Canon EOS R5 Camera - Excellent',
    price: 180000,
    originalPrice: 250000,
    condition: 'Excellent',
    seller: 'Photo Pro Ethiopia',
    location: 'Addis Ababa, Piassa',
    posted: '6 hours ago',
    images: ['https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=400&auto=format&fit=crop'],
    category: 1,
    subcategory: 12,
    verified: true,
    negotiable: false,
  },
  {
    id: 206,
    title: 'Gaming Laptop RTX 3070 - Good',
    price: 95000,
    originalPrice: 140000,
    condition: 'Good',
    seller: 'Tech Reseller',
    location: 'Hawassa',
    posted: '12 hours ago',
    images: ['https://images.unsplash.com/photo-1603899122361-e99b4ba9f6d6?q=80&w=400&auto=format&fit=crop'],
    category: 1,
    subcategory: 13,
    verified: false,
    negotiable: true,
  },
]

// Mock bulk sellers data
const mockBulkSellers = [
  {
    id: 301,
    name: 'Wholesale Electronics Hub',
    location: 'Addis Ababa, Merkato',
    speciality: 'Electronics & Gadgets',
    minOrder: 50,
    maxDiscount: 35,
    totalOrders: 2840,
    rating: 4.8,
    verified: true,
    online: true,
    coverImage: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=800&auto=format&fit=crop',
    categories: [1],
    payment: ['Bank Transfer', 'Letter of Credit'],
    contact: '+251911555001',
  },
  {
    id: 302,
    name: 'Fashion Bulk Distributors',
    location: 'Dire Dawa',
    speciality: 'Clothing & Accessories',
    minOrder: 100,
    maxDiscount: 45,
    totalOrders: 1560,
    rating: 4.6,
    verified: true,
    online: false,
    coverImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=800&auto=format&fit=crop',
    categories: [2],
    payment: ['Bank Transfer', 'Cash'],
    contact: '+251922666002',
  },
  {
    id: 303,
    name: 'Home Appliance Wholesale',
    location: 'Addis Ababa, Gotera',
    speciality: 'Home & Kitchen Appliances',
    minOrder: 25,
    maxDiscount: 30,
    totalOrders: 980,
    rating: 4.4,
    verified: true,
    online: true,
    coverImage: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=800&auto=format&fit=crop',
    categories: [3],
    payment: ['Bank Transfer', 'Telebirr'],
    contact: '+251933777003',
  },
  {
    id: 304,
    name: 'Agricultural Bulk Supply',
    location: 'Bahir Dar',
    speciality: 'Agricultural Products & Tools',
    minOrder: 200,
    maxDiscount: 25,
    totalOrders: 650,
    rating: 4.2,
    verified: false,
    online: false,
    coverImage: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?q=80&w=800&auto=format&fit=crop',
    categories: [5],
    payment: ['Cash', 'Bank Transfer'],
    contact: '+251944888004',
  },
  {
    id: 305,
    name: 'Construction Materials Bulk',
    location: 'Mekelle',
    speciality: 'Construction & Building Materials',
    minOrder: 500,
    maxDiscount: 20,
    totalOrders: 420,
    rating: 4.0,
    verified: true,
    online: true,
    coverImage: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800&auto=format&fit=crop',
    categories: [6],
    payment: ['Bank Transfer'],
    contact: '+251955999005',
  },
]

export default function BuyFromVendors() {
  const [activeTab, setActiveTab] = useState('vendors') // vendors | used | bulk
  const [q, setQ] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [subcategoryId, setSubcategoryId] = useState('')
  const [minSold, setMinSold] = useState('')
  const [maxSold, setMaxSold] = useState('')
  const [address, setAddress] = useState('')
  const [payment, setPayment] = useState('')
  const [onlyOnline, setOnlyOnline] = useState(false)
  const [sortBy, setSortBy] = useState('sold_desc') // sold_desc | posted_desc | completion_desc
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(6)

  const subcats = useMemo(() => {
    const cat = mockCategories.find(c => String(c.id) === String(categoryId))
    return cat ? cat.subcategories : []
  }, [categoryId])

  const filtered = useMemo(() => {
    let list = [...mockVendors]

    if (q.trim()) list = list.filter(v => v.name.toLowerCase().includes(q.trim().toLowerCase()))
    if (categoryId) list = list.filter(v => v.categories.includes(Number(categoryId)))
    if (subcategoryId) list = list.filter(v => v.subcategories.includes(Number(subcategoryId)))
    if (address.trim()) list = list.filter(v => v.address.toLowerCase().includes(address.trim().toLowerCase()))
    if (payment) list = list.filter(v => v.payment.includes(payment))
    if (onlyOnline) list = list.filter(v => v.online)

    const min = Number(minSold)
    const max = Number(maxSold)
    if (!Number.isNaN(min)) list = list.filter(v => v.sold >= min)
    if (!Number.isNaN(max) && max > 0) list = list.filter(v => v.sold <= max)

    switch (sortBy) {
      case 'posted_desc':
        list.sort((a, b) => b.posted - a.posted)
        break
      case 'completion_desc':
        list.sort((a, b) => b.completion - a.completion)
        break
      case 'sold_desc':
      default:
        list.sort((a, b) => b.sold - a.sold)
        break
    }

    return list
  }, [q, categoryId, subcategoryId, minSold, maxSold, address, payment, onlyOnline, sortBy])

  const paginatedVendors = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return filtered.slice(startIndex, startIndex + itemsPerPage)
  }, [filtered, currentPage, itemsPerPage])

  const totalPages = Math.ceil(filtered.length / itemsPerPage)

  const getTabTitle = () => {
    switch (activeTab) {
      case 'used': return 'Buy Used Items'
      case 'bulk': return 'Buy in Bulk'
      default: return 'Buy from Vendors'
    }
  }

  const getTabSubtitle = () => {
    switch (activeTab) {
      case 'used': return 'Find quality pre-owned items at great prices'
      case 'bulk': return 'Connect with wholesale suppliers for bulk orders'
      default: return 'Discover verified vendors and filter like Binance P2P'
    }
  }

  return (
    <section className={`container ${s.page}`}>
      <div className={s.header}>
        <div>
          <div className={s.title}>{getTabTitle()}</div>
          <div className={s.subtitle}>{getTabSubtitle()}</div>
        </div>
      </div>

      <div className={s.tabs}>
        <div 
          className={`${s.tab} ${activeTab === 'vendors' ? s.tabActive : ''}`}
          onClick={() => { setActiveTab('vendors'); setCurrentPage(1) }}
        >
          🏪 Vendors
        </div>
        <div 
          className={`${s.tab} ${activeTab === 'used' ? s.tabActive : ''}`}
          onClick={() => { setActiveTab('used'); setCurrentPage(1) }}
        >
          ♻️ Buy Used
        </div>
        <div 
          className={`${s.tab} ${activeTab === 'bulk' ? s.tabActive : ''}`}
          onClick={() => { setActiveTab('bulk'); setCurrentPage(1) }}
        >
          📦 Buy Bulk
        </div>
      </div>

      <div className={s.content}>
        <aside className={s.filters}>
          <div className={s.group}>
            <label className={s.label}>Search vendor</label>
            <input className={s.input} placeholder="e.g. Ninace, ByBit" value={q} onChange={(e)=>setQ(e.target.value)} />
          </div>

          <div className={s.group}>
            <label className={s.label}>Category</label>
            <select className={s.select} value={categoryId} onChange={(e)=>{ setCategoryId(e.target.value); setSubcategoryId('') }}>
              <option value="">All</option>
              {mockCategories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>

          <div className={s.group}>
            <label className={s.label}>Subcategory</label>
            <select className={s.select} value={subcategoryId} onChange={(e)=>setSubcategoryId(e.target.value)} disabled={!categoryId}>
              <option value="">All</option>
              {subcats.map(sc => <option key={sc.id} value={sc.id}>{sc.name}</option>)}
            </select>
          </div>

          <div className={s.group}>
            <label className={s.label}>Amount sold range</label>
            <div className={s.row}>
              <input className={s.input} type="number" placeholder="Min" value={minSold} onChange={(e)=>setMinSold(e.target.value)} />
              <input className={s.input} type="number" placeholder="Max" value={maxSold} onChange={(e)=>setMaxSold(e.target.value)} />
            </div>
          </div>

          <div className={s.group}>
            <label className={s.label}>Address contains</label>
            <input className={s.input} placeholder="e.g. Addis, Bole" value={address} onChange={(e)=>setAddress(e.target.value)} />
          </div>

          <div className={s.group}>
            <label className={s.label}>Payment method</label>
            <select className={s.select} value={payment} onChange={(e)=>setPayment(e.target.value)}>
              <option value="">Any</option>
              <option value="Cash">Cash</option>
              <option value="Bank Transfer">Bank Transfer</option>
              <option value="Telebirr">Telebirr</option>
            </select>
          </div>

          <div className={s.group}>
            <label className={s.label}>Online only</label>
            <div>
              <label style={{ display: 'inline-flex', gap: 8, alignItems: 'center' }}>
                <input type="checkbox" checked={onlyOnline} onChange={(e)=>setOnlyOnline(e.target.checked)} />
                <span>Show online vendors</span>
              </label>
            </div>
          </div>

          <div className={s.group}>
            <label className={s.label}>Sort by</label>
            <select className={s.select} value={sortBy} onChange={(e)=>setSortBy(e.target.value)}>
              <option value="sold_desc">Sold (desc)</option>
              <option value="posted_desc">Posted (desc)</option>
              <option value="completion_desc">Completion rate</option>
            </select>
          </div>

          <div className={s.group}>
            <button className={`${s.btn} ${s.btnPrimary}`} onClick={()=>{ /* no-op for mock; filters are reactive */ }}>Apply Filters</button>
          </div>
        </aside>

        <main className={s.results}>
          {activeTab === 'vendors' && (
            <>
              <div className={s.bar}>
                <div className={s.count}>{filtered.length} vendors</div>
                <div className={s.meta}>
                  <span className={s.badge}>Verified</span>
                  <span className={s.badge}>Fast fulfillment</span>
                </div>
              </div>

              <div className={s.cards}>
                {paginatedVendors.map(v => (
              <article key={v.id} className={s.card}>
                <div style={{ 
                  backgroundImage: `url(${v.coverImage})`, 
                  backgroundSize: 'cover', 
                  backgroundPosition: 'center',
                  height: '120px',
                  borderRadius: '12px 12px 0 0',
                  marginBottom: '16px',
                  position: 'relative'
                }}>
                  <div style={{ 
                    position: 'absolute', 
                    top: 8, 
                    right: 8, 
                    display: 'flex', 
                    gap: 6 
                  }}>
                    {v.online ? 
                      <span className={s.badge} style={{ background: 'rgba(220, 252, 231, 0.9)', color: '#166534', border: '1px solid #86efac' }}>🟢 Online</span> : 
                      <span className={s.badge} style={{ background: 'rgba(254, 242, 242, 0.9)', color: '#991b1b', border: '1px solid #fca5a5' }}>🔴 Offline</span>
                    }
                  </div>
                </div>

                <div className={s.top}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div className={s.avatar}>
                      {v.name.charAt(0)}
                    </div>
                    <div>
                      <div className={s.vendorName}>{v.name}</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
                        <span style={{ color: '#f59e0b', fontSize: 14, fontWeight: 700 }}>
                          ⭐ {v.rating}
                        </span>
                        {v.verified && <span className={s.badge} style={{ background: '#dbeafe', color: '#1e40af', border: '1px solid #93c5fd' }}>✓ Verified</span>}
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{ fontSize: 13, color: '#6b7280', marginBottom: 8 }}>
                  📍 {v.address} • Since {new Date(v.since).getFullYear()}
                </div>

                <div className={s.kpis}>
                  <div className={s.kpi}>
                    <div className={s.kLabel}>Sold</div>
                    <div className={s.kValue}>{v.sold.toLocaleString()}</div>
                  </div>
                  <div className={s.kpi}>
                    <div className={s.kLabel}>Posted</div>
                    <div className={s.kValue}>{v.posted.toLocaleString()}</div>
                  </div>
                  <div className={s.kpi}>
                    <div className={s.kLabel}>Completion</div>
                    <div className={s.kValue}>{v.completion}%</div>
                  </div>
                </div>

                <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 12 }}>
                  💳 {v.payment.join(', ')}
                </div>

                <div className={s.actions}>
                  <button className={s.btn} onClick={() => window.location.href = `/vendors/${v.id}`}>View Details</button>
                  <button className={`${s.btn} ${s.btnPrimary}`}>Add to Cart</button>
                  <button className={s.btn}>Order</button>
                </div>
              </article>
            ))}
          </div>

          {totalPages > 1 && (
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center', 
              gap: 12, 
              marginTop: 24,
              padding: 16,
              background: '#fff',
              borderRadius: 16,
              border: '1px solid #d1fae5'
            }}>
              <button 
                className={s.btn} 
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                style={{ opacity: currentPage === 1 ? 0.5 : 1 }}
              >
                ← Previous
              </button>
              
              <div style={{ display: 'flex', gap: 8 }}>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    className={`${s.btn} ${page === currentPage ? s.btnPrimary : ''}`}
                    onClick={() => setCurrentPage(page)}
                    style={{ minWidth: 40 }}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button 
                className={s.btn} 
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                style={{ opacity: currentPage === totalPages ? 0.5 : 1 }}
              >
                Next →
              </button>
            </div>
          )}
            </>
          )}

          {activeTab === 'used' && (
            <>
              <div className={s.bar}>
                <div className={s.count}>{mockUsedItems.length} used items</div>
                <div className={s.meta}>
                  <span className={s.badge}>Pre-owned</span>
                  <span className={s.badge}>Great deals</span>
                </div>
              </div>

              <div style={{ display: 'grid', gap: 16 }}>
                {mockUsedItems.map(item => (
                  <article key={item.id} className={s.usedCard}>
                    <img src={item.images[0]} alt={item.title} className={s.usedImage} />
                    <div className={s.usedContent}>
                      <div className={s.usedTitle}>{item.title}</div>
                      <div className={s.usedMeta}>
                        <div className={s.usedPrice}>ETB {item.price.toLocaleString()}</div>
                        <div className={s.usedOriginalPrice}>ETB {item.originalPrice.toLocaleString()}</div>
                        <span className={s.badge} style={{ 
                          background: item.condition === 'Excellent' ? '#dcfce7' : 
                                     item.condition === 'Like New' ? '#dbeafe' : 
                                     item.condition === 'Good' ? '#fef3c7' : '#fef2f2',
                          color: item.condition === 'Excellent' ? '#166534' : 
                                item.condition === 'Like New' ? '#1e40af' : 
                                item.condition === 'Good' ? '#92400e' : '#991b1b'
                        }}>
                          {item.condition}
                        </span>
                        {item.negotiable && <span className={s.badge}>💬 Negotiable</span>}
                      </div>
                      <div className={s.usedSeller}>👤 {item.seller}</div>
                      <div className={s.usedLocation}>📍 {item.location} • {item.posted}</div>
                    </div>
                    <div className={s.usedActions}>
                      <button className={`${s.btn} ${s.btnPrimary}`}>Add to Cart</button>
                      <button className={s.btn}>Order</button>
                    </div>
                  </article>
                ))}
              </div>
            </>
          )}

          {activeTab === 'bulk' && (
            <>
              <div className={s.bar}>
                <div className={s.count}>{mockBulkSellers.length} bulk suppliers</div>
                <div className={s.meta}>
                  <span className={s.badge}>Wholesale</span>
                  <span className={s.badge}>Volume discounts</span>
                </div>
              </div>

              <div className={s.cards}>
                {mockBulkSellers.map(supplier => (
                  <article key={supplier.id} className={s.bulkCard}>
                    <div style={{ 
                      backgroundImage: `url(${supplier.coverImage})`, 
                      backgroundSize: 'cover', 
                      backgroundPosition: 'center',
                      height: '100px',
                      borderRadius: '12px',
                      marginBottom: '16px',
                      position: 'relative'
                    }}>
                      <div style={{ 
                        position: 'absolute', 
                        top: 8, 
                        right: 8, 
                        display: 'flex', 
                        gap: 6 
                      }}>
                        {supplier.online ? 
                          <span className={s.badge} style={{ background: 'rgba(220, 252, 231, 0.9)', color: '#166534' }}>🟢 Online</span> : 
                          <span className={s.badge} style={{ background: 'rgba(254, 242, 242, 0.9)', color: '#991b1b' }}>🔴 Offline</span>
                        }
                      </div>
                    </div>

                    <div className={s.bulkHeader}>
                      <div>
                        <div className={s.bulkName}>{supplier.name}</div>
                        <div className={s.bulkSpeciality}>{supplier.speciality}</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8 }}>
                          <span style={{ color: '#f59e0b', fontSize: 14, fontWeight: 700 }}>
                            ⭐ {supplier.rating}
                          </span>
                          {supplier.verified && <span className={s.badge} style={{ background: '#dbeafe', color: '#1e40af' }}>✓ Verified</span>}
                        </div>
                      </div>
                    </div>

                    <div className={s.bulkStats}>
                      <div className={s.bulkStat}>
                        <div className={s.bulkStatLabel}>Min Order</div>
                        <div className={s.bulkStatValue}>{supplier.minOrder}</div>
                      </div>
                      <div className={s.bulkStat}>
                        <div className={s.bulkStatLabel}>Max Discount</div>
                        <div className={s.bulkStatValue}>{supplier.maxDiscount}%</div>
                      </div>
                      <div className={s.bulkStat}>
                        <div className={s.bulkStatLabel}>Orders</div>
                        <div className={s.bulkStatValue}>{supplier.totalOrders}</div>
                      </div>
                    </div>

                    <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 12 }}>
                      📍 {supplier.location} • 📞 {supplier.contact}
                    </div>

                    <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 12 }}>
                      💳 {supplier.payment.join(', ')}
                    </div>

                    <div className={s.actions}>
                      <button className={`${s.btn} ${s.btnPrimary}`}>Add to Cart</button>
                      <button className={s.btn}>Order</button>
                    </div>
                  </article>
                ))}
              </div>
            </>
          )}
        </main>
      </div>
    </section>
  )
}
