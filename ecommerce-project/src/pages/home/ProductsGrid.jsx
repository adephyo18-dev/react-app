
import { formatMoney } from '../../utils/money'

export function ProductsGrid({ products }) {
    return (
        <div className="products-grid">
            {products.map((product) => {
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
                            <select>
                                {[...Array(10).keys()].map(i => (
                                    <option value={i + 1} key={i + 1}>{i + 1}</option>
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
    );
}