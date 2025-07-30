import React from 'react';
import { connect } from 'react-redux';
import { removeFromCart, updateQuantity } from '../../actions/cart';
import PropTypes from 'prop-types';

const Cart = ({ cart: { items }, removeFromCart, updateQuantity }) => {
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div className="cart">
            <h2>Your Cart</h2>
            {items.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <>
                    <ul>
                        {items.map(item => (
                            <li key={item.id}>
                                <div>
                                    <h4>{item.name}</h4>
                                    <p>${item.price}</p>
                                </div>
                                <div>
                                    <input
                                        type="number"
                                        min="1"
                                        value={item.quantity}
                                        onChange={e => updateQuantity(item.id, parseInt(e.target.value))}
                                    />
                                    <button onClick={() => removeFromCart(item.id)}>Remove</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="total">
                        <h3>Total: ${total.toFixed(2)}</h3>
                    </div>
                    <button className="checkout-btn">Proceed to Checkout</button>
                </>
            )}
        </div>
    );
};

Cart.propTypes = {
    cart: PropTypes.object.isRequired,
    removeFromCart: PropTypes.func.isRequired,
    updateQuantity: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    cart: state.cart
});

export default connect(mapStateToProps, { removeFromCart, updateQuantity })(Cart);
