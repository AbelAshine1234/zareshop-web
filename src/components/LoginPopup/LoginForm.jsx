import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import PhoneInput from '../shared/PhoneInput';
import styles from './LoginPopup.module.scss';
import { useAuth } from '../../hooks';

const LoginForm = React.memo(({ onSuccess, onForgot, onSwitchToRegister }) => {
  const { t } = useTranslation('common');
  const { login, loading, error, clear, me } = useAuth();
  const [phoneLocal, setPhoneLocal] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        clear();
        await login(phoneLocal, password, true);
        await me();
        if (onSuccess) onSuccess();
      } catch (e) {
        console.error(e);
      }
    },
    [clear, login, onSuccess, password, phoneLocal, me]
  );

  return (
    <div className={styles.formContainer}>
      <form className={styles.loginForm} onSubmit={handleLogin}>
        <div className={styles.inputGroup}>
          <label htmlFor="phone" className={styles.label}>
            {t('login.phoneLabel')}
          </label>
          <PhoneInput
            id="phone"
            value={phoneLocal}
            onChange={setPhoneLocal}
            className={styles.phoneInput}
            aria-describedby={error ? 'phone-error' : undefined}
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="password" className={styles.label}>
            {t('login.passwordLabel')}
          </label>
          <input
            id="password"
            type="password"
            className={styles.textInput}
            placeholder={t('login.password')}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-describedby={error ? 'password-error' : undefined}
          />
        </div>
        {error && (
          <div id="form-error" className={styles.error} role="alert">
            {error}
          </div>
        )}
        <button
          type="submit"
          className={styles.primaryBtn}
          disabled={loading || phoneLocal.length !== 9 || !password}
          aria-busy={loading}
        >
          {loading ? (
            <span className={styles.loadingSpinner}>{t('login.loading')}</span>
          ) : (
            t('login.logIn')
          )}
        </button>
        <div className={styles.options}>
          <button
            type="button"
            className={styles.linkButton}
            onClick={onForgot}
            aria-label={t('login.forgotPassword')}
          >
            {t('login.forgotPassword')}
          </button>
          <button
            type="button"
            className={styles.linkButton}
            onClick={onSwitchToRegister}
            aria-label={t('login.createAccount')}
          >
            {t('login.createAccount')}
          </button>
        </div>
      </form>
    </div>
  );
});

LoginForm.displayName = 'LoginForm';
export default LoginForm;