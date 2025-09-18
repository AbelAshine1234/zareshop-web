import React, { useEffect, useRef, useState } from 'react'
import { NavLink, Outlet, useNavigate, Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import styles from './VendorLayout.module.scss'
import { logout as doLogout, fetchMe, selectIsVendorApproved } from '../../features/auth/authSlice'

export default function VendorLayout() {
  const token = useSelector((s) => s.auth?.token)
  const me = useSelector((s) => s.auth?.user)
  const isApproved = useSelector(selectIsVendorApproved)
  const [displayName, setDisplayName] = useState('Vendor')
  const [openMenu, setOpenMenu] = useState(false)
  const [notifCount, setNotifCount] = useState(3)
  const menuRef = useRef(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    let active = true
    const load = async () => {
      try {
        if (!token) return
        const res = await dispatch(fetchMe()).unwrap()
        if (!active) return
        const name = res?.name || res?.user?.name || res?.username || 'Vendor'
        setDisplayName(name)
      } catch (_) {
        // ignore; gating will handle redirect below
      }
    }
    load()
    return () => { active = false }
  }, [token, dispatch])

  useEffect(() => {
    const onClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setOpenMenu(false)
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  // Live status check: if admin changes status while browsing, react quickly
  useEffect(() => {
    if (!token || !isApproved) return
    let canceled = false
    const check = async () => {
      try {
        const res = await dispatch(fetchMe()).unwrap()
        if (canceled) return
        const v = res?.vendor || res?.user?.vendor || {}
        const ok = Boolean((res?.vendorStatus === 'approved') || (v?.isApproved === true && v?.status === true) || (v?.is_approved === true && v?.status === true))
        if (!ok) navigate('/vendor/wait', { replace: true })
      } catch (_) {
        if (!canceled) navigate('/vendor/wait', { replace: true })
      }
    }
    const id = setInterval(check, 30000) // 30s
    const onVis = () => { if (document.visibilityState === 'visible') check() }
    document.addEventListener('visibilitychange', onVis)
    return () => { canceled = true; clearInterval(id); document.removeEventListener('visibilitychange', onVis) }
  }, [isApproved, token, navigate, dispatch])

  const handleLogout = () => {
    dispatch(doLogout())
    setOpenMenu(false)
    navigate('/')
  }

  if (!token) {
    return <Navigate to="/vendor/login" replace />
  }

  // Gate by approval. While user not loaded yet, render nothing (avoid flash)
  if (!me) return null
  if (!isApproved) return <Navigate to="/vendor/wait" replace />

  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        <div className={styles.brand}>
          <span>Zareshop</span>
        </div>
        <nav className={styles.nav}>
          <NavLink to="/vendor/analytics" className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}>
            <span>📊</span><span>Analytics</span>
          </NavLink>
          <NavLink to="/vendor/products" className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}>
            <span>🛍️</span><span>Products</span>
          </NavLink>
          <NavLink to="/vendor/orders" className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}>
            <span>📦</span><span>Orders</span>
          </NavLink>
          <NavLink to="/vendor/reviews" className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}>
            <span>⭐</span><span>Reviews</span>
          </NavLink>
          <NavLink to="/vendor/shipping" className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}>
            <span>📌</span><span>Shipping</span>
          </NavLink>
          <NavLink to="/vendor/payment" className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}>
            <span>💳</span><span>Payment</span>
          </NavLink>
          <NavLink to="/vendor/sales" className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}>
            <span>💰</span><span>Sales</span>
          </NavLink>
          <NavLink to="/vendor/finance" className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}>
            <span>🏦</span><span>Finance</span>
          </NavLink>
          <NavLink to="/vendor/notifications" className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}>
            <span>🔔</span><span>Notifications</span>
          </NavLink>
          <NavLink to="/vendor/account" className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}>
            <span>👤</span><span>Account</span>
          </NavLink>
        </nav>
      </aside>
      <div className={styles.content}>
        <div className={styles.topbar}>
          <div className={styles.topbarTitle}>Vendor Dashboard</div>
          <div className={styles.topRight}>
            <div className={styles.bell} title="Notifications" onClick={() => navigate('/vendor/notifications')}>
              <span>🔔</span>
              {notifCount > 0 && <span className={styles.badge}>{notifCount}</span>}
            </div>
            <div className={styles.userButton} onClick={() => setOpenMenu(v => !v)} ref={menuRef}>
              <div className={`${styles.statusDot} ${token ? styles.dotLogged : styles.dotGuest}`} />
              <span>{displayName}</span>
              {openMenu && (
                <div className={styles.dropdown}>
                  <button className={styles.menuItem} onClick={() => { setOpenMenu(false); navigate('/vendor/account') }}>Account</button>
                  <button className={styles.menuItem} onClick={handleLogout}>Logout</button>
                </div>
              )}
            </div>
          </div>
        </div>
        <main className={styles.main}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
