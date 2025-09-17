import React from 'react'
import styles from './AdminDashboard.module.scss'

export default function AdminDashboard() {
  const kpis = [
    { label: 'Revenue', value: 'ETB 25,300' },
    { label: 'Orders', value: '128' },
    { label: 'Customers', value: '87' },
    { label: 'Products', value: '56' },
  ]
  const recent = [
    { id: 'ORD-0004', customer: 'Abel', total: 1500, status: 'paid' },
    { id: 'ORD-0005', customer: 'Mahi', total: 450, status: 'pending' },
  ]
  return (
    <section className={`container ${styles.wrap}`}>
      <div className={styles.header}>
        <h1 className={styles.title}>Merchant Dashboard</h1>
        <a href="/admin/products/new" className="button buttonPrimary">Add Product</a>
      </div>

      <div className={styles.kpis}>
        {kpis.map(k => (
          <div key={k.label} className={styles.card}>
            <div className={styles.kpiVal}>{k.value}</div>
            <div className={styles.kpiLabel}>{k.label}</div>
          </div>
        ))}
      </div>

      <table className={styles.table}>
        <thead>
          <tr className={styles.tr}>
            <th className={styles.th}>Order ID</th>
            <th className={styles.th}>Customer</th>
            <th className={styles.th}>Total</th>
            <th className={styles.th}>Status</th>
            <th className={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {recent.map(r => (
            <tr key={r.id} className={styles.tr}>
              <td className={styles.td}>{r.id}</td>
              <td className={styles.td}>{r.customer}</td>
              <td className={styles.td}>ETB {r.total}</td>
              <td className={styles.td}>{r.status}</td>
              <td className={`${styles.td} ${styles.actions}`}>
                <button className="button buttonGhost">View</button>
                <button className="button buttonGhost">Mark Shipped</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}
