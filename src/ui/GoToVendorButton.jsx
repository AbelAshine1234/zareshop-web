import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { showLoading, hideLoading } from '../features/ui/loadingSlice'
import { fetchMe, selectIsVendorApproved } from '../features/auth/authSlice'

export default function GoToVendorButton({ className = 'button buttonPrimary', children = 'Go to Vendor' }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const token = useSelector((s) => s.auth?.token)
  const isApproved = useSelector(selectIsVendorApproved)
  const [busy, setBusy] = useState(false)

  const handleClick = async () => {
    // 1) Not logged in → vendor registration
    if (!token) {
      navigate('/vendor/register')
      return
    }

    // 2/3) Logged in → check approval via Redux thunk
    try {
      setBusy(true)
      dispatch(showLoading({ message: 'Checking your vendor account…' }))
      const me = await dispatch(fetchMe()).unwrap()
      const v = me?.vendor || me?.user?.vendor || {}
      const approvedNow = Boolean((me?.vendorStatus === 'approved') || (v?.isApproved === true && v?.status === true) || (v?.is_approved === true && v?.status === true))
      if (approvedNow) navigate('/vendor')
      else navigate('/vendor/wait')
    } catch (e) {
      // if API fails, be conservative and send to wait page
      navigate('/vendor/wait')
    } finally {
      setBusy(false)
      dispatch(hideLoading())
    }
  }

  return (
    <button type="button" className={className} onClick={handleClick} disabled={busy}>
      {children}
    </button>
  )
}
