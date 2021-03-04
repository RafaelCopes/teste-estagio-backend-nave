const knex = require('../database');

class NaversController {
    async index(req, res) {
        const navers = await knex('navers')
            .select([
                'navers.id', 
                'navers.name', 
                'navers.birthdate', 
                'navers.admission_date', 
                'navers.job_role'
            ]);

        return res.json(navers);
    }

    async show(req, res) {
        const { id } = req.params;

        const naver = await knex('navers')
            .where('id', id)
            .first()
            .select([
                'navers.id', 
                'navers.name', 
                'navers.birthdate', 
                'navers.admission_date', 
                'navers.job_role'
            ]);

        if (!naver) {
            return res.status(400).json({ message: 'Naver not found' });
        }

        const projects = await knex('projects')
            .join('naver_project_relation', 'projects.id', '=', 'naver_project_relation.project_id')
            .where('naver_project_relation.naver_id', id)
            .select(['projects.id', 'projects.name']);

        const parseNaver = {
            ...naver,
            projects,
        };

        return res.json(parseNaver);
    }

    async store(req, res, next) {
        const { 
            name, 
            birthdate, 
            admission_date, 
            job_role, 
            projects 
        } = req.body;

        const checkIfNaverAlreadyExists = await knex('navers')
            .first()
            .where('name', name);

        if (checkIfNaverAlreadyExists) {
            return res
                .status(400)
                .json({ 
                    message: 'Naver with this name is already registered.' 
                });
        }

        try {
            const trx = await knex.transaction();

            const [ naver ] = await trx('navers').insert({
                name,
                birthdate,
                admission_date,
                job_role,
            }).returning('*');

            if (!naver) {
                return res
                    .status(400)
                    .json({ 
                        message: 'Unable to register naver.' 
                    });
            }

            const naver_id = naver.id;

            const naverProjects = projects.map(project_id => {
                return {
                    naver_id,
                    project_id,
                }
            });

            await trx('naver_project_relation').insert(naverProjects);

            await trx.commit();

            return res.status(201).json(naver);
        } catch (err) {
            return res
                .status(400)
                .json({ 
                    message: 'One of the included projects still does not exist. Please create it in the apropriate route with an empty navers array and then comeback with the right id.' 
                });
        }
    }
}

module.exports = NaversController;