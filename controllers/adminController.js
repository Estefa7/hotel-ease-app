const adminDao = require('../daos/adminDao');

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await adminDao.getByEmail(email);
    if (!admin || !admin.validatePassword(password)) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = admin.generateToken(); // Assuming generateToken is a method in the Admin model
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.createAdmin = async (req, res) => {
  // Logic to create admin
};

// Other methods (getAdminById, updateAdmin, deleteAdmin, listAdmins)...
exports.getAdminById = async (req, res) => {
  try {
    const adminId = req.params.id;
    const admin = await adminDao.getById(adminId);