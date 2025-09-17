import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from '../VendorRegister.module.scss'
import { setCategories } from '../../features/vendor/vendorSlice'

const allCategories = [
  { id: 1, name: 'Fashion' },
  { id: 2, name: 'Electronics' },
  { id: 3, name: 'Home & Living' },
  { id: 4, name: 'Beauty' },
  { id: 5, name: 'Grocery' },
  { id: 6, name: 'Sports' },
  { id: 7, name: 'Kids' },
  { id: 8, name: 'Automotive' },
]

export default function CategoriesStep() {
  const dispatch = useDispatch()
  const category_ids = useSelector(state => state.vendor.category_ids)

  const toggleCategory = (id) => {
    const exists = category_ids.includes(id)
    const updated = exists ? category_ids.filter(x => x !== id) : [...category_ids, id]
    dispatch(setCategories(updated))
  }

  return (
    <>
      <div className={styles.small} style={{ marginBottom: 8 }}>Select all categories that match your products.</div>
      <div className={styles.pills}>
        {allCategories.map(c => {
          const active = category_ids.includes(c.id)
          return (
            <button key={c.id} className={`${styles.pill} ${active ? styles.pillActive : ''}`} onClick={() => toggleCategory(c.id)}>
              {c.name}
            </button>
          )
        })}
      </div>
    </>
  )
}
