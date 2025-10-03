import React, { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './LoginPopup.module.scss';
import { useAuth } from '../../hooks';

const VendorOtpForm = React.memo(({ phoneNumber, onVerified, onBack }) => {
  const { t } = useTranslation('common');
  const { verifyOtp, resendOtp, loading, error, clear } = useAuth();
  const [code, setCode] = useState('');

  const handleVerify = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        clear();
        await verifyOtp({ phone_number: `+251${phoneNumber}`, code });
        if (onVerified) onVerified();
      } catch (e) {}
    },
    [clear, code, onVerified, phoneNumber, verifyOtp]
  );

  const handleResend = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        clear();
        await resendOtp({ phone_number: `+251${phoneNumber}`, channel: 'sms' });
      } catch (e) {}
    },
    [clear, phoneNumber, resendOtp]
  );

  return (
    <div className={styles.formContainer}>
      <form className={styles.loginForm} onSubmit={handleVerify}>
        <div className={styles.inputGroup}>
          <label htmlFor="otp" className={styles.label}>
            {t('login.enterOtp')}
          </label>
          <input
            id="otp"
            type="text"
            inputMode="numeric"
            className={styles.codeInput}
            placeholder={t('login.enterOtp')}
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/[^0-9]/g, '').slice(0, 8))}
            aria-describedby={error ? 'otp-error' : undefined}
          />
        </div>
        {error && (
          <div id="form-error" className={styles.error} role="alert">
            {error}
          </div>
        )}
        <div className={styles.options}>
          <button type="button" className={styles.linkButton} onClick={onBack}>
            {t('common:back')}
          </button>
          <div className={styles.buttonGroup}>
            <button
              type="button"
              className={styles.linkButton}
              onClick={handleResend}
              disabled={loading}
              aria-label={t('login.resendOtp')}
            >
              {t('login.resendOtp')}
            </button>
            <button
              type="submit"
              className={styles.primaryBtn}
              disabled={loading || code.length < 4}
              aria-busy={loading}
            >
              {loading ? (
                <span className={styles.loadingSpinner}>{t('login.loading')}</span>
              ) : (
                t('login.verifyOtp')
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
});

VendorOtpForm.displayName = 'VendorOtpForm';
export default VendorOtpForm;