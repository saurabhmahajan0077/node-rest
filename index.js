//Init node modules and init express
const express = require('express');
const app = express(),
    bodyParser = require('body-parser'),
    logger = require('morgan'),
    mongoose = require('mongoose'),
    config = require('./config/main');

const router = require('./router');

//connect to MongoDB
mongoose.connect(config.database);

//Setting up middleware for all Express requests
app.use(logger('dev'));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

router(app);

//Start the server
const server = app.listen(config.port);
console.log("Server started on port " + config.port);

