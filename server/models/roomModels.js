const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
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
});

module.exports = mongoose.model("Room", roomSchema);
