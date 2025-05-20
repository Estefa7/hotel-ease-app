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
  const { error, value } = validateUpdateRoom(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  req.body = value; 
  next();
};

// Guest validation
const validateGuestCreation = (req, res, next) => {
  console.log('🛡 validateGuestCreation triggered with:', req.body);

  const { error, value } = validateCreateGuest(req.body); // include `value`

  if (error) {
    console.error('❌ Guest validation failed:', error.details[0].message);
    return res.status(400).json({ message: error.details[0].message });
  }

  req.body = value; // ✅ assign cleaned data (stripped of `_id`, etc.)
  next();
};

const validateGuestUpdate = (req, res, next) => {
  const { error, value } = validateUpdateGuest(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  req.body = value; // ✅ Use the validated + stripped version
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
