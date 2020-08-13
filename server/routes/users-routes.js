const {
    userSignupValidationRules,
    userloginValidationRules,
    validate,
} = require('../validators/user-validators');

const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const usersController = require('../controllers/users-controller');

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

router.get('/receipts', usersController.getAllReceipt);

module.exports = router;
