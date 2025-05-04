const Joi = require('joi');

const createRoomSchema = Joi.object({
  number: Joi.string().required(),
  type: Joi.string().valid('single', 'double', 'suite').required(),
  price: Joi.number().min(0).required(),
  status: Joi.string().valid('available', 'occupied').default('available')
});

const updateRoomSchema = Joi.object({
  number: Joi.string(),
  type: Joi.string().valid('single', 'double', 'suite'),
  price: Joi.number().min(0),
  status: Joi.string().valid('available', 'occupied')
});

const validateCreateRoom = (data) => createRoomSchema.validate(data);
const validateUpdateRoom = (data) => updateRoomSchema.validate(data);

module.exports = { validateCreateRoom, validateUpdateRoom };
