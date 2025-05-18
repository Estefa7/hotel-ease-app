const Room = require('../models/roomModel');
// Create a new room
async function create(roomData) {
  const room = new Room(roomData);
  await room.save();
  return room;
}

// Get a room by ID
async function get(id) {
  return await Room.findById(id);
}

async function list(filters = {}) {
  const query = {};

  // Filtering
  if (filters.roomType) {
    query.roomType = filters.roomType;
  }

  if (filters.status) {
    query.status = filters.status;
  }

  if (filters.hasBalcony === 'true' || filters.hasBalcony === 'false') {
    query.hasBalcony = filters.hasBalcony === 'true';
  }

  let sort = {};

  // Sorting
  if (filters.sortBy === 'priceAsc') {
    sort.pricePerNight = 1;
  } else if (filters.sortBy === 'priceDesc') {
    sort.pricePerNight = -1;
  }

  return await Room.find(query).sort(sort);
}
// List all rooms with optional filters

// Update a room's details
async function update(id, roomData) {
  const room = await Room.findByIdAndUpdate(id, roomData, { new: true });
  return room;
}

// Delete a room by ID
async function deleteRoom(id) {
  return await Room.findByIdAndDelete(id);
}

// Get rooms by their availability status (e.g., available or occupied)
async function getRoomsByStatus(status) {
  return await Room.find({ status });
}

// Optionally, get rooms by type (e.g., single, double, suite)
async function getRoomsByType(type) {
  return await Room.find({ type });
}

// Optionally, get a list of rooms within a price range
async function getRoomsByPriceRange(minPrice, maxPrice) {
  return await Room.find({ price: { $gte: minPrice, $lte: maxPrice } });
}

// Check if a room is available for a certain period
async function isRoomAvailable(roomId, checkInDate, checkOutDate) {
  const room = await Room.findById(roomId);
  if (!room) return false;

  // Check if the room is available between check-in and check-out dates
  const bookings = await room.bookings;  // Assuming bookings is an array of dates
  const isAvailable = !bookings.some(booking => {
    return booking.checkInDate < checkOutDate && checkInDate < booking.checkOutDate;
  });

  return isAvailable;
}

module.exports = {
  create,
  get,
  list,
  update,
  deleteRoom,
  getRoomsByStatus,
  getRoomsByType,
  getRoomsByPriceRange,
  isRoomAvailable
};
