import { useState, useEffect } from "react";
import axios from "axios";
import "./ListPlace.scss";
import place_img from "../../assets/image/tour_img_dn.png";
import { MdPlace } from "react-icons/md";
import { Link } from "react-router-dom";
import React from "react";
import Header from "../../components/Header/Header";
import Navbar from "../../components/Navbar/Navbar";

const ListPlace = () => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/get-allPlace"
        );
        setPlaces(response.data.data);
      } catch (error) {
        console.error("Error fetching places:", error);
      }
    };

    fetchPlaces();
  }, []);

  return (
    <>
      <Header />
      <Navbar/>
      <div className="list_place_containter">
        <div className="place_type">
          <p className="place_type_item">Được đánh giá cao</p>
          <Link to="/coffe_list" className="place_type_item">
            Coffee
          </Link>
          <Link to="/entertainment_list" className="place_type_item">
            Điểm tham quan
          </Link>
          <p className="place_type_item">Nhà Hàng</p>
        </div>
        <h1>List of Places</h1>
        <div className="place_list_container">
          <ul className="place_list">
            {places.map((place) => (
              <li key={place._id} className="place_item">
                <Link to={`/place/${place._id}`} className="place_form">
                  {" "}
                  {/* Change Link URL */}
                  <div className="place_img">
                    <img src={place_img} alt="place" />{" "}
                    {/* Add alt attribute */}
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
                {/* <p className="place_cost"> {place.cost}</p> */}
              </li>
            ))}
          </ul>
          <div className="map">MAP</div>
        </div>
      </div>
    </>
  );
};

export default ListPlace;
