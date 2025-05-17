const Booking = require('../models/booking-model');
const Room = require('../models/room-model');
const User = require('../models/user-model'); // предполагается, что у тебя есть такая модель
const { handleServerError } = require('../utils/error-debug');

class AdminController {
  async getDashboardStats(req, res) {
    try {
      const [totalRooms, totalGuests, availableRooms] = await Promise.all([
        Room.countDocuments(),
        User.countDocuments({ role: 'user' }),
        Room.countDocuments({ isOccupied: false })
      ]);

      res.json({
        totalRooms,
        totalGuests,
        availableRooms
      });
    } catch (error) {
      handleServerError(res, error, 'getDashboardStats');
    }
  }

  async getAllRooms(req, res) {
    try {
      // Get all rooms and current bookings
      const [rooms, currentBookings] = await Promise.all([
        Room.find(),
        Booking.find({
          from: { $lte: new Date() },
          to: { $gte: new Date() }
        }).select('room')
      ]);

      // Create a set of currently booked room IDs
      const bookedRoomIds = new Set(currentBookings.map(booking => booking.room.toString()));

      // Enhance room data with current booking status
      const enhancedRooms = rooms.map(room => {
        const roomObj = room.toObject();
        roomObj.isOccupied = bookedRoomIds.has(room._id.toString());
        return roomObj;
      });

      res.json(enhancedRooms);
    } catch (error) {
      handleServerError(res, error, 'getAllRooms');
    }
  }

  async updateRoom(req, res) {
    try {
      const { id } = req.params;
      const room = await Room.findByIdAndUpdate(id, req.body, { new: true });
      
      if (!room) {
        return res.status(404).json({ message: 'Room not found' });
      }

      res.json(room);
    } catch (error) {
      handleServerError(res, error, 'updateRoom');
    }
  }

  async deleteRoom(req, res) {
    try {
      const { id } = req.params;
      const room = await Room.findByIdAndDelete(id);
      
      if (!room) {
        return res.status(404).json({ message: 'Room not found' });
      }

      // Delete all bookings associated with this room
      await Booking.deleteMany({ room: id });

      res.json({ message: 'Room deleted successfully' });
    } catch (error) {
      handleServerError(res, error, 'deleteRoom');
    }
  }

  async getAllUsers(req, res) {
    try {
      const users = await User.find({ role: 'user' });
      res.json(users);
    } catch (error) {
      handleServerError(res, error, 'getAllUsers');
    }
  }

  async deleteUser(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findByIdAndDelete(id);
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Delete all bookings associated with this user
      await Booking.deleteMany({ user: id });

      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      handleServerError(res, error, 'deleteUser');
    }
  }

  async getAllBookings(req, res) {
    try {
      const bookings = await Booking.find()
        .populate('user', 'name phone')
        .populate('room', 'name type');
      res.json(bookings);
    } catch (error) {
      handleServerError(res, error, 'getAllBookings');
    }
  }

  async cancelBooking(req, res) {
    try {
      const { id } = req.params;
      const booking = await Booking.findByIdAndDelete(id);
      
      if (!booking) {
        return res.status(404).json({ message: 'Booking not found' });
      }

      // Update room status
      await Room.findByIdAndUpdate(booking.room, { isOccupied: false });

      res.json({ message: 'Booking cancelled successfully' });
    } catch (error) {
      handleServerError(res, error, 'cancelBooking');
    }
  }
}

module.exports = new AdminController();
