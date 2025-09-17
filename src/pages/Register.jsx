import React from 'react'
import styles from './Auth.module.scss'

export default function Register() {
  return (
    <section className="container" style={{ display: 'flex', justifyContent: 'center' }}>
      <div className={styles.wrap}>
        <div className={styles.card}>
          <h1 className={styles.title}>Create Account</h1>
          <input className={styles.input} placeholder="Name" />
          <input className={styles.input} placeholder="Email" />
          <input className={styles.input} placeholder="Phone" />
          <input className={styles.input} placeholder="Password" type="password" />
          <div className={styles.actions}>
            <a href="/login" className={styles.link}>Have an account? Login</a>
            <button className="button buttonPrimary">Register</button>
          </div>
        </div>
      </div>
    </section>
  )
}
