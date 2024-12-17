import { Router } from 'express';

import * as Controller from '../controllers/setting.controller';
import { validate } from '../middlewares/validation.middleware';
import * as Validation from '../shared/validations/setting.validation';
import { authenticate } from '../middlewares/authentication.middleware';

const settingRouter = Router();

settingRouter.post('/', authenticate, validate(Validation.create), Controller.createGeneralSetting);
settingRouter.put('/', authenticate, validate(Validation.update), Controller.updateGeneralSetting);
settingRouter.get('/', authenticate, Controller.getGeneralSetting);

export default settingRouter;
