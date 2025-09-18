import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, NavLink } from 'react-router-dom'
import VendorLoginForm from '../components/VendorLoginForm.jsx'
import { login, clearAuthMessages } from '../../features/auth/authSlice'
import styles from '../Auth.module.scss'

export default function VendorLogin() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading, error, token } = useSelector(s => s.auth)

  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [isPhoneLogin, setIsPhoneLogin] = useState(false)

  useEffect(() => {
    // If already logged in, go to dashboard
    const localToken = typeof window !== 'undefined' && localStorage.getItem('authToken')
    if (token || localToken) navigate('/vendor')
  }, [token, navigate])

  useEffect(() => () => { dispatch(clearAuthMessages()) }, [dispatch])

  const onIdentifierChange = (e) => {
    const v = e.target.value
    setIdentifier(v)
    // Simple heuristic: if starts with 9 and numeric, treat as phone
    if (/^\d/.test(v) && v.startsWith('9')) setIsPhoneLogin(true)
    else setIsPhoneLogin(false)
  }

  const onPhoneChange = (e) => {
    const v = e.target.value.replace(/[^\d]/g, '')
    setIdentifier(v)
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const payload = { identifier: identifier.trim(), password, isPhone: isPhoneLogin }
    const res = await dispatch(login(payload))
    if (res.meta.requestStatus === 'fulfilled') {
      navigate('/vendor')
    }
  }

  return (
    <section className="container">
      <div className={styles.wrap}>
        <div className={styles.card}>
          <h1 className={styles.title}>Vendor Login</h1>
          <VendorLoginForm
          identifier={identifier}
          isPhoneLogin={isPhoneLogin}
          password={password}
          onIdentifierChange={onIdentifierChange}
          onPhoneChange={onPhoneChange}
          onPasswordChange={setPassword}
          loading={loading}
          error={error}
          onSubmit={onSubmit}
          >
            <div className={styles.actions}>
              <button className="button buttonPrimary" type="submit" disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
              </button>
              <NavLink to="/vendor/forgot" className="button buttonGhost">Forgot Password?</NavLink>
            </div>
          </VendorLoginForm>
        </div>
      </div>
    </section>
  )
}
