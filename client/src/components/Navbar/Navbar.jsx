import { Link } from "react-router-dom";
import { FaSuitcase } from "react-icons/fa";
import { GiNotebook } from "react-icons/gi";
import BottomNavbar from "./bottomNavbar";
import axios from "axios";
import { useAuth } from "../../context/authContext";
const Navbar = () => {
  const { user, logout } = useAuth(); // Lấy thông tin người dùng từ context
  const handleLogout = () => {
    logout(); // Đăng xuất người dùng
  };

  const handleGetUser = async () => {
    const token = user.accessToken;
    try {
      const response = await axios.get("http://localhost:3001/api/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("User profile:", response.data);
      return response.data; // Trả về thông tin người dùng
    } catch (error) {
      console.error(
        "Error fetching user profile:",
        error.response.data.message
      );
      throw error; // Xử lý lỗi nếu cần
    }
  };

  console.log(user);
  return (
    <>
      <div className="nav_container">
        <div className="nav_logo">logo</div>
        <div className="nav_right_1">
          <div className="nav_loged">
            <p className="nav_box nav_order">
              <GiNotebook className="nav_box_icon" />
              Đơn hàng của tôi
            </p>
            <p className="nav_box nav_plan">
              <FaSuitcase className="nav_box_icon" />
              Lịch trình của tôi
            </p>
          </div>
          {user ? ( // Kiểm tra xem người dùng đã đăng nhập hay chưa
            <div className="logged_area">
              <span>{user.data.name}</span> {/* Hiển thị tên người dùng */}
              <button className="btn" onClick={handleGetUser}>
                getUser
              </button>
              <button className="btn" onClick={handleLogout}>
                Đăng xuất
              </button>
            </div>
          ) : (
            <div className="nav_auth">
              <ul className="nav_auth_list">
                <li className="nav_auth_item">
                  <button className="btn ">
                    <Link className="auth_btn" to="/register">
                      Đăng kí
                    </Link>
                  </button>
                </li>
                <li className="nav_auth_item">
                  <button className="btn ">
                    <Link className="auth_btn" to="/login">
                      Đăng nhập
                    </Link>
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
      <BottomNavbar />
    </>
  );
};

export default Navbar;
