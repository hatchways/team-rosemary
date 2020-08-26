const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const {
    join
} = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const HttpError = require('./helpers/http-error');
const {
    json,
    urlencoded,
    Request,
    Response
} = express;
var bodyParser = require('body-parser');
const kue = require("kue");

// import routes
const usersRoutes = require('./routes/users-routes');
const receiptRoutes = require('./routes/receipt-routes');
const s3routes = require('./routes/s3-routes');


// get environment variables
require('dotenv').config({
    path: `${__dirname}/.env.${process.env.NODE_ENV}`,
});

var app = express();
app.use(bodyParser.json());

app.use(logger('dev'));
app.use(json());
app.use(urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(join(__dirname, 'public')));

// set CORS
app.use(cors());

// routes declaration
app.use('/api/user', usersRoutes); // => /api/user...
app.use('/api/receipt', receiptRoutes); // => /api/receipt...
app.use('/api/sign_s3', s3routes); // => /api/sign_s3
app.use("/kue-api/", kue.app);


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
        message: error.message || 'An unknown error occurred!'
    });
});

// Connect to database and start server
const port = process.env.PORT || 5000;
const dbConnection = process.env.DB_CONNECTION_STRING;

mongoose
    .connect(dbConnection, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    })
    .then(() => {
        app.listen(port, () => console.log(`server listening on ${port}`));
    })
    .catch((err) => {
        console.log(err);
    });