import React, { useState } from 'react'
import styles from './Auth.module.scss'
import { formatEthiopianPhone, validateEthiopianPhone } from '../utils/phoneUtils'

export default function Login() {
  const [formData, setFormData] = useState({
    identifier: '', // Can be email or phoneLocal
    password: '',
    isPhoneLogin: false
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleIdentifierChange = (e) => {
    const value = e.target.value
    setFormData(prev => ({ ...prev, identifier: value }))

    // Determine if this looks like a phone number (starts with 9 and is numeric)
    const looksLikePhone = /^9\d*$/.test(value) && value.length <= 9
    setFormData(prev => ({ ...prev, isPhoneLogin: looksLikePhone }))

    // Clear errors when user types
    if (errors.identifier) {
      setErrors(prev => ({ ...prev, identifier: '' }))
    }
  }

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, '') // Only allow digits
    if (value.length <= 9) {
      setFormData(prev => ({ ...prev, identifier: value, isPhoneLogin: true }))
      // Clear phone error when user starts typing
      if (errors.identifier) {
        setErrors(prev => ({ ...prev, identifier: '' }))
      }
    }
  }

  const handleInputChange = (field) => (e) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }))
    // Clear field error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.identifier.trim()) {
      newErrors.identifier = 'Please enter your email or phone number'
    } else if (formData.isPhoneLogin) {
      if (!validateEthiopianPhone(formData.identifier)) {
        newErrors.identifier = 'Please enter a valid 9-digit Ethiopian phone number starting with 9'
      }
    } else {
      // Email validation
      const emailRegex = /\S+@\S+\.\S+/
      if (!emailRegex.test(formData.identifier)) {
        newErrors.identifier = 'Please enter a valid email address'
      }
    }

    if (!formData.password) {
      newErrors.password = 'Please enter your password'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      let loginData = { password: formData.password }

      if (formData.isPhoneLogin) {
        // Format phone number with +251
        const formattedPhone = formatEthiopianPhone(formData.identifier)
        loginData.phone_number = formattedPhone

        console.log('Phone login data:', loginData)
      } else {
        loginData.email = formData.identifier.trim()
        console.log('Email login data:', loginData)
      }

      // TODO: Replace with actual API call
      // const response = await api.post('/auth/login', loginData)

      // For now, just show success message
      alert(`Login successful! ${formData.isPhoneLogin ? `Phone: ${formatEthiopianPhone(formData.identifier)}` : `Email: ${formData.identifier}`}`)

    } catch (error) {
      console.error('Login error:', error)
      setErrors({ general: 'Login failed. Please check your credentials and try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="container" style={{ display: 'flex', justifyContent: 'center' }}>
      <div className={styles.wrap}>
        <div className={styles.card}>
          <h1 className={styles.title}>Login</h1>
          <form onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              {formData.isPhoneLogin ? (
                <div className={styles.phoneInputGroup}>
                  <span className={styles.prefix}>+251</span>
                  <input
                    className={`${styles.input} ${styles.phoneInput}`}
                    placeholder="9XXXXXXXX"
                    value={formData.identifier}
                    onChange={handlePhoneChange}
                    maxLength={9}
                  />
                </div>
              ) : (
                <input
                  className={styles.input}
                  placeholder="Email or Phone"
                  value={formData.identifier}
                  onChange={handleIdentifierChange}
                />
              )}
              <div className={styles.hint}>
                {formData.isPhoneLogin
                  ? 'Enter your 9-digit phone number (starting with 9). +251 will be added automatically.'
                  : 'Enter your email address or start with 9 for phone login'
                }
              </div>
              {errors.identifier && <div className={styles.error}>{errors.identifier}</div>}
            </div>

            <div className={styles.inputGroup}>
              <input
                className={styles.input}
                placeholder="Password"
                type="password"
                value={formData.password}
                onChange={handleInputChange('password')}
              />
              {errors.password && <div className={styles.error}>{errors.password}</div>}
            </div>

            {errors.general && <div className={styles.error}>{errors.general}</div>}

            <div className={styles.actions}>
              <a href="/register" className={styles.link}>Create account</a>
              <button
                className="button buttonPrimary"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Logging in...' : 'Login'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
