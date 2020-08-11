const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { User } = require('../models/user');
const HttpError = require('../helpers/http-error');


// @route POST /user/signup
// @desc to register user, returns userid, email and token
// @access Public
const signup = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    const hasUser = await User.findOne({
      email: email,
    });

    // if user with the provided email already exists
    if (hasUser) {
        const error = new HttpError(
            'User already exists.',
            422
          );
          return next(error);
    }

    // hash the password
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 12);
    } catch (err) {
      const error = new HttpError(
        'Could not create user, please try again later',
        500
      );
      return next(error);
    }

    // user object to save in the db
    let createdUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    // save user in the db
    await createdUser.save();
    
    // generate token
    let token;
    try {
      token = jwt.sign(
        { usrId: createdUser.id, email: createdUser.email },
          process.env.JWT_KEY,
        { expiresIn: '1h' }
      );
    } catch (err) {
      const error = new HttpError(
        'Signing up failed, please try again later.',
        500
      );
      return next(error);
    }

    // send status 201(created)
    res.status(201).json({
      userId: createdUser.id,
      email: createdUser.email,
      token: token,
    }); 
  } catch (err) {
    const error = new HttpError('Internal server error.', 500);
    return next(error);
  }
};

// @route POST /user/login
// @desc to authenticate user, returns userid, email and token
// @access Public
const login = async (req, res, next) => {
  const { email, password } = req.body;

  // check if user with the provided email-id exists
  let existingUser;

  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
        'Internal server error, please try again later.',
        500
      );
      return next(error);
  }

  //user not exists with the provide email-id
  if (!existingUser) {
    const error = new HttpError(
        'Invalid credentials, could not log you in.',
        401
      );
      return next(error);
  }

  // check if provided password is correct( compare the password with the password saved in the database)
  let isValidPassword = false;

  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    const error = new HttpError(
      'Could not log you in, please check your credentials and try again later',
      500
    );
    return next(error);
  }

  // Password is not valid
  if (!isValidPassword) {
    const error = new HttpError('Invalid credentials', 401);
    return next(error);
  }

  // generate token
  let token;
  try {
    token = jwt.sign(
      { userId: existingUser.id, email: existingUser.email },
        process.env.JWT_KEY,
      { expiresIn: '1h' }
    );
  } catch (err) {
    const error = new HttpError(
      'Logging in failed, please try again later.',
      500
    );
    return next(error);
  }

   res.status(200).json({
    userId: existingUser.id,
    email: existingUser.email,
    token: token,
  });
};

module.exports = {
  signup,
  login,
};