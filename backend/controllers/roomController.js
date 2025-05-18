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
    const rooms = await roomDao.list({ skip: 0, limit: 100 });
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
