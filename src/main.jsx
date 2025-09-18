import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'

import './styles/global.scss'
import AppLayout from './ui/AppLayout.jsx'
import HomeOrAnalytics from './pages/HomeOrAnalytics.jsx'
import HomePage from './pages/HomePage.jsx'
import ProductList from './pages/ProductList.jsx'
import ProductDetails from './pages/ProductDetails.jsx'
import Cart from './pages/Cart.jsx'
import Checkout from './pages/Checkout.jsx'
import Orders from './pages/Orders.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import AdminDashboard from './pages/AdminDashboard.jsx'
import AddProductForm from './pages/AddProductForm.jsx'
import VendorRegister from './pages/VendorRegister.jsx'
import VendorAccount from './pages/VendorAccount.jsx'
import VendorAnalytics from './pages/vendor/VendorAnalytics.jsx'
import VendorForgot from './pages/VendorForgot.jsx'
import VendorLayout from './pages/vendor/VendorLayout.jsx'
import VendorOrders from './pages/vendor/VendorOrders.jsx'
import VendorReviews from './pages/vendor/VendorReviews.jsx'
import VendorProducts from './pages/vendor/VendorProducts.jsx'
import VendorSales from './pages/vendor/VendorSales.jsx'
import VendorNotifications from './pages/vendor/VendorNotifications.jsx'
import VendorFinance from './pages/vendor/VendorFinance.jsx'
import VendorShipping from './pages/vendor/VendorShipping.jsx'
import VendorPayment from './pages/vendor/VendorPayment.jsx'
import VendorLogin from './pages/vendor/VendorLogin.jsx'
import VendorProductCreate from './pages/vendor/VendorProductCreate.jsx'
import VendorProductDetail from './pages/vendor/VendorProductDetail.jsx'
import Support from './pages/Support.jsx'
import WaitApproval from './pages/vendor/WaitApproval.jsx'
import store from './store/store'

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <HomeOrAnalytics /> },
      { path: 'products', element: <ProductList /> },
      { path: 'products/:id', element: <ProductDetails /> },
      { path: 'cart', element: <Cart /> },
      { path: 'checkout', element: <Checkout /> },
      { path: 'orders', element: <Orders /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: 'admin', element: <AdminDashboard /> },
      { path: 'admin/products/new', element: <AddProductForm /> },
      { path: 'support', element: <Support /> },
      { path: 'vendor/wait', element: <WaitApproval /> },
      // Dedicated client home to bypass HomeOrAnalytics vendor redirect
      { path: 'client', element: <HomePage /> },
      {
        path: 'vendor',
        element: <VendorLayout />,
        children: [
          { index: true, element: <VendorAnalytics /> },
          { path: 'analytics', element: <VendorAnalytics /> },
          { path: 'orders', element: <VendorOrders /> },
          { path: 'reviews', element: <VendorReviews /> },
          { path: 'products', element: <VendorProducts /> },
          { path: 'products/new', element: <VendorProductCreate /> },
          { path: 'products/:id', element: <VendorProductDetail /> },
          { path: 'shipping', element: <VendorShipping /> },
          { path: 'payment', element: <VendorPayment /> },
          { path: 'sales', element: <VendorSales /> },
          { path: 'finance', element: <VendorFinance /> },
          { path: 'notifications', element: <VendorNotifications /> },
          { path: 'account', element: <VendorAccount /> },
        ]
      },
      { path: 'vendor/login', element: <VendorLogin /> },
      { path: 'vendor/forgot', element: <VendorForgot /> },
      { path: 'vendor/register', element: <VendorRegister /> },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
