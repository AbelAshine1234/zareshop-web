import React, { useCallback } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import PhoneInput from '../shared/PhoneInput';
import styles from './LoginPopup.module.scss';

const PhoneEntryForm = React.memo(({ phoneNumber, onPhoneChange, onContinue, onBackToLogin }) => {
  const { t } = useTranslation('common');

  const handleContinue = useCallback(
    (phone) => {
      console.log('Valid phone number:', phone);
      onContinue(phone);
    },
    [onContinue]
  );

  return (
    <div className={styles.formContainer}>
      <form
        className={styles.loginForm}
        onSubmit={(e) => {
          e.preventDefault();
          handleContinue(phoneNumber);
        }}
      >
        <div className={styles.inputGroup}>
          <label htmlFor="phone" className={styles.label}>
            {t('login.phoneLabel')}
          </label>
          <PhoneInput
            id="phone"
            value={phoneNumber}
            onChange={onPhoneChange}
            onContinue={handleContinue}
            className={styles.phoneInput}
          />
        </div>
        <div className={styles.options}>
          <button type="button" className={styles.linkButton} onClick={onBackToLogin}>
            {t('login.logIn')}
          </button>
          <button type="submit" className={styles.primaryBtn} disabled={!phoneNumber}>
            {t('common:continue')}
          </button>
        </div>
        <div className={styles.phoneTerms}>
          <p>
            <Trans
              i18nKey="login.termsAgreement"
              components={{
                termsLink: <a href="#" className={styles.link} />,
                privacyLink: <a href="#" className={styles.link} />,
              }}
            />
          </p>
        </div>
      </form>
    </div>
  );
});

PhoneEntryForm.displayName = 'PhoneEntryForm';
export default PhoneEntryForm;