import axios from 'axios';
import { setAlert } from './alert';
import {
    GET_ORDERS,
    ORDER_ERROR,
    CREATE_ORDER
} from './types';

// Get user orders
export const getOrders = () => async dispatch => {
    try {
        const res = await axios.get('/api/orders');

        dispatch({
            type: GET_ORDERS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: ORDER_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

// Create order
export const createOrder = (restaurant, items, total, paymentMethod) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ restaurant, items, total, paymentMethod });

    try {
        const res = await axios.post('/api/orders', body, config);

        dispatch({
            type: CREATE_ORDER,
            payload: res.data
        });

        dispatch(setAlert('Order placed successfully', 'success'));
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: ORDER_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};
