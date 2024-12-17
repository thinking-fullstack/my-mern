import * as Joi from 'joi';

const create = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    projects: Joi.array().items(Joi.string()),
  }),
};

const update = {
  body: Joi.object().keys({
    name: Joi.string(),
    email: Joi.string().email(),
    projects: Joi.array().items(Joi.string()),
  }),
};

export { create, update };
