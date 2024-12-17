import { Router } from 'express';

import * as Controller from '../controllers/repository.controller';
import { validate } from '../middlewares/validation.middleware';
import * as Validation from '../shared/validations/repository.validation';
import { authenticate } from '../middlewares/authentication.middleware';

const repositoryRouter = Router();

repositoryRouter.post('/', authenticate, validate(Validation.create), Controller.createRepository);
repositoryRouter.put('/:id', authenticate, validate(Validation.update), Controller.updateRepository);
repositoryRouter.get('/', authenticate, Controller.fetchRepositories);
repositoryRouter.get('/:id', authenticate, Controller.getRepository);
repositoryRouter.delete('/:id', authenticate, Controller.removeRepository);

export default repositoryRouter;
