// routes/guestRoutes.js
const express = require('express');
const router = express.Router();
const guestController = require('../controllers/guestController');
const { validateGuestCreation, validateGuestUpdate } = require('../middleware/validate');
const auth = require('../middleware/authMiddleware');

// Create a new guest
router.post('/guests', auth.protect, validateGuestCreation, guestController.createGuest);

// Get details of a specific guest
router.get('/guests/:id', auth.protect, guestController.getGuestById);

// List all guests
router.get('/guests', auth.protect, guestController.listGuests);

// Update a guest’s details
router.put('/guests/:id', auth.protect, validateGuestUpdate, guestController.updateGuest);

// Delete a guest
router.delete('/guests/:id', auth.protect, guestController.deleteGuest);

module.exports = router;
