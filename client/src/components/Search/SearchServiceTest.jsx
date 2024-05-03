// import React, { useEffect } from "react";
import "./SearchService.scss";
import { FaMapMarkerAlt } from "react-icons/fa";

const SearchServiceTest = () => {
  const topBtns = document.querySelectorAll(".top_btn");
  const searchBoxes = document.querySelectorAll(".search_box");

  topBtns.forEach(function (button) {
    button.addEventListener("click", function () {
      const target = this.getAttribute("data-target");
      setActiveTab(target);
    });
  });

  function setActiveTab(targetId) {
    searchBoxes.forEach(function (box) {
      if (box.id === targetId) {
        box.classList.add("active");
      } else {
        box.classList.remove("active");
      }
    });
  }

  return (
    <div className="search_container">
      <div className="ui_search_container">
        <p className="service_text">
          Lên lịch trình du lịch theo sở thích cá nhân
        </p>
        <div className="search_top">
          <button className="top_btn" data-target="plan">
            <a href="">LỊCH TRÌNH</a>
          </button>
          <button className="top_btn" data-target="hotel">
            <a href="">KHÁCH SẠN</a>
          </button>
          <button className="top_btn" data-target="tour">
            <a href="">TOUR</a>
          </button>
        </div>
        <div className="search_bottom">
          <div className="search_box active" id="plan">
            <div className="search_box_css">
              <FaMapMarkerAlt className="search_box_icon" />
              <input type="text" placeholder="Bạn muốn đi đâu?" />
              <button className="btn">Lên lịch trình</button>
            </div>
          </div>
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
  );
};

export default SearchServiceTest;
