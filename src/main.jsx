import React, { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'

import './styles/global.scss'
import './locales' // Initialize i18n
import store from './store/store'
import LoadingSpinner from './components/shared/LoadingSpinner'
import ErrorBoundary from './components/shared/ErrorBoundary'

// Lazy load pages for better code splitting
const HomePage = lazy(() => import('./pages/HomePage'))
const CategoryPage = lazy(() => import('./pages/CategoryPage'))
const SupplierPage = lazy(() => import('./pages/SupplierPage'))
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage'))

const PageWithSuspense = ({ Component }) => (
  <ErrorBoundary>
    <Suspense fallback={<LoadingSpinner />}>
      <Component />
    </Suspense>
  </ErrorBoundary>
)

const router = createBrowserRouter([
  { path: '/', element: <PageWithSuspense Component={HomePage} /> },
  { path: '/category/:categoryId', element: <PageWithSuspense Component={CategoryPage} /> },
  { path: '/supplier/:supplierId', element: <PageWithSuspense Component={SupplierPage} /> },
  { path: '/product/:id', element: <PageWithSuspense Component={ProductDetailPage} /> },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>,
)
