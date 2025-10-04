import React, { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './LoginPopup.module.scss';
import { useSelector } from 'react-redux';
import { useAuth } from '../../hooks';

const NewPasswordForm = React.memo(({ onDone, onBack }) => {
  const { t } = useTranslation('common');
  const { reset, loading, error, clear } = useAuth();
  const resetToken = useSelector((s) => s.auth?.fp?.resetToken);
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const handleSet = useCallback(
    async (e) => {
      e.preventDefault();
      if (!resetToken || !password || password !== confirm) return;
      try {
        clear();
        await reset({ token: resetToken, new_password: password });
        if (onDone) onDone();
      } catch (e) {}
    },
    [clear, confirm, onDone, password, reset, resetToken]
  );

  return (
    <div className={styles.formContainer}>
      <form className={styles.loginForm} onSubmit={handleSet}>
        <div className={styles.inputGroup}>
          <label htmlFor="new-password" className={styles.label}>
            {t('login.newPassword')}
          </label>
          <input
            id="new-password"
            type="password"
            className={styles.textInput}
            placeholder={t('login.newPassword')}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-describedby={error ? 'new-password-error' : undefined}
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="confirm-password" className={styles.label}>
            {t('login.confirmPassword')}
          </label>
          <input
            id="confirm-password"
            type="password"
            className={styles.textInput}
            placeholder={t('login.confirmPassword')}
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            aria-describedby={error ? 'confirm-password-error' : undefined}
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
            disabled={loading || !password || password !== confirm}
            aria-busy={loading}
          >
            {loading ? (
              <span className={styles.loadingSpinner}>{t('login.loading')}</span>
            ) : (
              t('login.setPassword')
            )}
          </button>
        </div>
      </form>
    </div>
  );
});

NewPasswordForm.displayName = 'NewPasswordForm';
export default NewPasswordForm;