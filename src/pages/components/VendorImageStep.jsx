import React, { useEffect, useRef, useState } from 'react'
import styles from '../VendorRegister.module.scss'
import CropModal from './CropModal'
import { setImages } from '../../features/vendor/vendorSlice'

export default function VendorImageStep({ vendor, dispatch, onError }) {
  const [previews, setPreviews] = useState({ cover_image: '', fayda_image: '', business_license_image: '' })
  const [cropModal, setCropModal] = useState({ open: false, field: '', file: null })
  const coverRef = useRef(null)
  const faydaRef = useRef(null)
  const blRef = useRef(null)

  // Keep preview URLs in sync with Redux files
  useEffect(() => {
    const next = { ...previews }
    const revoke = []
    ;(['cover_image','fayda_image','business_license_image']).forEach(key => {
      if (vendor.images[key]) {
        const url = URL.createObjectURL(vendor.images[key])
        if (next[key] && next[key] !== url) revoke.push(next[key])
        next[key] = url
      } else {
        if (next[key]) revoke.push(next[key])
        next[key] = ''
      }
    })
    setPreviews(next)
    return () => revoke.forEach(u => URL.revokeObjectURL(u))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vendor.images.cover_image, vendor.images.fayda_image, vendor.images.business_license_image])

  const openCropper = (field, file) => {
    if (!file || !file.type?.startsWith('image/')) {
      if (onError) onError('Please select an image file (JPG, PNG, WebP).')
      return
    }
    setCropModal({ open: true, field, file })
  }

  const onChooseFile = (field, e) => {
    const file = e.target.files?.[0]
    if (!file) return
    openCropper(field, file)
    e.target.value = '' // reset input
  }

  const onApplyCrop = (croppedFile) => {
    dispatch(setImages({ [cropModal.field]: croppedFile }))
    setCropModal({ open: false, field: '', file: null })
  }

  const removeImage = (field) => {
    dispatch(setImages({ [field]: null }))
  }

  return (
    <>
      <div className={styles.uploader}>
        <div className={styles.fileBox}>
          <div className={styles.small}>Cover Image</div>
          <button type="button" className={styles.uploadBtn} onClick={() => coverRef.current?.click()}>Upload Image</button>
          <input ref={coverRef} className={styles.hiddenInput} type="file" accept="image/*" onChange={e => onChooseFile('cover_image', e)} />
          <div className={styles.hint}>We accept images only (JPG, PNG, WebP). You can crop after selecting.</div>
        </div>
        {vendor.type === 'individual' ? (
          <div className={styles.fileBox}>
            <div className={styles.small}>Fayda Image</div>
            <button type="button" className={styles.uploadBtn} onClick={() => faydaRef.current?.click()}>Upload Image</button>
            <input ref={faydaRef} className={styles.hiddenInput} type="file" accept="image/*" onChange={e => onChooseFile('fayda_image', e)} />
            <div className={styles.hint}>Images only. Crop supported.</div>
          </div>
        ) : (
          <div className={styles.fileBox}>
            <div className={styles.small}>Business License Image</div>
            <button type="button" className={styles.uploadBtn} onClick={() => blRef.current?.click()}>Upload Image</button>
            <input ref={blRef} className={styles.hiddenInput} type="file" accept="image/*" onChange={e => onChooseFile('business_license_image', e)} />
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
                <button className={styles.miniBtn} onClick={() => openCropper('cover_image', vendor.images.cover_image)}>Recrop</button>
                <button className={styles.miniBtn} onClick={() => removeImage('cover_image')}>Remove</button>
              </div>
            </div>
          )}
          {previews.fayda_image && (
            <div className={styles.thumb}>
              <img alt="Fayda preview" src={previews.fayda_image} />
              <div className={styles.thumbActions}>
                <button className={styles.miniBtn} onClick={() => openCropper('fayda_image', vendor.images.fayda_image)}>Recrop</button>
                <button className={styles.miniBtn} onClick={() => removeImage('fayda_image')}>Remove</button>
              </div>
            </div>
          )}
          {previews.business_license_image && (
            <div className={styles.thumb}>
              <img alt="Business license preview" src={previews.business_license_image} />
              <div className={styles.thumbActions}>
                <button className={styles.miniBtn} onClick={() => openCropper('business_license_image', vendor.images.business_license_image)}>Recrop</button>
                <button className={styles.miniBtn} onClick={() => removeImage('business_license_image')}>Remove</button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Crop Modal */}
      {cropModal.open && (
        <CropModal
          open={cropModal.open}
          file={cropModal.file}
          onCancel={() => setCropModal({ open: false, field: '', file: null })}
          onApply={onApplyCrop}
        />
      )}
    </>
  )
}
