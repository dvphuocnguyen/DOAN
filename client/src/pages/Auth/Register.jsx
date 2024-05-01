import "./Register.scss";

//
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { TiStarburst } from "react-icons/ti";

//
const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const registerSubmit = async (e) => {
    e.preventDefault();
    console.log(user);
    try {
      await axios.post("http://localhost:3001/api/register", { ...user });
      localStorage.setItem("firstLogin", true);
      window.location.href = "/";
    } catch (err) {
      alert(err.msg);
    }
  };

  return (
    <div className="auth_page">
      <div className="register_form_container">
        <div className="top_register_form">
          logo
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
