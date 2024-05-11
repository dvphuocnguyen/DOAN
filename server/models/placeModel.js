const mongoose = require("mongoose");

const placeSchema = new mongoose.Schema({
  place_name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
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
    required: true,
  },
  placeType: {
    type: Array,
    required: true,
  },
  img: {
    type: String,
    required: false,
  },
  rating: {
    type: Number,
    required: false,
  },
  event: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("Place", placeSchema);
