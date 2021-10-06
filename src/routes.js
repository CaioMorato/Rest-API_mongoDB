const express = require('express');
const { createUser, readUser } = require('./controllers/usersController');
const route = express.Router();

route.post('/create', createUser);
route.get('/read/:userId', readUser);
// route.get('/user/:userInfo', showUser);
// route.put('/alter/:userId', alterUser);
// route.post('/login', loginUser);
// route.delete('/delete/:userId', deleteUser);

module.exports = route;
