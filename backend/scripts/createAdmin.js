const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Admin = require('../models/adminModel');
dotenv.config();

mongoose.connect(process.env.MONGO_URI).then(async () => {
  const exists = await Admin.findOne({ username: 'admin' });
  if (exists) {
    console.log('⚠️ Admin already exists');
    return process.exit();
  }

  const admin = new Admin({
    username: 'admin',
    password: 'admin123' // will be hashed via pre('save')
  });

  await admin.save();
  console.log('✅ Admin created successfully');
  process.exit();
}).catch(err => {
  console.error('❌ MongoDB connection error:', err.message);
  process.exit(1);
});
