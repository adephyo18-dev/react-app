import { formatMoney } from '../../utils/money'
import dayjs from 'dayjs'
import axios from 'axios'

export function DeliveryOptions({ deliveryOptions, cartItem, loadCart }) {

    const updateDeliveryOption = async (optionId) => {
        await axios.put(`/api/cart-items/${cartItem.productId}`, {
            deliveryOptionId: optionId
        });
        await loadCart();
    }
    return (
        <div className="delivery-options">
            <div className="delivery-options-title">
                Choose a delivery option:
            </div>

            {deliveryOptions.map((option) => {

                let priceString = option.priceCents === 0 ? 'FREE Shipping'
                    : formatMoney(option.priceCents);

                return (
                    <div className="delivery-option" key={option.id}
                        onClick={() => updateDeliveryOption(option.id)}>
                        <input type="radio"
                            checked={option.id === cartItem.deliveryOptionId}
                            onChange={() => {}}
                            className="delivery-option-input"
                            name={`delivery-option-${cartItem.productId}`} />
                        <div>
                            <div className="delivery-option-date">
                                {dayjs(option.estimatedDeliveryTimeMs).format('MMMM D, YYYY')}
                            </div>
                            <div className="delivery-option-price">
                                {`${priceString} `}
                            </div>
                        </div>
                    </div>
                );
            })}

        </div>
    )
}