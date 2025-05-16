const Booking = require('../models/booking-model');

class BookingController {
  async bookRoom(req, res) {
    try {
      const { roomId, from, to } = req.body;

      // Проверка занятости
      const overlap = await Booking.findOne({
        room: roomId,
        $or: [
          { from: { $lte: to }, to: { $gte: from } }
        ]
      });

      if (overlap) {
        return res.status(400).json({ error: 'Комната уже занята на это время' });
      }
      // Создание брони
      const booking = await Booking.create({
        user: req.user.id,
        room: roomId,
        from,
        to
      });

      res.json(booking);
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: 'Ошибка при бронировании' });
    }
  }
  async getUserBookings(req, res) {
    const userId = req.user.id;
    const bookings = await Booking.find({ user: userId }).populate('room');
    res.json(bookings);
  }
  async cancelBooking(req, res) {
    try {
      const bookingId = req.params.id;
      const userId = req.user.id;
  
      const booking = await Booking.findById(bookingId);
  
      if (!booking || booking.user.toString() !== userId) {
        return res.status(403).json({ error: 'Нет доступа к этой брони' });
      }
  
      await Booking.deleteOne({ _id: bookingId });
      res.json({ message: 'Бронирование отменено' });
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: 'Ошибка при отмене брони' });
    }
  }
  
}

module.exports = new BookingController();
