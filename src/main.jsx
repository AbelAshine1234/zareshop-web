import React, { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

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
const WishlistPage = lazy(() => import('./pages/WishlistPage'))
const UsersPage = lazy(() => import('./pages/UsersPage'))
const ProductsPage = lazy(() => import('./pages/ProductsPage'))

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
  { path: '/wishlist', element: <PageWithSuspense Component={WishlistPage} /> },
  { path: '/users', element: <PageWithSuspense Component={UsersPage} /> },
  { path: '/products', element: <PageWithSuspense Component={ProductsPage} /> },
])

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      gcTime: 5 * 60_000,
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          {import.meta.env.DEV && (
            <ReactQueryDevtools
              initialIsOpen={true}
              position="right"
              buttonPosition="bottom-left"
              panelProps={{ style: { zIndex: 2147483647 } }}
              toggleButtonProps={{ style: { zIndex: 2147483647 } }}
            />
          )}
        </QueryClientProvider>
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>,
)
