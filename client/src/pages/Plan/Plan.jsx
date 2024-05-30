import { useState } from "react";
import axios from "axios";
import "./Plan.scss";
import Navbar from "../../components/Navbar/Navbar";
import React from "react";
import Header from "../../components/Header/Header";
import DayPicker from "../../components/common/DayPicker/DayPicker";
import { format } from "date-fns";
import { useDays } from "../../components/common/DayPicker/DayContext";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

function Plan() {
  const [optimalSchedule, setOptimalSchedule] = useState([]);
  const navigate = useNavigate();
  const today = format(new Date(), "yyyy-MM-dd");
  const { daysSelected } = useDays();
  const [preferences, setPreferences] = useState([]);

  const handleGenerateSchedule = async () => {
    console.log("Selected days:", daysSelected);
    console.log("Preferences:", preferences);

    try {
      let response = await axios.post(
        "http://localhost:3001/api/schedules/days",
        { days: daysSelected, preferences: preferences }
      );
      console.log("Response data:", response.data);
      setOptimalSchedule(response.data.schedule);
    } catch (error) {
      console.error("Error generating schedule:", error.response?.data || error.message);
    }
    console.log("Optimal schedule:", optimalSchedule);
  };

  const saveScheduleToDB = async () => {
    try {
      const response = await axios.post("http://localhost:3001/api/schedule", {
        date: today,
        schedule: optimalSchedule,
      });
      console.log("Schedule saved:", response.data);
      navigate("/plan"); // Redirect to another page after saving
    } catch (error) {
      console.error("Error saving schedule:", error);
    }
  };

  const options = [
    { value: "coffee", label: "Coffee" },
    { value: "restaurent", label: "Restaurent" },
    { value: "natural", label: "Natural" },
    { value: "museum", label: "Museum" },
    { value: "bridge", label: "Bridge" },
    { value: "establishment ", label: "Establishment " },
    { value: "point_of_interest", label: "Point of Interest " },
    { value: "tourist_attraction", label: "Tourist Attraction" },
    { value: "beach", label: "Beach" },
    { value: "mountain", label: "Mountain" },
    { value: "lake", label: "Lake" },
    { value: "village", label: "Village" },
    { value: "pagoda", label: "Pagoda" },
    { value: "market", label: "Market" },
    { value: "night_market", label: "Night Market" },
    { value: "store", label: "Store" },
    { value: "food", label: "Food" },
    { value: "drink", label: "Drink" },
    { value: "park", label: "Park" },
    { value: "inside", label: "InSide" },
    { value: "outside", label: "OutSide" },
    { value: "spring", label: "Spring" },
    { value: "summer", label: "Summer" },
    { value: "autumn", label: "Autumn" },
    { value: "winter", label: "Winter" },
    { value: "long_time", label: "Long Time" },
  ];

  const handleChangeCategory = (preferences) => {
    setPreferences(preferences);
    console.log(preferences);
  };

  return (
    <>
      <Header />
      <Navbar />
      <div className="plan_container">
        <div className="plan_form">
          <DayPicker minDay={today} />
          <label>Category:</label>
          <Select
            isMulti
            name="colors"
            classNamePrefix="select"
            options={options}
            onChange={handleChangeCategory}
          />
          <button className="btn" onClick={handleGenerateSchedule}>
            Generate Schedule
          </button>
          <h2>Optimal Schedule:</h2>
        </div>
        {optimalSchedule.map((daySchedule, i) => (
          <div key={i} className="plan_schedule">
            <p className="schedule_day">Ngày {i + 1}:</p>
            {daySchedule.map(
              ({ time, place_name, address, duration, distance }, j) => (
                <div key={j} className="schedule_day_item">
                  {j > 0 ? (
                    <p className="item_space">Khoảng cách: {distance}</p>
                  ) : null}
                  <div>
                    <div className="schedule_item_right">
                      <p>{time}</p>
                    </div>
                    <div className="schedule_item_left">
                      <p className="name_place">{place_name}</p>
                      <p>Địa chỉ : {address}</p>
                      <p className="time_to_live">
                        Thời gian tham quan: {duration}
                      </p>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        ))}
        <button className="btn" onClick={saveScheduleToDB}>
          Save Schedule
        </button>
      </div>
    </>
  );
}

export default Plan;
