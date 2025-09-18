import React, { useEffect, useState } from 'react'
import s from './VendorAnalytics.module.scss'

export default function VendorNotifications() {
  const [items, setItems] = useState([])
  useEffect(() => {
    setItems([
      { id: 'N-11', type: 'order', text: 'New order #2006 placed.', date: '06/07/2025' },
      { id: 'N-10', type: 'review', text: 'New review on Leather Bag.', date: '06/07/2025' },
      { id: 'N-09', type: 'cashout', text: 'Cashout CO-100 is pending approval.', date: '05/07/2025' },
    ])
  }, [])
  return (
    <section className={s.container}>
      <div className={s.wrap}>
        <div className={s.header}>
          <h1 className={s.title}>Notifications</h1>
        </div>
        <div className={s.card}>
          <ul>
            {items.map(n => (
              <li key={n.id} className={s.small}><strong>{n.type.toUpperCase()}</strong>: {n.text} <span className={s.muted}>({n.date})</span></li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
