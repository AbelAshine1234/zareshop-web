import React, { useEffect, useState } from 'react'
import s from './VendorAnalytics.module.scss'

export default function VendorFinance() {
  const [cashouts, setCashouts] = useState([])
  const [funds, setFunds] = useState([])
  const [txns, setTxns] = useState([])

  useEffect(() => {
    setCashouts([
      { id: 'CO-110', amount: 7500, method: 'Telebirr', status: 'processed', date: '07/07/2025' },
      { id: 'CO-109', amount: 4200, method: 'CBE Birr', status: 'pending', date: '06/07/2025' },
      { id: 'CO-108', amount: 2800, method: 'Telebirr', status: 'rejected', date: '04/07/2025' },
    ])
    setFunds([
      { id: 'FD-021', type: 'payout', source: 'Telebirr', amount: 5100, date: '06/07/2025' },
      { id: 'FD-020', type: 'sale', source: 'Order #2005', amount: 3150, date: '06/07/2025' },
      { id: 'FD-019', type: 'refund', source: 'Order #1998', amount: -450, date: '05/07/2025' },
    ])
    setTxns([
      { id: 'TX-901', ref: 'TB-3F2A', channel: 'Telebirr', amount: 350, status: 'success', date: '06/07/2025' },
      { id: 'TX-900', ref: 'CBE-9Z21', channel: 'CBE Birr', amount: 1250, status: 'success', date: '06/07/2025' },
      { id: 'TX-899', ref: 'TB-1AA0', channel: 'Telebirr', amount: 2200, status: 'failed', date: '05/07/2025' },
    ])
  }, [])

  return (
    <section className={s.container}>
      <div className={s.wrap}>
        <div className={s.header}>
          <h1 className={s.title}>Finance</h1>
          <div className={s.actions}>
            <button className={`${s.btn} ${s.btnPrimary}`}>Request Cashout</button>
          </div>
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
          <h2 className={s.sectionTitle}>Funds History</h2>
          <div className={s.tableWrap}>
            <table className={s.table}>
              <thead>
                <tr className={s.theadRow}>
                  <th className={s.th}>ID</th>
                  <th className={s.th}>Type</th>
                  <th className={s.th}>Source</th>
                  <th className={s.th}>Amount (ETB)</th>
                  <th className={s.th}>Date</th>
                </tr>
              </thead>
              <tbody>
                {funds.map(f => (
                  <tr key={f.id} className={s.tbodyRow}>
                    <td className={s.td}>{f.id}</td>
                    <td className={s.td}>{f.type}</td>
                    <td className={s.td}>{f.source}</td>
                    <td className={s.td}>{f.amount.toLocaleString()}</td>
                    <td className={s.td}>{f.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className={s.card}>
          <h2 className={s.sectionTitle}>Transaction History</h2>
          <div className={s.tableWrap}>
            <table className={s.table}>
              <thead>
                <tr className={s.theadRow}>
                  <th className={s.th}>ID</th>
                  <th className={s.th}>Reference</th>
                  <th className={s.th}>Channel</th>
                  <th className={s.th}>Amount (ETB)</th>
                  <th className={s.th}>Status</th>
                  <th className={s.th}>Date</th>
                </tr>
              </thead>
              <tbody>
                {txns.map(t => (
                  <tr key={t.id} className={s.tbodyRow}>
                    <td className={s.td}>{t.id}</td>
                    <td className={s.td}>{t.ref}</td>
                    <td className={s.td}>{t.channel}</td>
                    <td className={s.td}>{t.amount.toLocaleString()}</td>
                    <td className={s.td}>{t.status}</td>
                    <td className={s.td}>{t.date}</td>
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
