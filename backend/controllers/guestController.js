const mongoose = require('mongoose');
const guestDao = require('../daos/guestDAO');
const Room = require('../models/roomModel'); // ✅ Import Room model
const { validateCreateGuest } = require('../validators/guestValidator'); // <-- Make sure this path is correct
const { validateGuestCreation } = require('../middleware/validate');

// Create a new guest
exports.createGuest = async (req, res) => {
  const guestData = req.body;

  // ✅ No manual validation here — handled by middleware
  // ✅ Validate roomId
  if (!guestData.roomId || !mongoose.Types.ObjectId.isValid(guestData.roomId)) {
    return res.status(400).json({ error: 'Invalid or missing roomId' });
  }

  try {
    const room = await Room.findById(guestData.roomId);
    if (!room) {
      return res.status(400).json({ error: 'Room not found with given roomId' });
    }

    const guest = await guestDao.create(guestData);
    res.status(201).json(guest);
  } catch (error) {
    console.error('❌ Error creating guest:', error);
    res.status(400).json({ message: error.message });
  }
};

// Get a guest by ID
exports.getGuestById = async (req, res) => {
  try {
    const guest = await guestDao.get(req.params.id);
    if (!guest) return res.status(404).json({ message: 'Guest not found' });
    res.json(guest);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// List all guests (with optional pagination)
exports.listGuests = async (req, res) => {
  try {
    const { skip = 0, limit = 100 } = req.query;
    const guests = await guestDao.list({ skip: parseInt(skip), limit: parseInt(limit) });
    res.json(guests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a guest's details
exports.updateGuest = async (req, res) => {
  try {
    const guest = await guestDao.update(req.params.id, req.body);
    if (!guest) return res.status(404).json({ message: 'Guest not found' });
    res.json(guest);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a guest by ID
exports.deleteGuest = async (req, res) => {
  try {
    const deleted = await guestDao.deleteGuest(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Guest not found' });
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all guests in a specific room
exports.getGuestsByRoom = async (req, res) => {
  try {
    const guests = await guestDao.getByRoomId(req.params.roomId);
    if (guests.length === 0) return res.status(404).json({ message: 'No guests found for this room' });
    res.json(guests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
