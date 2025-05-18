const adminDao = require('../../daos/adminDAO');


exports.login = async (req, res) => {
  console.log("=== LOGIN CONTROLLER REACHED ===");
  ...




  
// 1) Admin login
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await adminDao.getByUsername(username);
    if (!admin || !(await admin.comparePassword(password))) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = admin.generateToken();
    res.json({
      token,
      admin: { id: admin._id, username: admin.username, role: admin.role }
    });
  } catch (err) {
    console.error("Login error:", err); // Add this
    res.status(500).json({ message: 'Server error' });
  }
};

// 2) Create a new admin
exports.createAdmin = async (req, res) => {
  try {
    const newAdmin = await adminDao.create(req.body);
    res.status(201).json({
      id: newAdmin._id,
      username: newAdmin.username,
      role: newAdmin.role
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// 3) List all admins
exports.listAdmins = async (req, res) => {
  try {
    const admins = await adminDao.list({ skip: 0, limit: 100 });
    res.json(admins.map(a => ({
      id: a._id,
      username: a.username,
      role: a.role
    })));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 4) Get an admin by ID
exports.getAdminById = async (req, res) => {
  try {
    const admin = await adminDao.get(req.params.id);
    if (!admin) return res.status(404).json({ message: 'Admin not found' });
    res.json({ id: admin._id, username: admin.username, role: admin.role });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 5) Update an admin
exports.updateAdmin = async (req, res) => {
  try {
    const updated = await adminDao.update(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: 'Admin not found' });
    res.json({ id: updated._id, username: updated.username, role: updated.role });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// 6) Delete an admin
exports.deleteAdmin = async (req, res) => {
  try {
    await adminDao.delete(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
