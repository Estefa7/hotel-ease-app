const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema(
  {
    roomNumber:   { type: String, required: true, unique: true },
    roomType:     { type: String, required: true },
    pricePerNight:{ type: Number, required: true },
    capacity:     { type: Number, required: true },
    hasBalcony:   { type: Boolean, default: false },
    availability: { type: Boolean, default: true },
    status:       { type: String, enum: ['vacant','occupied','maintenance'], default: 'vacant' },
    createdBy:    { type: mongoose.Schema.Types.ObjectId, ref: 'Admin', required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Room', roomSchema);