const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const kue = require('kue');
const queue = kue.createQueue();

const { User } = require('../models/user');
const { Receipt } = require('../models/receipt');
const HttpError = require('../helpers/http-error');
const job = require('../jobs/export-receipts-job');
const { appEnums } = require('../helpers/app-enums');

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
            const error = new HttpError('User already exists.', 422);
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
                {
                    usrId: createdUser.id,
                    email: createdUser.email,
                },
                process.env.JWT_KEY,
                {
                    expiresIn: '1h',
                }
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
        existingUser = await User.findOne({
            email: email,
        });
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
            {
                userId: existingUser.id,
                email: existingUser.email,
            },
            process.env.JWT_KEY,
            {
                expiresIn: '1h',
            }
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

// @route GET user/receipts
// @desc get ALL receipts for that user with given duration.
// duration can be: daily, weekly, monthly, annual
// @access Private
const getAllReceipt = async (req, res, next) => {
    const userId = req.userData.userId;
    const { duration } = req.body;

    try {
        const receipts = await Receipt.find({
            user: userId,
        }).sort({
            date: -1,
        });

        res.json(receipts);
    } catch {
        const error = new HttpError('Server Error', 500);
        return next(error);
    }
};

// @route GET user/recent transactions
// @desc get user recent transactions.
// @access Private
const getRecentTransactions = async (req, res, next) => {
    const userId = req.params.userid;

    try {
        const user = await User.findById(userId);

        if (!user) {
            const error = new HttpError('Invalid user details.', 400);
            return next(error);
        } else {
            const receipts = await Receipt.find({
                user: userId,
            })
                .sort({
                    date: -1,
                })
                .limit(3);
            res.status(200).json({
                receipts,
            });
        }
    } catch {
        const error = new HttpError('Internal server error', 500);
        return next(error);
    }
};

// @route GET user/topcategories
// @desc get user top categories.
// @access Private

const getTopCategories = async (req, res, next) => {
    const userId = req.params.userid;
    try {
        const user = await User.findById(userId);

        if (!user) {
            const error = new HttpError('Invalid user details.', 400);
            return next(error);
        } else {
            const userIdd = mongoose.Types.ObjectId(userId);
            const receipts = await Receipt.aggregate(
                [
                    {
                        $match: {
                            user: userIdd,
                        },
                    },
                    // Grouping pipeline
                    {
                        $group: {
                            _id: '$category',
                            total: {
                                $sum: '$amount',
                            },
                        },
                    },
                    // Sorting pipeline
                    {
                        $sort: {
                            total: -1,
                        },
                    },
                    // Optionally limit results
                    {
                        $limit: 3,
                    },
                ],
                function (err, result) {
                    console.log(err);
                }
            );
            res.status(200).json({
                receipts,
            });
        }
    } catch {
        const error = new HttpError('Internal server error', 500);
        return next(error);
    }
};

// @route GET user/receipts/export
// @desc get user receipts in a csv file.
// @access Private

const exportReceipts = async (req, res, next) => {
    try {
        const userId = req.headers['userid'];
        const month = parseInt(req.params.month);
        const userIdd = mongoose.Types.ObjectId(userId);

        //check if user exists with userid
        const user = await User.findById(userIdd);
          
        if (!user) {
            const error = new HttpError('Invalid user details.', 400);
            return next(error);
        }

        //create job by calling createJob method
        const result = job.createJob({
            title: 'Receipt-Export-Request-' + userId,
            userId: userIdd,
            month: month,
        });
        
        // check response from createJob method
        const response = await result;

        if (response == appEnums.RECEIPT.OK) {
            // send success response to the user
            res.status(201).json({
                message: 'file created'
            });
            
        } else if (response == appEnums.RECEIPT.NODATA) {
            //send error response to the user
            const error = new HttpError('No receipts found.', 404);
            return next(error);
        }
    } catch (ex) {
        console.log(ex);
        const error = new HttpError('Internal server error', 500);
        return next(error);
    }
};


module.exports = {
    signup,
    login,
    getAllReceipt,
    getRecentTransactions,
    getTopCategories,
    exportReceipts,
};
