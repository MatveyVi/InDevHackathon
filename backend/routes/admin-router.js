const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/admin-controller');
const authCheck = require('../middleware/auth');
const isAdmin = require('../middleware/isAdmin');

router.get('/stats', authCheck, isAdmin, AdminController.getDashboardStats);
router.get('/rooms', authCheck, isAdmin, AdminController.getAllRooms);
router.put('/rooms/:id', authCheck, isAdmin, AdminController.updateRoom);
router.delete('/rooms/:id', authCheck, isAdmin, AdminController.deleteRoom);
router.get('/users', authCheck, isAdmin, AdminController.getAllUsers);
router.delete('/users/:id', authCheck, isAdmin, AdminController.deleteUser);
router.get('/bookings', authCheck, isAdmin, AdminController.getAllBookings);
router.delete('/bookings/:id', authCheck, isAdmin, AdminController.cancelBooking);

module.exports = router;
