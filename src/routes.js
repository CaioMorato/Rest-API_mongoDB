const express = require('express');
const route = express.Router();
const User = require('./models/user');

route.post('/register', async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    console.log(`Usuário cadastrado com os seguintes dados:
    Nome: ${req.body.name}
    `);
    return res.send({ newUser });
  } catch (e) {
    return res.status(400).send({ error: 'Fail to register new user' });
  }
});

module.exports = route;
