const express = require('express');
const router = express.Router();
const RoomControlController = require('../controllers/room-control-controller');
const authCheck = require('../middleware/auth');

// Room control routes
router.post('/light', authCheck, RoomControlController.toggleLight);
router.post('/door', authCheck, RoomControlController.toggleDoor);
router.get('/state', authCheck, RoomControlController.getRoomState);

module.exports = router;  