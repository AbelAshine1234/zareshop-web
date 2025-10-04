import React, { useRef, lazy, Suspense } from 'react'
import { useSelector } from 'react-redux'
import styles from './HomePage.module.scss'
import { selectRecommendations } from '../../store/selectors'
import LoadingSpinner from '../../components/shared/LoadingSpinner'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'

// Lazy load heavy components
const AllHeader = lazy(() => import('../../components/AllHeader'))
const Categories = lazy(() => import('../../components/Categories'))
const Recommendations = lazy(() => import('../../components/Recommendations'))
const Services = lazy(() => import('../../components/Services'))
const Footer = lazy(() => import('../../components/Footer'))

const HomePage = React.memo(() => {
  const recommendations = useSelector(selectRecommendations)
  const leftContentRef = useRef(null)
  const mainLayoutRef = useRef(null)

  // Fetch a small batch of products for homepage freshness (cached by React Query)
  const baseUrl = import.meta.env.VITE_API_URL || '/api'
  const { isLoading, isError, error } = useQuery({
    queryKey: ['products', 'list', { page: 1 }],
    queryFn: async () => {
      const res = await fetch(`${baseUrl}/products?page=1`)
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body?.error || res.statusText)
      }
      return res.json()
    },
    staleTime: 60_000,
  })

  return (
    <div className={styles.page}>
      <Suspense fallback={<LoadingSpinner message="Loading header..." />}>
        <AllHeader />
      </Suspense>
      
      <div className="container">
        {/* Quick navigation */}
        <nav className={styles.quickNav} aria-label="Quick navigation">
          <Link to="/products" className={styles.quickLink}>Browse Products</Link>
          {/* <Link to="/users" className={styles.quickLink}>Users</Link> */}
          <Link to="/wishlist" className={styles.quickLink}>My Wishlist</Link>
        </nav>

        <div className={styles.mainLayout} ref={mainLayoutRef}>
          {/* Left Content */}
          <div className={styles.leftContent} ref={leftContentRef}>
            {/* Categories Section */}
            <Suspense fallback={<LoadingSpinner size="small" message="Loading categories..." />}>
              <Categories />
            </Suspense>
            <Suspense fallback={<LoadingSpinner size="small" message="Loading recommendations..." />}>
              <Recommendations {...recommendations} />
            </Suspense>
          </div>

          {/* Right Sidebar */}
          <div className={styles.rightSidebar}>
            <Suspense fallback={<LoadingSpinner size="small" message="Loading services..." />}>
              <Services />
            </Suspense>
            <div style={{ marginTop: 16 }}>
              <Suspense fallback={<LoadingSpinner size="small" />}>
                <Footer />
              </Suspense>
            </div>
          </div>
        </div>
      </div>

      {/* Loading State (products fetch) */}
      {isLoading && (
        <div className="container">
          <div className={styles.loading}>Loading products...</div>
        </div>
      )}
      {isError && (
        <div className="container">
          <div className={styles.error}>{error?.message || 'Failed to load products'}</div>
        </div>
      )}
    </div>
  )
})

HomePage.displayName = 'HomePage'

export default HomePage

