import React, { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './VendorRegister.module.scss'
import OwnerRegisterStep from './steps/OwnerRegisterStep'
import VendorBasicsStep from './steps/VendorBasicsStep'
import CategoryStep from './steps/CategoryStep'
import PaymentStep from './steps/PaymentStep'
import VendorImageStep from './components/VendorImageStep'
import SubscriptionStep from './steps/SubscriptionStep'
import OtpModal from './components/OtpModal'
import CustomSelect from './components/CustomSelect'
import { api } from '../api/api'
import { vendorEndpoints } from '../api/api'
import {
  nextStep,
  prevStep,
  setCategories,
  setPaymentMethod,
  setOwnerField,
  registerOwner,
  verifyOtp,
} from '../features/vendor/vendorSlice'

export default function VendorRegister() {
  const vendor = useSelector(state => state.vendor)
  const dispatch = useDispatch()
  const owner = vendor.owner

  const steps = useMemo(() => [
    'Owner',
    'Basics',
    'Categories',
    'Payment',
    'Documents',
    'Subscription',
  ], [])

  // OTP Modal state
  const [showOtpModal, setShowOtpModal] = useState(false)

  // Image handling is now in VendorImageStep component
  const [submitLoading, setSubmitLoading] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [submitInfo, setSubmitInfo] = useState('')
  const [showUnderReview, setShowUnderReview] = useState(false)

  const handleNext = async () => {
    // Check if current step is complete before proceeding
    if (!isStepComplete(vendor.step)) {
      // For step 1, provide specific validation messages
      if (vendor.step === 1) {
        if (!owner.name) {
          dispatch(setOwnerField({ error: 'Please enter your name.' }))
          return
        }
        if (!owner.phoneLocal) {
          dispatch(setOwnerField({ error: 'Please enter your phone number.' }))
          return
        }
        if (!/^9\d{8}$/.test(owner.phoneLocal)) {
          dispatch(setOwnerField({ error: 'Please enter a valid 9-digit Ethiopian phone number starting with 9.' }))
          return
        }
        if (!owner.password) {
          dispatch(setOwnerField({ error: 'Please enter a password.' }))
          return
        }
        if (!owner.verified) {
          // If not verified, trigger registration
        }
      } else {
        dispatch(setOwnerField({ error: 'Please complete this step before proceeding to the next one.' }))
        return
      }
    }
    
    // Step-aware Next handler
    if (vendor.step === 1) {
      try {
        if (!owner.registered) {
          // Trigger registration to send OTP
          await dispatch(registerOwner()).unwrap()
          // Show OTP modal instead of staying on step 1
          setShowOtpModal(true)
          return
        }
        if (owner.registered && !owner.verified) {
          // If already registered but not verified, show OTP modal
          setShowOtpModal(true)
          return
        }
        dispatch(nextStep())
      } catch (e) {
        // errors are handled in slice state; no-op
      }
      return
    }

    // If on final step (Subscription), submit directly
    if (vendor.step === 6) {
      if (!isStepComplete(6)) {
        dispatch(setOwnerField({ error: 'Please select a subscription plan.' }))
        return
      }
      await onSubmit()
      return
    }

    dispatch(nextStep())
  }

  const onSubmit = async () => {
    // Prepare vendor data for submission
    setSubmitError('')
    setSubmitInfo('')
    setSubmitLoading(true)
    const token = localStorage.getItem('authToken')
    if (!token) {
      setSubmitError('Authentication required. Please login again.')
      setSubmitLoading(false)
      return
    }

    try {
      const path = vendorEndpoints.create(vendor.type)
      const form = new FormData()
      form.append('type', vendor.type)
      form.append('name', vendor.name || '')
      form.append('description', vendor.description || '')
      form.append('category_ids', JSON.stringify(vendor.category_ids || []))
      form.append('payment_method', JSON.stringify(vendor.payment_method || {}))
      form.append('subscription_id', vendor.subscription_id || '')
      // Append images if available
      if (vendor.images?.cover_image) form.append('cover_image', vendor.images.cover_image)
      if (vendor.type === 'individual' && vendor.images?.fayda_image) form.append('fayda_image', vendor.images.fayda_image)
      if (vendor.type === 'business' && vendor.images?.business_license_image) form.append('business_license_image', vendor.images.business_license_image)

      await api.post(path, form, { headers: { Authorization: `Bearer ${token}` } })
      setSubmitInfo('Vendor registered successfully. Your application is under review.')
      setShowUnderReview(true)
    } catch (e) {
      setSubmitError(e.message || 'Failed to register vendor.')
    } finally {
      setSubmitLoading(false)
    }
  }

  const isStepComplete = (stepNumber) => {
    switch (stepNumber) {
      case 1:
        // Check if all required fields are filled and phone is valid
        const phoneValid = owner.phoneLocal && /^9\d{8}$/.test(owner.phoneLocal)
        return owner.name && phoneValid && owner.password && owner.verified
      case 2:
        return vendor.type && vendor.name && vendor.description
      case 3:
        return vendor.category_ids.length > 0
      case 4:
        return vendor.payment_method.type && vendor.payment_method.account_holder
      case 5:
        return vendor.images.cover_image !== null
      case 6:
        return vendor.subscription_id !== '' // Subscription must be selected
      default:
        return false
    }
  }

  const canAccessStep = (targetStep) => {
    // Check if all previous steps are complete
    for (let i = 1; i < targetStep; i++) {
      if (!isStepComplete(i)) {
        return false
      }
    }
    return true
  }

  const handleStepClick = (targetStep) => {
    if (targetStep === vendor.step) return // Already on this step
    
    if (!canAccessStep(targetStep)) {
      const incompleteSteps = []
      for (let i = 1; i < targetStep; i++) {
        if (!isStepComplete(i)) {
          incompleteSteps.push(i)
        }
      }
      dispatch(setOwnerField({ error: `Please complete steps ${incompleteSteps.join(', ')} first.` }))
      return
    }
    
    dispatch(gotoStep(targetStep))
  }

  const handleOtpModalClose = () => {
    setShowOtpModal(false)
  }

  const handleError = (error) => {
    dispatch(setOwnerField({ error }))
  }

  return (
    <section className="container" style={{ display: 'flex', justifyContent: 'center' }}>
      <div className={styles.wrap}>
        <div className={styles.header}>
          <h1 className={styles.title}>Register as Vendor</h1>
          <div className={styles.steps}>
            {steps.map((label, idx) => {
              const n = idx + 1
              const active = vendor.step === n
              const canAccess = canAccessStep(n)
              return (
                <button 
                  key={label} 
                  className={`${styles.step} ${active ? styles.stepActive : ''} ${!canAccess ? styles.stepDisabled : ''}`} 
                  onClick={() => handleStepClick(n)}
                  disabled={!canAccess && !active}
                >
                  {n}. {label}
                </button>
              )
            })}
          </div>
        </div>

        <div className={styles.card}>
          {vendor.step === 1 && (
            <div>
              <div className={styles.sectionTitle}>Owner Account</div>
              <OwnerRegisterStep />
              <div className={styles.divider} />
              <div className={styles.actions}>
                <span className={styles.small}>Step 1 of {vendor.totalSteps}</span>
                <button className="button buttonPrimary" onClick={handleNext} disabled={vendor.owner.registering || vendor.owner.verifying}>Next</button>
              </div>
            </div>
          )}

          {vendor.step === 2 && (
            <div>
              <div className={styles.sectionTitle}>Basics</div>
              <VendorBasicsStep />
              <div className={styles.divider} />
              <div className={styles.actions}>
                <button className="button buttonGhost" onClick={() => dispatch(prevStep())}>Back</button>
                <button className="button buttonPrimary" onClick={handleNext}>Next</button>
              </div>
            </div>
          )}

          {vendor.step === 3 && (
            <div>
              <div className={styles.sectionTitle}>Categories</div>
              <CategoryStep onError={handleError} />
              <div className={styles.divider} />
              <div className={styles.actions}>
                <button className="button buttonGhost" onClick={() => dispatch(prevStep())}>Back</button>
                <button className="button buttonPrimary" onClick={handleNext}>Next</button>
              </div>
            </div>
          )}

          {vendor.step === 4 && (
            <div>
              <div className={styles.sectionTitle}>Payment Method</div>
              <PaymentStep onError={handleError} />
              <div className={styles.divider} />
              <div className={styles.actions}>
                <button className="button buttonGhost" onClick={() => dispatch(prevStep())}>Back</button>
                <button className="button buttonPrimary" onClick={handleNext}>Next</button>
              </div>
            </div>
          )}

          {vendor.step === 5 && (
            <div>
              <div className={styles.sectionTitle}>Documents</div>
              <VendorImageStep 
                vendor={vendor} 
                dispatch={dispatch} 
                onError={handleError} 
              />
              <div className={styles.divider} />
              <div className={styles.actions}>
                <button className="button buttonGhost" onClick={() => dispatch(prevStep())}>Back</button>
                <button className="button buttonPrimary" onClick={handleNext}>Next</button>
              </div>
            </div>
          )}

          {vendor.step === 6 && (
            <div>
              <div className={styles.sectionTitle}>Choose Subscription</div>
              <SubscriptionStep onError={handleError} onComplete={() => {}} />
              <div className={styles.divider} />
              <div className={styles.actions}>
                <button className="button buttonGhost" onClick={() => dispatch(prevStep())}>Back</button>
                <button className="button buttonPrimary" onClick={handleNext} disabled={submitLoading}>
                  {submitLoading ? 'Submitting...' : 'Submit Registration'}
                </button>
              </div>
            </div>
          )}

        {/* OTP Modal */}
        <OtpModal
          open={showOtpModal}
          onClose={handleOtpModalClose}
        />
        {/* Full-screen loading overlay during submission */}
        {submitLoading && (
          <div className={styles.modalOverlay}>
            <div className={styles.modal} role="dialog" aria-modal="true" aria-label="Submitting">
              <div className={styles.modalHeader}>Submitting Registration</div>
              <div className={styles.modalBody}>
                <div className={styles.small}>Please wait while we create your vendor account...</div>
              </div>
            </div>
          </div>
        )}

        {/* Under review success popup */}
        {showUnderReview && (
          <div className={styles.modalOverlay}>
            <div className={styles.modal} role="dialog" aria-modal="true" aria-label="Under review">
              <div className={styles.modalHeader}>Application Submitted</div>
              <div className={styles.modalBody}>
                <div className={styles.small} style={{ color: '#065f46' }}>
                  Your vendor application has been received and is under review.
                  Admin approval may take up to 24 hours. We will notify you once approved.
                </div>
                {submitError && (
                  <div className={styles.small} style={{ color: '#b91c1c', marginTop: 12 }}>{submitError}</div>
                )}
                {submitInfo && (
                  <div className={styles.small} style={{ color: '#065f46', marginTop: 12 }}>{submitInfo}</div>
                )}
              </div>
              <div className={styles.modalFooter}>
                <button className={styles.miniBtn} onClick={() => setShowUnderReview(false)}>Close</button>
              </div>
            </div>
          </div>
        )}
        </div>
      </div>
    </section>
  )
}
