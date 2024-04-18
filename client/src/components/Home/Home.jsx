  "client"
// eslint-disable-next-line no-unused-vars
import React from "react";
import Navbar from "../Navbar/Navbar";
import SearchService from "../Search/SearchService";
const Home = () => {
  return (
    <>
      <Navbar />
      <SearchService />
      <div>Home</div>
    </>
  );
};

export default Home;
