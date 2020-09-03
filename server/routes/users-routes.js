const {
    userSignupValidationRules,
    userloginValidationRules,
    validate,
} = require('../validators/user-validators');

const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const usersController = require('../controllers/users-controller');
const chartController = require('../controllers/chart-controller');
const reportController = require('../controllers/report-controller');
const { route } = require('./receipt-routes');

router.post(
    '/signup',
    userSignupValidationRules(),
    validate,
    usersController.signup
);

router.post(
    '/login',
    userloginValidationRules(),
    validate,
    usersController.login
);


router.use(checkAuth);

router.get('/receipts/:duration', usersController.getAllReceipt);

router.get(
    '/recenttransactions/:userid',
    usersController.getRecentTransactions
);

router.get('/topcategories/:userid', usersController.getTopCategories);

router.get('/monthlytransactions/:userid&:year&:month&:timezone', 
chartController.getMonthlyTransactions);
router.get('/monthlyreport/:userid&:year&:month&:timezone', 
reportController.getMonthlyReport);

router.get('/receipts/export/:month', usersController.exportReceipts);

module.exports = router;
