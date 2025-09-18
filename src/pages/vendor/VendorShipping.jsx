import React, { useEffect, useState } from 'react'
import s from './VendorAnalytics.module.scss'

export default function VendorShipping() {
  const [addresses, setAddresses] = useState([])
  useEffect(() => {
    setAddresses([
      { id: 'SH-01', label: 'Main Warehouse', city: 'Addis Ababa', area: 'Bole', phone: '+251 911 000000', default: true },
      { id: 'SH-02', label: 'Branch', city: 'Adama', area: 'City Center', phone: '+251 912 111111', default: false },
    ])
  }, [])

  return (
    <section className={s.container}>
      <div className={s.wrap}>
        <div className={s.header}>
          <h1 className={s.title}>Shipping Addresses</h1>
          <div className={s.actions}>
            <button className={`${s.btn} ${s.btnPrimary}`}>Add Address</button>
          </div>
        </div>
        <div className={s.card}>
          <div className={s.tableWrap}>
            <table className={s.table}>
              <thead>
                <tr className={s.theadRow}>
                  <th className={s.th}>ID</th>
                  <th className={s.th}>Label</th>
                  <th className={s.th}>City</th>
                  <th className={s.th}>Area</th>
                  <th className={s.th}>Phone</th>
                  <th className={s.th}>Default</th>
                </tr>
              </thead>
              <tbody>
                {addresses.map(a => (
                  <tr key={a.id} className={s.tbodyRow}>
                    <td className={s.td}>{a.id}</td>
                    <td className={s.td}>{a.label}</td>
                    <td className={s.td}>{a.city}</td>
                    <td className={s.td}>{a.area}</td>
                    <td className={s.td}>{a.phone}</td>
                    <td className={s.td}>{a.default ? 'Yes' : 'No'}</td>
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
