const { Router } = require('express');
const { celebrate, Joi, Segments } = require('celebrate');

const NaversController = require('../controllers/NaversController');

const naversController = new NaversController();

const naverRouter = Router();

naverRouter.get('/', naversController.index);
naverRouter.get('/:id', naversController.show);

naverRouter.post(
  '/',
  celebrate(
    {
      [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        birthdate: Joi.date().required(),
        admission_date: Joi.date().required(),
        job_role: Joi.string().required(),
        projects: Joi.array().items(Joi.number()).required(),
      }),
    },
    { abortEarly: false },
  ),
  naversController.store,
);

module.exports = naverRouter;
