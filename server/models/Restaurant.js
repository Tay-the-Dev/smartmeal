const mongoose = require('mongoose');

const RestaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    cuisine: {
        type: String,
        required: true
    },
    deliveryTime: {
        type: Number,
        required: true
    },
    minOrder: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        default: 0
    },
    image: {
        type: String,
        required: true
    },
    menu: [{
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        image: {
            type: String
        }
    }]
});

module.exports = mongoose.model('Restaurant', RestaurantSchema);
