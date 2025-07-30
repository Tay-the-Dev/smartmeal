const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const Order = require('../models/Order');
const Restaurant = require('../models/Restaurant');

// @route   POST api/orders
// @desc    Create an order
router.post('/', [
    auth,
    [
        check('restaurant', 'Restaurant is required').not().isEmpty(),
        check('items', 'Items are required').isArray({ min: 1 }),
        check('total', 'Total is required').isNumeric(),
        check('paymentMethod', 'Payment method is required').not().isEmpty()
    ]
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { restaurant, items, total, paymentMethod } = req.body;

    try {
        const user = await User.findById(req.user.id).select('-password');
        const restaurantData = await Restaurant.findById(restaurant);

        if (!restaurantData) {
            return res.status(404).json({ msg: 'Restaurant not found' });
        }

        const newOrder = new Order({
            user: req.user.id,
            restaurant,
            items,
            total,
            deliveryAddress: user.address,
            paymentMethod
        });

        const order = await newOrder.save();
        res.json(order);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   GET api/orders
// @desc    Get user orders
router.get('/', auth, async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user.id })
            .sort({ createdAt: -1 })
            .populate('restaurant', 'name image');
        res.json(orders);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
