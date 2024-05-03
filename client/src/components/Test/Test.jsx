import { useState, useEffect } from "react";
import "../Search/SearchService.scss";
import { FaMapMarkerAlt } from "react-icons/fa";
import axios from 'axios';

const SearchService = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/places?searchTerm=${searchTerm}`);
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
                <input type="text" placeholder="Bạn muốn đi đâu?" onChange={handleInputChange} />
                <button className="btn">Lên lịch trình</button>
              </div>
            </div>
            {/* Hiển thị kết quả tìm kiếm */}
            <div className="search_results">
              {searchResults.map(place => (
                <div key={place._id} className="search_result_item">
                  <h3>{place.place_name}</h3>
                  <p>{place.description}</p>
                  <p>{place.address}</p>
                  <p>{place.cost}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchService;
