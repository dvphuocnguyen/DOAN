const mongoose = require("mongoose");

const partnerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Đảm bảo email duy nhất cho đối tác
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: Number,
    default: 2, // Partner
  },
  payment: {
    type: mongoose.Schema.Types.Mixed, // Cấu trúc thông tin thanh toán linh hoạt (tùy chọn)
    // Bạn có thể định nghĩa các trường thanh toán cụ thể ở đây nếu cần, ví dụ:
    // type: { type: String }, // Phương thức thanh toán (ví dụ: 'thẻ tín dụng', 'ví điện tử')
    // details: { type: Schema.Types.Mixed } // Chi tiết cụ thể cho phương thức thanh toán
  },
  // Mối quan hệ với phòng (một-nhiều)
  rooms: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Room",
  },
});

module.exports = mongoose.model("Partner", partnerSchema);