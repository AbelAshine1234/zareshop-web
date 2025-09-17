import React, { useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import styles from './Auth.module.scss'
import { forgotPassword as forgotThunk, verifyResetOtp as verifyThunk, resetPassword as resetThunk, setForgotPhone, setForgotOtp } from '../features/auth/authSlice'
import vf from './VendorForgot.module.scss'

export default function VendorForgot() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)
  const step = auth.fp.step
  const loading = auth.fp.loading
  const error = auth.fp.error
  const info = auth.fp.info
  const phone = auth.fp.phoneLocal
  const otp = auth.fp.otp
  const [pwd1, setPwd1] = React.useState('')
  const [pwd2, setPwd2] = React.useState('')

  const progress = Math.round(((step - 1) / 2) * 100)
  const fillStepClass = step === 1 ? vf.progressFill0 : step === 2 ? vf.progressFill50 : vf.progressFill100

  const sendOtp = async (e) => {
    e?.preventDefault()
    await dispatch(forgotThunk(phone))
  }

  const verifyOtp = async (e) => {
    e?.preventDefault()
    await dispatch(verifyThunk({ phoneLocal: phone, code: otp }))
  }

  const resetPassword = async (e) => {
    e?.preventDefault()
    if (pwd1.length < 6) return
    if (pwd1 !== pwd2) return
    await dispatch(resetThunk({ token: auth.fp.resetToken, new_password: pwd1 }))
  }

  useEffect(() => {
    if (auth.fp.info === 'Password reset successfully.') {
      // small delay, then go to login
      setTimeout(() => navigate('/vendor'), 1200)
    }
  }, [auth.fp.info, navigate])

  return (
    <section className={`container ${vf.containerCenter}`}>
      <div className={styles.wrap}>
        <div className={styles.header}>
          <h1 className={styles.title}>Reset Password</h1>
          <div className={styles.small}>
            {step === 1 && 'Enter your phone number to receive an OTP.'}
            {step === 2 && 'Enter the OTP sent to your phone.'}
            {step === 3 && 'Set a new password for your account.'}
          </div>
        </div>

        {/* Progress bar */}
        <div className={`${styles.card} ${vf.progressCard}`}>
          <div className={vf.progressBar}>
            <div className={`${vf.progressFill} ${fillStepClass}`} />
          </div>
          <div className={vf.cardPadding}>
            {step === 1 && (
              <form onSubmit={sendOtp}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Phone Number</label>
                  <div className={styles.phoneInputGroup}>
                    <span className={styles.prefix}>+251</span>
                    <input
                      className={`${styles.input} ${styles.phoneInput}`}
                      placeholder="9XXXXXXXX"
                      value={phone}
                      onChange={(e) => dispatch(setForgotPhone(e.target.value.replace(/\D/g, '').slice(0, 9)))}
                      maxLength={9}
                    />
                  </div>
                  <div className={styles.hint}>We’ll send a 4–6 digit OTP to this number.</div>
                </div>
                {error && <div className={styles.error}>{error}</div>}
                {info && <div className={`${styles.small} ${vf.successText}`}>{info}</div>}
                <div className={styles.actions}>
                  <Link to="/vendor" className={styles.link}>Back to login</Link>
                  <button className="button buttonPrimary" type="submit" disabled={loading}>
                    {loading ? 'Sending...' : 'Send OTP'}
                  </button>
                </div>
              </form>
            )}

            {step === 2 && (
              <form onSubmit={verifyOtp}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>OTP Code</label>
                  <input
                    className={styles.input}
                    placeholder="Enter the code"
                    value={otp}
                    onChange={(e) => dispatch(setForgotOtp(e.target.value.replace(/\D/g, '').slice(0, 6)))}
                    maxLength={6}
                  />
                </div>
                {error && <div className={styles.error}>{error}</div>}
                {info && <div className={`${styles.small} ${vf.successText}`}>{info}</div>}
                <div className={styles.actions}>
                  <button type="button" className={styles.link} onClick={() => navigate('/vendor/forgot')}>Change phone</button>
                  <button className="button buttonPrimary" type="submit" disabled={loading}>
                    {loading ? 'Verifying...' : 'Verify OTP'}
                  </button>
                </div>
              </form>
            )}

            {step === 3 && (
              <form onSubmit={resetPassword}>
                <div className={styles.row}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>New Password</label>
                    <input
                      className={styles.input}
                      type="password"
                      placeholder="Enter new password"
                      value={pwd1}
                      onChange={(e) => setPwd1(e.target.value)}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Confirm Password</label>
                    <input
                      className={styles.input}
                      type="password"
                      placeholder="Confirm new password"
                      value={pwd2}
                      onChange={(e) => setPwd2(e.target.value)}
                    />
                  </div>
                </div>
                {error && <div className={styles.error}>{error}</div>}
                {info && <div className={`${styles.small} ${vf.successText}`}>{info}</div>}
                <div className={styles.actions}>
                  <button type="button" className={styles.link} onClick={() => navigate('/vendor/forgot')}>Back</button>
                  <button className="button buttonPrimary" type="submit" disabled={loading}>
                    {loading ? 'Resetting...' : 'Reset Password'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        <div className={`${styles.small} ${vf.footerHelp}`}>
          Need help? <a href="#" className={styles.link}>Contact support</a>
        </div>
      </div>
    </section>
  )
}
