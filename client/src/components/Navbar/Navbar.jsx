/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import "./Navbar.scss";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { Link } from "react-router-dom";
import { GlobalState } from "../../context/GlobalState";
//
const Navbar = () => {
  const state = useContext(GlobalState);
  const [isLogged] = state.UserAPI.isLogged;
  const [isAdmin] = state.UserAPI.isAdmin;

  return (
    <div className="bottom_nav">
      {!isAdmin ? (
        <ul className="bottom_nav_list">
          <li className="bottom_nav_item">
            <Link className="nav_link" to="/list_place">
              Điểm đến
            </Link>
          </li>
          <li className="bottom_nav_item">
            <Link className="nav_link" to="/plan">
              Lịch trình
            </Link>
          </li>
          <li className="bottom_nav_item">
            <Link to="/list_hotel" className="nav_link">
              Khách sạn
            </Link>
          </li>
          <li className="bottom_nav_item">Nhà Hàng</li>
          <li className="bottom_nav_item">Tham Quan</li>
          <li className="bottom_nav_item">
            <BiDotsHorizontalRounded />
          </li>
        </ul>
      ) : (
        <ul className="bottom_nav_list">
          <li className="bottom_nav_item">
            <Link className="nav_link" to="/create_place">
              Điểm đến
            </Link>
          </li>
          <li className="bottom_nav_item">
            <Link className="nav_link" to="/plan">
              Lịch trình
            </Link>
          </li>
          <li className="bottom_nav_item">
            <Link to="/list_hotel" className="nav_link">
              Khách sạn
            </Link>
          </li>
          <li className="bottom_nav_item">Nhà Hàng</li>
          <li className="bottom_nav_item">Tham Quan</li>
          <li className="bottom_nav_item">
            <BiDotsHorizontalRounded />
          </li>
        </ul>
      )}
    </div>
  );
};

export default Navbar;
