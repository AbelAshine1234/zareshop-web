import React, { useEffect, useState } from 'react'
import s from './VendorAnalytics.module.scss'

export default function VendorReviews() {
  const [reviews, setReviews] = useState([])
  useEffect(() => {
    setReviews([
      { id: 'R-301', product: 'Leather Bag', rating: 5, comment: 'Amazing quality and finish.', user: 'Hanna', date: '06/07/2025' },
      { id: 'R-300', product: 'Running Shoes', rating: 4, comment: 'Very comfy for daily runs.', user: 'Bini', date: '05/07/2025' },
      { id: 'R-299', product: 'Cotton T-Shirt', rating: 3, comment: 'Good fabric but tight fit.', user: 'Sol', date: '04/07/2025' },
    ])
  }, [])
  return (
    <section className={s.container}>
      <div className={s.wrap}>
        <div className={s.header}>
          <h1 className={s.title}>Reviews</h1>
        </div>
        <div className={s.card}>
          <div className={s.tableWrap}>
            <table className={s.table}>
              <thead>
                <tr className={s.theadRow}>
                  <th className={s.th}>ID</th>
                  <th className={s.th}>Product</th>
                  <th className={s.th}>Rating</th>
                  <th className={s.th}>Comment</th>
                  <th className={s.th}>User</th>
                  <th className={s.th}>Date</th>
                </tr>
              </thead>
              <tbody>
                {reviews.map(r => (
                  <tr key={r.id} className={s.tbodyRow}>
                    <td className={s.td}>{r.id}</td>
                    <td className={s.td}>{r.product}</td>
                    <td className={s.td}>{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</td>
                    <td className={s.td}>{r.comment}</td>
                    <td className={s.td}>{r.user}</td>
                    <td className={s.td}>{r.date}</td>
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
