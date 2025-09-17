import React, { useEffect, useRef, useState } from 'react'
import styles from '../VendorRegister.module.scss'

export default function CropModal({ open, file, onCancel, onApply, outSize = 800 }) {
  const cropRef = useRef(null)
  const imgRef = useRef(null)
  const [imgW, setImgW] = useState(0)
  const [imgH, setImgH] = useState(0)
  const [dragging, setDragging] = useState(false)
  const [mode, setMode] = useState(null) // 'move' | 'resize'
  const [corner, setCorner] = useState(null) // 'nw'|'ne'|'sw'|'se'
  const [last, setLast] = useState({ x: 0, y: 0 })
  const [box, setBox] = useState({ x: 0.1, y: 0.1, size: 0.8 }) // normalized

  useEffect(() => {
    // reset when file changes or modal opens
    setBox({ x: 0.1, y: 0.1, size: 0.8 })
    setDragging(false)
    setMode(null)
    setCorner(null)
  }, [file, open])

  if (!open) return null

  const onPointerMove = (e) => {
    const pt = e.touches ? e.touches[0] : e
    if (!dragging) return
    const S = cropRef.current ? cropRef.current.clientWidth : 1
    const dx = (pt.clientX - last.x) / S
    const dy = (pt.clientY - last.y) / S
    setBox(prev => {
      let { x, y, size } = prev
      if (mode === 'move') {
        x = Math.max(0, Math.min(1 - size, x + dx))
        y = Math.max(0, Math.min(1 - size, y + dy))
      } else if (mode === 'resize') {
        if (corner === 'nw') {
          const delta = Math.min(dx, dy)
          x = Math.max(0, x + delta)
          y = Math.max(0, y + delta)
          size = Math.max(0.1, Math.min(1 - x, Math.min(1 - y, size - delta)))
        } else if (corner === 'ne') {
          const delta = Math.min(-dx, dy)
          y = Math.max(0, y + delta)
          size = Math.max(0.1, Math.min(1 - y, Math.min(1 - x, size - delta)))
        } else if (corner === 'sw') {
          const delta = Math.min(dx, -dy)
          x = Math.max(0, x + delta)
          size = Math.max(0.1, Math.min(1 - x, Math.min(1 - y, size - delta)))
        } else if (corner === 'se') {
          const delta = Math.max(dx, dy)
          size = Math.max(0.1, Math.min(1 - x, Math.min(1 - y, size + delta)))
        }
      }
      return { x, y, size }
    })
    setLast({ x: pt.clientX, y: pt.clientY })
  }

  const onDownMove = (e) => {
    const pt = e.touches ? e.touches[0] : e
    setDragging(true)
    setMode('move')
    setCorner(null)
    setLast({ x: pt.clientX, y: pt.clientY })
  }
  const onDownResize = (c) => (e) => {
    const pt = e.touches ? e.touches[0] : e
    setDragging(true)
    setMode('resize')
    setCorner(c)
    setLast({ x: pt.clientX, y: pt.clientY })
    e.stopPropagation()
  }
  const onPointerUp = () => { setDragging(false); setMode(null); setCorner(null) }

  const confirmCrop = async () => {
    if (!file) { onCancel?.(); return }
    const bitmap = await createImageBitmap(file)
    const nw = imgW || bitmap.width
    const nh = imgH || bitmap.height
    const S = cropRef.current ? cropRef.current.clientWidth : 1
    const k = Math.max(S / nw, S / nh)
    const dispW = nw * k
    const dispH = nh * k
    const imgLeft = (S - dispW) / 2
    const imgTop = (S - dispH) / 2
    const cx = box.x * S
    const cy = box.y * S
    const csize = box.size * S
    const sx = Math.max(0, Math.min(nw, Math.round(((cx - imgLeft) / dispW) * nw)))
    const sy = Math.max(0, Math.min(nh, Math.round(((cy - imgTop) / dispH) * nh)))
    const sSize = Math.max(1, Math.round((csize / dispW) * nw))
    const sxClamped = Math.max(0, Math.min(nw - sSize, sx))
    const syClamped = Math.max(0, Math.min(nh - sSize, sy))
    const canvas = document.createElement('canvas')
    canvas.width = outSize
    canvas.height = outSize
    const ctx = canvas.getContext('2d')
    ctx.imageSmoothingQuality = 'high'
    ctx.drawImage(bitmap, sxClamped, syClamped, sSize, sSize, 0, 0, outSize, outSize)
    const blob = await new Promise(res => canvas.toBlob(res, 'image/jpeg', 0.9))
    const croppedFile = new File([blob], file.name.replace(/\.[^.]+$/, '') + '-cropped.jpg', { type: 'image/jpeg' })
    onApply?.(croppedFile)
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal} role="dialog" aria-modal="true" aria-label="Crop image">
        <div className={styles.modalHeader}>Crop Image</div>
        <div className={styles.modalBody}>
          <div
            ref={cropRef}
            className={styles.cropArea}
            onMouseMove={onPointerMove}
            onMouseUp={onPointerUp}
            onMouseLeave={onPointerUp}
            onTouchMove={onPointerMove}
            onTouchEnd={onPointerUp}
          >
            {file && (
              <img
                ref={imgRef}
                className={styles.cropImg}
                alt="to crop"
                src={URL.createObjectURL(file)}
                onLoad={(e) => { setImgW(e.currentTarget.naturalWidth); setImgH(e.currentTarget.naturalHeight) }}
              />
            )}
            <div className={styles.cropShade} />
            <div
              className={styles.cropBox}
              style={{ left: `${box.x * 100}%`, top: `${box.y * 100}%`, width: `${box.size * 100}%`, height: `${box.size * 100}%` }}
              onMouseDown={onDownMove}
              onTouchStart={onDownMove}
            >
              <span className={styles.cropGridV} style={{ left: '33.333%' }} />
              <span className={styles.cropGridV} style={{ left: '66.666%' }} />
              <span className={styles.cropGridH} style={{ top: '33.333%' }} />
              <span className={styles.cropGridH} style={{ top: '66.666%' }} />
              <span className={`${styles.cropHandle} ${styles.hNW}`} onMouseDown={onDownResize('nw')} onTouchStart={onDownResize('nw')} />
              <span className={`${styles.cropHandle} ${styles.hNE}`} onMouseDown={onDownResize('ne')} onTouchStart={onDownResize('ne')} />
              <span className={`${styles.cropHandle} ${styles.hSW}`} onMouseDown={onDownResize('sw')} onTouchStart={onDownResize('sw')} />
              <span className={`${styles.cropHandle} ${styles.hSE}`} onMouseDown={onDownResize('se')} onTouchStart={onDownResize('se')} />
            </div>
          </div>
        </div>
        <div className={styles.modalFooter}>
          <button className={styles.miniBtn} onClick={onCancel}>Cancel</button>
          <button className={styles.miniBtn} onClick={confirmCrop}>Apply Crop</button>
        </div>
      </div>
    </div>
  )
}
