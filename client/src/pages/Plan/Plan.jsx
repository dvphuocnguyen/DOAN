import { useState, useEffect } from "react";
import axios from "axios";
import "./Plan.scss";
import Navbar from "../../components/Navbar/Navbar";

function Plan() {
  const [places, setPlaces] = useState([]);
  const [numDays, setNumDays] = useState(0);
  const [optimalSchedule, setOptimalSchedule] = useState([]);

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

  const formatTime = (hour, minute) => {
    const hourString = hour < 10 ? `0${hour}` : `${hour}`;
    const minuteString = minute < 10 ? `0${minute}` : `${minute}`;
    return `${hourString}:${minuteString}`;
  };

  const generateRandomSchedule = () => {
    if (!places.length || numDays <= 0) {
      console.error(
        "Please enter a valid number of days and make sure places are loaded."
      );
      return;
    }

    const morningStart = 7 * 60;
    const morningEnd = 11 * 60;
    const afternoonStart = 13 * 60;
    const afternoonEnd = 18 * 60;

    const placesCopy = [...places];
    const schedule = [];

    for (let i = 0; i < numDays; i++) {
      let currentTime = morningStart;
      let currentDaySchedule = [];

      while (
        (currentTime < morningEnd ||
          (currentTime >= afternoonStart && currentTime < afternoonEnd)) &&
        placesCopy.length > 0
      ) {
        const placeIndex = Math.floor(Math.random() * placesCopy.length);
        const { place_name, timeToLive } = placesCopy[placeIndex];

        const timeAvailable =
          currentTime >= afternoonStart && currentTime < afternoonEnd
            ? afternoonEnd - currentTime
            : morningEnd - currentTime;
        const visitTime = Math.min(timeAvailable, timeToLive * 60);

        if (visitTime > 0) {
          const hours = Math.floor(visitTime / 60);
          const minutes = visitTime % 60;

          const formattedTime = formatTime(
            Math.floor(currentTime / 60),
            currentTime % 60
          );
          currentDaySchedule.push({
            time: formattedTime,
            place_name,
            timeToLive: `${hours > 0 ? hours + "h " : ""}${minutes} '`,
          });

          currentTime += visitTime;
        }

        placesCopy.splice(placeIndex, 1);

        // Chuyển sang buổi chiều nếu đã hết buổi sáng
        if (currentTime >= morningEnd && currentTime < afternoonStart) {
          currentTime = afternoonStart;
        }
      }

      schedule.push(currentDaySchedule);
    }

    return schedule;
  };

  const handleGenerateSchedule = () => {
    const newOptimalSchedule = generateRandomSchedule();
    setOptimalSchedule(newOptimalSchedule);
    console.log(newOptimalSchedule);
    console.log(typeof optimalSchedule);
  };
const saveScheduleToDB = async () => {
  try {
    const response = await axios.post("http://localhost:3001/api/schedule", {
      date: new Date(), // Sử dụng ngày hiện tại hoặc ngày mong muốn cho thuộc tính date
      schedule: optimalSchedule,
    });
    console.log(response.data);
    // Hiển thị thông báo hoặc thực hiện các hành động khác sau khi lịch trình được lưu thành công
  } catch (error) {
    console.error("Error saving schedule:", error);
    // Xử lý lỗi nếu có
  }
};

  return (
    <>
      <Navbar />
      <div className="plan_container">
        <div className="plan_form">
          <label>Number of Days: </label>
          <input
            type="number"
            value={numDays}
            onChange={(e) => setNumDays(parseInt(e.target.value))}
          />
          <button className="btn" onClick={handleGenerateSchedule}>
            Generate Schedule
          </button>
          <h2>Optimal Schedule:</h2>
        </div>

        {optimalSchedule.map((daySchedule, i) => (
          <div key={i} className="plan_schedule">
            <p className="schedule_day">Ngày {i + 1}:</p>
            {daySchedule.map(({ time, place_name, timeToLive }, j) => (
              <div key={j} className="schedule_day_item">
                <div className="schedule_item_right">
                  <p>{time}</p>
                </div>
                <div className="schedule_item_left">
                  <p>{place_name}</p>
                  <p className="time_to_live">
                    Thời gian tham quan: {timeToLive}
                  </p>
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
