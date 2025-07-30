import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createOrder } from '../../actions/order';
import PropTypes from 'prop-types';

const Checkout = ({ cart: { items }, createOrder, history }) => {
    const [formData, setFormData] = useState({
        paymentMethod: 'credit_card',
        deliveryInstructions: ''
    });

    const { paymentMethod, deliveryInstructions } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        const restaurantId = items[0].restaurantId; // Assuming all items are from the same restaurant
        const orderItems = items.map(item => ({
            name: item.name,
            price: item.price,
            quantity: item.quantity
        }));
        const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        
        createOrder(restaurantId, orderItems, total, paymentMethod);
        history.push('/orders');
    };

    return (
        <div className="checkout">
            <h2>Checkout</h2>
            <form onSubmit={onSubmit}>
                <div>
                    <h3>Payment Method</h3>
                    <select name="paymentMethod" value={paymentMethod} onChange={onChange}>
                        <option value="credit_card">Credit Card</option>
                        <option value="paypal">PayPal</option>
                        <option value="cash">Cash on Delivery</option>
                    </select>
                </div>
                <div>
                    <h3>Delivery Instructions</h3>
                    <textarea
                        name="deliveryInstructions"
                        value={deliveryInstructions}
                        onChange={onChange}
                        placeholder="Any special instructions for delivery?"
                    />
                </div>
                <button type="submit">Place Order</button>
            </form>
        </div>
    );
};

Checkout.propTypes = {
    cart: PropTypes.object.isRequired,
    createOrder: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    cart: state.cart
});

export default connect(mapStateToProps, { createOrder })(Checkout);
