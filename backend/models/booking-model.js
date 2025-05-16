const { Schema, model, Types } = require('mongoose');

const BookingSchema = new Schema({
  user: { type: Types.ObjectId, ref: 'User', required: true },
  room: { type: Types.ObjectId, ref: 'Room', required: true },
  from: { type: Date, required: true },
  to: { type: Date, required: true },
}, {
  timestamps: true,
});

module.exports = model('Booking', BookingSchema);
