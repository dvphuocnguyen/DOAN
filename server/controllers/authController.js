const User = require("../models/userModels");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//func
// register user
const registerUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(200).json({
        success: false,
        msg: "Có lỗi trong quá trình đăng ký",
        errors: errors.array(),
      });
    }

    const { name, email, password } = req.body;

    const isExistUser = await User.findOne({ email });

    if (isExistUser) {
      return res.status(400).json({
        success: false,
        msg: "Email đã tồn tại",
      });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ msg: "Password is at least 6 characters long." });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    const userData = await user.save();
    const accesstoken = createAccessToken({ id: userData._id });
    const refreshtoken = createRefreshToken({ id: userData._id });
    res.cookie("refreshtoken", refreshtoken, {
      httpOnly: true,
      path: "/refresh_token",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7d
    });

    // Trả về một đối tượng JSON chứa kết quả đăng ký thành công
    return res.status(200).json({
      success: true,
      msg: "Đăng ký thành công",
      data: userData,
      accesstoken: `${accesstoken}`, // Thêm access token vào đối tượng phản hồi
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      msg: `${error.message} trong authcontroller`,
    });
  }
};

// login user

// const generateAccessToken = async (user) => {
//   const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
//     expiresIn: "2h",
//   });
//   return token;
// };

const loginUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(200).json({
        success: false,
        msg: "Có lỗi trong quá trình đăng nhập",
        errors: errors.array(),
      });
    }

    const { email, password } = req.body;

    const userData = await User.findOne({ email });

    if (!userData) {
      return res.status(400).json({
        success: false,
        msg: "Email or Password is incorrect",
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, userData.password);

    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        msg: "Email & Password is incorrect",
      });
    }

    const accesstoken = createAccessToken({ id: userData._id });
    const refreshtoken = createRefreshToken({ id: userData._id });

    res.cookie("refreshtoken", refreshtoken, {
      httpOnly: true,
      path: "/user/refresh_token",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7d
    });
    // res.json({ accesstoken });

    return res.status(200).json({
      success: true,
      msg: "Login successful",
      accessToken: accesstoken,
      tokenType: "Bearer",
      data: userData,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      msg: `${error.message} trong authcontroller`,
    });
  }
};
const getProfile = async (req, res) => {
  try {
    const user_id = req.user.id;
    const userData = await User.findOne({ _id: user_id });

    //Kiểm tra nếu không có thông tin người dùng
    if (!userData) {
      return res.status(401).json({
        success: false,
        msg: "User not found",
      });
    }

    // Trả về tất cả các trường thông tin của người dùng trong phản hồi
    return res.status(200).json({
      success: true,  
      msg: "Success get profile",
      data: userData,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: "Server error get profile",
    });
  }
};

const getUser = async (req, res) => {
  try {
    const userID = await authMe(req);
    const user = await User.findById(userID).select("-password");
    if (!user) return res.status(400).json({ msg: "User does not exist." });
    res.json(user);
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

//
const logoutUser = async (req, res) => {
  try {
    // Thực hiện các bước để đăng xuất tại đây, ví dụ: xóa token từ client-side.

    return res.status(200).json({
      success: true,
      msg: "Logout successful",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      msg: `${error.message} trong authcontroller_logout`,
    });
  }
};

const logout = (req, res) => {
  try {
    // Xóa token khỏi trình duyệt bằng cách xóa cookie có tên 'access_token'
    res.clearCookie("accessToken");

    // Phản hồi cho client rằng đã logout thành công
    res.json({
      success: true,
      msg: "Logout successful",
    });
  } catch (error) {
    // Nếu có lỗi, trả về phản hồi lỗi
    return res.status(500).json({
      success: false,
      msg: "Internal server error",
    });
  }
};

const refreshToken = async (req, res) => {
  try {
    const rf_token = req.cookies.refreshtoken;
    console.log(req.cookies.refreshtoken);
    if (!rf_token)
      return res.status(400).json({ msg: "Please Login or Register" });

    jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) return res.status(400).json({ msg: "Please Login or Register" });

      const accesstoken = createAccessToken({ id: user.id });

      res.json({ accesstoken });
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

const createAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "7d" });
};
const createRefreshToken = (user) => {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
};

module.exports = {
  registerUser,
  loginUser,
  getProfile,
  logoutUser,
  refreshToken,
  getUser,
  logout,
};
