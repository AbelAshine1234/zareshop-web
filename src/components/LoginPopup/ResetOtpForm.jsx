import React, { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './LoginPopup.module.scss';
import { useAuth } from '../../hooks';

const ResetOtpForm = React.memo(({ phoneLocal, onVerified, onBack }) => {
  const { t } = useTranslation('common');
  const { verifyReset, loading, error, clear } = useAuth();
  const [code, setCode] = useState('');

  const handleVerify = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        clear();
        await verifyReset({ phoneLocal, code });
        if (onVerified) onVerified();
      } catch (e) {}
    },
    [clear, code, onVerified, phoneLocal, verifyReset]
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
      </form>
    </div>
  );
});

ResetOtpForm.displayName = 'ResetOtpForm';
export default ResetOtpForm;