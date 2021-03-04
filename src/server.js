const express = require('express');
const routes = require('./routes');

const { errors } = require('celebrate');

const app = express();

app.use(express.json());
app.use(routes);
app.use(errors());

app.use((req, res, next) => {
    const error = new Error('Not found.');
    error.status = 404;
    next(error);
});

app.listen(3333, 
    () => console.log('The server is running on port 3333...'));
