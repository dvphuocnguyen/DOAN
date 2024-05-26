const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema({
  schedule: [
    [
      {
        time: {
          type: String,
          required: true,
        },
        place_name: {
          type: String,
          required: true,
        },
        address: {
          type: String,
          require: true,
        },
        duration: {
          type: String,
          required: true,
        },
        distance: {
          type: String,
          required: true,
        },
      },
    ],
  ],
});

module.exports = mongoose.model("Schedule", scheduleSchema);
