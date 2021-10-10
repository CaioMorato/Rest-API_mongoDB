const mongoose = require('mongoose');

// If you're using external database change the databasePrefix to "+srv://".
const databasePrefix = '://';

// If you're using external database put the string here (remove the prefix).
const databaseString = 'localhost';

// Here goes the mongo database name. 
const databaseName = 'users';

mongoose.connect(`mongodb${databasePrefix}${databaseString}/${databaseName}`);

module.exports = mongoose;