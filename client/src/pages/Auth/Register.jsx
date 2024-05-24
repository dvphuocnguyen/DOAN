import "./Register.scss";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { TiStarburst } from "react-icons/ti";
import { useAuth } from "../../context/AuthContext";
import React from "react";

const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate(); // Use useNavigate hook
  const { register } = useAuth();

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };
  const registerSubmit = async (e) => {
    e.preventDefault();
    // console.log("Data to be sent:", user); // Hiển thị dữ liệu gửi đi từ client
    try {
      const response = await axios.post("http://localhost:3001/api/register", {
        ...user,
      });
      const userData = response.data; // Dữ liệu người dùng trả về từ server khi đăng ký
      register(userData); // Lưu thông tin người dùng vào trạng thái
      // console.log("35", userData);

      localStorage.setItem("firstLogin", true);
      navigate("/"); // Chuyển hướng đến trang dashboard sau khi đăng nhập thành công
    } catch (err) {
      if (err.response) {
        console.log("error register", err.response.data.message);
      }
    }
  };

  return (
    <div className="auth_page">
      <div className="register_form_container">
        <div className="top_register_form">
          {/* Thêm logo */}
          <h3>Đăng ký</h3>
          <p>Trở thành thành viên của Smatra</p>
        </div>
        <form className="register_form" onSubmit={registerSubmit}>
          <p className="text-email">
            Name
            <TiStarburst color="red" fontSize="5pt" />
          </p>
          <input
            type="text"
            name="name"
            required
            value={user.name}
            onChange={onChangeInput}
            className="input_form"
          />
          <br />
          <p className="text-email">
            E-mail
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
          <br />
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
            onChange={onChangeInput}
            className="input_form"
          />{" "}
          <div className="register_form_bottom">
            <button className="btn" type="submit">
              Register
            </button>
            <Link to="/login">Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
