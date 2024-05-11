import React, { useState, useEffect } from "react";
import PropTypes from "prop-types"; // Import PropTypes
import "./Place.scss";
import axios from "axios";
import Navbar from "./../../components/Navbar/Navbar";
import placeImg from "../../assets/image/bali_popular_places.jpg";
import placeImg1 from "../../assets/image/bali_popular_places.jpg";
import { MdPlace } from "react-icons/md";

//
const Place = ({ placeId }) => {
  const [placeData, setPlaceData] = useState(null);

  useEffect(() => {
    // Function to fetch data from API
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/get-place/${placeId}`
        );
        setPlaceData(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Call fetchData function
    fetchData();
  }, [placeId]); // Now this effect runs whenever placeId changes

  return (
    <>
      <Navbar />
      <div className="page_container">
        {placeData ? (
          <>
            <div className="place_info">
              <p className="place_name">{placeData.place_name}</p>
              <p className="place_address">
                <MdPlace />
                {placeData.address}
              </p>
            </div>
            <p className="place_item_name">Ảnh về {placeData.place_name} </p>
            <div className="place_item_container">
              <div className="place_item_img">
                <img className="img_place" src={placeImg} />
                <img className="img_place" src={placeImg1} />
                <img className="img_place" src={placeImg} />
                <img className="img_place" src={placeImg} />
              </div>
            </div>
            <div className="overview_container">
              <p className="place_item_name">Tổng quan</p>
              <div className="overview_content">
                <p>Giới thiệu về {placeData.place_name}</p>
                <p>
                  Ở đây, chúng mình có bán cà phê 24/7 và cho thuê không gian
                  họp nhóm, tổ chức sự kiện{" "}
                </p>
              </div>
            </div>
            <div className="rating">
              <p className="place_item_name">Đánh giá</p>
            </div>
            <div className="place_footer">
              <p className="place_desc">{placeData.description}</p>
              <p className="place_cost">Cost:{placeData.cost}.000 VND</p>
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
};

// Define propTypes
Place.propTypes = {
  placeId: PropTypes.string.isRequired, // Ensure placeId is a required string
};

export default Place;
