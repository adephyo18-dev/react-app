import { useState } from 'react'
import axios from 'axios'
import { formatMoney } from '../../utils/money'

export function Product({ product, loadCart }) {

    const [quantity, setQuantity] = useState(1);
    const [addedToCart, setAddedToCart] = useState(false);

    const addToCart = async () => {
        await axios.post('/api/cart-items', {
            productId: product.id,
            quantity: quantity
        })
        await loadCart();
        setAddedToCart(true);
    }

    const selectQuantity = e => {
        const value = Number(e.target.value)
        setQuantity(value)
    }

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
                {formatMoney(product.priceCents)}
            </div>

            <div className="product-quantity-container">
                <select value={quantity}
                    onChange={selectQuantity}>

                    {[...Array(10).keys()].map(i => (
                        <option value={i + 1} key={i + 1}>{i + 1}</option>
                    ))}
                </select>
            </div>

            <div className="product-spacer"></div>

            <div className="added-to-cart" style={{ opacity: addedToCart ? '1' : '0' }}>
                {addedToCart && setTimeout(() => {
                    setAddedToCart(false);
                }, 2000)}
                <img src="images/icons/checkmark.png" />
                Added
            </div>

            <button className="add-to-cart-button button-primary"
                onClick={addToCart}>
                Add to Cart
            </button>
        </div>
    )
}