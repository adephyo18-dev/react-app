import { Routes, Route } from 'react-router'
import { useEffect, useState } from 'react'
import axios from 'axios'
import NotFoundPage from './pages/404Page'
import HomePage from './pages/home/HomePage'
import CheckoutPage from './pages/checkout/CheckoutPage'
import OrderPage from './pages/orders/OrderPage'
import TrackingPage from './pages/tracking/TrackingPage'

import './App.css'

function App() {

  const [cartItems, setCartItems] = useState([]);

  const loadCart = async () => {
    const response = await axios.get('/api/cart-items?expand=product')
    setCartItems(response.data);
  };

  useEffect(() => {
    loadCart();
  }, []);

  return (
    <>
      <Routes>
        <Route index element={<HomePage cartItems={cartItems} loadCart={loadCart} />} />
        <Route path="checkout" element={<CheckoutPage cartItems={cartItems} />} />
        <Route path="orders" element={<OrderPage cartItems={cartItems} />} />
        <Route path="tracking/:orderId/:productId" element={<TrackingPage cartItems={cartItems} />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  )
}

export default App
