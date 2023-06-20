import * as Joi from 'joi';

export const envValidationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test', 'staging')
    .default('development'),
  PORT: Joi.number().default(5310),
});

export const validationOptions = {
  allowUnknown: false,
  abortEarly: true,
};
