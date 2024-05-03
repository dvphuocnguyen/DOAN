import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

//

import { TiStarburst } from "react-icons/ti";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Use useNavigate hook
  const { user: loggedInUser, login } = useAuth(); // Lấy thông tin người dùng và hàm đăng nhập từ context

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      const response = await axios.post("http://localhost:3001/api/login", {
        ...user,
      });
      console.log(response.data)
      const userData = response.data; // Dữ liệu người dùng trả về từ server
      login(userData); // Lưu thông tin người dùng vào trạng thái
      console.log('userdata: ' + userData)
      navigate("/"); // Chuyển hướng đến trang dashboard sau khi đăng nhập thành công
    } catch (error) {
      setError("Đăng nhập không thành công. Vui lòng kiểm tra lại thông tin đăng nhập.");
    }
  };

  // Kiểm tra nếu người dùng đã đăng nhập, chuyển hướng đến trang chính
  if (loggedInUser) {
    navigate("/");
    console.log("da dang nhap r");
    return null; // Trả về null để ngăn component này render
  }

  return (
    <div className="auth_page">
      <div className="login_form_container">
        <div className="top_login_form">
          logo
          <h3>Đăng nhập</h3>
          <p>
            Mừng bạn đến với Smatra, hãy cùng chúng tôi tạo nên trải nghiệm
            tuyệt vời nhất
          </p>
        </div>
        <form onSubmit={handleLogin} className="login_form">
          <p className="text-email">
            Email
            <TiStarburst color="red" fontSize="7pt" />
          </p>
          <input
            type="email"
            name="email"
            required
            value={user.email}
            onChange={onChangeInput}
            className="input_form"
          />
          <p className="text-email">
            Password
            <TiStarburst color="red" fontSize="7pt" />
          </p>
          <input
            type="password"
            name="password"
            required
            autoComplete="on"
            value={user.password}
            className="input_form"
            onChange={onChangeInput}
          />
          {error && <p className="error-message">{error}</p>}
          <div className="login_form_bottom">
            <button type="submit" className="btn">
              Login
            </button>
            <Link to="/register">Register</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
