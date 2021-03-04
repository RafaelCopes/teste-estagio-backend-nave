const knex = require('../database');

class ProjectsController {
  async index(req, res) {
    const navers = await knex('projects').select([
      'projects.id',
      'projects.name',
    ]);

    return res.json(navers);
  }

  async show(req, res) {
    const { id } = req.params;

    const [project] = await knex('projects')
      .where('id', id)
      .select(['projects.id', 'projects.name']);

    if (!project) {
      return res.status(400).json({ message: 'Project not found' });
    }

    const navers = await knex('navers')
      .join(
        'naver_project_relation',
        'navers.id',
        '=',
        'naver_project_relation.naver_id',
      )
      .where('naver_project_relation.project_id', id)
      .select([
        'navers.id',
        'navers.name',
        'navers.birthdate',
        'navers.admission_date',
        'navers.job_role',
      ]);

    const parseProject = {
      ...project,
      navers,
    };

    return res.json(parseProject);
  }

  async store(req, res) {
    const { name, navers } = req.body;

    const checkIfProjectAlreadyExists = await knex('projects')
      .first()
      .where('name', name);

    if (checkIfProjectAlreadyExists) {
      return res.status(400).json({
        message: 'Project with this name is already registered.',
      });
    }

    try {
      const trx = await knex.transaction();

      const [project] = await trx('projects')
        .insert({
          name,
        })
        .returning('*');

      const project_id = project.id;

      if (!project) {
        return res.status(400).json({
          message: 'Unable to register project.',
        });
      }

      const projectNavers = navers.map(naver_id => {
        return {
          naver_id,
          project_id,
        };
      });

      await trx('naver_project_relation').insert(projectNavers);

      await trx.commit();

      return res.status(201).json(project);
    } catch (err) {
      return res.status(400).json({
        message:
          'One of the included navers still does not exist. Please create it in the apropriate route with an empty projects array and then comeback with the right id.',
      });
    }
  }
}

module.exports = ProjectsController;
