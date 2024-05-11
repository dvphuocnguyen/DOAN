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
        timeToLive: {
          type: String,
          required: true,
        },
      },
    ],
  ],
});

module.exports = mongoose.model("Schedule", scheduleSchema);
