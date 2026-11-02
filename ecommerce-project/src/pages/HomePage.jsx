import { useEffect, useState } from 'react'
import axios from 'axios'
import Header from '../components/Header'
import './HomePage.css'


export default function HomePage() {

    const [productsData, setProductsData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/api/products')
            .then(response => setProductsData(response.data)
        );
    }, []);

    return (
        <>
            <title>Ecommerce Project </title>
            <link rel="icon" type="image/svg+xml" href="images/icons/home-favicon.png" />
            <Header />
            <div className="home-page">
                <div className="products-grid">
                    { productsData.map((product) => {
                        return (
                            <div className="product-container" key={product.id}>
                                <div className="product-image-container">
                                    <img className="product-image" src={product.image} />
                                </div>

                                <div className="product-name limit-text-to-2-lines">
                                    {product.name}
                                </div>

                                <div className="product-rating-container">
                                    <img className="product-rating-stars" src={`images/ratings/rating-${product.rating.stars * 10}.png`} />
                                    <div className="product-rating-count link-primary">
                                        {product.ratingCount}
                                    </div>
                                </div>

                                <div className="product-price">
                                    ${(product.priceCents / 100).toFixed(2)}
                                </div>

                                <div className="product-quantity-container">
                                    <select>
                                        {[...Array(10).keys()].map(i => (
                                            <option value={i+1} key={i+1}>{i+1}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="product-spacer"></div>

                                <div className="added-to-cart">
                                    <img src="images/icons/checkmark.png" />
                                    Added
                                </div>

                                <button className="add-to-cart-button button-primary">
                                    Add to Cart
                                </button>
                            </div>
                        )
                    })}
                    
                </div>
            </div>
        </>
    );
}
