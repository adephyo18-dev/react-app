import { DeliveryOptions } from './DeliveryOptions';
import CartItemDetails from './CartItemDetails';
import { DeliveryDate } from './DeliveryDate';

export function OrderSummary({ cart, deliveryOptions }) {
    return (
        <div className="order-summary">

            {deliveryOptions.length > 0 && cart.map((item) => {
                const selectedDeliveryOption = deliveryOptions.find(deliveryOption => {
                    return deliveryOption.id === item.deliveryOptionId;
                });

                return (
                    <div className="cart-item-container" key={item.productId}>
                        
                        <DeliveryDate deliveryOption={selectedDeliveryOption} />

                        <div className="cart-item-details-grid">
                            
                           <CartItemDetails
                               item={item}
                           />

                            <DeliveryOptions
                                deliveryOptions={deliveryOptions}
                                item={item}
                            />
                        </div>
                    </div>
                );
            })}

        </div>
    );
}