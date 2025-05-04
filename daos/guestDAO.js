const Guest = require('../models/guestModel');

exports.create = (guestData) => {
  const guest = new Guest(guestData);
  return guest.save();
};

exports.get = (filter) => Guest.findOne(filter);
exports.list = (pageInfo) => Guest.find().skip(pageInfo.skip).limit(pageInfo.limit);
exports.update = (id, data) => Guest.findByIdAndUpdate(id, data, { new: true });
exports.delete = (id) => Guest.findByIdAndDelete(id);
exports.getByRoomId = (roomId) => Guest.find({ roomId });