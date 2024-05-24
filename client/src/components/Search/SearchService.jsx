import { useState, useEffect } from "react";
import "../Search/SearchService.scss";
import { FaMapMarkerAlt } from "react-icons/fa";
import axios from 'axios';
import React from "react";

const SearchService = () => {
  //click button-> form
  useEffect(() => {
    const tabButtons = document.querySelectorAll(".tab-button");
    const tabContents = document.querySelectorAll(".search_box");

    tabButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        const target = this.getAttribute("data-target");
        setActiveTab(target);
      });
    });

    function setActiveTab(targetId) {
      tabContents.forEach(function (content) {
        if (content.id === targetId) {
          content.classList.add("active");
        } else {
          content.classList.remove("active");
        }
      });
    }
  }, []); // Passing an empty dependency array means this effect will run once after the component mounts
//
const [searchTerm, setSearchTerm] = useState("");
const [searchResults, setSearchResults] = useState([]);
useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/get-allPlace`);
      setSearchResults(response.data.data);
    } catch (error) {
      console.error('Error fetching places:', error);
    }
  };

  fetchData();
}, [searchTerm]);

const handleInputChange = (event) => {
  setSearchTerm(event.target.value);
};






//
  return (
    <>
      <div className="search_container">
        <div className="ui_search_container">
          <p className="service_text">
            Lên lịch trình du lịch theo sở thích cá nhân
          </p>
          <div className="search_top">
            <button className="tab-button" data-target="plan">
              Lịch trình
            </button>
            <button className="tab-button" data-target="hotel">
              Khách sạn
            </button>
            <button className="tab-button" data-target="tour">
              TOUR
            </button>
          </div>
          <div className="search_bottom">
            <div className="search_box active" id="plan">
              <div className="search_box_css">
                <FaMapMarkerAlt className="search_box_icon" />
                <input type="text" placeholder="Bạn muốn đi đâu?"  onChange={handleInputChange}/>
                <button className="btn">Lên lịch trình</button>
              </div>
            </div>
            {/* aaa */}
            {/* <div className="search_results">
              {searchResults.map(place => (
                <div key={place._id} className="search_result_item">
                  <h3>{place.place_name}</h3>
                  <p>{place.description}</p>
                  <p>{place.address}</p>
                  <p>{place.cost}</p>
                </div>
              ))}
            </div> */}
            {/* aaa */}
            <div className="search_box " id="hotel">
              <div className="search_box_css">
                <FaMapMarkerAlt className="search_box_icon" />
                <input type="text" placeholder="Tìm khách sạn nào" />
                <button className="btn">Lên lịch trình</button>
              </div>
            </div>
            <div className="search_box " id="tour">
              <div className="search_box_css">
                <FaMapMarkerAlt className="search_box_icon" />
                <input type="text" placeholder="Tìm kiếm của ban" />
                <button className="btn">Lên lịch trình</button>
              </div>
            </div>
          </div>
          {/* <div className="search_bottom hotel">bbbb</div> */}
          {/* <div className="search_bottom tour"></div> */}
        </div>
      </div>
    </>
  );
};

export default SearchService;
