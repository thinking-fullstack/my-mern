import { Router } from 'express';

import { fetchMe, login, register, forgotPassword, resetPassword } from '../controllers/auth.controller';
import { validate } from '../middlewares/validation.middleware';
import * as authValidation from '../shared/validations/auth.validation';
import { authenticate } from '../middlewares/authentication.middleware';

const authRouter = Router();

authRouter.post('/login', validate(authValidation.login), login);
authRouter.post('/register', validate(authValidation.register), register);
authRouter.post('/forgot-password', validate(authValidation.forgotPassword), forgotPassword);
authRouter.post('/reset-password', authenticate, validate(authValidation.resetPassword), resetPassword);
authRouter.get('/me', authenticate, fetchMe);

export default authRouter;
