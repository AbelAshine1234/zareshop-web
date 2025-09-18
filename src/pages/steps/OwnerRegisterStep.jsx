import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from '../VendorRegister.module.scss'
import { setOwnerField, resendOtp } from '../../features/vendor/vendorSlice'
import { validateEthiopianPhone } from '../../utils/phoneUtils'

export default function OwnerRegisterStep() {
  const owner = useSelector(state => state.vendor.owner)
  const dispatch = useDispatch()

  const validatePhone = (phone) => {
    return validateEthiopianPhone(phone)
  }

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, '') // Only allow digits
    if (value.length <= 9) { // Ethiopian numbers are 9 digits after removing country code
      dispatch(setOwnerField({ phoneLocal: value }))
    }
  }

  return (
    <div className={styles.form}>
      <div className={styles.row}>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="ownerName">Owner Name</label>
          <input id="ownerName" className={styles.input} placeholder="e.g. Abel Ashine" value={owner.name} onChange={e => dispatch(setOwnerField({ name: e.target.value }))} />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="ownerPhone">Phone Number</label>
          <div className={styles.inputGroup}>
            <span className={styles.prefix}>+251</span>
            <input id="ownerPhone" className={`${styles.input} ${styles.groupInput}`} placeholder="9XXXXXXXX" value={owner.phoneLocal} onChange={handlePhoneChange} maxLength={9} />
          </div>
          <div className={styles.hint}>Enter your 9-digit phone number (starting with 9). +251 will be added automatically.</div>
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="ownerPassword">Password</label>
          <input id="ownerPassword" type="password" className={styles.input} placeholder="Create a strong password" value={owner.password} onChange={e => dispatch(setOwnerField({ password: e.target.value }))} />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>&nbsp;</label>
          <div className={styles.hint}>Press Next to register and verify via OTP.</div>
        </div>
      </div>
      {owner.registered && !owner.verified && (
        <div className={styles.row}>
          <div className={styles.formGroup}>
            <div className={styles.hint} style={{ color: '#065f46', fontWeight: '600' }}>
              ✓ Registration successful! Please click "Next" to verify your phone number.
            </div>
          </div>
        </div>
      )}
      {owner.error && <div className={styles.small} style={{ color: '#b91c1c' }}>{owner.error}</div>}
      {owner.info && <div className={styles.small} style={{ color: '#065f46' }}>{owner.info}</div>}
      {owner.verified && <div className={styles.small} style={{ color: '#065f46' }}>Owner verified. You can proceed.</div>}
    </div>
  )
}
