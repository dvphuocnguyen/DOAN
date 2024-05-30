const Schedule = require("../../../models/scheduleModule");
const axios = require("axios");
const Place = require("../../../models/placeModel");

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
    res
      .status(400)
      .json({ message: "Failed to create schedule", error: err.message });
  }
};

const getSchedule = async (req, res) => {
  try {
    const plans = await Schedule.find();
    res.json(plans);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch schedules", error: err.message });
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
    if (!updatedSchedule) {
      return res.status(404).json({ message: "Schedule not found" });
    }
    res.status(200).json(updatedSchedule);
  } catch (error) {
    console.error("Error updating schedule:", error);
    res
      .status(500)
      .json({ error: "Internal server error", message: error.message });
  }
};

const deleteSchedule = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedSchedule = await Schedule.findByIdAndDelete(id);
    if (!deletedSchedule) {
      return res.status(404).json({ message: "Schedule not found" });
    }
    res.status(200).json({ message: "Schedule deleted successfully" });
  } catch (error) {
    console.error("Error deleting schedule:", error);
    res
      .status(500)
      .json({ error: "Internal server error", message: error.message });
  }
};

// const response = await axios.get("http://localhost:3001/api/get-allPlace");
// Logic để lấy danh sách địa điểm theo thành phố
async function fetchPlaces(city) {
  try {
    const response = await axios.get(`http://localhost:3001/api/get-allPlace`);
    if (response.data.success && Array.isArray(response.data.data)) {
      const places = response.data.data.filter((place) => place.city === city);
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
    throw new Error("Failed to fetch places");
  }
}

// Hàm tính khoảng cách giữa hai tọa độ

function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the Earth in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in km
  return distance * 1000; // Convert to meters
}
function timeToMinutes(time) {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}
async function generateDailySchedule(places, globalAddedPlaces, preferences) {
  const morningStart = 7 * 60; // 7:00 AM in minutes
  const morningEnd = 12 * 60; // 12:00 PM in minutes
  const afternoonStart = 13 * 60; // 1:00 PM in minutes
  const eveningEnd = 21 * 60; // 9:00 PM in minutes
  const maxDistance = 15 * 1000; // 15 km in meters

  let currentTime = morningStart;
  let daySchedule = [];
  //khung gio uu tien cho cac dia điểm

  const timePriorityMap = {
    "07:00-08:00": ["coffee"],
    "08:00-10:00": ["museum"],
    "10:00-11:00": [""],
    "13:00-14:00": ["restaurant"],
    "14:00-15:00": ["village"],
    "15:00-18:00": ["natural"],
    "16:00-18:00": ["beach"],
    "19:00-21:00": ["night_market", "drink"],
    // Thêm các khung giờ và loại địa điểm ưu tiên khác tại đây
  };
  function getPriorityMultiplier(placeCategory, currentTime, preferences) {
    let priorityLv = 1;

    // Kiểm tra ưu tiên theo khung giờ
    for (const [timeRange, priorityTypes] of Object.entries(timePriorityMap)) {
      const [startTime, endTime] = timeRange.split("-").map(timeToMinutes);
      if (currentTime >= startTime && currentTime < endTime) {
        if (placeCategory && Array.isArray(placeCategory)) {
          if (
            placeCategory.some((category) =>
              priorityTypes.includes(category.value)
            )
          ) {
            priorityLv++;
          }
        }
      }
    }

    // Kiểm tra ưu tiên theo preferences
    if (preferences && placeCategory && Array.isArray(placeCategory)) {
      if (placeCategory.some((category) => category.value === preferences)) {
        priorityLv++;
      }
    }

    return priorityLv;
  }

  // console.log(places);

  // Sort places by priority (higher priority first)
  places.sort((a, b) => {
    let priorityA = getPriorityMultiplier(a.category, currentTime, preferences);
    let priorityB = getPriorityMultiplier(b.category, currentTime, preferences);
    return priorityB - priorityA;
  });
  // console.log(places);
  // Helper function to add place to schedule
  const addPlaceToSchedule = (place, travelTime, distance) => {
    let duration = Math.floor(parseFloat(place.duration) * 60);
    daySchedule.push({
      priority: place.priority,
      time: formatTime(currentTime),
      time_travel: formatTime(travelTime),
      place_name: place.name,
      duration: place.duration + "h",
      distance: distance ? `${(distance / 1000).toFixed(2)} km` : "N/A",
    });
    currentTime += duration + travelTime;
  };

  // Adding places with calculated travel time and distance
  for (let i = 0; i < places.length; i++) {
    let place = places[i];
    if (globalAddedPlaces.has(place.name)) {
      continue;
    }

    if (i > 0) {
      let prevPlace = places[i - 1];
      let distance = calculateDistance(
        prevPlace.location.coordinates[0],
        prevPlace.location.coordinates[1],
        place.location.coordinates[0],
        place.location.coordinates[1]
      );

      if (distance > maxDistance) {
        continue; // Skip this place if the distance is greater than 15 km
      }

      let travelTime = Math.floor((distance / 1000 / 45) * 60); // Giả sử tốc độ trung bình 50 km/h và làm tròn xuống

      if (
        currentTime + parseFloat(place.duration) * 60 <=
        (i < places.length / 2 ? morningEnd : eveningEnd)
      ) {
        addPlaceToSchedule(place, travelTime, distance);
        globalAddedPlaces.add(place.name); // Add place to the global set of added places
      } else if (currentTime < afternoonStart) {
        // Reset currentTime to afternoon start if morning session ends
        currentTime = afternoonStart;
        addPlaceToSchedule(place, travelTime, distance);
        globalAddedPlaces.add(place.name); // Add place to the global set of added places
      }
    } else {
      // Initial place addition without travel time and distance
      addPlaceToSchedule(place, 0, 0);
      globalAddedPlaces.add(place.name); // Add place to the global set of added places
    }
  }

  return daySchedule;
}

// Helper function to format time from minutes to HH:MM format
function formatTime(minutes) {
  let hours = Math.floor(minutes / 60);
  let mins = Math.floor(minutes % 60);
  return `${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}`;
}

// Tạo lịch trình cho nhiều ngày dựa trên thành phố
const createScheduleForDays = async (req, res) => {
  const { days, preferences } = req.body; // days: số ngày yêu cầu

  if (!days) {
    return res.status(400).json({ message: "Days required" });
  }

  try {
    let activities = [];
    let globalAddedPlaces = new Set(); // Set toàn cục để lưu trữ các địa điểm đã được thêm vào bất kỳ ngày nào

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

      const dailySchedule = await generateDailySchedule(
        places,
        globalAddedPlaces,
        preferences
      );
      // console.log(`Day ${i + 1} schedule:`, dailySchedule); // Log daily schedule
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
