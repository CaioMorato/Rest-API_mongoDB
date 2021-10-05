const express = require('express');
const {
  listUsers,
  showUser,
  alterUser,
  signupUser,
  loginUser,
  deleteUser,
} = require('./controllers/usersController');
const route = express.Router();

route.get('/', listUsers);
route.get('/user/:userInfo', showUser);
route.put('/alter/:userId', alterUser);
route.post('/register', signupUser);
route.post('/login', loginUser);
route.delete('/delete/:userId', deleteUser);

module.exports = route;
