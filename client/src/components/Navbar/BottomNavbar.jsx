// import React from "react";
import './Navbar.scss'
import { BiDotsHorizontalRounded } from "react-icons/bi";

const BottomNavbar = () => {
  return (
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
  );
};

export default BottomNavbar;
