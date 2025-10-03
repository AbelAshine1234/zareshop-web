import { useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  login,
  fetchMe,
  logout as logoutAction,
  clearAuthMessages,
  forgotPassword,
  verifyResetOtp,
  resetPassword,
  registerVendorOwner,
  verifyOtp,
  resendOtp,
} from '../features/auth/authSlice'

export function useAuth({ autoMe = false } = {}) {
  const dispatch = useDispatch()
  const auth = useSelector((s) => s.auth)

  useEffect(() => {
    if (autoMe && auth.token && !auth.user) {
      dispatch(fetchMe())
    }
  }, [autoMe, auth.token, auth.user, dispatch])

  const doLogin = useCallback((identifier, password, isPhone = false) => {
    return dispatch(login({ identifier, password, isPhone }))
  }, [dispatch])

  const doLogout = useCallback(() => dispatch(logoutAction()), [dispatch])

  return {
    ...auth,
    // actions
    login: doLogin,
    logout: doLogout,
    me: () => dispatch(fetchMe()),
    clear: () => dispatch(clearAuthMessages()),
    // forgot/reset
    forgot: (phoneLocal) => dispatch(forgotPassword(phoneLocal)),
    verifyReset: (args) => dispatch(verifyResetOtp(args)),
    reset: (args) => dispatch(resetPassword(args)),
    // vendor owner OTP flow
    registerVendorOwner: (formData) => dispatch(registerVendorOwner(formData)),
    verifyOtp: (body) => dispatch(verifyOtp(body)),
    resendOtp: (body) => dispatch(resendOtp(body)),
  }
}
