// validators/roomValidator.js
const Joi = require('joi');

const createRoomSchema = Joi.object({
  roomNumber:    Joi.string().required(),
  roomType:      Joi.string().valid('single','double','suite').required(),
  pricePerNight: Joi.number().min(0).required(),
  capacity:      Joi.number().min(1).required(),
  hasBalcony:    Joi.boolean().optional(),
  availability:  Joi.boolean().optional(),
  status:        Joi.string().valid('vacant','occupied','maintenance').optional()
});

const updateRoomSchema = Joi.object({
  roomNumber:    Joi.string(),
  roomType:      Joi.string().valid('single','double','suite'),
  pricePerNight: Joi.number().min(0),
  capacity:      Joi.number().min(1),
  hasBalcony:    Joi.boolean(),
  availability:  Joi.boolean(),
  status:        Joi.string().valid('vacant','occupied','maintenance')
});

module.exports = {
  validateCreateRoom: data => createRoomSchema.validate(data),
  validateUpdateRoom: data => updateRoomSchema.validate(data)
};
