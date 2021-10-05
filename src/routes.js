const express = require('express');
const route = express.Router();
const User = require('./models/user');

route.post('/register', async (req, res) => {
  try {
    const { username } = req.body;
    if (await User.findOne({ username })) {
      return res.status(400).send({ error: 'Nome de usuário já está sendo utilizado' });
    }
    const newUser = await User.create(req.body);
    newUser.password = undefined;
    return res.send({ newUser });
  } catch (e) {
    return res.status(400).send({ error: 'Fail to register new user' });
  }
});

module.exports = route;
