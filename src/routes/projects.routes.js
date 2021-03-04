const { Router } = require('express');
const { celebrate, Joi, Segments } = require('celebrate');

const ProjectsController = require('../controllers/ProjectsController');
const projectsController = new ProjectsController();

const projectRouter = Router();

projectRouter.get('/', projectsController.index);
projectRouter.get('/:id', projectsController.show);

projectRouter.post(
    '/',  
    celebrate({
        [Segments.BODY]: Joi.object().keys({
          name: Joi.string().required(),
          navers: Joi.array().items(Joi.number()).required(),
        }),
      }, { abortEarly: false }), 
    projectsController.store);

module.exports = projectRouter;