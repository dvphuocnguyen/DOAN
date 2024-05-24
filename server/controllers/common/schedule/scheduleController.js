const Schedule = require("../../../models/scheduleModule");
const axios = require("axios");
const Place = require("../../../models/placeModel")


////

const createSchedule = async (req, res) => {
  try {
    const { date, schedule } = req.body;
    const newPlan = new Schedule({
      date,
      schedule,
    });
    await newPlan.save();
    res.status(201).json(newPlan);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getSchedule = async (req, res) => {
  try {
    const plans = await Schedule.find();
    res.json(plans);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateSchedule = async (req, res) => {
  try {
    const { id } = req.params;
    const { date, schedule } = req.body;
    const updatedSchedule = await Schedule.findByIdAndUpdate(
      id,
      { date, schedule },
      { new: true }
    );
    res.status(200).json(updatedSchedule);
  } catch (error) {
    console.error("Error updating schedule:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteSchedule = async (req, res) => {
  try {
    const { id } = req.params;
    await Schedule.findByIdAndDelete(id);
    res.status(200).json({ message: "Schedule deleted successfully" });
  } catch (error) {
    console.error("Error deleting schedule:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Logic để lấy danh sách địa điểm theo thành phố
async function fetchPlaces(city) {
  try {
    const response = await axios.get("http://localhost:3001/api/get-allPlace");
    if (response.data.success && Array.isArray(response.data.data)) {
      const places = response.data.data.filter((place) => place.city === city);
      // console.log(`Fetched places for ${city}:`, places); // Log fetched places
      return places;
    } else {
      console.error(
        "API returned an error or the format is incorrect:",
        response.data
      );
      return [];
    }
  } catch (error) {
    console.error("Error fetching places:", error);
    throw error;
  }
}

////// distance

// Hàm tính khoảng cách giữa hai tọa độ
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371e3; // Bán kính trái đất tính bằng mét
  const φ1 = lat1 * Math.PI / 180; // Convert to radians
  const φ2 = lat2 * Math.PI / 180;
  const Δφ = (lat2 - lat1) * Math.PI / 180;
  const Δλ = (lon2 - lon1) * Math.PI / 180;

  const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c; // Khoảng cách tính bằng mét
  return distance;
} 
async function generateDailySchedule(places) {
  const morningStart = 7 * 60;  // 7:00 AM in minutes
  const morningEnd = 11 * 60;   // 11:00 AM in minutes
  const afternoonStart = 13 * 60;  // 1:00 PM in minutes
  const eveningEnd = 20 * 60;  // 8:00 PM in minutes

  let currentTime = morningStart;
  let daySchedule = [];

  // Sort places by priority (higher priority first)
  places.sort((a, b) => b.priority - a.priority);

  // Helper function to add place to schedule
  const addPlaceToSchedule = (place, travelTime, distance) => {
    let duration = Math.floor(parseFloat(place.duration) * 60); // Convert hours to minutes và làm tròn xuống
    daySchedule.push({
      time: formatTime(currentTime),
      place_name: place.name,
      duration: place.duration + 'h',
      distance: distance ? `${(distance / 1000).toFixed(2)} km` : 'N/A'
    });
    currentTime += duration + travelTime; // Move time forward by the duration of the visit and travel time
  };

  // Initial place addition without travel time and distance
  if (places.length > 0) {
    addPlaceToSchedule(places[0], 0, 0);
  }

  // Adding subsequent places with calculated travel time and distance
  for (let i = 1; i < places.length; i++) {
    let place = places[i];
    let prevPlace = places[i - 1];
    let distance = calculateDistance(
      prevPlace.location.coordinates[0], prevPlace.location.coordinates[1],
      place.location.coordinates[0], place.location.coordinates[1]
    );
    let travelTime = Math.floor((distance / 1000 / 50) * 60); // Giả sử tốc độ trung bình 50 km/h và làm tròn xuống

    if (currentTime + parseFloat(place.duration) * 60 <= (i < places.length / 2 ? morningEnd : eveningEnd)) {
      addPlaceToSchedule(place, travelTime, distance);
    } else if (currentTime < afternoonStart) {
      // Reset currentTime to afternoon start if morning session ends
      currentTime = afternoonStart;
      addPlaceToSchedule(place, travelTime, distance);
    }
  }

  return daySchedule;
}

// Helper function to format time from minutes to HH:MM format
function formatTime(minutes) {
  let hours = Math.floor(minutes / 60);
  let mins = Math.floor(minutes % 60);
  return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
}

// Tạo lịch trình cho nhiều ngày dựa trên thành phố
const createScheduleForDays = async (req, res) => {
  const { days } = req.body;  // days: số ngày yêu cầu

  if (!days) {
    return res.status(400).json({ message: "Days required" });
  }

  try {
    let activities = [];

    // Lấy danh sách địa điểm cho từng ngày dựa trên thành phố
    for (let i = 0; i < days; i++) {
      let city = "Đà Nẵng"; // Mặc định là Đà Nẵng
      if (i > 3 && i <= 5) {
        city = "Quảng Nam"; // Ngày thứ 4 và 5 đi Quảng Nam
      } else if (i > 5) {
        city = "Huế"; // Kể từ ngày thứ 6 đi Huế
      }

      const places = await fetchPlaces(city);
      if (places.length === 0) {
        return res.status(404).json({ message: `No places found in ${city}` });
      }

      const dailySchedule = await generateDailySchedule(places);
      console.log(`Day ${i + 1} schedule:`, dailySchedule);  // Log daily schedule
      activities.push(dailySchedule);
    }

    // Tạo một lịch trình mới với các hoạt động đã được sắp xếp theo ngày
    const newSchedule = new Schedule({ schedule: activities });
    const savedSchedule = await newSchedule.save();
    res.status(201).json(savedSchedule);
  } catch (error) {
    console.error("Error creating schedule:", error);
    res.status(400).json({ message: error.message });
  }
};

// Export các hàm
module.exports = {
  createSchedule,
  getSchedule,
  updateSchedule,
  deleteSchedule,
  createScheduleForDays,
};
