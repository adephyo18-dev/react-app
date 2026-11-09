import axios from 'axios'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { formatMoney } from '../../utils/money'
import CheckoutHeader from './CheckoutHeader'
import './CheckoutPage.css'

export default function CheckoutPage({ cartItems }) {

    const [deliveryOptions, setDeliveryOptions] = useState([]);
    const [paymentSummary, setPaymentSummary] = useState([]);

    useEffect(() => {
        axios.get('/api/delivery-options?expand=estimatedDeliveryTime')
            .then(response => setDeliveryOptions(response.data));

        axios.get('/api/payment-summary')
            .then(response => setPaymentSummary(response.data));
    }, []);

    return (
        <>
            <title>Checkout</title>
            <link rel="icon" type="image/svg+xml" href="images/icons/cart-favicon.png" />
            <CheckoutHeader />
            <div className="checkout-page">
                <div className="page-title">Review your order</div>

                <div className="checkout-grid">
                    <div className="order-summary">

                        {deliveryOptions.length > 0 && cartItems.map((item) => {
                            const selectedDeliveryOption = deliveryOptions.find(deliveryOption => {
                                return deliveryOption.id === item.deliveryOptionId;
                            });

                            return (
                                <div className="cart-item-container" key={item.productId}>
                                    <div className="delivery-date">
                                        Delivery date:
                                        {selectedDeliveryOption ? dayjs(selectedDeliveryOption.estimatedDeliveryTimeMs).format('dddd, MMMM D') : 'N/A'}
                                    </div>

                                    <div className="cart-item-details-grid">
                                        <img className="product-image"
                                            src={item.product.image} />

                                        <div className="cart-item-details">
                                            <div className="product-name">
                                                {item.product.name}
                                            </div>
                                            <div className="product-price">
                                                {formatMoney(item.product.priceCents)}
                                            </div>
                                            <div className="product-quantity">
                                                <span>
                                                    Quantity: <span className="quantity-label">{item.quantity}</span>
                                                </span>
                                                <span className="update-quantity-link link-primary">
                                                    Update
                                                </span>
                                                <span className="delete-quantity-link link-primary">
                                                    Delete
                                                </span>
                                            </div>
                                        </div>

                                        <div className="delivery-options">
                                            <div className="delivery-options-title">
                                                Choose a delivery option:
                                            </div>

                                            {deliveryOptions.map((option) => {

                                                let priceString = option.priceCents === 0 ? 'FREE Shipping'
                                                    : formatMoney(option.priceCents);

                                                return (
                                                    <div className="delivery-option" key={option.id}>
                                                        <input type="radio"
                                                            checked={option.id === item.deliveryOptionId}
                                                            className="delivery-option-input"
                                                            name={`delivery-option-${item.productId}`} />
                                                        <div>
                                                            <div className="delivery-option-date">
                                                                {option.estimatedDeliveryTime}
                                                            </div>
                                                            <div className="delivery-option-price">
                                                                {priceString}
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}

                                        </div>
                                    </div>
                                </div>
                            );
                        })}

                    </div>

                    <div className="payment-summary">
                        <div className="payment-summary-title">
                            Payment Summary
                        </div>

                        {paymentSummary && (
                            <>
                                < div className="payment-summary-row">
                                    <div>Items ({paymentSummary.totalItems}):</div>
                                    <div className="payment-summary-money">
                                        {formatMoney(paymentSummary.productCostCents)}
                                    </div>
                                </div>

                                <div className="payment-summary-row">
                                    <div>Shipping &amp; handling:</div>
                                    <div className="payment-summary-money">
                                        {formatMoney(paymentSummary.shippingCostCents)}
                                    </div>
                                </div>

                                <div className="payment-summary-row subtotal-row">
                                    <div>Total before tax:</div>
                                    <div className="payment-summary-money">
                                        {formatMoney(paymentSummary.totalCostBeforeTaxCents)}
                                    </div>
                                </div>

                                <div className="payment-summary-row">
                                    <div>Estimated tax (10%):</div>
                                    <div className="payment-summary-money">
                                        {formatMoney(paymentSummary.taxCents)}
                                    </div>
                                </div>

                                <div className="payment-summary-row total-row">
                                    <div>Order total:</div>
                                    <div className="payment-summary-money">
                                        {formatMoney(paymentSummary.totalCostCents)}
                                    </div>
                                </div>

                                <button className="place-order-button button-primary">
                                    Place your order
                                </button>
                            </>
                        )}


                    </div>
                </div>
            </div >
        </>
    )
}
