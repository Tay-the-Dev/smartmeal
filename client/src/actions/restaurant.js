import axios from 'axios';
import { setAlert } from './alert';
import {
    GET_RESTAURANTS,
    GET_RESTAURANT,
    RESTAURANT_ERROR
} from './types';

// Get all restaurants
export const getRestaurants = () => async dispatch => {
    try {
        const res = await axios.get('/api/restaurants');

        dispatch({
            type: GET_RESTAURANTS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: RESTAURANT_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

// Get restaurant by ID
export const getRestaurantById = id => async dispatch => {
    try {
        const res = await axios.get(`/api/restaurants/${id}`);

        dispatch({
            type: GET_RESTAURANT,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: RESTAURANT_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};
