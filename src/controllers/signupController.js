const User = require('../models/user');

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

module.exports = { signupUser };
