import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import styles from './Auth.module.scss'
import { login as loginThunk } from '../features/auth/authSlice'
import VendorLoginForm from './components/VendorLoginForm'

export default function VendorAccount() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [isPhoneLogin] = useState(true) // Force phone-only login
  const [error, setError] = useState('')

  const isLoggedIn = !!(auth.token || localStorage.getItem('authToken'))

  const handleIdentifierChange = (e) => {
    // Treat identifier strictly as local phone input (9 digits starting with 9)
    const val = e.target.value.replace(/\D/g, '').slice(0, 9)
    setIdentifier(val)
    if (error) setError('')
  }

  const handlePhoneChange = (e) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 9)
    setIdentifier(val)
    if (error) setError('')
  }

  const login = async (e) => {
    e.preventDefault()
    setError('')
    if (!password) { setError('Please enter password'); return }
    dispatch(loginThunk({ identifier, password, isPhone: true }))
  }

  useEffect(() => {
    if (auth.error) setError(auth.error)
  }, [auth.error])

  useEffect(() => {
    if (auth.token) navigate('/vendor/analytics')
  }, [auth.token, navigate])

  
  if (isLoggedIn) {
    return (
      <section className="container" style={{ display: 'flex', justifyContent: 'center' }}>
        <div className={styles.wrap}>
          <div className={styles.card}>
            <h1 className={styles.title}>Vendor Account</h1>
            <p className={styles.small} style={{ marginBottom: 16 }}>You are logged in.</p>
            <div className={styles.actions}>
              <button className="button buttonPrimary" onClick={() => navigate('/vendor/analytics')}>Go to Analytics</button>
              <button className="button buttonGhost" onClick={() => { localStorage.removeItem('authToken'); navigate('/vendor') }}>Logout</button>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <>
      <section className="container" style={{ display: 'flex', justifyContent: 'center' }}>
        <div className={styles.wrap}>
          <div className={styles.card}>
            <h1 className={styles.title}>Vendor Account</h1>
            <VendorLoginForm
              identifier={identifier}
              isPhoneLogin={isPhoneLogin}
              password={password}
              onIdentifierChange={handleIdentifierChange}
              onPhoneChange={handlePhoneChange}
              onPasswordChange={setPassword}
              loading={auth.loading}
              error={error}
              onSubmit={login}
            >
              <div className={styles.actions}>
                <Link to="/vendor/register" className={styles.link}>Register as Vendor</Link>
                <Link to="/vendor/forgot" className={styles.link} style={{ marginLeft: 8 }}>Forgot password?</Link>
                <button className="button buttonPrimary" type="submit" disabled={auth.loading}>
                  {auth.loading ? 'Logging in...' : 'Login'}
                </button>
              </div>
            </VendorLoginForm>
          </div>
        </div>
      </section>
      
    </>
  )
}
