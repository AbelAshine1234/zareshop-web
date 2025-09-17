import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'

import './styles/global.scss'
import AppLayout from './ui/AppLayout.jsx'
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
import VendorAnalytics from './pages/VendorAnalytics.jsx'
import VendorForgot from './pages/VendorForgot.jsx'
import store from './store/store'

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'products', element: <ProductList /> },
      { path: 'products/:id', element: <ProductDetails /> },
      { path: 'cart', element: <Cart /> },
      { path: 'checkout', element: <Checkout /> },
      { path: 'orders', element: <Orders /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: 'admin', element: <AdminDashboard /> },
      { path: 'admin/products/new', element: <AddProductForm /> },
      { path: 'vendor', element: <VendorAccount /> },
      { path: 'vendor/analytics', element: <VendorAnalytics /> },
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
