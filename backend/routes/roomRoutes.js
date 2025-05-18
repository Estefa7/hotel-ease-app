const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomController');
const { validateRoomCreation, validateRoomUpdate } = require('../middleware/validate');
const auth = require('../middleware/authMiddleware');

// Create a new room
router.post('/room', auth.protect, validateRoomCreation, roomController.createRoom);

// Get details of a specific room by ID
router.get('/room/:id', auth.protect, roomController.getRoomById);

// List all rooms
router.get('/room', auth.protect, roomController.listRooms);

// Update a room’s details
router.put('/room/:id', auth.protect, validateRoomUpdate, roomController.updateRoom);

// Delete a room
router.delete('/room/:id', auth.protect, roomController.deleteRoom);

// Filter rooms by query parameters
router.get('/room/filter', auth.protect, roomController.filterRooms);

module.exports = router;
