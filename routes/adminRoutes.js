const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.post('/auth/login', adminController.login);
router.post('/create', adminController.createAdmin);
router.get('/:id', adminController.getAdminById);
router.put('/:id', adminController.updateAdmin);
router.delete('/:id', adminController.deleteAdmin);
router.get('/', adminController.listAdmins);

module.exports = router;
