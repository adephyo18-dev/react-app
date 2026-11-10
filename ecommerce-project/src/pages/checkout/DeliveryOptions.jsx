import { formatMoney } from '../../utils/money'

export function DeliveryOptions({ deliveryOptions, item }) {
    return (
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
    )
}