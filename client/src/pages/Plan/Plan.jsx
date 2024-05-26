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

function Plan() {
  const [optimalSchedule, setOptimalSchedule] = useState([]);
  const navigate = useNavigate();
  const today = format(new Date(), "yyyy-MM-dd");
  const { daysSelected } = useDays(); // Sử dụng context

  const handleGenerateSchedule = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/schedules/days",
        { days: daysSelected }
      );
      setOptimalSchedule(response.data.schedule);
    } catch (error) {
      console.error("Error generating schedule:", error);
    }
  };
  console.log('lich',optimalSchedule);

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

  return (
    <>
      <Header />
      <Navbar />
      <div className="plan_container">
        <div className="plan_form">
          <DayPicker minDay={today} />
          <button className="btn" onClick={handleGenerateSchedule}>
            Generate Schedule
          </button>
          <h2>Optimal Schedule:</h2>
        </div>
        {optimalSchedule.map((daySchedule, i) => (
          <div key={i} className="plan_schedule">
            <p className="schedule_day">Ngày {i + 1}:</p>
            {daySchedule.map(({ time, place_name,address, duration, distance }, j) => (
              <div key={j} className="schedule_day_item">
                  {j > 0 ? <p className="item_space">Khoảng cách: {distance}</p> : null}
                <div>
                  <div className="schedule_item_right">
                    <p>{time}</p>
                  </div>
                  <div className="schedule_item_left">
                    <p className="name_place">{place_name}</p>
                    <p>Địa điểm: {address}</p>
                    <p className="time_to_live">
                      Thời gian tham quan: {duration}
                    </p>
                  </div>
                </div>
              </div>
            ))}
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
