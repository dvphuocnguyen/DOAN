// import React from "react";
"client"
import { Routes, Route, Router } from "react-router-dom";
import React from "react";
import Order from "../pages/Order/Order";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Place from "../pages/Place/Place";
const routes = () => {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" /> */}
        <Route path="/order" element={<Order />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/place" element={<Place />} />
      </Routes>
    </Router>
  );
};

export default routes;
