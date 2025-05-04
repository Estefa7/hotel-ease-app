const { validateCreateRoom, validateUpdateRoom } = require('../validators/roomValidator');
const { validateCreateGuest, validateUpdateGuest } = require('../validators/guestValidator');

// Validation middleware for creating a room
const validateRoomCreation = (req, res, next) => {
  const { error } = validateCreateRoom(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

// Validation middleware for updating a room
