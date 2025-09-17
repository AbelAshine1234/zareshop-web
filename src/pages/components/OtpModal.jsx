import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from '../VendorRegister.module.scss'
import { setOwnerField, verifyOtp, resendOtp } from '../../features/vendor/vendorSlice'

export default function OtpModal({ open, onClose }) {
  const dispatch = useDispatch()
  const owner = useSelector(state => state.vendor.owner)
  const [otpInput, setOtpInput] = useState('')

  const handleVerify = async () => {
    if (!otpInput.trim()) {
      dispatch(setOwnerField({ error: 'Please enter verification code' }))
      return
    }

    dispatch(setOwnerField({ code: otpInput }))

    try {
      await dispatch(verifyOtp()).unwrap()
      onClose() // Close modal on success
    } catch (error) {
      // Error is handled in slice state
    }
  }

  const handleResend = async () => {
    try {
      await dispatch(resendOtp()).unwrap()
      setOtpInput('') // Clear input on resend
    } catch (error) {
      // Error is handled in slice state
    }
  }

  if (!open) return null

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal} role="dialog" aria-modal="true" aria-label="Enter verification code">
        <div className={styles.modalHeader}>Verify Your Phone</div>
        <div className={styles.modalBody}>
          <div className={styles.form}>
            <div className={styles.formGroup}>
              <p className={styles.small}>
                We've sent a 6-digit verification code to your phone number. Please enter it below to verify your account.
              </p>
              <label className={styles.label} htmlFor="otpInput">Verification Code</label>
              <input
                id="otpInput"
                className={styles.input}
                type="text"
                placeholder="Enter 6-digit verification code"
                value={otpInput}
                onChange={(e) => setOtpInput(e.target.value.replace(/\D/g, '').slice(0, 6))}
                maxLength={6}
                autoFocus
              />
            </div>

            {owner.error && <div className={styles.small} style={{ color: '#b91c1c' }}>{owner.error}</div>}
            {owner.info && <div className={styles.small} style={{ color: '#065f46' }}>{owner.info}</div>}

            <div className={styles.formGroup}>
              <p className={styles.small}>
                Didn't receive the code?{' '}
                <button
                  type="button"
                  className={styles.uploadBtn}
                  onClick={handleResend}
                  disabled={owner.resending}
                  style={{ fontSize: '12px', padding: '4px 8px' }}
                >
                  {owner.resending ? 'Resending...' : 'Resend Code'}
                </button>
              </p>
            </div>
          </div>
        </div>
        <div className={styles.modalFooter}>
          <button className={styles.miniBtn} onClick={onClose}>
            Cancel
          </button>
          <button
            className={styles.miniBtn}
            onClick={handleVerify}
            disabled={owner.verifying || otpInput.length !== 6}
          >
            {owner.verifying ? 'Verifying...' : 'Verify Code'}
          </button>
        </div>
      </div>
    </div>
  )
}
