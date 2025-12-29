const express = require('express');
const router = express.Router();

// Import module routes
const authRoutes = require('./modules/auth/auth.routes');
const adminRoutes = require('./modules/admin/admin.routes');
const catalogRoutes = require('./modules/catalog/catalog.routes');
const companyRoutes = require('./modules/company/company.routes');
const pricingRoutes = require('./modules/pricing/pricing.routes');
const productRoutes = require('./modules/product/product.routes');
const searchRoutes = require('./modules/search/search.routes');
const sellerRoutes = require('./modules/seller/seller.routes');

// Register routes
router.use('/auth', authRoutes);
router.use('/admin', adminRoutes);
router.use('/catalog', catalogRoutes);
router.use('/company', companyRoutes);
router.use('/pricing', pricingRoutes);
router.use('/product', productRoutes);
router.use('/search', searchRoutes);
router.use('/seller', sellerRoutes);

module.exports = router;