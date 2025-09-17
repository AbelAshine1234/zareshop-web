import React from 'react'
import styles from './Orders.module.scss'

export default function Orders() {
  const rows = [
    { id: 'ORD-0001', total: 3000, status: 'paid' },
    { id: 'ORD-0002', total: 1500, status: 'shipped' },
    { id: 'ORD-0003', total: 2200, status: 'pending' },
  ]
  return (
    <section className={`container ${styles.wrap}`}>
      <h1 className={styles.title}>My Orders</h1>
      <table className={styles.table}>
        <thead>
          <tr className={styles.tr}>
            <th className={styles.th}>Order ID</th>
            <th className={styles.th}>Total</th>
            <th className={styles.th}>Status</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(r => (
            <tr key={r.id} className={styles.tr}>
              <td className={styles.td}>{r.id}</td>
              <td className={styles.td}>ETB {r.total}</td>
              <td className={`${styles.td} ${styles.status}`}>{r.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}
