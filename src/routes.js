const express = require('express');
const { signupUser, userLogin, listUsers } = require('./controllers/usersController');
const route = express.Router();

route.post('/register', signupUser);
route.post('/login', userLogin);
route.get('/', listUsers);

module.exports = route;
