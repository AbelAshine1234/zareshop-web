import React from 'react'
import styles from './Cart.module.scss'

export default function Cart() {
  const items = [
    { id: '1', name: 'Leather Bag', price: 1500, qty: 1, img: 'https://images.unsplash.com/photo-1547949003-9792a18a2601?q=80&w=600&auto=format&fit=crop' },
    { id: '2', name: 'Organic Coffee', price: 450, qty: 2, img: 'https://images.unsplash.com/photo-1507133750040-4a8f5702157a?q=80&w=600&auto=format&fit=crop' },
  ]
  const total = items.reduce((s,i)=> s + i.price * i.qty, 0)

  return (
    <section className={`container ${styles.wrapper}`}>
      <h1 className={styles.title}>Your Cart</h1>
      {items.map(it => (
        <div key={it.id} className={styles.item}>
          <img src={it.img} alt={it.name} style={{ width: 72, height: 72, objectFit: 'cover', borderRadius: 12 }} />
          <div>
            <div className={styles.name}>{it.name}</div>
            <div className={styles.price}>ETB {it.price} × {it.qty}</div>
          </div>
          <button className="button buttonGhost">Remove</button>
        </div>
      ))}

      <div className={styles.summary}>
        <div>Total</div>
        <div className={styles.price}>ETB {total}</div>
      </div>
      <div style={{ marginTop: 12 }}>
        <a href="/checkout" className="button buttonPrimary">Proceed to Checkout</a>
      </div>
    </section>
  )
}
