import React, { useEffect, useRef, useCallback, lazy, Suspense } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './HomePage.module.scss'
import { fetchProducts } from '../../features/products/clientProductsSlice'
import { selectRecommendations } from '../../store/selectors'
import LoadingSpinner from '../../components/shared/LoadingSpinner'

// Lazy load heavy components
const AllHeader = lazy(() => import('../../components/AllHeader'))
const Categories = lazy(() => import('../../components/Categories'))
const Recommendations = lazy(() => import('../../components/Recommendations'))
const Services = lazy(() => import('../../components/Services'))
const Footer = lazy(() => import('../../components/Footer'))

const HomePage = React.memo(() => {
  const dispatch = useDispatch()
  const recommendations = useSelector(selectRecommendations)
  const leftContentRef = useRef(null)
  const mainLayoutRef = useRef(null)

  const fetchInitialProducts = useCallback(() => {
    dispatch(fetchProducts({ page: 1, limit: 20 }))
  }, [dispatch])

  useEffect(() => {
    fetchInitialProducts()
  }, [fetchInitialProducts])

  return (
    <div className={styles.page}>
      <Suspense fallback={<LoadingSpinner message="Loading header..." />}>
        <AllHeader />
      </Suspense>
      
      <div className="container">
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

      {/* Loading State */}
      {recommendations.loading && (
        <div className="container">
          <div className={styles.loading}>Loading products...</div>
        </div>
      )}
      {recommendations.error && (
        <div className="container">
          <div className={styles.error}>{recommendations.error}</div>
        </div>
      )}
    </div>
  )
})

HomePage.displayName = 'HomePage'

export default HomePage

