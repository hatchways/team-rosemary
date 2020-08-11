const {
  userSignupValidationRules,
  userloginValidationRules,
  validate,
} = require('../validators/user-validators');

const express = require('express');
const router = express.Router();

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

module.exports = router;
