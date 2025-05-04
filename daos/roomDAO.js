const Room = require('../models/roomModel');

exports.create = (roomData) => {
  const room = new Room(roomData);
  return room.save();
};

exports.get = (filter) => Room.findOne(filter);
exports.list = (pageInfo) => Room.find().skip(pageInfo.skip).limit(pageInfo.limit);
exports.update = (id, data) => Room.findByIdAndUpdate(id, data, { new: true });
exports.delete = (id) => Room.findByIdAndDelete(id);
exports.filterRooms = (filters) => Room.find(filters);