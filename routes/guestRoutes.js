const express = require('express');
const router = express.Router();

const guestController = require('../controllers/guestController');
const {
  validateGuestCreation,
  validateGuestUpdate
} = require('../validators/validate');

// Create a new guest
router.post('/', validateGuestCreation, guestController.createGuest);

// Get a guest by ID
router.get('/:id', guestController.getGuestById);

// List all guests
router.get('/', guestController.listGuests);

// Update a guest
router.put('/:id', validateGuestUpdate, guestController.updateGuest);

// Delete a guest
router.delete('/:id', guestController.deleteGuest);

module.exports = router;
