import React, { useContext } from "react";
import Navbar from "../components/Navbar/Navbar";
import SearchService from "../components/Search/SearchService";
import ListService from "../components/Service/ListService";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
// import { GlobalState } from "../context/GlobalState";


const Home = () => {
  // const state = useContext(GlobalState);
  // const [isLogged] = state.UserAPI.isLogged;
  // const [isAdmin] = state.UserAPI.isAdmin;

  return (
    <>
      <Header />
      <Navbar />
      <SearchService />
      <ListService />
      <Footer />
    </>
  );
};

export default Home;
