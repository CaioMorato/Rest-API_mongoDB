const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const app = express();
const port = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost/users');

app.use(express.json());
app.use(routes);

app.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}`);
});
