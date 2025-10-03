import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './LoginPopup.module.scss';

const ProfileOption = React.memo(({ title, description, onClick, type }) => (
  <button
    className={styles.profileOption}
    onClick={() => onClick(type)}
    type="button"
    aria-label={title}
  >
    <div className={styles.profileTitle}>{title}</div>
    <div className={styles.profileDescription}>{description}</div>
  </button>
));

ProfileOption.displayName = 'ProfileOption';

const ProfileSelection = React.memo(({ onProfileSelect }) => {
  const { t } = useTranslation('common');

  const handleProfileSelect = useCallback(
    (profileType) => {
      console.log('Selected profile type:', profileType);
      onProfileSelect(profileType);
    },
    [onProfileSelect]
  );

  return (
    <div className={styles.formContainer}>
      <div className={styles.profileOptions}>
        <ProfileOption
          type="personal"
          title={t('profile.personalProfile')}
          description={t('profile.personalDescription')}
          onClick={handleProfileSelect}
        />
        <ProfileOption
          type="business"
          title={t('profile.businessProfile')}
          description={t('profile.businessDescription')}
          onClick={handleProfileSelect}
        />
      </div>
    </div>
  );
});

ProfileSelection.displayName = 'ProfileSelection';
export default ProfileSelection;