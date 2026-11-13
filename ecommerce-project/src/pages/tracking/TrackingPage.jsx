import './TrackingPage.css'
import Header from '../../components/Header'
import { Link } from 'react-router'
import { useParams } from 'react-router'
import { useEffect, useState } from 'react'
import axios from 'axios'
import dayjs from 'dayjs'

export default function TrackingPage({ cartItems }) {
    
    const { orderId, productId } = useParams();
    const [orderInfo, setOrderInfo] = useState(null);

    console.log(orderId, productId);

    useEffect(() => {
        const getTrackingInfo = async () => {
            const response = await axios.get(`/api/orders/${orderId}?expand=products`);
            setOrderInfo(response.data);

            // console.log(orderInfo);
            // Fetch tracking information based on orderId and productId
        }
        getTrackingInfo();
    }, [orderId, productId]);

    function getProduct() {
        return orderInfo && orderInfo.products.find(p => p.product.id === productId);
    }

    function getDeliveryProgress() {
        const product = getProduct();
        if (!product) return 0;
        const estimatedDeliveryTime = product.estimatedDeliveryTimeMs;
        const orderTime = orderInfo.orderTimeMs;
        const totalTime = estimatedDeliveryTime - orderTime;
        const timePassedMs = dayjs().valueOf() - orderTime;
        return Math.min(Math.max(timePassedMs / totalTime, 0), 1);
    }


    return (
        <>
            <title>Tracking</title>
            <link rel="icon" type="image/svg+xml" href="images/icons/tracking-favicon.png" />
            <Header cartItems={cartItems} />


            {!orderInfo && null}


            <div className="tracking-page">
                <div className="order-tracking">
                    <Link className="back-to-orders-link link-primary" to="/orders">
                        View all orders
                    </Link>

                    <div className="delivery-date">
                        {getProduct()?.estimatedDeliveryTimeMs && new Date(getProduct()?.estimatedDeliveryTimeMs).toDateString()}
                    </div>

                    <div className="product-info">
                        {getProduct()?.product.name}
                    </div>

                    <div className="product-info">
                        Quantity: {getProduct()?.quantity}
                    </div>

                    <img className="product-image" src={getProduct()?.product.image} />

                    <div className="progress-labels-container">
                        <div className="progress-label">
                            Preparing
                        </div>
                        <div className="progress-label current-status">
                            Shipped
                        </div>
                        <div className="progress-label">
                            Delivered
                        </div>
                    </div>

                    <div className="progress-bar-container">
                        <div className="progress-bar" style={{ width: `${getDeliveryProgress() * 100}%` }}></div>
                    </div>
                </div>
            </div>
        </>
    );
}