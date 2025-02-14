const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const transactionController = require('../controllers/transactionController');

// v1 API routes
router.get('/v1/users/:address', userController.getUserData);
router.get('/v1/transactions/:address', transactionController.getTransactions);

module.exports = router; 