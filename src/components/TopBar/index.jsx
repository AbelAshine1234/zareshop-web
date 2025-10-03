import React, { useState, useCallback, lazy, Suspense, useEffect } from 'react'
import { FaHeart, FaShoppingCart } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { selectCartItemsCount } from '../../store/selectors'
import LanguageSwitcher from '../shared/LanguageSwitcher'
import styles from './TopBar.module.scss'
import { fetchCategories } from '../../features/categories/categoriesSlice'

// Lazy load the heavy LoginPopup component
const LoginPopup = lazy(() => import('../LoginPopup'))

const TopBar = React.memo(() => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const cartItemsCount = useSelector(selectCartItemsCount)
  const { categories, loading, error } = useSelector((s) => s.categories)

  useEffect(() => {
    if (!categories || categories.length === 0) {
      dispatch(fetchCategories())
    }
  }, [dispatch])

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
            <div className={styles.dropdown}>
              <a href="#" className={`${styles.link} ${styles.linkCaret}`}>{t('navigation.catalogs')}</a>
              <div className={styles.menu}>
                {loading && (
                  <div className={styles.menuItem} aria-busy="true">{t('common:loading') || 'Loading...'}</div>
                )}
                {!loading && error && (
                  <button className={styles.menuItem} onClick={() => dispatch(fetchCategories())}>
                    {t('buttons.tryAgain') || 'Try Again'}
                  </button>
                )}
                {!loading && !error && categories && categories.length > 0 && (
                  categories.slice(0, 12).map((cat) => (
                    <a key={cat.id || cat._id || cat.slug} href={`#/category/${cat.id || cat._id || cat.slug}`} className={styles.menuItem}>
                      {cat.name || cat.title}
                    </a>
                  ))
                )}
                {!loading && !error && categories && categories.length === 0 && (
                  <div className={styles.menuItem}>{t('common:noData') || 'No categories'}</div>
                )}
              </div>
            </div>
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


