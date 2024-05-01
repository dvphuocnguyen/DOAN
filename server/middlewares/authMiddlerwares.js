const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers["authorization"];

  if (!token) {
    return res.status(403).json({
      success: false,
      msg: "Token is required for authentication",
    });
  }

  try {
    //'Bearer token';  //0 bearer 1 toke
    const bearer = token.split(" ");
    if (bearer.length !== 2 || bearer[0] !== 'Bearer') {
      throw new Error('Invalid token format');
    }
    const bearerToken = bearer[1];

    const decodedData = jwt.verify(
      bearerToken,
      process.env.ACCESS_TOKEN_SECRET // Sử dụng secret key đúng
    );

    // Lưu trữ thông tin người dùng vào req.user
    req.user = decodedData; // hoặc decodedData.user tùy thuộc vào cấu trúc của token

    // Tiếp tục điều hướng tới middleware hoặc controller tiếp theo
    next();
  } catch (error) {
    return res.status(400).json({
      success: false,
      msg: "Invalid token authmiddleware",
    });
  }
};

module.exports = verifyToken;
