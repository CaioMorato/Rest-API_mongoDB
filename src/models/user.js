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
    versionKey: false,
    timestamps: {
      createdAt: false,
      updatedAt: 'last_update',
    },
  }
);

// password encrypted on the database
UserSchema.pre('save', async function (next) {
  const encryptedPass = await crypto.MD5(this.password);
  this.password = encryptedPass;
  next();
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
