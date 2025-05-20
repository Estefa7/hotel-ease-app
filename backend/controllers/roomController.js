const roomDao = require('../daos/roomDAO');

exports.createRoom = async (req, res) => {
  try {
    const room = await roomDao.create({ ...req.body, createdBy: req.user.id });
    res.status(201).json(room);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getRoomById = async (req, res) => {
  try {
    const room = await roomDao.get(req.params.id);
    if (!room) return res.status(404).json({ message: 'Room not found' });
    res.json(room);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.listRooms = async (req, res) => {
  try {
    const filters = {
      roomType: req.query.roomType,
      status: req.query.status,
      hasBalcony: req.query.hasBalcony,
      search: req.query.search,
      minPrice: req.query.minPrice,
      maxPrice: req.query.maxPrice,
      sortBy: req.query.sortBy,
    };

    const rooms = await roomDao.list(filters);
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



exports.updateRoom = async (req, res) => {
  try {
    const room = await roomDao.update(req.params.id, req.body);
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }
    res.json(room);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteRoom = async (req, res) => {
  try {
    await roomDao.deleteRoom(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.filterRooms = async (req, res) => {
  try {
    const filters = { ...req.query };
    const rooms = await roomDao.filterRooms(filters);
    if (rooms.length === 0) return res.json({ message: 'No rooms found' });
    res.json(rooms);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const Guest = require('../models/guestModel');

exports.getRoomAssignments = async (req, res) => {
  try {
    const roomId = req.params.id;
    const today = new Date();

    const guests = await Guest.find({ roomId });

    const currentGuests = guests
      .filter(guest =>
        new Date(guest.checkInDate) <= today &&
        new Date(guest.checkOutDate) >= today
      )
      .sort((a, b) => new Date(a.checkInDate) - new Date(b.checkInDate));

    const futureGuests = guests
      .filter(guest =>
        new Date(guest.checkInDate) > today
      )
      .sort((a, b) => new Date(a.checkInDate) - new Date(b.checkInDate));


    res.json({
      currentGuests,
      futureGuests
    });
  } catch (err) {
    console.error('Error fetching room assignments:', err);
    res.status(500).json({ error: 'Server error' });
  }
};
