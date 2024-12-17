import * as Joi from 'joi';

const create = {
  body: Joi.object().keys({
    name: Joi.string(),
    type: Joi.string().valid('github', 'bitbucket', 'gitlab', 'azure', 'other'),
    profile: Joi.string(),
    status: Joi.boolean(),
    folderPath: Joi.string(),
  }),
};

const update = {
  body: Joi.object().keys({
    name: Joi.string(),
    type: Joi.string().valid('github', 'bitbucket', 'gitlab', 'azure', 'other'),
    profile: Joi.string(),
    status: Joi.boolean(),
    folderPath: Joi.string(),
  }),
};

export { create, update };
