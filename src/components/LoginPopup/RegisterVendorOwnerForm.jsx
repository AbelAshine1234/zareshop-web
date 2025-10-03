import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './LoginPopup.module.scss';
import PhoneInput from '../shared/PhoneInput';

const RegisterVendorOwnerForm = React.memo(({ onSubmit, onBack }) => {
  const { t } = useTranslation('common');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneLocal, setPhoneLocal] = useState('');
  const [password, setPassword] = useState('');

  const canSubmit = name.trim().length >= 2 && phoneLocal.length === 9 && password.length >= 6;

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!canSubmit) return;
      onSubmit({ name: name.trim(), email: email.trim(), phoneLocal, password });
    },
    [canSubmit, email, name, onSubmit, password, phoneLocal]
  );

  return (
    <div className={styles.formContainer}>
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <label htmlFor="name" className={styles.label}>
            {t('profile.fullName')}
          </label>
          <input
            id="name"
            type="text"
            className={styles.textInput}
            placeholder={t('profile.fullName')}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="email" className={styles.label}>
            {t('profile.emailOptional')}
          </label>
          <input
            id="email"
            type="email"
            className={styles.textInput}
            placeholder={t('profile.emailOptional')}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="phone" className={styles.label}>
            {t('login.phoneLabel')}
          </label>
          <PhoneInput
            id="phone"
            value={phoneLocal}
            onChange={setPhoneLocal}
            className={styles.phoneInput}
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
          />
        </div>
        <div className={styles.options}>
          <button type="button" className={styles.linkButton} onClick={onBack}>
            {t('common:back')}
          </button>
          <button
            type="submit"
            className={styles.primaryBtn}
            disabled={!canSubmit}
            aria-busy={false}
          >
            {t('login.createAccount')}
          </button>
        </div>
      </form>
    </div>
  );
});

RegisterVendorOwnerForm.displayName = 'RegisterVendorOwnerForm';
export default RegisterVendorOwnerForm;