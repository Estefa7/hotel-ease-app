const jwt = require('jsonwebtoken');
const Admin = require('../models/adminModel');

async function protect(req, res, next) {
  console.log('🔐 protect middleware triggered');

  const authHeader = req.headers.authorization;
  console.log('📥 Authorization Header:', authHeader);

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.error('❌ No token provided');
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];
  console.log('🔑 Extracted Token:', token);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('✅ Decoded token payload:', decoded);

    const admin = await Admin.findById(decoded.id).select('-password');
    if (!admin) {
      console.error('❌ Admin not found for decoded ID:', decoded.id);
      return res.status(401).json({ message: 'Invalid token' });
    }

console.log('👤 Authenticated admin:', {
  id: admin._id,
  username: admin.username,
  email: admin.email,
});
    req.user = admin; // ✅ Attach user (admin) to req.user
    next();
  } catch (err) {
    console.error('❌ Token verification failed:', err.message);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}

module.exports = { protect };
