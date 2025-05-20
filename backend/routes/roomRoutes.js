const express = require('express');
const router = express.Router();

const roomController = require('../controllers/roomController');
const { validateRoomCreation, validateRoomUpdate } = require('../middleware/validate');
const auth = require('../middleware/authMiddleware');
// ✅ DEBUG: check what these really are
console.log('auth.protect is', typeof auth.protect);
console.log('validateRoomCreation is', typeof validateRoomCreation);
console.log('roomController.createRoom is', typeof roomController.createRoom);

// Create a new room
router.post('/', auth.protect, validateRoomCreation, roomController.createRoom);

// Filter rooms by query parameters (should be placed before `/:id`)
router.get('/filter/advanced', auth.protect, roomController.filterRooms);

// Get all assignments for a specific room
router.get('/:id/assignments', auth.protect, roomController.getRoomAssignments);

// List all rooms
router.get('/', auth.protect, roomController.listRooms);

// Get details of a specific room by ID
router.get('/:id', auth.protect, roomController.getRoomById);

// Update a room’s details
router.put('/:id', auth.protect, validateRoomUpdate, roomController.updateRoom);

// Delete a room
router.delete('/:id', auth.protect, roomController.deleteRoom);

module.exports = router;
