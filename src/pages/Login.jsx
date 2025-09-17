import React from 'react'
import styles from './Auth.module.scss'

export default function Login() {
  return (
    <section className="container" style={{ display: 'flex', justifyContent: 'center' }}>
      <div className={styles.wrap}>
        <div className={styles.card}>
          <h1 className={styles.title}>Login</h1>
          <input className={styles.input} placeholder="Email or Phone" />
          <input className={styles.input} placeholder="Password" type="password" />
          <div className={styles.actions}>
            <a href="/register" className={styles.link}>Create account</a>
            <button className="button buttonPrimary">Login</button>
          </div>
        </div>
      </div>
    </section>
  )
}
