import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import s from './VendorAnalytics.module.scss'

export default function VendorAnalytics() {
  const navigate = useNavigate()
  const [stats, setStats] = useState({ products: 0, totalSales: 0, orders: 0, views: 0 })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [orders, setOrders] = useState([])
  const [topProducts, setTopProducts] = useState([])
  const [integrations, setIntegrations] = useState({ telebirr: 'connected', cbebirr: 'connected', sms: 'operational' })
  const [localization, setLocalization] = useState({ language: 'en', currency: 'ETB', dateFormat: 'DD/MM/YYYY' })

  const [deliveries, setDeliveries] = useState([])
  const [reviews, setReviews] = useState([])
  const [notes, setNotes] = useState([])
  const [cashouts, setCashouts] = useState([])
  const [searches, setSearches] = useState([])
  const [productStats, setProductStats] = useState([])

  useEffect(() => {
    const token = localStorage.getItem('authToken')
    if (!token) {
      // let layout handle most of auth UX, but prevent brief flashes
      navigate('/vendor/account')
      return
    }
    const load = async () => {
      try {
        setLoading(true)
        setError('')
        // Demo data
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
        setIntegrations({ telebirr: 'connected', cbebirr: 'connected', sms: 'operational' })
        setLocalization({ language: 'en', currency: 'ETB', dateFormat: 'DD/MM/YYYY' })
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
    load()
  }, [navigate])

  if (loading) return <section className={s.container}><div className={s.wrap}><div className={s.card}><div className={s.small}>Loading analytics...</div></div></div></section>
  if (error) return <section className={s.container}><div className={s.wrap}><div className={s.card}><div className={s.small}>{error}</div></div></div></section>

  return (
    <section className={s.container}>
      <div className={s.wrap}>
        <div className={s.header}>
          <h1 className={s.title}>Analytics Overview</h1>
          <div className={s.actions}>
            <button className={s.btn} onClick={() => navigate('/vendor/products')}>Manage Products</button>
            <button className={`${s.btn} ${s.btnPrimary}`} onClick={() => navigate('/vendor/orders')}>View Orders</button>
          </div>
        </div>

        <div className={s.card}>
          <div className={s.gridStats}>
            <div className={s.statCard}>
              <div className={s.statLabel}>Products</div>
              <div className={s.statValue}>{stats.products}</div>
            </div>
            <div className={s.statCard}>
              <div className={s.statLabel}>Total Sales (ETB)</div>
              <div className={s.statValue}>{stats.totalSales.toLocaleString()}</div>
            </div>
            <div className={s.statCard}>
              <div className={s.statLabel}>Orders</div>
              <div className={s.statValue}>{stats.orders}</div>
            </div>
            <div className={s.statCard}>
              <div className={s.statLabel}>Views</div>
              <div className={s.statValue}>{stats.views.toLocaleString()}</div>
            </div>
          </div>
        </div>

        <div className={s.card}>
          <h2 className={s.sectionTitle}>Recent Orders</h2>
          <div className={s.tableWrap}>
            <table className={s.table}>
              <thead>
                <tr className={s.theadRow}>
                  <th className={s.th}>Order #</th>
                  <th className={s.th}>Items</th>
                  <th className={s.th}>Total (ETB)</th>
                  <th className={s.th}>Status</th>
                  <th className={s.th}>Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(o => (
                  <tr key={o.id} className={s.tbodyRow}>
                    <td className={s.td}>#{o.id}</td>
                    <td className={s.td}>{o.items}</td>
                    <td className={s.td}>{o.total.toLocaleString()}</td>
                    <td className={s.td}>{o.status}</td>
                    <td className={s.td}>{o.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className={s.card}>
          <h2 className={s.sectionTitle}>Top Products</h2>
          <div className={s.gridCards}>
            {topProducts.map(p => (
              <div key={p.id} className={s.productCard}>
                <div className={s.productName}>{p.name}</div>
                <div className={`${s.small} ${s.muted}`}>ETB {p.price}</div>
                <div className={s.small}>Sales: {p.sales} • Stock: {p.stock}</div>
                <div className={`${s.small} ${p.stock <= 10 ? s.warn : s.ok}`}>
                  {p.stock <= 10 ? 'Low stock — restock soon' : 'Healthy stock'}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={s.card}>
          <h2 className={s.sectionTitle}>Integrations</h2>
          <div className={s.integrations}>
            <div className={`${s.integrationCard} ${integrations.telebirr === 'connected' ? s.integrationOk : s.integrationBad}`}>
              <div className={s.integrationTitle}>Telebirr</div>
              <div className={integrations.telebirr === 'connected' ? s.integrationStatusOk : s.integrationStatusBad}>
                {integrations.telebirr === 'connected' ? 'Connected' : 'Disconnected'}
              </div>
            </div>
            <div className={`${s.integrationCard} ${integrations.cbebirr === 'connected' ? s.integrationOk : s.integrationBad}`}>
              <div className={s.integrationTitle}>CBE Birr</div>
              <div className={integrations.cbebirr === 'connected' ? s.integrationStatusOk : s.integrationStatusBad}>
                {integrations.cbebirr === 'connected' ? 'Connected' : 'Disconnected'}
              </div>
            </div>
            <div className={`${s.integrationCard} ${integrations.sms === 'operational' ? s.integrationOk : s.integrationBad}`}>
              <div className={s.integrationTitle}>SMS</div>
              <div className={integrations.sms === 'operational' ? s.integrationStatusOk : s.integrationStatusBad}>
                {integrations.sms === 'operational' ? 'Operational' : 'Down'}
              </div>
            </div>
          </div>
        </div>

        <div className={s.card}>
          <h2 className={s.sectionTitle}>Localization</h2>
          <div className={s.small}>Language: {localization.language.toUpperCase()}</div>
          <div className={s.small}>Currency: {localization.currency}</div>
          <div className={s.small}>Date format: {localization.dateFormat}</div>
        </div>

        <div className={s.card}>
          <h2 className={s.sectionTitle}>Deliveries</h2>
          <div className={s.tableWrap}>
            <table className={s.table}>
              <thead>
                <tr className={s.theadRow}>
                  <th className={s.th}>ID</th>
                  <th className={s.th}>Courier</th>
                  <th className={s.th}>Status</th>
                  <th className={s.th}>ETA</th>
                </tr>
              </thead>
              <tbody>
                {deliveries.map(d => (
                  <tr key={d.id} className={s.tbodyRow}>
                    <td className={s.td}>{d.id}</td>
                    <td className={s.td}>{d.courier}</td>
                    <td className={s.td}>{d.status}</td>
                    <td className={s.td}>{d.eta}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className={s.card}>
          <h2 className={s.sectionTitle}>Reviews</h2>
          <div className={s.gridCards}>
            {reviews.map(r => (
              <div key={r.id} className={s.productCard}>
                <div className={s.productName}>{r.product}</div>
                <div className={s.small}>Rating: {'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</div>
                <div className={`${s.small} ${s.muted}`}>{r.comment}</div>
                <div className={`${s.small} ${s.muted}`}>{r.date}</div>
              </div>
            ))}
          </div>
        </div>

        <div className={s.card}>
          <h2 className={s.sectionTitle}>Notes</h2>
          <ul>
            {notes.map(n => (
              <li key={n.id} className={s.small}><span className={s.muted}>{n.date} — </span>{n.text}</li>
            ))}
          </ul>
        </div>

        <div className={s.card}>
          <h2 className={s.sectionTitle}>Cashout Requests</h2>
          <div className={s.tableWrap}>
            <table className={s.table}>
              <thead>
                <tr className={s.theadRow}>
                  <th className={s.th}>ID</th>
                  <th className={s.th}>Amount (ETB)</th>
                  <th className={s.th}>Method</th>
                  <th className={s.th}>Status</th>
                  <th className={s.th}>Date</th>
                </tr>
              </thead>
              <tbody>
                {cashouts.map(c => (
                  <tr key={c.id} className={s.tbodyRow}>
                    <td className={s.td}>{c.id}</td>
                    <td className={s.td}>{c.amount.toLocaleString()}</td>
                    <td className={s.td}>{c.method}</td>
                    <td className={s.td}>{c.status}</td>
                    <td className={s.td}>{c.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className={s.card}>
          <h2 className={s.sectionTitle}>Search History</h2>
          <div className={s.gridCards}>
            {searches.map(sh => (
              <div key={sh.id} className={s.productCard}>
                <div className={s.productName}>"{sh.query}"</div>
                <div className={s.small}>Count: {sh.count}</div>
                <div className={`${s.small} ${s.muted}`}>{sh.date}</div>
              </div>
            ))}
          </div>
        </div>

        <div className={s.card}>
          <h2 className={s.sectionTitle}>Product Statistics</h2>
          <div className={s.tableWrap}>
            <table className={s.table}>
              <thead>
                <tr className={s.theadRow}>
                  <th className={s.th}>Product</th>
                  <th className={s.th}>Views</th>
                  <th className={s.th}>Add to Cart</th>
                  <th className={s.th}>Purchases</th>
                  <th className={s.th}>Conversion %</th>
                </tr>
              </thead>
              <tbody>
                {productStats.map(p => (
                  <tr key={p.id} className={s.tbodyRow}>
                    <td className={s.td}>{p.name}</td>
                    <td className={s.td}>{p.views.toLocaleString()}</td>
                    <td className={s.td}>{p.addToCart.toLocaleString()}</td>
                    <td className={s.td}>{p.purchases.toLocaleString()}</td>
                    <td className={s.td}>{p.conversion.toFixed(1)}%</td>
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
