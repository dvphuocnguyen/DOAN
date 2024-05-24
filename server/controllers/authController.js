const User = require("../models/userModels");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//func
// register user
// const registerUser = async (req, res) => {
//   try {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(200).json({
//         success: false,
//         msg: "Có lỗi trong quá trình đăng ký",
//         errors: errors.array(),
//       });
//     }

//     const { name, email, password } = req.body;

//     const isExistUser = await User.findOne({ email });

//     if (isExistUser) {
//       return res.status(400).json({
//         success: false,
//         msg: "Email đã tồn tại",
//       });
//     }

//     if (password.length < 6) {
//       return res
//         .status(400)
//         .json({ msg: "Password is at least 6 characters long." });
//     }
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = new User({
//       name,
//       email,
//       password: hashedPassword,
//     });

//     const userData = await user.save();
//     const accesstoken = createAccessToken(userData); // Thay đổi ở đây
//     const refreshtoken = createRefreshToken(userData); // Thay đổi ở đây

//     res.cookie("refreshtoken", refreshtoken, {
//       httpOnly: true,
//       path: "/api/refresh_token",
//       maxAge: 7 * 24 * 60 * 60 * 1000, // 7d
//     });

//     // Trả về một đối tượng JSON chứa kết quả đăng ký thành công
//     return res.status(200).json({
//       success: true,
//       msg: "Đăng ký thành công",
//       data: userData,
//       accesstoken: `${accesstoken}`, // Thêm access token vào đối tượng phản hồi
//     });
//   } catch (error) {
//     return res.status(400).json({
//       success: false,
//       msg: `${error.message} trong authcontroller`,
//     });
//   }
// };

///test register
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
      role: 3, // Giả sử role mặc định là 'user'
    });

    const userData = await user.save();
    const accesstoken = createAccessToken(userData); // Truyền toàn bộ đối tượng userData
    const refreshtoken = createRefreshToken(userData); // Truyền toàn bộ đối tượng userData

    res.cookie("refreshtoken", refreshtoken, {
      httpOnly: true,
      path: "/api/refresh_token",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7d
    });

    return res.status(200).json({
      success: true,
      msg: "Đăng ký thành công",
      data: userData,
      accesstoken: `${accesstoken}`,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      msg: `${error.message} trong authcontroller dki`,
    });
  }
};
const registerPartner = async (req, res) => {
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
      role: 2, // Giả sử role mặc định là 'user'
    });

    const userData = await user.save();
    const accesstoken = createAccessToken(userData); // Truyền toàn bộ đối tượng userData
    const refreshtoken = createRefreshToken(userData); // Truyền toàn bộ đối tượng userData

    res.cookie("refreshtoken", refreshtoken, {
      httpOnly: true,
      path: "/api/refresh_token",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7d
    });

    return res.status(200).json({
      success: true,
      msg: "Đăng ký thành công",
      data: userData,
      accesstoken: `${accesstoken}`,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      msg: `${error.message} trong authcontroller dki`,
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

// const loginUser = async (req, res) => {
//   try {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(200).json({
//         success: false,
//         msg: "Có lỗi trong quá trình đăng nhập",
//         errors: errors.array(),
//       });
//     }

//     const { email, password } = req.body;

//     const userData = await User.findOne({ email });

//     if (!userData) {
//       return res.status(400).json({
//         success: false,
//         msg: "Email or Password is incorrect",
//       });
//     }

//     const isPasswordMatch = await bcrypt.compare(password, userData.password);

//     if (!isPasswordMatch) {
//       return res.status(400).json({
//         success: false,
//         msg: "Email & Password is incorrect",
//       });
//     }

//     const accesstoken = createAccessToken(userData); // Thay đổi ở đây
//     const refreshtoken = createRefreshToken(userData); // Thay đổi ở đây

//     res.cookie("refreshtoken", refreshtoken, {
//       httpOnly: true,
//       path: "/api/refresh_token",
//       maxAge: 7 * 24 * 60 * 60 * 1000, // 7d
//     });
//     // res.json({ accesstoken });

//     return res.status(200).json({
//       success: true,
//       msg: "Login successful",
//       accessToken: accesstoken,
//       tokenType: "Bearer",
//       data: userData,
//     });
//   } catch (error) {
//     return res.status(400).json({
//       success: false,
//       msg: `${error.message} trong authcontroller`,
//     });
//   }
// };
//////test login
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

    const accesstoken = createAccessToken(userData); // Truyền toàn bộ đối tượng userData
    const refreshtoken = createRefreshToken(userData); // Truyền toàn bộ đối tượng userData
    console.log(refreshtoken);
    res.cookie("refreshtoken", refreshtoken, {
      httpOnly: true,
      path: "/api/refresh_token",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7d
    });

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

///profile-xxx
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
    res.clearCookie("refreshtoken", { path: "/api/refresh_token" });
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
  /*console.log('aaaaaaaaaaaaaaaaaaaaa \n',req); */
  // console.log("Request Headers:", req.headers);

  try {
    const rf_token = req.cookies.refreshtoken;
    req.headers.authorization = `Bearer ${rf_token}`;
    // console.log(rf_token, "rfToken");
    if (!rf_token) {
      return res.status(400).json({ msg: "Please Login or Register" });
    }

    jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) return res.status(400).json({ msg: "Please Login or Register" });

      const accesstoken = createAccessToken({
        id: user._id,
      });
      res.json({ accesstoken });
    });
  } catch (err) {
    return res.status(500).json({ msg: `${err.message}, err catch` });
  }
};

const createAccessToken = (user) => {
  // Tạo và trả về mã thông báo JWT với thời gian sống là 7 ngày
  return jwt.sign(
    {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "7d" }
  );
};

const createRefreshToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  );
};
module.exports = {
  registerUser,
  registerPartner,
  loginUser,
  getProfile,
  logoutUser,
  refreshToken,
  getUser,
  logout,
};
