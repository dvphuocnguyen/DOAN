import { useState, useEffect } from "react";
import "./ListPlace.scss";
import axios from "axios";
import place_img from "../../assets/image/tour_img_dn.png";
import { Link } from "react-router-dom";
import { MdPlace } from "react-icons/md";
import Header from "../../components/Header/Header";
import React from "react";
import Navbar from "../../components/Navbar/Navbar";

const CoffeListPlace = () => {
  const [places, setPlaces] = useState([]);
  const [type, setType] = useState("cafe"); // Mặc định type là "cafe"

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/get-places-by-type?placeType=${type}`
        );
        setPlaces(response.data.data);
      } catch (error) {
        console.error("Error fetching places:", error);
      }
    };

    fetchPlaces();
  }, [type]); // Gọi lại fetchPlaces khi type thay đổi

  return (
    <>
      <Header/>
      <Navbar/>
      <div>
        <h1>List of Coffe</h1>
        <div className="place_list_container">
          <ul className="place_list">
            {places.map((place) => (
              <li key={place._id} className="place_item">
                <Link to={`/place/${place._id}`} className="place_form">
                  <div className="place_img">
                    <img src={place_img} alt="place" />
                  </div>
                  <div className="place_info">
                    <div className="place_name_desc">
                      <h4 className="place_name">{place.place_name}</h4>
                      <p className="place_desc">{place.description}</p>
                    </div>
                    <div className="place_address_map">
                      <p className="place_address">{place.address}</p>
                      <MdPlace />
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
          <div className="map">MAP</div>
        </div>
      </div>
    </>
  );
};

export default CoffeListPlace;
