import React from 'react'
import { useTranslation } from 'react-i18next'
import styles from './Footer.module.scss'

export default function Footer() {
  const { t } = useTranslation('common')
  const year = new Date().getFullYear()
  
  return (
    <footer className={styles.footer} role="contentinfo">
      <div className="container">
        <div className={styles.meta}>
          <span>{t('footer.copyright', { year })}</span>
          <span>
            <a href="#" className={styles.link}>{t('footer.technologies')}</a>
          </span>
        </div>
        <nav className={styles.links} aria-label="Footer">
          <a href="#" className={styles.link}>{t('footer.siteRules')}</a>
          <a href="#" className={styles.link}>{t('footer.advertising')}</a>
          <a href="#" className={styles.link}>{t('footer.aboutCompany')}</a>
          <a href="#" className={styles.link}>{t('footer.careers')}</a>
        </nav>
      </div>
    </footer>
  )
}


