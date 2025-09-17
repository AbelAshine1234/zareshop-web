import React, { useState } from 'react'
import styles from './Auth.module.scss'
import { formatEthiopianPhone, validateEthiopianPhone } from '../utils/phoneUtils'

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneLocal: '', // Local phone number without country code
    password: ''
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, '') // Only allow digits
    if (value.length <= 9) { // Ethiopian numbers are 9 digits after removing country code
      setFormData(prev => ({ ...prev, phoneLocal: value }))
      // Clear phone error when user starts typing
      if (errors.phone) {
        setErrors(prev => ({ ...prev, phone: '' }))
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

    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your name'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.phoneLocal) {
      newErrors.phone = 'Please enter your phone number'
    } else if (!validateEthiopianPhone(formData.phoneLocal)) {
      newErrors.phone = 'Please enter a valid 9-digit Ethiopian phone number starting with 9'
    }

    if (!formData.password) {
      newErrors.password = 'Please enter a password'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long'
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
      // Format the phone number with +251
      const formattedPhone = formatEthiopianPhone(formData.phoneLocal)

      // Prepare registration data
      const registrationData = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone_number: formattedPhone, // This will be +251XXXXXXXXX
        password: formData.password
      }

      console.log('Registration data:', registrationData)

      // TODO: Replace with actual API call
      // const response = await api.post('/auth/register', registrationData)

      // For now, just show success message
      alert(`Registration successful! Phone formatted as: ${formattedPhone}`)

    } catch (error) {
      console.error('Registration error:', error)
      setErrors({ general: 'Registration failed. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="container" style={{ display: 'flex', justifyContent: 'center' }}>
      <div className={styles.wrap}>
        <div className={styles.card}>
          <h1 className={styles.title}>Create Account</h1>
          <form onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <input
                className={styles.input}
                placeholder="Name"
                value={formData.name}
                onChange={handleInputChange('name')}
              />
              {errors.name && <div className={styles.error}>{errors.name}</div>}
            </div>

            <div className={styles.inputGroup}>
              <input
                className={styles.input}
                placeholder="Email"
                type="email"
                value={formData.email}
                onChange={handleInputChange('email')}
              />
              {errors.email && <div className={styles.error}>{errors.email}</div>}
            </div>

            <div className={styles.inputGroup}>
              <div className={styles.phoneInputGroup}>
                <span className={styles.prefix}>+251</span>
                <input
                  className={`${styles.input} ${styles.phoneInput}`}
                  placeholder="9XXXXXXXX"
                  value={formData.phoneLocal}
                  onChange={handlePhoneChange}
                  maxLength={9}
                />
              </div>
              <div className={styles.hint}>Enter your 9-digit phone number (starting with 9). +251 will be added automatically.</div>
              {errors.phone && <div className={styles.error}>{errors.phone}</div>}
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
              <a href="/login" className={styles.link}>Have an account? Login</a>
              <button
                className="button buttonPrimary"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Registering...' : 'Register'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
