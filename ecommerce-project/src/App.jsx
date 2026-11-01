import { Routes, Route } from 'react-router'
import NotFoundPage from './pages/404Page'
import  HomePage  from './pages/HomePage'
import  CheckoutPage from './pages/checkout/CheckoutPage'
import  OrderPage from './pages/OrderPage'
import  TrackingPage from './pages/tracking/TrackingPage'

import './App.css'

function App() {

  return (
    <>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="checkout" element={<CheckoutPage />} />
        <Route path="orders" element={<OrderPage />} />
        <Route path="tracking" element={<TrackingPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  )
}

export default App
