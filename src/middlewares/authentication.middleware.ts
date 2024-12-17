import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';

import { IRequest } from '../shared/types';

export const authenticate = async (req: IRequest, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers as any;

    if (!authorization) {
      return res.status(401).send();
    }

    const token = authorization.split(' ');
    if (token[0] !== 'Bearer') {
      return res.status(401).send({ message: 'Invalid JWT' });
    } else {
      req.user = jwt.verify(token[1], process.env.JWT_SECRET);

      return next();
    }
  } catch (e) {
    return res.status(401).send({ message: 'Expired JWT' });
  }
};
