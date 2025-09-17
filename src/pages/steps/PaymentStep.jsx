import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from '../VendorRegister.module.scss'
import CustomSelect from '../components/CustomSelect'
import { setPaymentMethod } from '../../features/vendor/vendorSlice'

export default function PaymentStep({ onError }) {
  const vendor = useSelector(state => state.vendor)
  const dispatch = useDispatch()

  return (
    <div className={styles.form}>
      <div className={styles.row}>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="payType">Payment Type</label>
          <CustomSelect
            ariaLabel="Payment Type"
            value={vendor.payment_method.type}
            onChange={(val) => dispatch(setPaymentMethod({ type: val }))}
            options={[
              { value: 'telebirr', label: 'Telebirr' },
              { value: 'cbebirr', label: 'CBE Birr' },
              { value: 'bank', label: 'Bank Transfer' },
            ]}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="accHolder">Account Holder</label>
          <input
            id="accHolder"
            className={styles.input}
            placeholder="Full name"
            value={vendor.payment_method.account_holder}
            onChange={e => dispatch(setPaymentMethod({ account_holder: e.target.value }))}
          />
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="accNumber">Account Number</label>
          <input
            id="accNumber"
            className={styles.input}
            placeholder="e.g. 123456789"
            value={vendor.payment_method.account_number}
            onChange={e => dispatch(setPaymentMethod({ account_number: e.target.value }))}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="payName">Payment Name (optional)</label>
          <input
            id="payName"
            className={styles.input}
            placeholder="e.g. Primary account"
            value={vendor.payment_method.name}
            onChange={e => dispatch(setPaymentMethod({ name: e.target.value }))}
          />
        </div>
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label} htmlFor="payDetails">Details (optional)</label>
        <textarea
          id="payDetails"
          className={styles.textarea}
          placeholder="Any additional details or instructions"
          value={vendor.payment_method.details}
          onChange={e => dispatch(setPaymentMethod({ details: e.target.value }))}
        />
      </div>

      {/* Validation indicators */}
      {vendor.payment_method.type && vendor.payment_method.account_holder && (
        <div className={styles.small} style={{ marginTop: 8, color: '#065f46' }}>
          ✓ Payment method configured
        </div>
      )}
    </div>
  )
}
