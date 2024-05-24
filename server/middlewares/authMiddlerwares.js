const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  const token = req.headers["authorization"] || req.body.token || req.query.token;

  if (!token) {
    return res.status(403).json({
      success: false,
      msg: "Token is required for authentication",
    });
  }

  try {
    const bearer = token.split(" ");
    if (bearer.length !== 2 || bearer[0] !== "Bearer") {
      throw new Error("Invalid token format");
    }
    const bearerToken = bearer[1];

    const decodedData = jwt.verify(
      bearerToken,
      process.env.ACCESS_TOKEN_SECRET
    );

    console.log(decodedData, 'decodedData'); // In ra toàn bộ dữ liệu đã giải mã

    if (!decodedData || typeof decodedData !== 'object') {
      throw new Error("Invalid token payload");
    }

    req.user = decodedData;
    // console.log(req.user, 'decoded user data'); 
    // In ra toàn bộ thông tin người dùng
    next();
  } catch (error) {
    return res.status(400).json({
      success: false,
      msg: "Invalid token",
      error: error.message,
    });
  }
};

module.exports = verifyToken;
