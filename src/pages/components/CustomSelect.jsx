import React, { useEffect, useRef, useState } from 'react'
import styles from '../VendorRegister.module.scss'

export default function CustomSelect({ value, options, onChange, ariaLabel }) {
  const [open, setOpen] = useState(false)
  const btnRef = useRef(null)
  const menuRef = useRef(null)

  useEffect(() => {
    function onDocClick(e) {
      if (!open) return
      if (btnRef.current && btnRef.current.contains(e.target)) return
      if (menuRef.current && menuRef.current.contains(e.target)) return
      setOpen(false)
    }
    document.addEventListener('mousedown', onDocClick)
    return () => document.removeEventListener('mousedown', onDocClick)
  }, [open])

  const selected = options.find(o => o.value === value)
  return (
    <div className={styles.customSelect}>
      <button
        type="button"
        ref={btnRef}
        className={styles.customSelectButton}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={ariaLabel}
        onClick={() => setOpen(v => !v)}
      >
        {selected ? selected.label : 'Select...'}
      </button>
      <span className={styles.customChevron}>▾</span>
      {open && (
        <div ref={menuRef} className={styles.customMenu} role="listbox">
          {options.map(opt => (
            <div
              key={opt.value}
              role="option"
              aria-selected={opt.value === value}
              className={`${styles.customOption} ${opt.value === value ? styles.customOptionActive : ''}`}
              onClick={() => { onChange(opt.value); setOpen(false) }}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
