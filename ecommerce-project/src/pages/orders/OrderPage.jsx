import axios from 'axios'
import { useEffect, useState, Fragment } from 'react'
import dayjs from 'dayjs'
import { formatMoney } from '../../utils/money'
import Header from '../../components/Header'
import './Orders.css'
import { Link } from 'react-router'
import { OrderDetailGrid } from './OrderDetailsGrid'

export default function OrderPage({ cartItems }) {

    const [orders, setOrders] = useState([]);

    useEffect(() => {

        const getOrderData = async () => {
            const response = await axios.get('/api/orders?expand=products');
            setOrders(response.data);
        }
        getOrderData();
    }, []);

    return (
        <>
            <title>Orders</title>
            <link rel="icon" type="image/svg+xml" href="images/icons/orders-favicon.png" />
            <Header cartItems={cartItems} />
            <div className="orders-page">
                <div className="page-title">Your Orders</div>

                <div className="orders-grid">
                    {orders.map((order) => {
                        return (
                            <div key={order.id} className="order-container">
                                <div className="order-header">
                                    <div className="order-header-left-section">
                                        <div className="order-date">
                                            <div className="order-header-label">Order Placed:</div>
                                            <div>{dayjs(order.orderTimeMs).format('MMMM D, YYYY')}</div>
                                        </div>
                                        <div className="order-total">
                                            <div className="order-header-label">Total:</div>
                                            <div>{formatMoney(order.totalCents)}</div>
                                        </div>
                                    </div>

                                    <div className="order-header-right-section">
                                        <div className="order-header-label">Order ID:</div>
                                        <div>{order.id} </div>
                                    </div>
                                </div>


                                <OrderDetailGrid order={order} />
                            </div>
                        );
                    })}
                </div >
            </div >
        </>
    );
}
