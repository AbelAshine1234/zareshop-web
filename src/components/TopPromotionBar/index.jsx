import React, { useState, useEffect } from 'react'
import { FaTimes } from 'react-icons/fa'
import { useTranslation } from 'react-i18next'
import styles from './TopPromotionBar.module.scss'
import zareLogo from '../../assets/images/zareshop.png'

// Default promotion data - can be overridden via props
const defaultPromotionData = {
  type: 'ios-app',
  id: 'zareshop-ios-banner',
  icon: zareLogo,
  textKey: 'ios.bannerText',
  actionType: 'modal', // 'modal', 'link', 'custom'
  actionKey: 'buttons.readMore',
  modalContentKey: 'ios.instructions',
  customAction: null,
  href: null
}

const TopPromotionBar = React.memo(({ promotionData = defaultPromotionData }) => {
  const { t } = useTranslation()
  const [isDismissed, setIsDismissed] = useState(false)
  
  // Check sessionStorage on mount to see if banner was dismissed in this session
  useEffect(() => {
    const sessionKey = `${promotionData.id}-dismissed-session`
    const lastPageKey = `${promotionData.id}-last-page`
    
    // Check if this is a page reload using performance API and current URL
    const currentUrl = window.location.href
    const lastUrl = sessionStorage.getItem(lastPageKey)
    const isReload = window.performance && 
      (window.performance.navigation.type === 1 || // TYPE_RELOAD
       window.performance.getEntriesByType('navigation')[0]?.type === 'reload') &&
      currentUrl === lastUrl // Same URL = reload, different URL = navigation
    
    const wasDismissed = sessionStorage.getItem(sessionKey) === 'true'
    
    if (isReload) {
      // This is a page reload - clear dismissal and show banner
      sessionStorage.removeItem(sessionKey)
      setIsDismissed(false)
    } else {
      // This is navigation or first visit - respect the dismissal state
      setIsDismissed(wasDismissed)
    }
    
    // Store current URL for next comparison
    sessionStorage.setItem(lastPageKey, currentUrl)
  }, [promotionData.id])
  
  if (isDismissed) return null
  
  const handleDismiss = () => {
    // Save dismissal state to sessionStorage (persists during navigation, cleared on reload)
    const sessionKey = `${promotionData.id}-dismissed-session`
    sessionStorage.setItem(sessionKey, 'true')
    setIsDismissed(true)
  }
  
  const handleAction = (e) => {
    e.preventDefault()
    
    switch (promotionData.actionType) {
      case 'modal':
        alert(t(promotionData.modalContentKey))
        break
      case 'link':
        if (promotionData.href) {
          window.open(promotionData.href, '_blank', 'noopener,noreferrer')
        }
        break
      case 'custom':
        if (promotionData.customAction) {
          promotionData.customAction()
        }
        break
      default:
        alert(t(promotionData.modalContentKey))
    }
  }
  
  return (
    <div className={styles.banner} role="region" aria-label={`${t('app.name')} promotion`}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <div className={styles.iconWrap}>
            <img src={promotionData.icon} alt={t('app.name')} />
          </div>
          <div className={styles.message}>
            <span className={styles.text}>{t(promotionData.textKey)}</span>
            {promotionData.actionKey && (
              <a 
                className={styles.link} 
                href={promotionData.href || "#"} 
                onClick={handleAction}
              >
                {t(promotionData.actionKey)}
              </a>
            )}
          </div>
        </div>
        <button 
          className={styles.closeBtn} 
          aria-label={t('buttons.dismiss')} 
          onClick={handleDismiss}
        >
          <FaTimes />
        </button>
      </div>
    </div>
  )
})

TopPromotionBar.displayName = 'TopPromotionBar'

export default TopPromotionBar

// Export some common promotion configurations for easy use
export const promotionTypes = {
  iosApp: {
    type: 'ios-app',
    id: 'zareshop-ios-banner',
    icon: zareLogo,
    textKey: 'ios.bannerText',
    actionType: 'modal',
    actionKey: 'buttons.readMore',
    modalContentKey: 'ios.instructions'
  },
  
  // Example: Sale promotion
  sale: {
    type: 'sale',
    id: 'zareshop-sale-banner',
    icon: zareLogo,
    textKey: 'promotions.saleText',
    actionType: 'link',
    actionKey: 'buttons.shopNow',
    href: '/sale'
  },
  
  // Example: Newsletter signup
  newsletter: {
    type: 'newsletter',
    id: 'zareshop-newsletter-banner',
    icon: zareLogo,
    textKey: 'promotions.newsletterText',
    actionType: 'custom',
    actionKey: 'buttons.signUp',
    customAction: () => {
      // Custom newsletter signup logic
      console.log('Newsletter signup clicked')
    }
  }
}
