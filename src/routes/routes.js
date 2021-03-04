const { Router } = require('express');
const { celebrate, Joi, Segments } = require('celebrate');

const NaversController = require('../controllers/NaversController');
const ProjectsController = require('../controllers/ProjectsController');

const router = new Router();

const naversController = new NaversController();
const projectsController = new ProjectsController();

// navers routes
router.get('/navers', naversController.index);
router.get('/navers/:id', naversController.show);

router.post(
    '/navers',
    celebrate({
        [Segments.BODY]: Joi.object().keys({
          name: Joi.string().required(),
          birthdate: Joi.date().required(),
          admission_date: Joi.date().required(),
          job_role: Joi.string().required(),
          projects: Joi.array().items(Joi.number()).required(),
        }),
      }, { abortEarly: false }),
    naversController.store);

// projects routes
router.get('/projects', projectsController.index);
router.get('/projects/:id', projectsController.show);

router.post(
    '/projects',  
    celebrate({
        [Segments.BODY]: Joi.object().keys({
          name: Joi.string().required(),
          navers: Joi.array().items(Joi.number()).required(),
        }),
      }, { abortEarly: false }), 
    projectsController.store);

module.exports = router;