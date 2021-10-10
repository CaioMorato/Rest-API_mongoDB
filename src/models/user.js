const mongoose = require('../database');
const crypto = require('crypto-js');

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    last_login: {
      type: Date,
    },
  },
  {
    // Removes the field "__v" which controls how many updates the document had
    versionKey: false,
    timestamps: {
      createdAt: false,
      updatedAt: 'last_update',
    },
  }
);

// On the database it will show an encrypted password
UserSchema.pre('save', async function (next) {
  const encryptedPass = await crypto.MD5(this.password);
  this.password = encryptedPass;

  next();
});

// The collection will be saved under the 'user' name
const User = mongoose.model('user', UserSchema);

module.exports = User;
