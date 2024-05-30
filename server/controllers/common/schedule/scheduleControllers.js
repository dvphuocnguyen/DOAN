const Schedule = require("../../../models/scheduleModule");
const axios = require("axios");
const Place = require("../../../models/placeModel");

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
async function fetchPlaces(city, preferences) {
  try {
    const response = await axios.get("http://localhost:3001/api/get-allPlace");
    if (response.status === 200 && response.data.success && Array.isArray(response.data.data)) {
      let places = response.data.data.filter((place) => place.city === city);
      if (preferences && preferences.length > 0) {
        places = places.filter(place =>
          preferences.some(preference => place.category.includes(preference))
        );
      }
      console.log(`Fetched places for ${city} with preferences:`, places);
      return places;
    } else {
      throw new Error("Invalid API response format");
    }
  } catch (error) {
    console.error("Error fetching places:", error.message);
    throw error;
  }
}


////// distance

// Hàm tính khoảng cách giữa hai tọa độ
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371e3; // Bán kính trái đất tính bằng mét
  const φ1 = (lat1 * Math.PI) / 180; // Convert to radians
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c; // Khoảng cách tính bằng mét
  return distance;
}


async function generateDailySchedule(places, avoidTypes) {
  const morningStart = 7 * 60; // 7:00 AM in minutes
  const morningEnd = 11 * 60; // 11:00 AM in minutes
  const afternoonStart = 13 * 60; // 1:00 PM in minutes
  const eveningEnd = 22 * 60; // 8:00 PM in minutes
  const lunchStart = 11 * 60; // 11:00 AM in minutes
  const avgSpeed = 32; // Average travel speed in km/h

  let currentTime = morningStart;
  let daySchedule = [];
  let usedTypes = new Set();

  // Shuffle and adjust priorities
  places = shuffleArray([...places]);
  places = adjustPriorities(places);
  places.sort((a, b) => b.priority - a.priority);

  const addPlaceToSchedule = (place, travelTime, distance) => {
    let duration = Math.floor(parseFloat(place.duration) * 60);
    let totalDuration = duration + travelTime;
    daySchedule.push({
      time: formatTime(currentTime),
      place_name: place.name,
      duration: place.duration,
      distance: distance ? `${(distance / 1000).toFixed(2)}` : "N/A",
      type: place.type,
    });
    usedTypes.add(place.type);
    currentTime += totalDuration;
  };

  const timeStringToMinutes = (timeString) => {
    const [hours, minutes] = timeString.split(":").map(Number);
    return hours * 60 + minutes;
  };

  const findRestaurant = () => {
    const restaurant = places.find(
      (place) =>
        place.category &&
        place.category.some((cat) => cat.value === "restaurent")
    );
    return restaurant ? restaurant : null;
  };

  let remainingPlaces = [...places];

  while (remainingPlaces.length > 0 && currentTime < eveningEnd) {
    let placeAdded = false;
    let nearestPlaceIndex = -1;
    let minDistance = Infinity;
    let travelTime = 0;

    for (let i = 0; i < remainingPlaces.length; i++) {
      let place = remainingPlaces[i];
      let distance = 0;

      if (daySchedule.length > 0) {
        let prevPlace = places.find(
          (p) => p.name === daySchedule[daySchedule.length - 1].place_name
        );
        if (prevPlace) {
          distance = calculateDistance(
            prevPlace.location.coordinates[0],
            prevPlace.location.coordinates[1],
            place.location.coordinates[0],
            place.location.coordinates[1]
          );
          travelTime = Math.floor((distance / 1000 / avgSpeed) * 60);
        }
      }

      const openingTime = timeStringToMinutes(place.openingHours);
      const closingTime = timeStringToMinutes(place.closingHours);
      const placeType = place.type;

      if (
        currentTime + parseFloat(place.duration) * 60 <= closingTime &&
        currentTime >= openingTime &&
        (!avoidTypes.includes(placeType) || !usedTypes.has(placeType))
      ) {
        if (distance < minDistance) {
          minDistance = distance;
          nearestPlaceIndex = i;
        }
      }
    }

    if (nearestPlaceIndex !== -1) {
      let nearestPlace = remainingPlaces[nearestPlaceIndex];
      addPlaceToSchedule(nearestPlace, travelTime, minDistance);
      remainingPlaces.splice(nearestPlaceIndex, 1);
      placeAdded = true;

      // Kiểm tra nếu thời gian hiện tại kết thúc trong khoảng từ 11:00 đến 12:00 và thêm thời gian nghỉ trưa
      if (currentTime >= morningEnd && currentTime <= lunchStart) {
        currentTime = afternoonStart; // Chuyển sang buổi chiều sau thời gian nghỉ trưa
        const restaurant = findRestaurant();
        if (restaurant) {
          addPlaceToSchedule(restaurant, 0, 0); // travelTime và distance = 0 vì không cần tính thời gian di chuyển trong thời gian nghỉ trưa
        } else {
          // Nếu không tìm thấy nhà hàng, ghi lại là thời gian nghỉ trưa
          daySchedule.push({
            time: formatTime(lunchStart),
            place_name: "Lunch Break",
            duration: "1h",
            distance: "N/A",
            type: "break",
          });
        }
      }
    }

    if (!placeAdded && currentTime < afternoonStart) {
      currentTime = afternoonStart;
    }

    if (!placeAdded && currentTime >= afternoonStart) {
      break;
    }
  }

  if (daySchedule.length === 0) {
    daySchedule.push({
      time: formatTime(morningStart),
      place_name: "No places available in the morning",
      duration: "N/A",
      distance: "N/A",
      type: "N/A",
    });
  }

  return daySchedule;
}



function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function formatTime(minutes) {
  let hours = Math.floor(minutes / 60);
  let mins = Math.floor(minutes % 60);
  return `${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}`;
}
function adjustPriorities(places) {
  return places.map((place) => {
    let priorityAdjustment = Math.random() * 2 - 1;
    return { ...place, priority: place.priority + priorityAdjustment };
  });
}


// Tạo lịch trình cho nhiều ngày dựa trên thành phố
const createScheduleForDayss = async (req, res) => {
  const { days, preferences } = req.body; // days: số ngày yêu cầu

  if (!days) {
    return res.status(400).json({ message: "Days required" });
  }

  try {
    let activities = [];
    let usedPlaces = new Set();

    for (let i = 1; i <= days; i++) {
      let city = "Đà Nẵng"; // Mặc định là Đà Nẵng
      if (i > 3 && i <= 5) {
        city = "Quảng Nam"; // Ngày thứ 4 và 5 đi Quảng Nam
      } else if (i > 5) {
        city = "Huế"; // Kể từ ngày thứ 6 đi Huế
      }
      const avoidTypes = ["bridge", "coffee"];

      let places = await fetchPlaces(city, preferences);
      places = places.filter((place) => !usedPlaces.has(place._id));

      if (places.length === 0) {
        // Nếu không có địa điểm phù hợp với sở thích, lấy tất cả địa điểm trong thành phố
        places = await fetchPlaces(city, []);
        places = places.filter((place) => !usedPlaces.has(place._id));
      }

      if (places.length === 0) {
        return res.status(404).json({ message: `No places found in ${city}` });
      }

      const dailySchedule = await generateDailySchedule(places, avoidTypes);
      console.log(`Day ${i + 1} schedule:`, dailySchedule);

      dailySchedule.forEach((activity) => {
        const place = places.find((p) => p.name === activity.place_name);
        if (place) {
          usedPlaces.add(place._id);
        }
      });

      activities.push(dailySchedule);
    }

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
  createScheduleForDayss,
};
