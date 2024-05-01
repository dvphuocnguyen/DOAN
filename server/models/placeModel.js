const mongoose = require("mongoose");

const placeSchema = new mongoose.Schema({
  place_name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  cost: {
    type: Number,
    required: true,
  },
  timeToLive: {
    type: Number,
    required: false,
  },
  img: {
    type: String,
    required: false,
  },
  event: {
    type: String,
    required: false,
  },
  partner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Partner",
  },
});

module.exports = mongoose.model("Place", placeSchema);
