import React, { useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import Modal from '../shared/Modal'
import PhoneEntryForm from './PhoneEntryForm'
import ProfileSelection from './ProfileSelection'
import styles from './LoginPopup.module.scss'

const LoginPopup = React.memo(({ isOpen, onClose }) => {
  const { t } = useTranslation('common')
  const [showProfileSelect, setShowProfileSelect] = useState(false)
  const [showPhoneEntry, setShowPhoneEntry] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState('')

  const handlePhoneChange = useCallback((value) => {
    setPhoneNumber(value)
  }, [])

  const handlePhoneContinue = useCallback((phone) => {
    // Handle phone verification logic here
    console.log('Phone verification for:', phone)
    onClose() // Close modal after successful entry
  }, [onClose])

  const handleRegisterClick = useCallback(() => {
    setShowProfileSelect(true)
  }, [])

  const handleProfileSelect = useCallback((profileType) => {
    // Handle profile selection logic here
    console.log('Selected profile type:', profileType)
    setShowProfileSelect(false)
    setShowPhoneEntry(true)
  }, [])

  const handleBackToLogin = useCallback(() => {
    setShowPhoneEntry(false)
    setShowProfileSelect(false)
  }, [])

  const resetState = useCallback(() => {
    setShowPhoneEntry(false)
    setShowProfileSelect(false)
    setPhoneNumber('')
  }, [])

  const handleClose = useCallback(() => {
    resetState()
    onClose()
  }, [resetState, onClose])

  // Show phone number entry
  if (showPhoneEntry) {
    return (
      <Modal 
        isOpen={isOpen} 
        onClose={handleClose} 
        title={t('login.enterPhoneTitle')}
      >
        <PhoneEntryForm
          phoneNumber={phoneNumber}
          onPhoneChange={handlePhoneChange}
          onContinue={handlePhoneContinue}
          onBackToLogin={handleBackToLogin}
        />
      </Modal>
    )
  }

  // Show profile selection
  if (showProfileSelect) {
    return (
      <Modal 
        isOpen={isOpen} 
        onClose={handleClose} 
        title={t('login.profileQuestionTitle')}
      >
        <ProfileSelection onProfileSelect={handleProfileSelect} />
      </Modal>
    )
  }

  // Default phone entry state
  return (
    <Modal 
      isOpen={isOpen} 
      onClose={handleClose} 
      title={t('login.enterPhoneTitle')}
    >
      <PhoneEntryForm
        phoneNumber={phoneNumber}
        onPhoneChange={handlePhoneChange}
        onContinue={handlePhoneContinue}
        onBackToLogin={handleRegisterClick}
      />
    </Modal>
  )
})

LoginPopup.displayName = 'LoginPopup'

export default LoginPopup
