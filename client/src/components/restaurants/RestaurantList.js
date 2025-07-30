import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getRestaurants } from '../../actions/restaurant';
import PropTypes from 'prop-types';
import RestaurantItem from './RestaurantItem';

const RestaurantList = ({ getRestaurants, restaurant: { restaurants, loading } }) => {
    useEffect(() => {
        getRestaurants();
    }, [getRestaurants]);

    return (
        <div className="restaurant-list">
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div className="grid">
                    {restaurants.map(restaurant => (
                        <RestaurantItem key={restaurant._id} restaurant={restaurant} />
                    ))}
                </div>
            )}
        </div>
    );
};

RestaurantList.propTypes = {
    getRestaurants: PropTypes.func.isRequired,
    restaurant: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    restaurant: state.restaurant
});

export default connect(mapStateToProps, { getRestaurants })(RestaurantList);
