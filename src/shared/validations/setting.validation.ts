import * as Joi from 'joi';

const create = {
  body: Joi.object().keys({
    rootPath: Joi.string(),
    sshConfigPath: Joi.string(),
    interval: Joi.number(),
    isSyncing: Joi.boolean(),
  }),
};

const update = {
  body: Joi.object().keys({
    rootPath: Joi.string(),
    sshConfigPath: Joi.string(),
    interval: Joi.number(),
    isSyncing: Joi.boolean(),
  }),
};

export { create, update };
