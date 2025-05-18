const Guest = require('../models/GuestModel');

// Create a new guest
async function create(guestData) {
  const guest = new Guest(guestData);
  await guest.save();
  return guest;
}

// Get a guest by ID
async function get(id) {
  return await Guest.findById(id).populate('roomId');  // Assuming roomId is a reference to the Room model
}

// Get all guests, optionally with filters like pagination
async function list({ skip = 0, limit = 100 }) {
  return await Guest.find().skip(skip).limit(limit).populate('roomId');
}

// Update a guest's details
async function update(id, guestData) {
  const guest = await Guest.findByIdAndUpdate(id, guestData, { new: true });
  return guest;
}

// Delete a guest by ID
async function deleteGuest(id) {
  return await Guest.findByIdAndDelete(id);
}

// Get all guests in a specific room (optional)
async function getGuestsByRoom(roomId) {
  return await Guest.find({ roomId }).populate('roomId');
}

// Optionally, you can add additional methods for reporting or analytics
async function getGuestStayDuration(guestId) {
  const guest = await Guest.findById(guestId);
  if (guest && guest.checkInDate && guest.checkOutDate) {
    const duration = (new Date(guest.checkOutDate) - new Date(guest.checkInDate)) / (1000 * 60 * 60 * 24);
    return duration;
  }
  return null;
}

module.exports = {
  create,
  get,
  list,
  update,
  deleteGuest,
  getGuestsByRoom,
  getGuestStayDuration
};
