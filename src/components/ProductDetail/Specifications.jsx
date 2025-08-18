import styles from './Specifications.module.scss';

const Specifications = ({ specifications }) => {
  const specEntries = Object.entries(specifications);

  return (
    <div className={styles.specificationsSection}>
      <div className={styles.specificationsGrid}>
        <div className={styles.specColumn}>
          {specEntries.slice(0, Math.ceil(specEntries.length / 2)).map(([key, value]) => (
            <div key={key} className={styles.specItem}>
              <span className={styles.specLabel}>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:</span>
              <span className={styles.specValue}>{value}</span>
            </div>
          ))}
        </div>
        <div className={styles.specColumn}>
          {specEntries.slice(Math.ceil(specEntries.length / 2)).map(([key, value]) => (
            <div key={key} className={styles.specItem}>
              <span className={styles.specLabel}>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:</span>
              <span className={styles.specValue}>{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Specifications;
