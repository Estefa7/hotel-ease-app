// middleware/validate.js

const {
  validateCreateRoom,
  validateUpdateRoom
} = require('../validators/roomValidator');
const {
  validateCreateGuest,
  validateUpdateGuest
} = require('../validators/guestValidator');
const {
  validateLogin,
  validateCreateAdmin,
  validateUpdateAdmin
} = require('../validators/adminValidator');

// Room validation
const validateRoomCreation = (req, res, next) => {
  const { error } = validateCreateRoom(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  next();
};
const validateRoomUpdate = (req, res, next) => {
  const { error } = validateUpdateRoom(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  next();
};

// Guest validation
const validateGuestCreation = (req, res, next) => {
  const { error } = validateCreateGuest(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  next();
};
const validateGuestUpdate = (req, res, next) => {
  const { error } = validateUpdateGuest(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  next();
};

// Admin validation
const validateAdminLogin = (req, res, next) => {
  const { error } = validateLogin(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  next();
};
const validateAdminCreation = (req, res, next) => {
  const { error } = validateCreateAdmin(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  next();
};
const validateAdminUpdate = (req, res, next) => {
  const { error } = validateUpdateAdmin(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  next();
};

module.exports = {
  validateRoomCreation,
  validateRoomUpdate,
  validateGuestCreation,
  validateGuestUpdate,
  validateAdminLogin,
  validateAdminCreation,
  validateAdminUpdate
};
