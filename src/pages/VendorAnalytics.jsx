import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './VendorRegister.module.scss'
import { api } from '../api/api'

export default function VendorAnalytics() {
  const navigate = useNavigate()
  const [stats, setStats] = useState({
    products: 0,
    totalSales: 0,
    orders: 0,
    views: 0,
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [orders, setOrders] = useState([])
  const [topProducts, setTopProducts] = useState([])
  const [salesSeries, setSalesSeries] = useState([])
  const [integrations, setIntegrations] = useState({ telebirr: 'connected', cbebirr: 'connected', sms: 'operational' })
  const [localization, setLocalization] = useState({ language: 'en', currency: 'ETB', dateFormat: 'DD/MM/YYYY' })
  // Additional mock analytics data
  const [deliveries, setDeliveries] = useState([])
  const [reviews, setReviews] = useState([])
  const [notes, setNotes] = useState([])
  const [cashouts, setCashouts] = useState([])
  const [searches, setSearches] = useState([])
  const [productStats, setProductStats] = useState([])

  useEffect(() => {
    const token = localStorage.getItem('authToken')
    if (!token) {
      navigate('/vendor')
      return
    }

    // Placeholder: try fetching vendor analytics if endpoint exists, else show demo values
    const fetchStats = async () => {
      try {
        setLoading(true)
        setError('')
        // Replace with your endpoint if available, e.g. /vendors/me/analytics
        // const data = await api.get('/vendors/me/analytics', { headers: { Authorization: `Bearer ${token}` } })
        // setStats(data)
        // Demo values for now:
        setStats({ products: 42, totalSales: 12345, orders: 318, views: 8801 })
        setOrders([
          { id: 1032, items: 2, total: 1250, status: 'paid', date: '06/07/2025' },
          { id: 1031, items: 1, total: 350, status: 'pending', date: '06/07/2025' },
          { id: 1030, items: 3, total: 2100, status: 'shipped', date: '05/07/2025' },
          { id: 1029, items: 5, total: 5100, status: 'delivered', date: '05/07/2025' },
        ])
        setTopProducts([
          { id: 1, name: 'Leather Bag', price: 1500, stock: 12, sales: 233 },
          { id: 2, name: 'Cotton T-Shirt', price: 350, stock: 48, sales: 189 },
          { id: 3, name: 'Running Shoes', price: 2200, stock: 9, sales: 143 },
        ])
        setSalesSeries([
          { day: 'Mon', value: 1200 },
          { day: 'Tue', value: 2400 },
          { day: 'Wed', value: 900 },
          { day: 'Thu', value: 3100 },
          { day: 'Fri', value: 1800 },
          { day: 'Sat', value: 3650 },
          { day: 'Sun', value: 2100 },
        ])
        setIntegrations({ telebirr: 'connected', cbebirr: 'connected', sms: 'operational' })
        setLocalization({ language: 'en', currency: 'ETB', dateFormat: 'DD/MM/YYYY' })
        // Additional sections demo data
        setDeliveries([
          { id: 'DLV-777', courier: 'DHL', status: 'in transit', eta: '08/07/2025' },
          { id: 'DLV-776', courier: 'EMS', status: 'delivered', eta: '06/07/2025' },
          { id: 'DLV-775', courier: 'Local Courier', status: 'pending pickup', eta: '07/07/2025' },
        ])
        setReviews([
          { id: 'RV-1', product: 'Leather Bag', rating: 5, comment: 'Great quality!', date: '06/07/2025' },
          { id: 'RV-2', product: 'Running Shoes', rating: 4, comment: 'Comfortable and light.', date: '05/07/2025' },
          { id: 'RV-3', product: 'Cotton T-Shirt', rating: 3, comment: 'Good but size runs small.', date: '04/07/2025' },
        ])
        setNotes([
          { id: 'NT-10', text: 'Restock Cotton T-Shirt size L', date: '06/07/2025' },
          { id: 'NT-09', text: 'Prepare weekend promo banner', date: '05/07/2025' },
          { id: 'NT-08', text: 'Reply to vendor support ticket', date: '04/07/2025' },
        ])
        setCashouts([
          { id: 'CO-101', amount: 5000, method: 'Telebirr', status: 'processed', date: '05/07/2025' },
          { id: 'CO-100', amount: 3200, method: 'CBE Birr', status: 'pending', date: '03/07/2025' },
        ])
        setSearches([
          { id: 'SR-12', query: 'leather bag', count: 23, date: '06/07/2025' },
          { id: 'SR-11', query: 'running shoes 42', count: 14, date: '06/07/2025' },
          { id: 'SR-10', query: 'cotton t-shirt', count: 9, date: '05/07/2025' },
        ])
        setProductStats([
          { id: 1, name: 'Leather Bag', views: 1800, addToCart: 320, purchases: 233, conversion: 12.9 },
          { id: 2, name: 'Cotton T-Shirt', views: 1350, addToCart: 210, purchases: 189, conversion: 14.0 },
          { id: 3, name: 'Running Shoes', views: 980, addToCart: 170, purchases: 143, conversion: 14.6 },
        ])
      } catch (e) {
        setError('Failed to load analytics.')
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [navigate])

  if (loading) {
    return (
      <section className="container" style={{ display: 'flex', justifyContent: 'center' }}>
        <div className={styles.wrap}>
          <div className={styles.card}>
            <div className={styles.small}>Loading analytics...</div>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="container" style={{ display: 'flex', justifyContent: 'center' }}>
        <div className={styles.wrap}>
          <div className={styles.card}>
            <div className={styles.small} style={{ color: '#b91c1c' }}>{error}</div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="container" style={{ display: 'flex', justifyContent: 'center' }}>
      <div className={styles.wrap}>
        <div className={styles.header}>
          <h1 className={styles.title}>Vendor Analytics</h1>
          <div>
            <button className="button buttonGhost" onClick={() => navigate('/vendor/register')}>Add Products</button>
            <button className="button buttonPrimary" style={{ marginLeft: 8 }} onClick={() => navigate('/vendor')}>Account</button>
          </div>
        </div>

        {/* SDS: KPIs */}
        <div className={styles.card}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
            <StatCard label="Products" value={stats.products} color="#2563eb" />
            <StatCard label="Total Sales (ETB)" value={stats.totalSales.toLocaleString()} color="#16a34a" />
            <StatCard label="Orders" value={stats.orders} color="#f59e0b" />
            <StatCard label="Views" value={stats.views.toLocaleString()} color="#9333ea" />
          </div>
        </div>

        {/* SDS: Sales Overview (last 7 days) */}
        <div className={styles.card}>
          <h2 className={styles.sectionTitle}>Sales (Last 7 Days)</h2>
          <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end', height: 140 }}>
            {salesSeries.map((p) => {
              const max = Math.max(...salesSeries.map(s => s.value)) || 1
              const h = Math.max(8, Math.round((p.value / max) * 120))
              return (
                <div key={p.day} title={`${p.day}: ETB ${p.value}`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ width: 24, height: h, background: '#10b981', borderRadius: 6 }} />
                  <div className={styles.small} style={{ marginTop: 6 }}>{p.day}</div>
                </div>
              )
            })}
          </div>
        </div>

        {/* SDS: Recent Orders */}
        <div className={styles.card}>
          <h2 className={styles.sectionTitle}>Recent Orders</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>
                  <th className={styles.small}>Order #</th>
                  <th className={styles.small}>Items</th>
                  <th className={styles.small}>Total (ETB)</th>
                  <th className={styles.small}>Status</th>
                  <th className={styles.small}>Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(o => (
                  <tr key={o.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                    <td className={styles.small}>#{o.id}</td>
                    <td className={styles.small}>{o.items}</td>
                    <td className={styles.small}>{o.total.toLocaleString()}</td>
                    <td className={styles.small} style={{ textTransform: 'capitalize' }}>{o.status}</td>
                    <td className={styles.small}>{o.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* SDS: Top Products */}
        <div className={styles.card}>
          <h2 className={styles.sectionTitle}>Top Products</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
            {topProducts.map(p => (
              <div key={p.id} style={{ border: '1px solid #e5e7eb', borderRadius: 12, padding: 16 }}>
                <div style={{ fontWeight: 700, color: '#111827' }}>{p.name}</div>
                <div className={styles.small} style={{ color: '#6b7280', marginTop: 4 }}>ETB {p.price}</div>
                <div className={styles.small} style={{ marginTop: 8 }}>Sales: {p.sales} • Stock: {p.stock}</div>
                <div className={styles.small} style={{ marginTop: 8, color: p.stock <= 10 ? '#b45309' : '#065f46' }}>
                  {p.stock <= 10 ? 'Low stock — restock soon' : 'Healthy stock'}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SDS: Integrations Status */}
        <div className={styles.card}>
          <h2 className={styles.sectionTitle}>Integrations</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
            <IntegrationStatus name="Telebirr" status={integrations.telebirr} />
            <IntegrationStatus name="CBE Birr" status={integrations.cbebirr} />
            <IntegrationStatus name="SMS" status={integrations.sms} />
          </div>
        </div>

        {/* SDS: Localization Summary */}
        <div className={styles.card}>
          <h2 className={styles.sectionTitle}>Localization</h2>
          <div className={styles.small}>Language: {localization.language.toUpperCase()}</div>
          <div className={styles.small}>Currency: {localization.currency}</div>
          <div className={styles.small}>Date format: {localization.dateFormat}</div>
        </div>

        {/* SDS: Deliveries */}
        <div className={styles.card}>
          <h2 className={styles.sectionTitle}>Deliveries</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>
                  <th className={styles.small}>ID</th>
                  <th className={styles.small}>Courier</th>
                  <th className={styles.small}>Status</th>
                  <th className={styles.small}>ETA</th>
                </tr>
              </thead>
              <tbody>
                {deliveries.map(d => (
                  <tr key={d.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                    <td className={styles.small}>{d.id}</td>
                    <td className={styles.small}>{d.courier}</td>
                    <td className={styles.small} style={{ textTransform: 'capitalize' }}>{d.status}</td>
                    <td className={styles.small}>{d.eta}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* SDS: Reviews */}
        <div className={styles.card}>
          <h2 className={styles.sectionTitle}>Reviews</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 12 }}>
            {reviews.map(r => (
              <div key={r.id} style={{ border: '1px solid #e5e7eb', borderRadius: 12, padding: 12 }}>
                <div style={{ fontWeight: 600 }}>{r.product}</div>
                <div className={styles.small} style={{ marginTop: 4 }}>Rating: {'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</div>
                <div className={styles.small} style={{ marginTop: 8, color: '#374151' }}>
                  {r.comment}
                </div>
                <div className={styles.small} style={{ marginTop: 8, color: '#6b7280' }}>{r.date}</div>
              </div>
            ))}
          </div>
        </div>

        {/* SDS: Notes */}
        <div className={styles.card}>
          <h2 className={styles.sectionTitle}>Notes</h2>
          <ul style={{ margin: 0, paddingLeft: 18 }}>
            {notes.map(n => (
              <li key={n.id} className={styles.small} style={{ marginBottom: 6 }}>
                <span style={{ color: '#6b7280' }}>{n.date} — </span>{n.text}
              </li>
            ))}
          </ul>
        </div>

        {/* SDS: Cashout Requests History */}
        <div className={styles.card}>
          <h2 className={styles.sectionTitle}>Cashout Requests</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>
                  <th className={styles.small}>ID</th>
                  <th className={styles.small}>Amount (ETB)</th>
                  <th className={styles.small}>Method</th>
                  <th className={styles.small}>Status</th>
                  <th className={styles.small}>Date</th>
                </tr>
              </thead>
              <tbody>
                {cashouts.map(c => (
                  <tr key={c.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                    <td className={styles.small}>{c.id}</td>
                    <td className={styles.small}>{c.amount.toLocaleString()}</td>
                    <td className={styles.small}>{c.method}</td>
                    <td className={styles.small} style={{ textTransform: 'capitalize' }}>{c.status}</td>
                    <td className={styles.small}>{c.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* SDS: Search History */}
        <div className={styles.card}>
          <h2 className={styles.sectionTitle}>Search History</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
            {searches.map(s => (
              <div key={s.id} style={{ border: '1px solid #e5e7eb', borderRadius: 12, padding: 12 }}>
                <div style={{ fontWeight: 600, color: '#111827' }}>
                  "{s.query}"
                </div>
                <div className={styles.small} style={{ marginTop: 4 }}>Count: {s.count}</div>
                <div className={styles.small} style={{ marginTop: 4, color: '#6b7280' }}>{s.date}</div>
              </div>
            ))}
          </div>
        </div>

        {/* SDS: Product Statistics (detailed) */}
        <div className={styles.card}>
          <h2 className={styles.sectionTitle}>Product Statistics</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>
                  <th className={styles.small}>Product</th>
                  <th className={styles.small}>Views</th>
                  <th className={styles.small}>Add to Cart</th>
                  <th className={styles.small}>Purchases</th>
                  <th className={styles.small}>Conversion %</th>
                </tr>
              </thead>
              <tbody>
                {productStats.map(p => (
                  <tr key={p.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                    <td className={styles.small}>{p.name}</td>
                    <td className={styles.small}>{p.views.toLocaleString()}</td>
                    <td className={styles.small}>{p.addToCart.toLocaleString()}</td>
                    <td className={styles.small}>{p.purchases.toLocaleString()}</td>
                    <td className={styles.small}>{p.conversion.toFixed(1)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}

function StatCard({ label, value, color }) {
  return (
    <div style={{
      border: '1px solid #e5e7eb',
      borderRadius: '12px',
      padding: '20px',
      background: 'white',
      boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
    }}>
      <div style={{ color: '#6b7280', fontSize: 12, fontWeight: 600 }}>{label}</div>
      <div style={{ color: color, fontSize: 28, fontWeight: 800, marginTop: 8 }}>{value}</div>
    </div>
  )
}

function IntegrationStatus({ name, status }) {
  const ok = status === 'connected' || status === 'operational'
  return (
    <div style={{
      border: '1px solid #e5e7eb',
      borderRadius: 12,
      padding: 16,
      background: ok ? '#f0fdf4' : '#fef2f2',
    }}>
      <div style={{ fontWeight: 700, color: '#111827' }}>{name}</div>
      <div className={"small"} style={{ color: ok ? '#065f46' : '#991b1b', marginTop: 6, fontSize: 12, fontWeight: 600 }}>
        {ok ? 'Connected' : 'Disconnected'}
      </div>
    </div>
  )
}
