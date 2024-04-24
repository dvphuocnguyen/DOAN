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

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    const userData = await user.save();

    return res.status(200).json({
      success: true,
      msg: "Đăng ký thành công",
      data: userData,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      msg: `${error.message} trong authcontroller`,
    });
  }
};
// login user

const generateAccessToken = async (user) => {
  const token = jwt.sign(user, process.env.ACCESS_SECRET_TOKEN, {
    expiresIn: "2h",
  });
  return token;
};

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
        msg: "Email & Password is incorrect",
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, userData.password);

    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        msg: "Email & Password is incorrect",
      });
    }

    const accessToken = await generateAccessToken({ user: userData });

    return res.status(200).json({
      success: true,
      msg: "Login successful",
      accessToken: accessToken,
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



    return res.status(200).json({
      success: true,
      msg: req.user,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      msg: `${error.message} trong authcontroller_getprofile`,
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getProfile,
};
