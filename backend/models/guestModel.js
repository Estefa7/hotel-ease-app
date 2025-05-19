const mongoose = require('mongoose');

const guestSchema = new mongoose.Schema(
  {
    firstName:    { type: String, required: true },
    lastName:     { type: String, required: true },
    phoneNumber:  { type: String, required: true },
    checkInDate:  { type: Date, required: true },
    checkOutDate: { type: Date, required: true },
    roomId:       { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
   },
  { timestamps: true }
);

module.exports = mongoose.model('Guest', guestSchema);