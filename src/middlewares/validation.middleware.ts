import { Request, Response, NextFunction } from 'express';
import * as Joi from 'joi';

import { pick } from '../shared/utils/pick';

/**
 * Middleware to validate the request with the given schema using Joi
 */
export const validate = (schema: { [key: string]: any }) => (req: Request, res: Response, next: NextFunction) => {
  const validSchema = pick(schema, ['params', 'query', 'body']);

  const object = pick(req, Object.keys(validSchema));

  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: 'key' } })
    .validate(object);

  if (error) {
    const errorMessage = error.details
      .map((details) => details.message)
      .join(', ');
    return res.status(400).json({
      success: false,
      msg: errorMessage,
    });
  }

  Object.assign(req, value);
  return next();
};
