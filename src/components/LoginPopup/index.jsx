import React, { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import Modal from '../shared/Modal';
import PhoneEntryForm from './PhoneEntryForm';
import ProfileSelection from './ProfileSelection';
import styles from './LoginPopup.module.scss';
import { useAuth } from '../../hooks';
import LoginForm from './LoginForm';
import ResetOtpForm from './ResetOtpForm';
import NewPasswordForm from './NewPasswordForm';
import VendorOtpForm from './VendorOtpForm';
import RegisterVendorOwnerForm from './RegisterVendorOwnerForm';

const LoginPopup = React.memo(({ isOpen, onClose }) => {
  const { t } = useTranslation('common');
  const { registerVendorOwner, forgot, loading } = useAuth();
  const [showProfileSelect, setShowProfileSelect] = useState(false);
  const [showPhoneEntry, setShowPhoneEntry] = useState(false);
  const [showRegisterVendor, setShowRegisterVendor] = useState(false);
  const [showResetOtp, setShowResetOtp] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showVendorOtp, setShowVendorOtp] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedProfileType, setSelectedProfileType] = useState(null);

  const handlePhoneChange = useCallback((value) => {
    setPhoneNumber(value);
  }, []);

  const handlePhoneContinue = useCallback(
    async (phone) => {
      try {
        if (selectedProfileType !== 'business') {
          await forgot(phone);
          setShowResetOtp(true);
          setShowPhoneEntry(false);
        }
      } catch (e) {
        console.error('Auth action failed:', e);
      }
    },
    [forgot, selectedProfileType]
  );

  const handleRegisterClick = useCallback(() => {
    setShowProfileSelect(true);
  }, []);

  const handleProfileSelect = useCallback(
    (profileType) => {
      setSelectedProfileType(profileType);
      setShowProfileSelect(false);
      if (profileType === 'business') {
        setShowRegisterVendor(true);
      } else {
        setShowPhoneEntry(true);
      }
    },
    []
  );

  const handleBackToLogin = useCallback(() => {
    setShowPhoneEntry(false);
    setShowProfileSelect(false);
    setSelectedProfileType(null);
    setShowResetOtp(false);
    setShowNewPassword(false);
    setShowVendorOtp(false);
    setShowRegisterVendor(false);
  }, []);

  const resetState = useCallback(() => {
    setShowPhoneEntry(false);
    setShowProfileSelect(false);
    setShowResetOtp(false);
    setShowNewPassword(false);
    setShowVendorOtp(false);
    setShowRegisterVendor(false);
    setPhoneNumber('');
    setSelectedProfileType(null);
  }, []);

  const handleClose = useCallback(() => {
    resetState();
    onClose();
  }, [resetState, onClose]);

  if (showRegisterVendor) {
    return (
      <Modal isOpen={isOpen} onClose={handleClose} title={t('login.createAccount')}>
        <RegisterVendorOwnerForm
          onBack={() => {
            setShowRegisterVendor(false);
            setShowProfileSelect(true);
          }}
          onSubmit={async ({ name, email, phoneLocal, password }) => {
            try {
              const fd = new FormData();
              fd.append('name', name);
              if (email) fd.append('email', email);
              fd.append('phone_number', `+251${phoneLocal}`);
              fd.append('password', password);
              await registerVendorOwner(fd);
              setPhoneNumber(phoneLocal);
              setShowRegisterVendor(false);
              setShowVendorOtp(true);
            } catch (e) {
              console.error(e);
            }
          }}
        />
        {loading && <div className={styles.loadingInline}>{t('common:loading')}</div>}
      </Modal>
    );
  }

  if (showVendorOtp) {
    return (
      <Modal isOpen={isOpen} onClose={handleClose} title={t('login.enterOtp')}>
        <VendorOtpForm
          phoneNumber={phoneNumber}
          onVerified={handleClose}
          onBack={() => {
            setShowVendorOtp(false);
            setShowRegisterVendor(true);
          }}
        />
        {loading && <div className={styles.loadingInline}>{t('common:loading')}</div>}
      </Modal>
    );
  }

  if (showResetOtp) {
    return (
      <Modal isOpen={isOpen} onClose={handleClose} title={t('login.enterOtp')}>
        <ResetOtpForm
          phoneLocal={phoneNumber}
          onVerified={() => {
            setShowResetOtp(false);
            setShowNewPassword(true);
          }}
          onBack={() => {
            setShowResetOtp(false);
            setShowPhoneEntry(true);
          }}
        />
        {loading && <div className={styles.loadingInline}>{t('common:loading')}</div>}
      </Modal>
    );
  }

  if (showNewPassword) {
    return (
      <Modal isOpen={isOpen} onClose={handleClose} title={t('login.setPassword')}>
        <NewPasswordForm
          onDone={handleClose}
          onBack={() => {
            setShowNewPassword(false);
            setShowResetOtp(true);
          }}
        />
        {loading && <div className={styles.loadingInline}>{t('common:loading')}</div>}
      </Modal>
    );
  }

  if (showPhoneEntry) {
    return (
      <Modal isOpen={isOpen} onClose={handleClose} title={t('login.enterPhoneTitle')}>
        <PhoneEntryForm
          phoneNumber={phoneNumber}
          onPhoneChange={handlePhoneChange}
          onContinue={handlePhoneContinue}
          onBackToLogin={handleBackToLogin}
        />
        {loading && <div className={styles.loadingInline}>{t('common:loading')}</div>}
      </Modal>
    );
  }

  if (showProfileSelect) {
    return (
      <Modal isOpen={isOpen} onClose={handleClose} title={t('login.profileQuestionTitle')}>
        <ProfileSelection onProfileSelect={handleProfileSelect} />
      </Modal>
    );
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title={t('login.logIn')}>
      <LoginForm
        onSuccess={handleClose}
        onForgot={() => {
          setShowPhoneEntry(true);
        }}
        onSwitchToRegister={handleRegisterClick}
      />
      {loading && <div className={styles.loadingInline}>{t('common:loading')}</div>}
    </Modal>
  );
});

LoginPopup.displayName = 'LoginPopup';
export default LoginPopup;