  "client"
// eslint-disable-next-line no-unused-vars
import React from "react";
import Navbar from "../Navbar/Navbar";
import SearchService from "../Search/SearchService";
import ListService from "../Service/ListService";
const Home = () => {
  return (
    <>
      <Navbar />
      <SearchService />
      <ListService/>
      <div>Home</div>
    </>
  );
};

export default Home;
