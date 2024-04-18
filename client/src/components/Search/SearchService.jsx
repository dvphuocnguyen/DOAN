import { useEffect } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import "../Search/SearchService.scss";
const SearchService = () => {
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
    </>
  );
};

export default SearchService;
