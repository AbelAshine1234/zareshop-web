import React from 'react'
import { Outlet, NavLink, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { FaStore, FaBox, FaPlus, FaChartLine, FaCog, FaSignOutAlt } from 'react-icons/fa'
import styles from './VendorLayout.module.scss'

export default function VendorLayout() {
  const location = useLocation()
  const auth = useSelector(state => state.auth)
  
  const isActive = (path) => location.pathname === path

  return (
    <div className={styles.vendorLayout}>
      {/* Vendor Header */}
      <header className={styles.vendorHeader}>
        <div className="container">
          <div className={styles.headerContent}>
            <div className={styles.brandSection}>
              <FaStore className={styles.brandIcon} />
              <div className={styles.brandInfo}>
                <h1 className={styles.brandTitle}>Zareshop Vendor</h1>
                <p className={styles.brandSubtitle}>Supplier Dashboard</p>
              </div>
            </div>
            
            <div className={styles.userSection}>
              <div className={styles.userInfo}>
                <div className={styles.userAvatar}>
                  {auth?.user?.name?.charAt(0) || 'V'}
                </div>
                <div className={styles.userDetails}>
                  <span className={styles.userName}>{auth?.user?.name || 'Vendor'}</span>
                  <span className={styles.userStatus}>Verified Supplier</span>
                </div>
              </div>
              <button className={styles.logoutBtn}>
                <FaSignOutAlt />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className={styles.vendorNav}>
        <div className="container">
          <div className={styles.navContent}>
            <NavLink 
              to="/vendor" 
              className={`${styles.navItem} ${isActive('/vendor') ? styles.active : ''}`}
            >
              <FaChartLine className={styles.navIcon} />
              <span>Dashboard</span>
            </NavLink>
            
            <NavLink 
              to="/vendor/products" 
              className={`${styles.navItem} ${isActive('/vendor/products') ? styles.active : ''}`}
            >
              <FaBox className={styles.navIcon} />
              <span>Products</span>
            </NavLink>
            
            <NavLink 
              to="/vendor/products/create" 
              className={`${styles.navItem} ${isActive('/vendor/products/create') ? styles.active : ''}`}
            >
              <FaPlus className={styles.navIcon} />
              <span>Add Product</span>
            </NavLink>
            
            <NavLink 
              to="/vendor/settings" 
              className={`${styles.navItem} ${isActive('/vendor/settings') ? styles.active : ''}`}
            >
              <FaCog className={styles.navIcon} />
              <span>Settings</span>
            </NavLink>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className={styles.vendorMain}>
        <div className="container">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
