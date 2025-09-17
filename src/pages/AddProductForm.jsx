import React from 'react'
import styles from './AddProductForm.module.scss'

export default function AddProductForm() {
  return (
    <section className="container" style={{ display: 'flex', justifyContent: 'center' }}>
      <div className={styles.wrap}>
        <div className={styles.card}>
          <h1 className={styles.title}>Add New Product</h1>
          <div className={styles.row}>
            <input className={styles.input} placeholder="Product name" />
            <input className={styles.input} placeholder="Price (ETB)" type="number" />
          </div>
          <div className={styles.row}>
            <input className={styles.input} placeholder="Category" />
            <input className={styles.input} placeholder="Stock" type="number" />
          </div>
          <textarea className={styles.textarea} placeholder="Description" />
          <input className={styles.input} placeholder="Image URL" />
          <div className={styles.actions}>
            <a href="/admin" className="button buttonGhost">Cancel</a>
            <button className="button buttonPrimary">Create Product</button>
          </div>
        </div>
      </div>
    </section>
  )
}
