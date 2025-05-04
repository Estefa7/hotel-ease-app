const Admin = require('../models/adminModel');

exports.create = async (adminData) => {
  const admin = new Admin(adminData);
  return await admin.save();
};

exports.getByEmail = async (email) => {
  return await Admin.findOne({ email });
};

// Other DAO methods (get, update, delete, list)...
exports.getById = async (id) => {
  return await Admin.findById(id);
};
