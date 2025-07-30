const express = require('express');
const router = express.Router();
const Restaurant = require('../models/Restaurant');
const auth = require('../middleware/auth');

// @route   GET api/restaurants
// @desc    Get all restaurants
router.get('/', async (req, res) => {
    try {
        const restaurants = await Restaurant.find();
        res.json(restaurants);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   GET api/restaurants/:id
// @desc    Get restaurant by ID
router.get('/:id', async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id);
        if (!restaurant) {
            return res.status(404).json({ msg: 'Restaurant not found' });
        }
        res.json(restaurant);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Restaurant not found' });
        }
        res.status(500).send('Server error');
    }
});

module.exports = router;
