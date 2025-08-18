import React from 'react'
import { useTranslation } from 'react-i18next'
import styles from './Services.module.scss'

export default function Services() {
  const { t } = useTranslation('common')

  return (
    <div className={styles.servicesSection} data-sidebar-services>
      <h3>{t('services.title')}</h3>
      <div className={styles.servicesList}> 
        <div className={styles.serviceItem}>
          <div className={styles.serviceIcon}>🚚</div>
          <div className={styles.serviceContent}>
            <h4>{t('services.delivery.title')}</h4>
            <p>{t('services.delivery.description')}</p>
          </div>
        </div>
        <div className={styles.serviceItem}>
          <div className={styles.serviceIcon}>🚗</div>
          <div className={styles.serviceContent}>
            <h4>{t('services.autoteka.title')}</h4>
            <p>{t('services.autoteka.description')}</p>
          </div>
        </div>
        <div className={styles.serviceItem}>
          <div className={styles.serviceIcon}>🏠</div>
          <div className={styles.serviceContent}>
            <h4>{t('services.trips.title')}</h4>
            <p>{t('services.trips.description')}</p>
          </div>
        </div>
        <div className={styles.serviceItem}>
          <div className={styles.serviceIcon}>🌱</div>
          <div className={styles.serviceContent}>
            <h4>{t('services.ihelp.title')}</h4>
            <p>{t('services.ihelp.description')}</p>
          </div>
        </div>
      </div>
    </div>
  )
}


