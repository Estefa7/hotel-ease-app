// routes/guestRoutes.js
const express = require('express');
const router = express.Router();
const guestController = require('../controllers/guestController');
const { validateGuestCreation, validateGuestUpdate } = require('../middleware/validate');
const auth = require('../middleware/authMiddleware');

// Create a new guest
router.post('/', auth.protect, validateGuestCreation, guestController.createGuest);

// Get details of a specific guest
router.get('/:id', auth.protect, guestController.getGuestById);

// List all guests
router.get('/', auth.protect, guestController.listGuests);

// Update a guest’s details
router.put('/:id', auth.protect, validateGuestUpdate, guestController.updateGuest);

// Delete a guest
router.delete('/:id', auth.protect, guestController.deleteGuest);

module.exports = router;
