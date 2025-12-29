const express = require('express');
const router = express.Router();
const authController = require('./auth.controller');

// Auth routes will be defined here
router.get('/', (req, res) => {
  res.json({ message: 'Auth routes' });
});

module.exports = router;