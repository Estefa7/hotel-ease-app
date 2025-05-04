const express = require('express');
const router = express.Router();

const roomController = require('../controllers/roomController');
const {
  validateRoomCreation,
  validateRoomUpdate
} = require('../validators/validate');

// Create a new room
router.post('/', validateRoomCreation, roomController.createRoom);

// Get a room by ID
router.get('/:id', roomController.getRoomById);

// List all rooms
router.get('/', roomController.listRooms);

// Update a room
router.put('/:id', validateRoomUpdate, roomController.updateRoom);

// Delete a room
router.delete('/:id', roomController.deleteRoom);

// Filter rooms by query parameters
router.get('/filter/params', roomController.filterRooms);

module.exports = router;
