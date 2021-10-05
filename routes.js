const express = require('express');
const route = express.Router();
const Users = require('./models/users');
// const { show, create } = require('./controllers/controllers');

// route.get('/users', show);
route.post('/', async (req, res, next) => {
  try {
    const newUser = new Users({
      name: req.body.name,
      username: req.body.username,
      password: req.body.password,
    });

    return await newUser.save();
    next();
  } catch (err) {
    console.log(err);
  }
});

module.exports = route;
