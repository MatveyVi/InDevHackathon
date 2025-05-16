const { Schema, model } = require('mongoose')

const RoomSchema = new Schema({
  isDoorOpen: {
    type: Boolean,
    default: false,
  },
  isOccupied: {
    type: Boolean,
    default: false,
  },
  temperature: {
    type: Number,
    required: true,
  },
}, {
  timestamps: true,
});

module.exports = model('Room', RoomSchema);
