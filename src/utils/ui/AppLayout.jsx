import React from 'react'
import { Outlet, NavLink, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { FaShoppingBag } from 'react-icons/fa'
import styles from './AppLayout.module.scss'
import '../../styles/global.scss'
import LoadingOverlay from './LoadingOverlay'

export default function AppLayout() {
  const auth = useSelector(state => state.auth)
  const isVendorLoggedIn = !!(auth?.token || (typeof window !== 'undefined' && localStorage.getItem('authToken')))
  const location = useLocation()
  const isVendorPath = location.pathname.startsWith('/vendor')
  const hideChrome = isVendorLoggedIn && isVendorPath
  return (
    <div className={styles.app}>
      <LoadingOverlay />
      {!hideChrome && (
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
              {!isVendorLoggedIn && (
                <>
                  <NavLink to="/products" className="button buttonGhost">Products</NavLink>
                  <NavLink to="/vendors/buy" className="button buttonGhost">Buy from Vendors</NavLink>
                  <NavLink to="/vendor" className="button buttonGhost">Vendor Account</NavLink>
                  <NavLink to="/cart" className="button buttonPrimary">Cart</NavLink>
                </>
              )}
            </nav>
          </div>
        </header>
      )}

      <main className={styles.main}>
        <Outlet />
      </main>

      {!hideChrome && (
        <footer className={styles.footer}>
          <div className={`container ${styles.footerInner}`}>
            <p>© {new Date().getFullYear()} Zareshop. All rights reserved.</p>
            <p className="textMuted">Made for Ethiopia • ETB • Am/En</p>
          </div>
        </footer>
      )}
    </div>
  )
}
