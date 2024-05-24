import { useState, useEffect } from "react";
import axios from "axios";

const MyPlan = () => {
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/getSchedule"
        );
        setSchedules(response.data);
      } catch (error) {
        console.error("Error fetching plan:", error);
      }
    };

    fetchPlan();
  }, []);

  return (
    <div>
      <h2>My Plan</h2>
      {schedules.map((day, index) => (
        <div key={index}>
          <h3>Plan {index + 1}</h3>
          {day.schedule.map((schedule, idx) => (
            <ul key={idx}>
              <h3>day {idx + 1}</h3>
              {schedule.map((activity, j) => (
                <li key={j}>
                  <p>Time: {activity.time}</p>
                  <p>Place: {activity.place_name}</p>
                  <p>Time to Live: {activity.duration}</p>
                </li>
              ))}
            </ul>
          ))}
        </div>
      ))}
    </div>
  );
};

export default MyPlan;
