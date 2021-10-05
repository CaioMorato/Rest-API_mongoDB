const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/users');

module.exports = mongoose;
