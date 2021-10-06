const express = require('express');
const route = express.Router();
const {
  createUser,
  readUser,
  updateUser,
  deleteUser,
  showUsers,
  loginUser,
} = require('./controllers/usersController');


// Basic CRUD routes
route.post('/create', createUser);
route.get('/read/:userId', readUser);
route.put('/update/:userId', updateUser);
route.delete('/delete/:userId', deleteUser);

// Extra Routes
route.get('/users', showUsers);
route.put('/login', loginUser);

module.exports = route;
