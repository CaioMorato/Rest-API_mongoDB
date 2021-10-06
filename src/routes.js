const express = require('express');
const { createUser, readUser, updateUser, deleteUser } = require('./controllers/usersController');
const route = express.Router();

route.post('/create', createUser);
route.get('/read/:userId', readUser);
route.put('/update/:userId', updateUser);
route.delete('/delete/:userId', deleteUser);
// route.get('/user/:userInfo', showUser);
// route.post('/login', loginUser);

module.exports = route;
