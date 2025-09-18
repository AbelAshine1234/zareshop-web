import React from 'react'
import styles from '../Auth.module.scss'

export default function VendorLoginForm({
  identifier,
  isPhoneLogin,
  password,
  onIdentifierChange,
  onPhoneChange,
  onPasswordChange,
  loading,
  error,
  onSubmit,
  children,
}) {
  return (
    <form onSubmit={onSubmit}>
      <div className={styles.inputGroup}>
        {isPhoneLogin ? (
          <div className={styles.phoneInputGroup}>
            <span className={styles.prefix}>+251</span>
            <input
              className={`${styles.input} ${styles.phoneInput}`}
              placeholder="9XXXXXXXX"
              value={identifier}
              onChange={onPhoneChange}
              maxLength={9}
            />
          </div>
        ) : (
          <input
            className={styles.input}
            placeholder="Email or start with 9 for phone login"
            value={identifier}
            onChange={onIdentifierChange}
          />
        )}
      </div>

      <div className={styles.inputGroup}>
        <input
          className={styles.input}
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => onPasswordChange(e.target.value)}
        />
      </div>

      {error && <div className={styles.error}>{error}</div>}

      {children}
    </form>
  )
}
