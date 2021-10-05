const express = require('express');
const { signupUser } = require('./controllers/signupController');
const route = express.Router();

route.post('/register', signupUser);


module.exports = route;
