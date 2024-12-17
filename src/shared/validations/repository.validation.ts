import * as Joi from 'joi';

const create = {
  body: Joi.object().keys({
    name: Joi.string(),
    project: Joi.string(),
    origins: Joi.array().items(Joi.object().keys({
      name: Joi.string(),
      url: Joi.string(),
    })),
    branches: Joi.array().items(Joi.string()),
  }),
};

const update = {
  body: Joi.object().keys({
    name: Joi.string(),
    project: Joi.string(),
    origins: Joi.array().items(Joi.object().keys({
      _id: Joi.string(),
      id: Joi.string(),
      createdAt: Joi.string(),
      updatedAt: Joi.string(),
      name: Joi.string(),
      url: Joi.string(),
    })),
    branches: Joi.array().items(Joi.string()),
  }),
};

export { create, update };
