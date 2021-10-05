const mongoose = require('../database');

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
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

const User = mongoose.model('user', UserSchema);

module.exports = User;
