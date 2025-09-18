import React from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import HomePage from './HomePage.jsx'

export default function HomeOrAnalytics() {
  const token = useSelector((s) => s.auth?.token)
  const localToken = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null
  const isLoggedIn = Boolean(token || localToken)

  if (isLoggedIn) {
    return <Navigate to="/vendor/analytics" replace />
  }
  return <HomePage />
}
