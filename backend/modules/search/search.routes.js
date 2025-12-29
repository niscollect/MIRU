const express = require('express');
const router = express.Router();
const searchController = require('./search.controller');

// Search routes will be defined here
router.get('/', (req, res) => {
  res.json({ message: 'Search routes' });
});

module.exports = router;