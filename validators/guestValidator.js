const Joi = require('joi');

const createGuestSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  roomId: Joi.string().required()
});

const updateGuestSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string(),
  roomId: Joi.string()
});

const validateCreateGuest = (data) => createGuestSchema.validate(data);
const validateUpdateGuest = (data) => updateGuestSchema.validate(data);

module.exports = { validateCreateGuest, validateUpdateGuest };
