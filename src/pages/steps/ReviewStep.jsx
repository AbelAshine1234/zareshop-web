import React from 'react'
import { useSelector } from 'react-redux'
import styles from '../VendorRegister.module.scss'

export default function ReviewStep({ onSubmit }) {
  const vendor = useSelector(state => state.vendor)

  const handleSubmit = () => {
    // For now, just log the payload; backend integration can map to your Prisma controller fields
    // This will later be sent as multipart/form-data with images
    console.log('Submitting vendor:', vendor)
    if (onSubmit) {
      onSubmit()
    }
  }

  return (
    <div className={styles.review}>
      <div className={styles.kv}>
        <div className={styles.k}>Type</div>
        <div className={styles.v}>{vendor.type}</div>
      </div>
      <div className={styles.kv}>
        <div className={styles.k}>Name</div>
        <div className={styles.v}>{vendor.name || '-'}</div>
      </div>
      <div className={styles.kv}>
        <div className={styles.k}>Description</div>
        <div className={styles.v}>{vendor.description || '-'}</div>
      </div>
      <div className={styles.kv}>
        <div className={styles.k}>Categories</div>
        <div className={styles.v}>{vendor.category_ids.join(', ') || '-'}</div>
      </div>
      <div className={styles.kv}>
        <div className={styles.k}>Payment</div>
        <div className={styles.v}>
          {vendor.payment_method.type} • {vendor.payment_method.account_holder} • {vendor.payment_method.account_number}
        </div>
      </div>
      <div className={styles.kv}>
        <div className={styles.k}>Subscription</div>
        <div className={styles.v}>{vendor.subscription_id || '-'}</div>
      </div>
      {/* owner_user_id removed - using bearer token instead */}

      <div className={styles.small} style={{ marginTop: 16, color: '#6b7280' }}>
        Note: Hook this to your API controller to create the vendor and upload images via Cloudinary.
      </div>

      <div className={styles.actions} style={{ marginTop: 24 }}>
        <button className="button buttonPrimary" onClick={handleSubmit}>
          Submit Vendor Registration
        </button>
      </div>
    </div>
  )
}
