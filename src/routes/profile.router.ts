import { Router } from 'express';

import * as Controller from '../controllers/profile.controller';
import { validate } from '../middlewares/validation.middleware';
import * as Validation from '../shared/validations/profile.validation';
import { authenticate } from '../middlewares/authentication.middleware';

const profileRouter = Router();

profileRouter.post('/', authenticate, validate(Validation.create), Controller.createProfile);
profileRouter.get('/', authenticate, Controller.fetchProfiles);
profileRouter.get('/:id', authenticate, Controller.getProfile);
profileRouter.get('/:id/public-key', authenticate, Controller.getProfilePublicKey);
profileRouter.put('/:id', authenticate, validate(Validation.update), Controller.updateProfile);
profileRouter.delete('/:id', authenticate, Controller.removeProfile);

export default profileRouter;
