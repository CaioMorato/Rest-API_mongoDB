const express = require('express');
const routes = require('./routes');

const app = express();
const port = process.env.PORT || 3000;

// This will parse the json and url encoded on the requests.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

app.listen(port, () => {
  console.log(`Server started on PORT:${port}`);
});
