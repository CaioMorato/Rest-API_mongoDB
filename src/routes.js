const express = require('express');
const { createUser, readUser, updateUser, deleteUser, showUsers } = require('./controllers/usersController');
const route = express.Router();

// Basic CRUD routes
route.post('/create', createUser);
route.get('/read/:userId', readUser);
route.put('/update/:userId', updateUser);
route.delete('/delete/:userId', deleteUser);

// Extra Routes
route.get('/users', showUsers);
// route.post('/login', loginUser);

module.exports = route;
