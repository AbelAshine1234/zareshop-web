import React, { useRef } from 'react'
import styles from '../VendorRegister.module.scss'

export default function DocumentsStep({ vendorType, previews, onPick, onRecrop, onRemove }) {
  const coverRef = useRef(null)
  const faydaRef = useRef(null)
  const blRef = useRef(null)

  return (
    <>
      <div className={styles.uploader}>
        <div className={styles.fileBox}>
          <div className={styles.small}>Cover Image</div>
          <button type="button" className={styles.uploadBtn} onClick={() => coverRef.current?.click()}>Upload Image</button>
          <input ref={coverRef} className={styles.hiddenInput} type="file" accept="image/*" onChange={e => onPick('cover_image', e)} />
          <div className={styles.hint}>We accept images only (JPG, PNG, WebP). You can crop after selecting.</div>
        </div>
        {vendorType === 'individual' ? (
          <div className={styles.fileBox}>
            <div className={styles.small}>Fayda Image</div>
            <button type="button" className={styles.uploadBtn} onClick={() => faydaRef.current?.click()}>Upload Image</button>
            <input ref={faydaRef} className={styles.hiddenInput} type="file" accept="image/*" onChange={e => onPick('fayda_image', e)} />
            <div className={styles.hint}>Images only. Crop supported.</div>
          </div>
        ) : (
          <div className={styles.fileBox}>
            <div className={styles.small}>Business License Image</div>
            <button type="button" className={styles.uploadBtn} onClick={() => blRef.current?.click()}>Upload Image</button>
            <input ref={blRef} className={styles.hiddenInput} type="file" accept="image/*" onChange={e => onPick('business_license_image', e)} />
            <div className={styles.hint}>Images only. Crop supported.</div>
          </div>
        )}
      </div>

      {(previews.cover_image || previews.fayda_image || previews.business_license_image) && (
        <div className={styles.previews}>
          {previews.cover_image && (
            <div className={styles.thumb}>
              <img alt="Cover preview" src={previews.cover_image} />
              <div className={styles.thumbActions}>
                <button className={styles.miniBtn} onClick={() => onRecrop('cover_image')}>Recrop</button>
                <button className={styles.miniBtn} onClick={() => onRemove('cover_image')}>Remove</button>
              </div>
            </div>
          )}
          {previews.fayda_image && (
            <div className={styles.thumb}>
              <img alt="Fayda preview" src={previews.fayda_image} />
              <div className={styles.thumbActions}>
                <button className={styles.miniBtn} onClick={() => onRecrop('fayda_image')}>Recrop</button>
                <button className={styles.miniBtn} onClick={() => onRemove('fayda_image')}>Remove</button>
              </div>
            </div>
          )}
          {previews.business_license_image && (
            <div className={styles.thumb}>
              <img alt="Business license preview" src={previews.business_license_image} />
              <div className={styles.thumbActions}>
                <button className={styles.miniBtn} onClick={() => onRecrop('business_license_image')}>Recrop</button>
                <button className={styles.miniBtn} onClick={() => onRemove('business_license_image')}>Remove</button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  )
}
