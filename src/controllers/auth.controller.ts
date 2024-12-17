import { Request, Response, NextFunction } from 'express';

import { IRequest } from "../shared/types";
import * as Service from '../services/auth.service';
import * as UserService from '../services/user.service';
import * as EmailService from '../services/email.service';

/**
 * Login with email and password
 */
export async function login(req: IRequest, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body;

    const { accessToken, user } = await Service.login(email, password);

    return res.status(200).json({ success: true, accessToken, user });
  } catch (err) {
    return res.status(400).json({ success: false, msg: err.message });
  }
}

/**
 * Create a new user unless the same email was registered
 */
export async function register(req: Request, res: Response, next: NextFunction) {
  try {
    const user = req.body;

    await Service.register(user);
    await EmailService.sendConfirmUserRegistered(user);

    return res.status(201).json({ success: true, msg: 'Please check your email to activate your account.' });
  } catch (err) {
    return res.status(400).json({ success: false, msg: err.message });
  }
}

/**
 * Get current user
 */
export async function fetchMe(req: IRequest, res: Response, next: NextFunction) {
  try {
    const id = req.user.id;

    const user = await Service.getMe(id);
    return res.status(200).json({ success: true, user });
  } catch(err) {
    return res.status(400).json({ success: false, msg: err.message });
  }
}


/**
 * Forgot password
 */
export async function forgotPassword(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await UserService.getUserByEmail(req.body.email);

    if (user) {
      await EmailService.sendChangePasswordConfirmEmail(user);
      return res.status(200).json({ success: true, msg: 'Token sent to your email.' });
    } else {
      return res.status(400).json({ success: false, msg: 'User does not exist.' });
    }
  } catch(err) {
    return res.status(500).json({ success: false, msg: err.message });
  }
}

/**
 * Reset password
 */
export async function resetPassword(req: IRequest, res: Response, next: NextFunction) {
  try {
    await Service.resetUserPassword(req.user, req.body.password);

    res.status(200).json({ success: true, msg: 'Password updated Successfully' });
  } catch(err) {
    res.status(500).json({ success: false, error: err.message });
  }
}