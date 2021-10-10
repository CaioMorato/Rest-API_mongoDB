const express = require('express');
const routes = require('./routes');

const app = express();

// If you want to change the PORT create .env. Otherwise it will be 3000
const port = process.env.PORT || 3000;

// This will parse the json and url encoded on the requests.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Creates a log of every action.
app.use((req, res, next) => {
  const { url, method } = req;
  console.log(`${method} - ${url} | ${new Date()}`);
  return next();
});

app.use(routes);

app.listen(port, () => {
  console.log(`Server started on PORT:${port}`);
});

module.exports = app;
