const User = require("../../models/userModels"); // Đường dẫn có thể thay đổi tùy theo cấu trúc thư mục của bạn

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select("-password"); // Lấy tất cả người dùng nhưng không bao gồm mật khẩu
    res.json({
      success: true,
      data: users
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};


module.exports = {
    getAllUsers
}