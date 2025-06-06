const Joi = require('joi');

const createGuestSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  phoneNumber: Joi.string().required(),
  checkInDate: Joi.date().required(),
  checkOutDate: Joi.date().required(),
  roomId: Joi.string().required(),
 }).options({ stripUnknown: true });

const updateGuestSchema = Joi.object({
  firstName: Joi.string(),
  lastName: Joi.string(),
  phoneNumber: Joi.string(),
  checkInDate: Joi.date(),
  checkOutDate: Joi.date(),
  roomId: Joi.string(),
 }).options({ stripUnknown: true });;

const validateCreateGuest = (data) => createGuestSchema.validate(data);
const validateUpdateGuest = (data) => updateGuestSchema.validate(data);

module.exports = { validateCreateGuest, validateUpdateGuest };
