const express = require('express');
const router = express.Router();
const companyController = require('./company.controller');
const auth = require('../../middleware/auth');



router.post('/', auth.verifyAdmin, companyController.createCompany);
router.get('/me', auth.verifyUser, companyController.getMyCompanies);


module.exports = router;