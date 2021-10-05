const User = require('../models/user');
const crypto = require('crypto-js');

const signupUser = async (req, res) => {
  try {
    const { username } = req.body;
    // Checks if there's an user with the same username.
    if (await User.findOne({ username })) {
      return res.status(400).send({ error: 'Nome de usuário já está sendo utilizado' });
    }

    const newUser = await User.create(req.body);

    // This prevents the password to appear on the request. It will only appear, encrypted, on the database.
    newUser.password = undefined;

    console.log(`Usuário ${username} cadastrado com sucesso!`);

    // Request checkout with status
    return res.send({ newUser, status: 200 });
  } catch (e) {
    return res.status(400).send({ error: 'Fail to register new user' });
  }
};

const userLogin = async (req, res) => {
  const { username, password } = req.body;

  // This will convert the request password into a WordArray, then the WordArray into the hash itself, so we can compare with the saved password.
  const encryptedPass = await crypto.MD5(password).toString(crypto.enc.Hex);

  try {
    const checkUser = await User.findOne({ username }).select('+password');

    // If the username doesn't match
    if (!checkUser) {
      return res.status(400).send({ error: 'User not found' });
    }

    // If the password doesn't match
    if (encryptedPass !== checkUser.password) {
      return res.status(400).send({ error: "Password doesn't match" });
    }

    // When the user logs in it will save the time on the key named last_login
    const loginUpdate = await User.updateOne({ username: username }, { last_login: Date.now() });

    // This prevents the password to appear on the request. It will only appear, encrypted, on the database.
    checkUser.password = undefined;

    return res.send({ checkUser });
  } catch (e) {
    return res.status(400).send({ error: 'Fail to query the user' });
  }
};

module.exports = { signupUser, userLogin };
