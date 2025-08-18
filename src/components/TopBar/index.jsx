import React, { useState, useCallback, lazy, Suspense } from 'react'
import { FaHeart, FaShoppingCart } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { selectCartItemsCount } from '../../store/selectors'
import LanguageSwitcher from '../shared/LanguageSwitcher'
import styles from './TopBar.module.scss'

// Lazy load the heavy LoginPopup component
const LoginPopup = lazy(() => import('../LoginPopup'))

const TopBar = React.memo(() => {
  const { t } = useTranslation()
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const cartItemsCount = useSelector(selectCartItemsCount)

  const handleLoginOpen = useCallback(() => {
    setIsLoginOpen(true)
  }, [])

  const handleLoginClose = useCallback(() => {
    setIsLoginOpen(false)
  }, [])

  return (
    <div className={styles.topbar} role="navigation" aria-label="Top bar">
      <div className="container">
        <div className={styles.inner}>
          <nav className={styles.links}>
            <div className={styles.dropdown}>
              <a href="#" className={`${styles.link} ${styles.linkCaret}`}>{t('navigation.business')}</a>
              <div className={styles.menu}>
                <a href="#" className={styles.menuItem}>Business 360</a>
                <a href="#" className={styles.menuItem}>Advertising</a>
                <a href="#" className={styles.menuItem}>API and integrations</a>
              </div>
            </div>
            <a href="#" className={styles.link}>{t('navigation.careers')}</a>
            <a href="#" className={styles.link}>{t('navigation.help')}</a>
            <a href="#" className={`${styles.link} ${styles.linkCaret}`}>{t('navigation.catalogs')}</a>
            <a href="#" className={styles.link}>#iHelp</a>
          </nav>
          <div className={styles.actions}>
            <LanguageSwitcher />
            <button className={styles.iconBtn} aria-label={t('navigation.favorites')}>
              <FaHeart />
            </button>
            <button className={styles.iconBtn} aria-label={t('navigation.cart')}>
              <FaShoppingCart />
              {cartItemsCount > 0 && (
                <span className={styles.cartBadge}>{cartItemsCount}</span>
              )}
            </button>
            <button 
              className={styles.link} 
              onClick={handleLoginOpen}
              style={{ background: 'none', border: 'none', cursor: 'pointer' }}
            >
              {t('navigation.login')}
            </button>
            <button className={styles.primaryBtn}>{t('buttons.placeAd')}</button>
          </div>
        </div>
      </div>
      
      {isLoginOpen && (
        <Suspense fallback={null}>
          <LoginPopup 
            isOpen={isLoginOpen} 
            onClose={handleLoginClose} 
          />
        </Suspense>
      )}
    </div>
  )
})

TopBar.displayName = 'TopBar'

export default TopBar


