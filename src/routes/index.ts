import { Router } from 'express';

import authRouter from './auth.router';
import settingRouter from './setting.router';
import projectRouter from './project.router';
import repositoryRouter from './repository.router';
import profileRouter from './profile.router';

const router = Router();

router.use('/auth', authRouter);
router.use('/setting', settingRouter);
router.use('/project', projectRouter);
router.use('/repository', repositoryRouter);
router.use('/profile', profileRouter);

export default router;
