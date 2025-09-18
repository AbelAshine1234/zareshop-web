import React from 'react'
import s from './ConfirmModal.module.scss'

export default function ConfirmModal({ open, title = 'Are you sure?', message = 'This action cannot be undone.', confirmText = 'Confirm', cancelText = 'Cancel', onConfirm, onCancel, danger = false }) {
  if (!open) return null
  return (
    <div className={s.backdrop} onClick={onCancel}>
      <div className={s.modal} onClick={(e) => e.stopPropagation()}>
        <div className={s.title}>{title}</div>
        <div className={s.message}>{message}</div>
        <div className={s.actions}>
          <button className={s.btn} onClick={onCancel}>{cancelText}</button>
          <button className={`${s.btn} ${danger ? s.btnDanger : s.btnPrimary}`} onClick={onConfirm}>{confirmText}</button>
        </div>
      </div>
    </div>
  )
}
