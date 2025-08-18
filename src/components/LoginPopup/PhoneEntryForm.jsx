import React, { useCallback } from 'react'
import { useTranslation, Trans } from 'react-i18next'
import PhoneInput from '../shared/PhoneInput'
import styles from './LoginPopup.module.scss'

const PhoneEntryForm = React.memo(({ 
  phoneNumber, 
  onPhoneChange, 
  onContinue, 
  onBackToLogin 
}) => {
  const { t } = useTranslation('common')
  
  const handleContinue = useCallback((phone) => {
    console.log('Valid phone number:', phone)
    onContinue(phone)
  }, [onContinue])

  return (
    <>
      <PhoneInput
        value={phoneNumber}
        onChange={onPhoneChange}
        onContinue={handleContinue}
      />
      
      <div className={styles.loginLink}>
        <p>
          {t('login.alreadyHaveProfile')}{' '}
          <button 
            className={styles.linkButton}
            onClick={onBackToLogin}
            type="button"
          >
            {t('login.logIn')}
          </button>
        </p>
      </div>

      <div className={styles.phoneTerms}>
        <p>
          <Trans 
            i18nKey="login.termsAgreement"
            components={{
              termsLink: <a href="#" className={styles.link} />,
              privacyLink: <a href="#" className={styles.link} />
            }}
          />
        </p>
      </div>
    </>
  )
})

PhoneEntryForm.displayName = 'PhoneEntryForm'

export default PhoneEntryForm
