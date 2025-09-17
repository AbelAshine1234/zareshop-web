import React from 'react'
import styles from './Checkout.module.scss'

export default function Checkout() {
  return (
    <section className={`container ${styles.wrap}`}>
      <div className={styles.card}>
        <h2 className={styles.h2}>Shipping Details</h2>
        <div className={styles.row}>
          <input className={styles.input} placeholder="Full name" />
          <input className={styles.input} placeholder="Phone" />
        </div>
        <div className={styles.row}>
          <input className={styles.input} placeholder="City" />
          <input className={styles.input} placeholder="Subcity/Zone" />
        </div>
        <input className={styles.input} placeholder="Address detail" style={{ marginTop: 10 }} />
      </div>

      <div className={styles.card}>
        <h2 className={styles.h2}>Payment</h2>
        <div className={styles.payRow}>
          <button className="button buttonGhost">Telebirr</button>
          <button className="button buttonGhost">CBE Birr</button>
        </div>
        <div className={styles.total}>
          <div>Total</div>
          <div>ETB 3,000</div>
        </div>
        <button className="button buttonPrimary" style={{ marginTop: 12 }}>Pay Now</button>
      </div>
    </section>
  )
}
