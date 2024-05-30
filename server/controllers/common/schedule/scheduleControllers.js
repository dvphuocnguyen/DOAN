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

// Hàm tính khoảng cách giữa hai tọa độ
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  // Haversine formula to calculate distance between two points on the Earth
  const R = 6371e3; // Earth's radius in meters
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Distance in meters
};
const formatTime = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}:${mins.toString().padStart(2, "0")}`;
};
const convertTimeToMinutes = (time) => {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
};
const findNearbyRestaurant = (coordinates, places) => {
  // Tìm nhà hàng gần tọa độ hiện tại, giả định khoảng cách tối đa là 5km
  return places.find(
    (place) =>
      place.category.some((cat) => cat.value === "restaurant") &&
      calculateDistance(
        coordinates[1],
        coordinates[0],
        place.location.coordinates[1],
        place.location.coordinates[0]
      ) < 15000
  );
};

async function generateDailySchedule(places, preferences) {
  const morningStart = 8 * 60; // 7:00 AM in minutes
  const lunchStart = 11 * 60; // 11:00 AM in minutes
  const lunchEnd = 13 * 60; // 1:00 PM in minutes
  const eveningEnd = 22 * 60; // 10:00 PM in minutes
  const maxDistance = 15000; // 15 km
  let currentTime = morningStart;
  let daySchedule = [];
  let lastPlaceCoordinates = null;

  // Tìm địa điểm trùng với sở thích và sắp xếp theo số lượng sở thích trùng khớp
  let preferencesPlaces = places
    .filter((place) =>
      preferences.some((pref) =>
        place.category.some((cat) => cat.value === pref.value)
      )
    )
    .sort((a, b) => {
      const aMatches = a.category.filter((cat) =>
        preferences.some((pref) => cat.value === pref.value)
      ).length;
      const bMatches = b.category.filter((cat) =>
        preferences.some((pref) => cat.value === pref.value)
      ).length;
      return bMatches - aMatches;
    });

    console.log(preferencesPlaces)

  // Nếu không có địa điểm nào phù hợp, trả về mảng rỗng
  if (preferencesPlaces.length === 0) {
    console.log("Không có địa điểm phù hợp sở thích");
    return [];
  }

  // Helper function to convert time in HH:MM format to minutes
  function convertTimeToMinutes(time) {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  }

  // Helper function to calculate distance between two coordinates
  function calculateDistance(lat1, lon1, lat2, lon2) {
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371; // Radius of the Earth in km
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c * 1000; // Distance in meters
    return distance;
  }

  // Helper function to find a nearby restaurant
  function findNearbyRestaurant(lastPlaceCoordinates, places) {
    return places.find((place) => place.category.some((cat) => cat.value === "restaurant"));
  }

  // Helper function to format time from minutes to HH:MM format
  function formatTime(minutes) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}:${mins < 10 ? '0' : ''}${mins}`;
  }

  // Check if the place is within operating hours
  function isWithinOperatingHours(place, currentTime) {
    const openingTime = convertTimeToMinutes(place.openingHours);
    const closingTime = convertTimeToMinutes(place.closingHours);
    const visitTime = place.duration;
    return currentTime >= openingTime && visitTime + currentTime <= closingTime;
  }

  for (let i = 0; i < preferencesPlaces.length; i++) {
    const place = preferencesPlaces[i];

    if (isWithinOperatingHours(place, currentTime)) {
      if (lastPlaceCoordinates) {
        let distance = calculateDistance(
          lastPlaceCoordinates[1],
          lastPlaceCoordinates[0],
          place.location.coordinates[1],
          place.location.coordinates[0]
        );

        if (distance > maxDistance) continue; // Nếu khoảng cách quá xa thì bỏ qua địa điểm này
      }

      let duration = place.duration;
      daySchedule.push({
        time: formatTime(currentTime),
        place_name: place.name,
        duration: `${duration}h`,
        distance: lastPlaceCoordinates ? calculateDistance(
          lastPlaceCoordinates[1],
          lastPlaceCoordinates[0],
          place.location.coordinates[1],
          place.location.coordinates[0]
        ) : "N/A",
      });

      lastPlaceCoordinates = place.location.coordinates;
      currentTime += duration;

      if (currentTime >= lunchStart && currentTime <= lunchEnd) {
        const restaurant = findNearbyRestaurant(lastPlaceCoordinates, places);
        if (restaurant) {
          daySchedule.push({
            time: formatTime(currentTime),
            place_name: restaurant.name,
            duration: "1h",
            distance: "n/a",
          });
          currentTime += 60; // Thời gian ăn trưa là 1 giờ
        }
      }
    }
  }

  return daySchedule;
}


//////
const createScheduleForDayss = async (req, res) => {
  const { days, preferences } = req.body; // days: số ngày yêu cầu

  if (!days) {
    return res.status(400).json({ message: "Days required" });
  }

  try {
    let activities = [];
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

      // Tạo lịch trình cho ngày hiện tại với các địa điểm đã chọn
      const dailySchedule = await generateDailySchedule(places, preferences);
      // Thêm lịch trình của ngày hiện tại vào danh sách tổng
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
  createScheduleForDayss,
};
