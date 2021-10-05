const express = require('express');
const { signupUser, userLogin, listUsers, showUser, deleteUser } = require('./controllers/usersController');
const route = express.Router();

route.get('/', listUsers);
route.get('/user/:userId', showUser);
route.post('/register', signupUser);
route.post('/login', userLogin);
route.delete('/delete/:userId', deleteUser)

module.exports = route;
