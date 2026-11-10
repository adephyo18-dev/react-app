import axios from 'axios'
import { useEffect, useState } from 'react'
import CheckoutHeader from './CheckoutHeader'
import { OrderSummary } from './OrderSummary'
import { PaymentSummary } from './PaymentSummary'
import './CheckoutPage.css'

export default function CheckoutPage({ cartItems }) {

    const [deliveryOptions, setDeliveryOptions] = useState([]);
    const [paymentSummary, setPaymentSummary] = useState([]);

    useEffect(() => {

        const fetchCheckOutData = async () => {
            let response = await axios.get('/api/delivery-options?expand=estimatedDeliveryTime')
            setDeliveryOptions(response.data);

            response = await axios.get('/api/payment-summary');
            setPaymentSummary(response.data);
        }
        fetchCheckOutData();
    }, []);

    return (
        <>
            <title>Checkout</title>
            <link rel="icon" type="image/svg+xml" href="images/icons/cart-favicon.png" />
            <CheckoutHeader />
            <div className="checkout-page">
                <div className="page-title">Review your order</div>

                <div className="checkout-grid">
                    <OrderSummary
                        cart={cartItems}
                        deliveryOptions={deliveryOptions}
                    />

                    <PaymentSummary paymentSummary={paymentSummary} />
                </div>
            </div >
        </>
    )
}
