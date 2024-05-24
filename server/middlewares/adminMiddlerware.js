const onlyAdminAccess = async (req, res, next) => {
  console.log(req.user,'aaaaaaxxxxxx')
  try {
    // Kiểm tra xem người dùng có phải là admin không
    console.log(req.user,'adminmiddlerware11')
    if (req.user.role !== 1) {
      return res.status(403).json({
        success: false,
        msg: "You don't have permission to access this route",
      });
    }

    // Nếu là admin, tiếp tục xử lý yêu cầu
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      msg: "Internal server error",
    });
  }
};

module.exports = {
  onlyAdminAccess,
};
