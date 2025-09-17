import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from '../VendorRegister.module.scss'
import CustomSelect from '../components/CustomSelect'
import { setBasics } from '../../features/vendor/vendorSlice'

export default function VendorBasicsStep() {
  const vendor = useSelector(state => state.vendor)
  const dispatch = useDispatch()

  return (
    <div className={styles.form}>
      <div className={styles.row}>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="vendorType">Vendor Type</label>
          <CustomSelect
            ariaLabel="Vendor Type"
            value={vendor.type}
            onChange={(val) => dispatch(setBasics({ type: val }))}
            options={[
              { value: 'individual', label: 'Individual' },
              { value: 'business', label: 'Business' },
            ]}
          />
          <div className={styles.hint}>Choose whether you are registering as an individual or a business.</div>
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="vendorName">Vendor Name</label>
          <input id="vendorName" className={styles.input} placeholder="e.g. Zare Boutique" value={vendor.name} onChange={e => dispatch(setBasics({ name: e.target.value }))} />
          <div className={styles.hint}>This name will be visible to customers.</div>
        </div>
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label} htmlFor="vendorDesc">Short Description</label>
        <textarea id="vendorDesc" className={styles.textarea} placeholder="Tell customers what you sell and what makes you special" value={vendor.description} onChange={e => dispatch(setBasics({ description: e.target.value }))} />
      </div>
    </div>
  )
}
