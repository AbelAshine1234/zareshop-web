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

        <div className={styles.card}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '16px'
          }}>
            <StatCard label="Products" value={stats.products} color="#2563eb" />
            <StatCard label="Total Sales (ETB)" value={stats.totalSales.toLocaleString()} color="#16a34a" />
            <StatCard label="Orders" value={stats.orders} color="#f59e0b" />
            <StatCard label="Views" value={stats.views.toLocaleString()} color="#9333ea" />
          </div>
        </div>

        <div className={styles.card}>
          <h2 className={styles.sectionTitle}>Recent Activity</h2>
          <ul style={{ margin: 0, paddingLeft: 16 }}>
            <li className={styles.small}>Order #1032 placed — 2 items — ETB 1,250</li>
            <li className={styles.small}>Order #1031 placed — 1 item — ETB 350</li>
            <li className={styles.small}>Product “Cotton T-Shirt” updated</li>
            <li className={styles.small}>Order #1030 shipped — ETB 2,100</li>
          </ul>
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
