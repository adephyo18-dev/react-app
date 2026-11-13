import axios from 'axios'
import { useEffect, useState, Fragment } from 'react'
import Header from '../../components/Header'
import './Orders.css'
import { OrdersGrid } from './OrdersGrid'

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
                <OrdersGrid
                    orders={orders}
                />
            </div >
        </>
    );
}
