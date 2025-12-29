const express = require('express');
const router = express.Router();
const adminController = require('./admin.controller');

// Admin routes will be defined here
router.get('/', (req, res) => {
  res.json({ message: 'Admin routes' });
});

module.exports = router;