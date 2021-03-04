const { Router } = require('express');

const NaversController = require('../controllers/NaversController');
const ProjectsController = require('../controllers/ProjectsController');

const router = new Router();

const naversController = new NaversController();
const projectsController = new ProjectsController();

// navers routes
router.get('/navers', naversController.index);
router.get('/navers/:id', naversController.show);
router.post('/navers', naversController.store);

// projects routes
router.get('/projects', projectsController.index);
router.get('/projects/:id', projectsController.show);
router.post('/projects', projectsController.store);

module.exports = router;