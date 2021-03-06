const express = require('express');
const { join } = require('path');
const winston = require('winston');
require('winston-mongodb');

const app = express();

// get environment variabless
require('dotenv').config({
    path: `${__dirname}/.env.${process.env.NODE_ENV}`,
});


app.use(express.static(join(__dirname, 'public')));

require('./startup/logging')(); //logging setup
require('./startup/routes')(app);// Routes setup
require('./startup/db')();// database setup

const port = process.env.PORT || 5000;
const server = app.listen(port, () => winston.info(`Listening on port ${port}...`));

module.exports = server;
