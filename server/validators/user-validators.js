const { body, validationResult, oneOf } = require('express-validator');

// User Name cannot be empty
const userNameRules = body('name').trim().notEmpty().withMessage('must be provided');

// Email must be in valid format
const emailRules = body('email').notEmpty().withMessage('must be provided').isEmail().normalizeEmail().withMessage('invalid email-id');

// Password must be validated
const passwordRules = body('password').notEmpty().withMessage('must be provided');
const oldPasswordRules = body('oldPassword').notEmpty().withMessage('must be provided');

// Pasword must be at least 6 chars long
const newPasswordRules = body('password').notEmpty().withMessage('must be provided').isLength({ min: 6 }).withMessage('The password must be 6 chars long');
const newModifiedPasswordRules = body('newPassword').notEmpty().withMessage('must be provided').isLength({ min: 6 }).withMessage('The password must be 6 chars long');


//Signup request validations
const userSignupValidationRules = () => {
  return [userNameRules, emailRules, newPasswordRules];
}

//login request validations
const userloginValidationRules = () => {
  return [emailRules, passwordRules];
}

// Username/Email changing validations
// Field being changed is verified in the controller
const changeNameEmailRules = () => {
  return [
    oneOf([userNameRules, emailRules]),
    passwordRules
  ];
}

// Password changing validations
const changePasswordRules = () => {
  return [oldPasswordRules, newModifiedPasswordRules];
}

const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors = []
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

  return res.status(422).json({
    errors: extractedErrors,
  })
}

module.exports = {
  userSignupValidationRules,
  userloginValidationRules,
  changeNameEmailRules,
  changePasswordRules,
  validate,
}