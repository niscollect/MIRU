const express = require('express');
const router = express.Router();
const pricingController = require('./pricing.controller');

// Pricing routes will be defined here
router.get('/', (req, res) => {
  res.json({ message: 'Pricing routes' });
});

module.exports = router;