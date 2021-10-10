const User = require('../models/user');
const crypto = require('crypto-js');

const createUser = async (req, res) => {
  const { username } = req.body;

  try {
    // Checks if there's a user with the same username.
    if (await User.findOne({ username })) {
      return res.status(400).send({ error: 'Username already in use' });
    }

    const newUser = await User.create(req.body);

    // This prevents the password to appear on the request. It will only appear, encrypted, on the database.
    newUser.password = undefined;

    // Request checkout with status
    return res.status(201).send({ newUser, status: 201 });
  } catch (e) {
    return res.status(400).send({ error: 'Fail to register new user' });
  }
};

const readUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const findUser = await User.findById(userId);

    // Checks if the _id is in the database.
    if (!findUser) {
      return res.status(400).send({ message: 'User not found, check the _id', status: res.status });
    }

    return res.send({ findUser, status: res.statusCode });
  } catch (e) {
    return res.status(400).send({ error: 'Fail to find specified User' });
  }
};

const updateUser = async (req, res) => {
  const { userId } = req.params;
  const { name, username } = req.body;

  try {
    const changeUser = await User.findById(userId);

    // Checks the _id to see if the user exists.
    if (!changeUser) {
      return res.status(400).send({ error: 'Unable to update. User not found' });
    }

    const update = await User.findOneAndUpdate(
      { _id: userId },
      {
        name,
        username,
      },
      { new: true }
    );

    return res.send({ update, status: res.statusCode });
  } catch (e) {
    return res.status(400).send({ error: 'Fail to alter specified User' });
  }
};

const deleteUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const findUser = await User.findById(userId);

    if (!findUser) {
      return res.status(400).send({ error: 'User not in the database, check the _id' });
    }

    const purgeUser = await User.findByIdAndDelete(req.params.userId);

    return res.status(200).send({ message: 'User successfully deleted!', status: res.statusCode });
  } catch (e) {
    return res.status(400).send({ error: 'Fail to delete specified User' });
  }
};

const showUsers = async (req, res) => {
  const allUsers = await User.find({});

  try {
    res.send({ allUsers, status: 200 });
  } catch (e) {
    return res.status(400).send({ error: 'Unable to show Users list' });
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  // This will convert the request password into a 'WordArray', then the 'WordArray' into the hash itself, so we can compare with the saved hashed password.
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

    return res.status(200).send({ message: 'You successfully logged in!', status: res.statusCode });
  } catch (e) {
    return res.status(400).send({ error: 'Fail to query the user' });
  }
};

module.exports = {
  createUser,
  readUser,
  updateUser,
  deleteUser,
  showUsers,
  loginUser,
};
