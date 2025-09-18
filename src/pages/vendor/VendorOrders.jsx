import React, { useEffect, useState } from 'react'
import s from './VendorAnalytics.module.scss'

export default function VendorOrders() {
  const [orders, setOrders] = useState([])
  useEffect(() => {
    setOrders([
      { id: 2005, customer: 'Abel A.', items: 3, total: 3150, status: 'paid', date: '06/07/2025' },
      { id: 2004, customer: 'Saba G.', items: 1, total: 450, status: 'pending', date: '06/07/2025' },
      { id: 2003, customer: 'Miki T.', items: 2, total: 2800, status: 'shipped', date: '05/07/2025' },
      { id: 2002, customer: 'Yared K.', items: 5, total: 7200, status: 'delivered', date: '05/07/2025' },
    ])
  }, [])
  return (
    <section className={s.container}>
      <div className={s.wrap}>
        <div className={s.header}>
          <h1 className={s.title}>Orders</h1>
        </div>
        <div className={s.card}>
          <div className={s.tableWrap}>
            <table className={s.table}>
              <thead>
                <tr className={s.theadRow}>
                  <th className={s.th}>Order #</th>
                  <th className={s.th}>Customer</th>
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
                    <td className={s.td}>{o.customer}</td>
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
      </div>
    </section>
  )
}
