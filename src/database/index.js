const mongoose = require('mongoose');
// If you're using external database change the prefix to "+srv://".
const databasePrefix = '://';
// If you're using external database put the string withou the prefix here.
const databaseString = 'localhost';
// Here goes the database name.
const databaseName = 'users';

mongoose.connect(`mongodb${databasePrefix}${databaseString}/${databaseName}`);

module.exports = mongoose;
