const Admin = require('../models/adminModel');  // Import your Admin model

// Get an admin by their username
async function getByUsername(username) {
  return await Admin.findOne({ username });
}

// Create a new admin
async function create(adminData) {
  const admin = new Admin(adminData);
  await admin.save();
  return admin;
}

// Get an admin by ID
async function get(id) {
  return await Admin.findById(id);
}

// List all admins (with optional pagination)
async function list({ skip = 0, limit = 100 }) {
  return await Admin.find().skip(skip).limit(limit);
}

// Update an admin's details
async function update(id, adminData) {
  return await Admin.findByIdAndUpdate(id, adminData, { new: true });
}

// Delete an admin by ID
async function deleteAdmin(id) {
  return await Admin.findByIdAndDelete(id);
}

module.exports = {
  getByUsername,
  create,
  get,
  list,
  update,
  deleteAdmin
};
