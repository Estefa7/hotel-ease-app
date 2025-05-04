// validators/adminValidator.js
const Joi = require('joi');

// 1. Login schema
const loginSchema = Joi.object({
  username: Joi.string().min(3).required(),
  password: Joi.string().min(6).required()
});

// 2. Create Admin schema
const createAdminSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().min(6).required(),
  role:     Joi.string().valid('admin', 'manager').default('admin')
});

// 3. Update Admin schema
const updateAdminSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30),
  role:     Joi.string().valid('admin', 'manager')
}).min(1); // Require at least one field

// Validation functions
const validateLogin       = (data) => loginSchema.validate(data);
const validateCreateAdmin = (data) => createAdminSchema.validate(data);
const validateUpdateAdmin = (data) => updateAdminSchema.validate(data);

module.exports = {
  validateLogin,
  validateCreateAdmin,
  validateUpdateAdmin
};
