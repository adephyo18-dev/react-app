import { useEffect, useState } from 'react'
import axios from 'axios'
import Header from '../../components/Header'
import './HomePage.css'
import { ProductsGrid } from './ProductsGrid'


export default function HomePage({ cartItems }) {

    const [productsData, setProductsData] = useState([]);

    useEffect(() => {
        axios.get('/api/products')
            .then(response => setProductsData(response.data)
            );
    }, []);

    return (
        <>
            <title>Ecommerce Project </title>
            <link rel="icon" type="image/svg+xml" href="images/icons/home-favicon.png" />
            <Header cartItems={cartItems} />
            <div className="home-page">
                <ProductsGrid products={productsData} />
            </div>
        </>
    );
}
