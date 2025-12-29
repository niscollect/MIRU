const express = require('express');
const router = express.Router();
const productController = require('./product.controller');

// Product routes will be defined here
router.get('/', (req, res) => {
  res.json({ message: 'Product routes' });
});

module.exports = router;