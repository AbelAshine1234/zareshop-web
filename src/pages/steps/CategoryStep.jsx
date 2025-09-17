import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from '../VendorRegister.module.scss'
import { setCategories } from '../../features/vendor/vendorSlice'

export default function CategoryStep({ onError }) {
  const vendor = useSelector(state => state.vendor)
  const dispatch = useDispatch()
  const [categories, setCategoriesState] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      setLoading(true)
      setError('')
      // Use full URL for categories since they might not be under /api/
      const baseUrl = import.meta.env.VITE_BASE_URL || 'http://localhost:4000'
      const response = await fetch(`${baseUrl}/category`)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      setCategoriesState(data)
    } catch (err) {
      console.error('Category fetch error:', err)
      setError('Failed to load categories. Please try again.')
      if (onError) onError('Failed to load categories')
    } finally {
      setLoading(false)
    }
  }

  const toggleCategory = (categoryId) => {
    // Multi-select categories; update vendor.category_ids directly
    const exists = vendor.category_ids.includes(categoryId)
    const updated = exists
      ? vendor.category_ids.filter(x => x !== categoryId)
      : [...vendor.category_ids, categoryId]
    dispatch(setCategories(updated))
  }

  if (loading) {
    return (
      <div className={styles.form}>
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <div className={styles.small}>Loading categories...</div>
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
            onClick={fetchCategories}
            disabled={loading}
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.form}>
      <div className={styles.formGroup}>
        <div className={styles.small} style={{ marginBottom: 8 }}>
          Select one or more categories that match your products.
        </div>

        {/* Categories */}
        <div style={{ marginBottom: '24px' }}>
          <h4 style={{
            margin: '0 0 12px 0',
            color: '#374151',
            fontSize: '16px',
            fontWeight: '600'
          }}>
            Choose Categories
          </h4>
          <div className={styles.pills}>
            {categories.map((category) => {
              const isSelected = vendor.category_ids.includes(category.id)
              return (
                <button
                  key={category.id}
                  className={`${styles.pill} ${isSelected ? styles.pillActive : ''}`}
                  onClick={() => toggleCategory(category.id)}
                  style={{ position: 'relative' }}
                >
                  {category.name}
                  {category.images && category.images.length > 0 && (
                    <span style={{
                      display: 'inline-block',
                      width: '8px',
                      height: '8px',
                      backgroundColor: '#10b981',
                      borderRadius: '50%',
                      marginLeft: '6px'
                    }} title="Has images"></span>
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {vendor.category_ids.length > 0 && (
          <div className={styles.small} style={{ marginTop: 16, color: '#065f46', fontWeight: '600' }}>
            ✓ Selected: {vendor.category_ids.length} categor{vendor.category_ids.length === 1 ? 'y' : 'ies'}
          </div>
        )}
      </div>
    </div>
  )
}

