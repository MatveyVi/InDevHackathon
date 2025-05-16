const express = require('express')
const router = express.Router()
const RoomController = require('../controllers/room-controller')
const BookingController = require('../controllers/booking-controller')
const { authCheck } = require('../middleware/auth')

router.get('/all-rooms', authCheck, RoomController.getAvailableRooms)
router.get('/my-room', authCheck, BookingController.getUserBookings)
router.post('/book', authCheck, BookingController.bookRoom)
router.delete('/my-room/:id', authCheck, BookingController.cancelBooking)

module.exports = router 