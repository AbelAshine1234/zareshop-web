import React, { useCallback } from 'react'
import styles from './PhoneInput.module.scss'

const PhoneInput = React.memo(({ 
  value, 
  onChange, 
  onContinue, 
  disabled = false,
  placeholder = "912345678" 
}) => {
  const handlePhoneInput = useCallback((inputValue) => {
    // FORCE: Only digits, HARD limit to 9 characters
    const cleanValue = inputValue.replace(/[^0-9]/g, '').slice(0, 9)
    return cleanValue
  }, [])

  const handleInputChange = useCallback((e) => {
    const newValue = handlePhoneInput(e.target.value)
    onChange(newValue)
    // Force the DOM to match our cleaned value
    if (e.target.value !== newValue) {
      e.target.value = newValue
    }
  }, [handlePhoneInput, onChange])

  const handleInput = useCallback((e) => {
    // AGGRESSIVE blocking - force clean value immediately
    const cleanValue = e.target.value.replace(/[^0-9]/g, '').slice(0, 9)
    e.target.value = cleanValue
    onChange(cleanValue)
  }, [onChange])

  const handleKeyDown = useCallback((e) => {
    // HARD BLOCK: No typing if at 9 digits
    if (value.length >= 9 && !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', 'Home', 'End'].includes(e.key)) {
      e.preventDefault()
      e.stopPropagation()
      return false
    }
    // HARD BLOCK: Only allow digits
    if (!/^[0-9]$/.test(e.key) && !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', 'Home', 'End'].includes(e.key)) {
      e.preventDefault()
      e.stopPropagation()
      return false
    }
  }, [value.length])

  const handleKeyPress = useCallback((e) => {
    // Additional blocking layer
    if (value.length >= 9 || !/[0-9]/.test(e.key)) {
      e.preventDefault()
      e.stopPropagation()
      return false
    }
  }, [value.length])

  const handlePaste = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    const pastedText = e.clipboardData.getData('text')
    const cleanValue = pastedText.replace(/[^0-9]/g, '').slice(0, 9)
    onChange(cleanValue)
    e.target.value = cleanValue
  }, [onChange])

  const isValidPhone = value.length === 9

  return (
    <div className={styles.phoneInputContainer}>
      <div className={styles.phoneInputWrapper}>
        <span className={styles.countryCode}>+251</span>
        <input
          type="text"
          value={value}
          onChange={handleInputChange}
          onInput={handleInput}
          onKeyDown={handleKeyDown}
          onKeyPress={handleKeyPress}
          onPaste={handlePaste}
          placeholder={placeholder}
          className={styles.phoneInput}
          maxLength="9"
          pattern="[0-9]{0,9}"
          disabled={disabled}
        />
      </div>
      <button 
        className={`${styles.continueButton} ${isValidPhone ? styles.enabled : styles.disabled}`}
        onClick={() => isValidPhone && onContinue(value)}
        disabled={!isValidPhone || disabled}
      >
        Continue
      </button>
    </div>
  )
})

PhoneInput.displayName = 'PhoneInput'

export default PhoneInput
