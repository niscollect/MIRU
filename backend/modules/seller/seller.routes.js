const express = require('express');
const router = express.Router();
const sellerController = require('./seller.controller');

// Seller routes will be defined here
router.get('/', (req, res) => {
  res.json({ message: 'Seller routes' });
});

module.exports = router;