import { Routes, Route } from 'react-router'
import { useEffect, useState } from 'react'
import axios from 'axios'
import NotFoundPage from './pages/404Page'
import HomePage from './pages/HomePage'
import CheckoutPage from './pages/checkout/CheckoutPage'
import OrderPage from './pages/OrderPage'
import TrackingPage from './pages/tracking/TrackingPage'

import './App.css'

function App() {

  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    axios.get('/api/cart-items?expand=product')
      .then(response => setCartItems(response.data)
      );
  }, []);

  return (
    <>
      <Routes>
        <Route index element={<HomePage cartItems={cartItems} />} />
        <Route path="checkout" element={<CheckoutPage cartItems={cartItems} />} />
        <Route path="orders" element={<OrderPage cartItems={cartItems} />} />
        <Route path="tracking" element={<TrackingPage cartItems={cartItems} />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  )
}

export default App
