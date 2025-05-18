// models/adminModel.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const adminSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role:     { type: String, default: 'admin' },
  },
  { timestamps: true }
);

// Hash password before saving
adminSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Instance method to compare a plain-text password
adminSchema.methods.comparePassword = function (candidatePwd) {
  return bcrypt.compare(candidatePwd, this.password);
};

// Instance method to generate JWT
adminSchema.methods.generateToken = function () {
  return jwt.sign(
    { id: this._id, username: this.username, role: this.role },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
};

module.exports = mongoose.model('Admin', adminSchema);
