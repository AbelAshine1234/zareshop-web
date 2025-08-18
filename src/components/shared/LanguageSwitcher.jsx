import React, { useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { FaGlobe, FaChevronDown } from 'react-icons/fa'
import { supportedLanguages, changeLanguage } from '../../locales'
import styles from './LanguageSwitcher.module.scss'

const LanguageSwitcher = React.memo(() => {
  const { i18n } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  
  const currentLanguage = supportedLanguages.find(lang => lang.code === i18n.language) || supportedLanguages[0]

  const handleLanguageChange = useCallback((langCode) => {
    changeLanguage(langCode)
    setIsOpen(false)
  }, [])

  const toggleDropdown = useCallback(() => {
    setIsOpen(prev => !prev)
  }, [])

  return (
    <div className={styles.languageSwitcher}>
      <button 
        className={styles.trigger}
        onClick={toggleDropdown}
        aria-label={`Change language. Current: ${currentLanguage.nativeName}`}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <FaGlobe className={styles.icon} />
        <span className={styles.currentLang}>{currentLanguage.nativeName}</span>
        <FaChevronDown className={`${styles.chevron} ${isOpen ? styles.open : ''}`} />
      </button>
      
      {isOpen && (
        <div className={styles.dropdown}>
          <div className={styles.dropdownContent}>
            {supportedLanguages.map((language) => (
              <button
                key={language.code}
                className={`${styles.option} ${i18n.language === language.code ? styles.active : ''}`}
                onClick={() => handleLanguageChange(language.code)}
              >
                <span className={styles.nativeName}>{language.nativeName}</span>
              </button>
            ))}
          </div>
        </div>
      )}
      
      {isOpen && (
        <div className={styles.overlay} onClick={() => setIsOpen(false)} />
      )}
    </div>
  )
})

LanguageSwitcher.displayName = 'LanguageSwitcher'

export default LanguageSwitcher
