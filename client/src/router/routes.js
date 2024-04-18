// import React from "react";
import { Routes, Route } from "react-router-dom";

import Order from "../pages/Order/Order";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
const routes = () => {
  return (
    <Routes>
        {/* <Route path="/" /> */}
        <Route path="order" element={<Order />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
    </Routes>
  );
};

export default routes;
