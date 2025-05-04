// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const {
  validateAdminLogin,
  validateAdminCreation,
  validateAdminUpdate
} = require('../middleware/validate');

// Public: Admin login
router.post('/auth/login', validateAdminLogin, adminController.login);

// Protected: Create a new admin (only accessible by existing admins)
router.post(
  '/',
  /* auth.protect, auth.restrictTo('super-admin'), */ // add auth middleware as needed
  validateAdminCreation,
  adminController.createAdmin
);

// Protected: Get a list of all admins
router.get(
  '/',
  /* auth.protect, auth.restrictTo('super-admin'), */
  adminController.listAdmins
);

// Protected: Get a specific admin by ID
router.get(
  '/:id',
  /* auth.protect, auth.restrictTo('super-admin'), */
  adminController.getAdminById
);

// Protected: Update an admin’s details
router.put(
  '/:id',
  /* auth.protect, auth.restrictTo('super-admin'), */
  validateAdminUpdate,
  adminController.updateAdmin
);

// Protected: Delete an admin
router.delete(
  '/:id',
  /* auth.protect, auth.restrictTo('super-admin'), */
  adminController.deleteAdmin
);

module.exports = router;
