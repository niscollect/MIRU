const express = require('express');
const router = express.Router();
const catalogController = require('./catalog.controller');

// Catalog routes will be defined here
router.get('/', (req, res) => {
  res.json({ message: 'Catalog routes' });
});

module.exports = router;