import React, { useEffect, useState } from 'react'
import s from './VendorAnalytics.module.scss'

export default function VendorPayment() {
  const [methods, setMethods] = useState([])
  useEffect(() => {
    setMethods([
      { id: 'PM-01', type: 'Telebirr', account: '09******12', default: true, added: '02/07/2025' },
      { id: 'PM-02', type: 'CBE Birr', account: '1000-****-****-23', default: false, added: '01/07/2025' },
    ])
  }, [])

  return (
    <section className={s.container}>
      <div className={s.wrap}>
        <div className={s.header}>
          <h1 className={s.title}>Payment Methods</h1>
          <div className={s.actions}>
            <button className={`${s.btn} ${s.btnPrimary}`}>Add Method</button>
          </div>
        </div>
        <div className={s.card}>
          <div className={s.tableWrap}>
            <table className={s.table}>
              <thead>
                <tr className={s.theadRow}>
                  <th className={s.th}>ID</th>
                  <th className={s.th}>Type</th>
                  <th className={s.th}>Account</th>
                  <th className={s.th}>Default</th>
                  <th className={s.th}>Added</th>
                </tr>
              </thead>
              <tbody>
                {methods.map(m => (
                  <tr key={m.id} className={s.tbodyRow}>
                    <td className={s.td}>{m.id}</td>
                    <td className={s.td}>{m.type}</td>
                    <td className={s.td}>{m.account}</td>
                    <td className={s.td}>{m.default ? 'Yes' : 'No'}</td>
                    <td className={s.td}>{m.added}</td>
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
