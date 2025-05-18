const guestDao = require('../daos/guestDAO');

// Create a new guest
exports.createGuest = async (req, res) => {
  try {
    const guest = await guestDao.create({ ...req.body, createdBy: req.user.id });
    res.status(201).json(guest);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get a guest by ID
exports.getGuestById = async (req, res) => {
  try {
    const guest = await guestDao.get(req.params.id);       // pass id directly
    if (!guest) return res.status(404).json({ message: 'Guest not found' });
    res.json(guest);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// List all guests (with optional pagination)
exports.listGuests = async (req, res) => {
  try {
    const { skip = 0, limit = 100 } = req.query;  // Accept pagination parameters
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
    const deleted = await guestDao.deleteGuest(req.params.id);  // call deleteGuest
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
