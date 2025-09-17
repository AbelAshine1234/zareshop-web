import React from 'react'
import { Outlet, NavLink } from 'react-router-dom'
import { FaShoppingBag } from 'react-icons/fa'
import styles from './AppLayout.module.scss'
import '../styles/global.scss'

export default function AppLayout() {
  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <div className={`container ${styles.navbar}`}>
          <NavLink to="/" className={styles.brand}>
            <span className={styles.brandIcon}>
              <FaShoppingBag />
            </span>
            <span style={{ fontSize: 20 }}>Zareshop</span>
          </NavLink>

          <nav className={styles.navActions}>
            <NavLink to="/" className="button buttonGhost">Home</NavLink>
            <NavLink to="/products" className="button buttonGhost">Products</NavLink>
            <NavLink to="/vendor" className="button buttonGhost">Vendor Account</NavLink>
            <NavLink to="/cart" className="button buttonPrimary">Cart</NavLink>
          </nav>
        </div>
      </header>

      <main className={styles.main}>
        <Outlet />
      </main>

      <footer className={styles.footer}>
        <div className={`container ${styles.footerInner}`}>
          <p>© {new Date().getFullYear()} Zareshop. All rights reserved.</p>
          <p className="textMuted">Made for Ethiopia • ETB • Am/En</p>
        </div>
      </footer>
    </div>
  )
}
