import "./App.css";
// import Test from "./components/Test/Test";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import { useParams } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Place from "./pages/Place/Place";
import Order from "./pages/Order/Order";
import ListPlace from "./pages/Place/ListPlace";
import CoffeListPlace from "./pages/Place/CoffeListPlace";
import EntertainmentList from "./pages/Place/EntertainmentList";
import Plan from "./pages/Plan/Plan";
import MyPlan from "./pages/Plan/MyPlan";
import ListHotel from "./pages/Hotel/ListHotel";
import React from "react";
import CreatePLace  from "./pages/Place/CreatePlace"
//
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/place/:placeId" element={<PlaceContainer/>} />
      <Route path="/list_place" element={<ListPlace />} />
      <Route path="/order" element={<Order />} />
      <Route path="/coffe_list" element={<CoffeListPlace />} />
      <Route path="/entertainment_list" element={<EntertainmentList />} />
      <Route path="/plan" element={<Plan />} />
      <Route path="/my_plan" element={<MyPlan />} />
      <Route path="list_hotel" element={<ListHotel />} />
      <Route path="create_place" element={<CreatePLace />} />
    </Routes>
  );
}
const PlaceContainer = () => {
  const { placeId } = useParams(); // Lấy placeId từ URL params
  return <Place placeId={placeId} />;
};
export default App;
