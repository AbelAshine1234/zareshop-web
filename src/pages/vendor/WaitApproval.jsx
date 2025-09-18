import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import w from './WaitApproval.module.scss'
import GoToVendorButton from '../../ui/GoToVendorButton'
import { fetchMe, selectIsVendorApproved } from '../../features/auth/authSlice'

export default function WaitApproval() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const token = useSelector((s) => s.auth?.token)
  const approved = useSelector(selectIsVendorApproved)

  // Auto-redirect if vendor becomes approved while on this page
  useEffect(() => {
    let canceled = false
    if (!token) return
    const check = async () => {
      try {
        const me = await dispatch(fetchMe()).unwrap()
        if (canceled) return
        const v = me?.vendor || me?.user?.vendor || {}
        const ok = Boolean((me?.vendorStatus === 'approved') || (v?.isApproved === true && v?.status === true) || (v?.is_approved === true && v?.status === true))
        if (ok) navigate('/vendor', { replace: true })
      } catch (_) { /* ignore on wait page */ }
    }
    const id = setInterval(check, 15000) // 15s quicker check on wait screen
    const onVis = () => { if (document.visibilityState === 'visible') check() }
    document.addEventListener('visibilitychange', onVis)
    check()
    return () => { canceled = true; clearInterval(id); document.removeEventListener('visibilitychange', onVis) }
  }, [navigate, dispatch, token])

  return (
    <div className={w.wrap}>
      <div className={w.stage}>
        <div className={`${w.orb}`} />
        <div className={`${w.orb} ${w.orb2}`} />
        <div className={`${w.orb} ${w.orb3}`} />
        {/* Try to use /logos/zareshop.png (or any image in /logos). If not present, show animated bag fallback */}
        <picture className={w.logoImgWrap}>
          <source srcSet="/logos/zareshop.png" />
          <img className={w.logoImg} src="/logos/zareshop.png" alt="Zareshop" onError={(e)=>{ e.currentTarget.style.display='none'; const sib=e.currentTarget.parentElement?.nextElementSibling; if(sib && sib.classList) sib.classList.remove(w.hidden) }} />
        </picture>
        <div className={`${w.logo} ${w.hidden}`}>
          <div className={w.bag} />
          <span className={`${w.dot} ${w.d1}`} />
          <span className={`${w.dot} ${w.d2}`} />
          <span className={`${w.dot} ${w.d3}`} />
          <span className={`${w.dot} ${w.d4}`} />
        </div>
      </div>
      <div className={w.card}>
        <div className={w.title}>Please Wait</div>
        <p className={w.text}>You do not have an active approved vendor account.</p>
        <p className={w.text}>Please wait up to 24 hours for admin approval or contact support if you believe this is a mistake.</p>
        <div className={w.footer}>
          <div className={w.btnRow}>
            <a className={`${w.btn}`} href="/client">Go to Client</a>
            <a className={`${w.btn} ${w.btnPrimary}`} href="/support">Contact Support</a>
            <GoToVendorButton className={`${w.btn} ${w.btnPrimary}`}>Retry Vendor</GoToVendorButton>
          </div>
        </div>
      </div>
    </div>
  )
}
