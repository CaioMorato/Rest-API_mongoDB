const express = require('express');
const {
  listUsers,
  alterUser,
  showUser,
  signupUser,
  loginUser,
  deleteUser,
} = require('./controllers/usersController');
const route = express.Router();

route.get('/', listUsers);
route.put('/alter/:userId', alterUser);
route.get('/user/:userId', showUser);
route.post('/register', signupUser);
route.post('/login', loginUser);
route.delete('/delete/:userId', deleteUser);

module.exports = route;
