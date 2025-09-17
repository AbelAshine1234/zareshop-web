import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from '../VendorRegister.module.scss'
import { api } from '../../api/api'
import { setCategories } from '../../features/vendor/vendorSlice'

export default function CategoryStep({ onError }) {
  const vendor = useSelector(state => state.vendor)
  const dispatch = useDispatch()
  const [categories, setCategories] = useState([])
  const [subcategories, setSubcategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [loading, setLoading] = useState(true)
  const [subLoading, setSubLoading] = useState(false)
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
      setCategories(data)
    } catch (err) {
      console.error('Category fetch error:', err)
      setError('Failed to load categories. Please try again.')
      if (onError) onError('Failed to load categories')
    } finally {
      setLoading(false)
    }
  }

  const fetchSubcategories = async (categoryId) => {
    try {
      setSubLoading(true)
      // Use full URL for subcategories since they might not be under /api/
      const baseUrl = import.meta.env.VITE_BASE_URL || 'http://localhost:4000'
      const response = await fetch(`${baseUrl}/category/${categoryId}/subcategories`)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      setSubcategories(data)
      setSelectedCategory(categoryId)
    } catch (err) {
      console.error('Subcategory fetch error:', err)
      if (onError) onError('Failed to load subcategories')
    } finally {
      setSubLoading(false)
    }
  }

  const toggleCategory = (categoryId) => {
    // If clicking the same category, deselect it
    if (selectedCategory === categoryId) {
      setSelectedCategory(null)
      setSubcategories([])
      dispatch(setCategories([]))
      return
    }

    // Select new category and fetch subcategories
    fetchSubcategories(categoryId)
  }

  const toggleSubcategory = (subcategoryId) => {
    const exists = vendor.category_ids.includes(subcategoryId)
    const updated = exists
      ? vendor.category_ids.filter(x => x !== subcategoryId)
      : [...vendor.category_ids, subcategoryId]
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
          Select categories and subcategories that match your products.
        </div>

        {/* Main Categories */}
        <div style={{ marginBottom: '24px' }}>
          <h4 style={{
            margin: '0 0 12px 0',
            color: '#374151',
            fontSize: '16px',
            fontWeight: '600'
          }}>
            Choose a Category
          </h4>
          <div className={styles.pills}>
            {categories.map((category) => {
              const isSelected = selectedCategory === category.id
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

        {/* Subcategories */}
        {selectedCategory && (
          <div>
            <h4 style={{
              margin: '0 0 12px 0',
              color: '#374151',
              fontSize: '16px',
              fontWeight: '600'
            }}>
              Choose Subcategories
              {subLoading && <span style={{ fontSize: '14px', color: '#6b7280', marginLeft: '8px' }}>Loading...</span>}
            </h4>
            <div className={styles.pills}>
              {subcategories.map((subcategory) => {
                const isSelected = vendor.category_ids.includes(subcategory.id)
                return (
                  <button
                    key={subcategory.id}
                    className={`${styles.pill} ${isSelected ? styles.pillActive : ''}`}
                    onClick={() => toggleSubcategory(subcategory.id)}
                  >
                    {subcategory.name}
                    {subcategory.images && subcategory.images.length > 0 && (
                      <span style={{
                        display: 'inline-block',
                        width: '6px',
                        height: '6px',
                        backgroundColor: '#10b981',
                        borderRadius: '50%',
                        marginLeft: '4px'
                      }} title="Has images"></span>
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {vendor.category_ids.length > 0 && (
          <div className={styles.small} style={{ marginTop: 16, color: '#065f46', fontWeight: '600' }}>
            ✓ Selected: {vendor.category_ids.length} subcategories from {categories.find(c => c.id === selectedCategory)?.name}
          </div>
        )}

        {!selectedCategory && (
          <div className={styles.small} style={{ marginTop: 16, color: '#6b7280' }}>
            Please select a category first to view subcategories.
          </div>
        )}
      </div>
    </div>
  )
}
