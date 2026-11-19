import { formatMoney } from '../../utils/money'
import axios from 'axios'
import { useState } from 'react'
export default function CartItemDetails({ cartItem, loadCart }) {

    const [quantityUpdate, setQuantityUpdate] = useState(false);

    const deleteCartItem = async () => {
        await axios.delete(`/api/cart-items/${cartItem.productId}`);
        await loadCart();
    }

    const updateCartItemQuantity = async () => {
        await axios.put(`/api/cart-items/${cartItem.productId}`, {
            quantity: cartItem.quantity
        });
        await loadCart();
    }

    const keyDownHandler = (e) => {
        if (e.key === 'Enter') {                                        
            // cartItem.quantity = parseInt(e.target.value);
            updateCartItemQuantity();
        }
        if (e.key === 'Escape') {
            setQuantityUpdate(false);
        }
    }

    return (
        <>
            <img className="product-image"
                src={cartItem.product.image} />

            <div className="cart-item-details">
                <div className="product-name">
                    {cartItem.product.name}
                </div>
                <div className="product-price">
                    {formatMoney(cartItem.product.priceCents)}
                </div>
                <div className="product-quantity">
                    <span>
                        <div>
                            Quantity:
                            <input type="number"
                                value={cartItem.quantity}
                                className='cart-item-quantity'
                                style={{ display: quantityUpdate ? 'block' : 'none' }}
                                onKeyDown={keyDownHandler}
                                onChange={(e) => {
                                    cartItem.quantity = parseInt(e.target.value)
                                    // updateCartItemQuantity();
                                }}
                                onBlur={() => setQuantityUpdate(false)}
                            />
                        </div>
                        <span className="quantity-label"
                            style={{ display: quantityUpdate ? 'none' : 'block' }}>
                            {cartItem.quantity}
                        </span>
                    </span>
                    <span className="update-quantity-link link-primary"
                        onClick={() => setQuantityUpdate(true)}>
                        Update
                    </span>
                    <span className="delete-quantity-link link-primary"
                        onClick={() => deleteCartItem()}>
                        Delete
                    </span>
                </div>
            </div>
        </>
    );
}