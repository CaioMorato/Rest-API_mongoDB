const express = require('express');
const { signupUser, userLogin } = require('./controllers/usersController');
const route = express.Router();

route.post('/register', signupUser);
route.post('/login', userLogin);

module.exports = route;