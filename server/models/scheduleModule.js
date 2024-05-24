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
        duration: {
          type: String,
          required: true,
        },
        distance:{
          type: String,
          required: true
        }
      },
    ],
  ],
});

module.exports = mongoose.model("Schedule", scheduleSchema);
