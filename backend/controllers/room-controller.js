const Booking = require('../models/booking-model');
const Room = require('../models/room-model');

class RoomController {
  async getAvailableRooms(req, res) {
    try {
      const { from, to } = req.body; 
  
      await Booking.deleteMany({ to: { $lt: new Date() } });
  
      if (!from || !to) {
        return res.status(400).json({ message: 'Укажите даты from и to' });
      }
  
      const fromDate = new Date(from);
      const toDate = new Date(to);
  
      const busyBookings = await Booking.find({
        $or: [
          { from: { $lte: toDate }, to: { $gte: fromDate } },
        ]
      });
  
      const busyRoomIds = busyBookings.map(b => b.room.toString());
  
      const availableRooms = await Room.find({
        _id: { $nin: busyRoomIds }
      });
  
      res.json(availableRooms);
    } catch (error) {
      console.error('Ошибка при получении доступных комнат:', error);
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  }
  
}

module.exports = new RoomController();
