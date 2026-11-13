import dayjs from 'dayjs'


export function DeliveryDate({ deliveryOption }) {
    return (
        <div className="delivery-date">
            Delivery date:
            {deliveryOption ? dayjs(deliveryOption.estimatedDeliveryTimeMs).format('dddd, MMMM D') : 'N/A'}
        </div>
    );
}