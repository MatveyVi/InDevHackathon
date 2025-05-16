const { Schema, model } = require('mongoose');

const RoomSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['Эконом', 'Стандарт', 'Люкс'],
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  temperature: {
    type: Number,
    required: true,
  },
  humidity: {
    type: Number,
    required: true,
  },
  isDoorOpen: {
    type: Boolean,
    default: false,
  },
  isOccupied: {
    type: Boolean,
    default: false,
  },
  image: {
    type: String,
    default: '',
  },
}, {
  timestamps: true,
});

module.exports = model('Room', RoomSchema);
