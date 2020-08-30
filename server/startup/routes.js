const express = require('express');
var bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { json, urlencoded, Request, Response } = express;
const kue = require('kue');

// import routes
const usersRoutes = require('../routes/users-routes');
const receiptRoutes = require('../routes/receipt-routes');
const s3routes = require('../routes/s3-routes');

module.exports = function (app) {
    app.use(bodyParser.json());
    app.use(json());
    app.use(
        urlencoded({
            extended: false,
        })
    );
    app.use(cookieParser());

    app.use(cors());

    // routes declaration
    app.use('/api/user', usersRoutes); // => /api/user...
    app.use('/api/receipt', receiptRoutes); // => /api/receipt...
    app.use('/api/sign_s3', s3routes); // => /api/sign_s3
    app.use('/kue-api/', kue.app);

    // handle 404 error(route not found)
    app.use((req, res, next) => {
        const error = new HttpError('Could not find this route.', 404);
        throw error;
    });

    app.use((error, req, res, next) => {
        if (res.headerSent) {
            return next(error);
        }
        res.status(error.code || 500);
        res.json({
            message: error.message || 'An unknown error occurred!',
        });
    });
};
