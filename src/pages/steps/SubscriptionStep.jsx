import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from '../VendorRegister.module.scss'
import { api } from '../../api/api'
import { setSubscription } from '../../features/vendor/vendorSlice'

export default function SubscriptionStep({ onError, onComplete }) {
  const dispatch = useDispatch()
  const vendor = useSelector(state => state.vendor)
  const [subscriptions, setSubscriptions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchUserSubscriptions()
  }, [])

  const fetchUserSubscriptions = async () => {
    try {
      setLoading(true)
      setError('')
      const token = localStorage.getItem('authToken')
      if (!token) {
        setError('Authentication required. Please login first.')
        return
      }
      
      const data = await api.get('/subscription', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setSubscriptions(data)
    } catch (err) {
      setError('Failed to load your subscriptions. Please try again.')
      if (onError) onError('Failed to load subscriptions')
    } finally {
      setLoading(false)
    }
  }

  const selectSubscription = (subscriptionId) => {
    dispatch(setSubscription(subscriptionId))
    if (onComplete) onComplete()
  }

  const getSelectedSubscription = () => {
    return subscriptions.find(sub => sub.id == vendor.subscription_id)
  }

  if (loading) {
    return (
      <div className={styles.form}>
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <div className={styles.small}>Loading your subscriptions...</div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={styles.form}>
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <div className={styles.small} style={{ color: '#b91c1c', marginBottom: '16px' }}>
            {error}
          </div>
          <button
            className="button buttonPrimary"
            onClick={fetchUserSubscriptions}
            disabled={loading}
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  if (subscriptions.length === 0) {
    return (
      <div className={styles.form}>
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <div className={styles.small} style={{ marginBottom: '16px' }}>
            No active subscriptions found.
          </div>
          <div className={styles.small} style={{ color: '#6b7280' }}>
            Please contact support to activate a subscription plan.
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.form}>
      <div className={styles.formGroup}>
        <div className={styles.small} style={{ marginBottom: 8 }}>
          Choose a subscription plan to continue with your vendor registration.
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '16px',
          marginTop: '16px'
        }}>
          {subscriptions.map((subscription) => {
            const isSelected = vendor.subscription_id == subscription.id
            const isActive = subscription.status === 'active'
            const startDate = new Date(subscription.start_date).toLocaleDateString()
            const endDate = new Date(subscription.end_date).toLocaleDateString()

            return (
              <div
                key={subscription.id}
                className={styles.subscriptionCard}
                style={{
                  border: isSelected ? '2px solid #10b981' : '1px solid #e5e7eb',
                  borderRadius: '12px',
                  padding: '20px',
                  backgroundColor: isSelected ? '#f0fdf4' : '#ffffff',
                  cursor: isActive ? 'pointer' : 'not-allowed',
                  opacity: isActive ? 1 : 0.6,
                  transition: 'all 0.2s ease',
                  boxShadow: isSelected ? '0 4px 12px rgba(16, 185, 129, 0.15)' : '0 1px 3px rgba(0, 0, 0, 0.1)',
                  position: 'relative'
                }}
                onClick={() => isActive && selectSubscription(subscription.id)}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '12px'
                }}>
                  <h3 style={{
                    margin: 0,
                    color: '#1f2937',
                    fontSize: '18px',
                    fontWeight: '600'
                  }}>
                    {subscription.plan}
                  </h3>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <div style={{
                      backgroundColor: isActive ? '#10b981' : '#6b7280',
                      color: 'white',
                      padding: '4px 8px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: '600',
                      textTransform: 'capitalize'
                    }}>
                      {subscription.status}
                    </div>
                    {isSelected && (
                      <div style={{
                        backgroundColor: '#10b981',
                        color: 'white',
                        padding: '4px 8px',
                        borderRadius: '12px',
                        fontSize: '12px',
                        fontWeight: '600'
                      }}>
                        ✓ Selected
                      </div>
                    )}
                  </div>
                </div>

                <div style={{
                  color: '#059669',
                  fontSize: '24px',
                  fontWeight: '700',
                  marginBottom: '8px'
                }}>
                  ${subscription.amount}
                </div>

                <div style={{
                  color: '#6b7280',
                  fontSize: '14px',
                  marginBottom: '12px'
                }}>
                  <div>Start: {startDate}</div>
                  <div>End: {endDate}</div>
                </div>

                {!isActive && (
                  <div style={{
                    backgroundColor: '#fef3c7',
                    color: '#92400e',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    fontSize: '12px',
                    fontWeight: '600',
                    textAlign: 'center',
                    marginTop: '12px'
                  }}>
                    Subscription not active
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {getSelectedSubscription() && (
          <div style={{
            marginTop: '20px',
            padding: '16px',
            backgroundColor: '#f0fdf4',
            border: '1px solid #bbf7d0',
            borderRadius: '8px'
          }}>
            <div className={styles.small} style={{ color: '#065f46', fontWeight: '600' }}>
              ✓ Selected: {getSelectedSubscription().name}
              {getSelectedSubscription().price && ` - $${getSelectedSubscription().price}`}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
