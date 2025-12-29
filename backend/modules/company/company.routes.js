const express = require('express');
const router = express.Router();
const companyController = require('./company.controller');

// Company routes will be defined here
router.get('/', (req, res) => {
  res.json({ message: 'Company routes' });
});

module.exports = router;