import React, { useEffect, useState } from 'react'
import s from './VendorAnalytics.module.scss'

export default function VendorSales() {
  const [series, setSeries] = useState([])
  const [overview, setOverview] = useState({ today: 0, week: 0, month: 0 })

  useEffect(() => {
    setOverview({ today: 1450, week: 12890, month: 50430 })
    setSeries([
      { day: 'Mon', value: 1200 },
      { day: 'Tue', value: 2400 },
      { day: 'Wed', value: 900 },
      { day: 'Thu', value: 3100 },
      { day: 'Fri', value: 1800 },
      { day: 'Sat', value: 3650 },
      { day: 'Sun', value: 2100 },
    ])
  }, [])

  const max = Math.max(...series.map(s => s.value), 1)

  return (
    <section className={s.container}>
      <div className={s.wrap}>
        <div className={s.header}>
          <h1 className={s.title}>Sales</h1>
        </div>
        <div className={s.card}>
          <div className={s.gridStats}>
            <div className={s.statCard}>
              <div className={s.statLabel}>Today</div>
              <div className={s.statValue}>{overview.today.toLocaleString()} ETB</div>
            </div>
            <div className={s.statCard}>
              <div className={s.statLabel}>This Week</div>
              <div className={s.statValue}>{overview.week.toLocaleString()} ETB</div>
            </div>
            <div className={s.statCard}>
              <div className={s.statLabel}>This Month</div>
              <div className={s.statValue}>{overview.month.toLocaleString()} ETB</div>
            </div>
          </div>
        </div>

        <div className={s.card}>
          <h2 className={s.sectionTitle}>Last 7 Days</h2>
          <div className="chart">
            <svg className={s.chart} viewBox="0 0 320 180" preserveAspectRatio="none">
              {series.map((p, i) => {
                const h = Math.max(8, Math.round((p.value / max) * 150))
                const x = 20 + i * 42
                const y = 160 - h
                return (
                  <g key={p.day}>
                    <rect x={x} y={y} width="26" height={h} rx="6" fill="#10b981" />
                    <text x={x + 13} y={172} textAnchor="middle" fontSize="10" fill="#6b7280">{p.day}</text>
                  </g>
                )
              })}
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}
