const express = require("express");
const mongoose = require('mongoose');
const { join } = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const  HttpError = require('./helpers/http-error');
const { json, urlencoded } = express;
var bodyParser = require('body-parser')

// import routes
const usersRoutes = require('./routes/users-routes');

// get environment variables
require('dotenv').config({
    path: `${__dirname}/.env.${process.env.NODE_ENV}`,
});

console.log(`${__dirname}/.env.${process.env.NODE_ENV}`);


var app = express();
app.use(bodyParser.json());

app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(join(__dirname, "public")));

// set headers and CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  next();
});

// routes declaration
app.use('/api/user', usersRoutes); // => /api/user...

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
  res.json({ message: error.message || 'An unknown error occurred!' });
});
  
 
  // Connect to database and start server
  const port = process.env.PORT || 5000;
  const dbConnection = process.env.DB_CONNECTION_STRING;
 
  mongoose
  .connect(dbConnection)
  .then(() => {
    app.listen(port);
  })
  .catch(err => {
    console.log(err);
  });