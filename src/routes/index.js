const { Router } = require('express');

const naverRouter = require('./navers.routes');
const projectRouter = require('./projects.routes');

const routes = new Router();

routes.use('/navers', naverRouter);
routes.use('/projects', projectRouter);

module.exports = routes;
