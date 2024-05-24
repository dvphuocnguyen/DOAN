import React, { useEffect, useState } from "react";
import DayPicker from "../../components/common/DayPicker/DayPicker";
import DropDown from "../../components/common/DropDown/DropDown";
import Header from "../../components/Header/Header";
import Navbar from "../../components/Navbar/Navbar";
import DropWRadio from "../../components/common/DropDown/DropWRadio";
import DropWSelect from "../../components/common/DropDown/DropWSelect";
import place_img from "../../assets/image/tour_img_dn.png";
import "./ListHotel.scss";
import axios from "axios";
import { format } from "date-fns";


///
const ListHotel = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/get_all_room"
        );
        setRooms(response.data.data);
      } catch (error) {
        console.error("Error fetching room:", error);
      }
    };

    fetchRooms();
  }, []);

  const FilterAdults = [
    { name: "1", value: "1" },
    { name: "2", value: "2" },
    { name: "3", value: "3" },
  ];

  const FilterRooms = [
    { name: "1", value: "1" },
    { name: "2", value: "2" },
    { name: "3", value: "3" },
  ];

  const radioOptions = [
    { name: "Option 1", value: "1" },
    { name: "Option 2", value: "2" },
    { name: "Option 3", value: "3" },
    { name: "Option 4", value: "4" },
    { name: "Option 5", value: "5" },
  ];

  const filters = [
    { id: "filter1", label: "Filter 1", value: "value1" },
    { id: "filter2", label: "Filter 2", value: "value2" },
    { id: "filter3", label: "Filter 3", value: "value3" },
  ];

  const today = format(new Date(), "yyyy-MM-dd");

  return (
    <>
      <Header />
      <Navbar />
      <div className="page">
        <div className="search_hotel_containter">
          <div className="search_hotel_form">
            <div className="in_search_form">
              <DayPicker className="hotel_search_item daypicker" minDay={today} maxDay={null}/>
              <DropDown
                className="hotel_search_item dropdown"
                nameFilter="Số người"
                nameItems={FilterAdults}
              />
              <DropDown
                className="hotel_search_item dropdown"
                nameFilter="Số phòng"
                nameItems={FilterRooms}
              />
              <button className="btn hotel_search_item">Tìm khách sạn</button>
            </div>
          </div>
          <div className="hotel_search_body">
            <div className="search_filter">
              <DropWRadio options={radioOptions} />
              <DropWSelect label="Select Options" options={filters} />
            </div>
            <div className="hotel_list">
              {rooms.length > 0 ? (
                rooms.map((room) => (
                  <div key={room.id} className="hotel_item">
                    <div className="item_img">
                      <img src={place_img} alt="img_hotel" />
                    </div>
                    <div className="item_info">
                      <h3 className="item_name">{room.name}</h3>
                      <p className="item_decs">{room.description}</p>
                      <p>address</p>
                      <p>rating</p>
                    </div>
                    <div className="item_order">
                      <p className="item_cost">{room.cost}.000.000<span>/đêm</span></p>
                      <button className="btn order_btn">Đặt ngay</button>
                    </div>
                  </div>
                ))
              ) : (
                <p>No rooms available.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListHotel;
