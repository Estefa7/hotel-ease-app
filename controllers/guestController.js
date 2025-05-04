const guestDao = require('../daos/guestDao');

exports.createGuest = async (req, res) => {
  try {
    const guest = await guestDao.create({ ...req.body, createdBy: req.user.id });
    res.status(201).json(guest);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getGuestById = async (req, res) => {
  try {
    const guest = await guestDao.get({ _id: req.params.id });
    if (!guest) return res.status(404).json({ message: 'Guest not found' });
    res.json(guest);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.listGuests = async (req, res) => {
  try {
    const guests = await guestDao.list({ skip: 0, limit: 100 });
    res.json(guests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateGuest = async (req, res) => {
  try {
    const guest = await guestDao.update(req.params.id, req.body);
    if (!guest) return res.status(404).json({ message: 'Guest not found' });
    res.json(guest);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteGuest = async (req, res) => {
  try {
    await guestDao.delete(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getGuestsByRoom = async (req, res) => {
  try {
    const guests = await guestDao.getByRoomId(req.params.roomId);
    if (guests.length === 0) return res.json({ message: 'No guests found for this room' });
    res.json(guests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};