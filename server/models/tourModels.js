const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  numberOfParticipants: {
    type: Number,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  // Thêm bất kỳ thông tin khác về booking mà bạn muốn bao gồm
});

const tourSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  partner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Partner",
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  bookings: [bookingSchema], // Thêm mảng booking vào schema của tour
});

module.exports = mongoose.model("Tour", tourSchema);
