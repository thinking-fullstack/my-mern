import { Router } from 'express';

import * as Controller from '../controllers/project.controller';
import { validate } from '../middlewares/validation.middleware';
import * as Validation from '../shared/validations/project.validation';
import { authenticate } from '../middlewares/authentication.middleware';

const projectRouter = Router();

projectRouter.post('/', authenticate, validate(Validation.create), Controller.createProject);
projectRouter.get('/', authenticate, Controller.fetchProjects);
projectRouter.get('/:id', authenticate, Controller.getProject);
projectRouter.put('/:id', authenticate, validate(Validation.update), Controller.updateProject);
projectRouter.delete('/:id', authenticate, Controller.removeProject);

export default projectRouter;
