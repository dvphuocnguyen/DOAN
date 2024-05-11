// eslint-disable-next-line no-unused-vars
import React from "react";
import Navbar from "../components/Navbar/Navbar";
import SearchService from "../components/Search/SearchService";
import ListService from "../components/Service/ListService";
import Footer from "../components/Footer/Footer";
const Home = () => {
  return (
    <>
      <Navbar />
      <SearchService />
      <ListService/>
      <Footer/>
    </>
  );
};

export default Home;
