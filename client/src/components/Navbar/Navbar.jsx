// eslint-disable-next-line no-unused-vars
import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.scss";
import { FaSuitcase } from "react-icons/fa";
import { GiNotebook } from "react-icons/gi";
import { BiDotsHorizontalRounded } from "react-icons/bi";

const Navbar = () => {
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
          <div className="nav_auth">
            {/* <button className="btn auth_btn">Đăng kí</button> */}
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
        </div>
      </div>
      <div className="bottom_nav">
        <ul className="bottom_nav_list">
          <li className="bottom_nav_item">Điểm đến </li>
          <li className="bottom_nav_item">Lịch trình</li>
          <li className="bottom_nav_item">Khách sạn</li>
          <li className="bottom_nav_item">Nhà Hàng</li>
          <li className="bottom_nav_item">Tham Quan</li>
          <li className="bottom_nav_item">
            <BiDotsHorizontalRounded />
          </li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
