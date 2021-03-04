require('dotenv/config');

const express = require('express');

const { errors } = require('celebrate');

const routes = require('./routes');

const app = express();

app.use(express.json());
app.use(routes);
app.use(errors());

app.use((req, res, next) => {
  const error = new Error('Not found.');
  error.status = 404;
  next(error);
});

app.listen(process.env.SERVER_PORT, () =>
  console.log(`The server is running on port ${process.env.SERVER_PORT}...`),
);
