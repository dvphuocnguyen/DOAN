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

  const distance = R * c * Math.sqrt(2); // Khoảng cách tính bằng mét
  return distance;
}
function formatTime(minutes) {
  let hours = Math.floor(minutes / 60);
  let mins = Math.floor(minutes % 60);
  return `${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}`;
}
async function generateDailySchedule(places, preferences, maxDistance = 15000) {
  const morningStart = 7 * 60; // 7:00 AM in minutes
  const morningEnd = 12 * 60; // 11:00 AM in minutes
  const afternoonStart = 13 * 60; // 1:00 PM in minutes
  const eveningEnd = 21 * 60; // 8:00 PM in minutes

  let currentTime = morningStart;
  let daySchedule = [];
  let lastPlace = null;

  // Helper function to add place to schedule
  const addPlaceToSchedule = (place, travelTime, distance) => {
    let duration = Math.floor(parseFloat(place.duration) * 60); // Convert hours to minutes và làm tròn xuống
    let placeOpeningTime =
      parseInt(place.openingHours.split(":")[0]) * 60 +
      parseInt(place.openingHours.split(":")[1]);
    let placeClosingTime =
      parseInt(place.closingHours.split(":")[0]) * 60 +
      parseInt(place.closingHours.split(":")[1]);
    if (currentTime < placeOpeningTime) {
      // Nếu thời gian hiện tại nhỏ hơn thời gian mở cửa, thì đặt thời gian hiện tại bằng thời gian mở cửa
      currentTime = placeOpeningTime;
    }
    // Kiểm tra xem thời gian kết thúc thêm địa điểm có vượt quá thời gian đóng cửa không
    if (currentTime + duration > placeClosingTime) {
      // Nếu thời gian kết thúc vượt quá thời gian đóng cửa, không thêm địa điểm này vào lịch trình
      return;
    }

    daySchedule.push({
      time: formatTime(currentTime),
      place_name: place.name,
      duration: place.duration + "h",
      distance: distance ? `${(distance / 1000).toFixed(2)} km` : "n/a",
    });
    currentTime += duration + travelTime; // Move time forward by the duration of the visit and travel time
    lastPlace = place;
  };

  // Hàm lọc địa điểm trùng với sở thích và chọn địa điểm đầu tiên
  const filterAndSelectFirstPlace = (places, preferences) => {
    // Lọc các địa điểm trùng với sở thích
    const filteredAndSelectedPlaces = places.filter((place) =>
      preferences.some((pref) =>
        place.category.some((cat) => cat.value === pref.value)
      )
    );

    // Nếu không có địa điểm nào phù hợp, trả về mảng rỗng
    if (filteredAndSelectedPlaces.length === 0) {
      return [];
    }

    // Chọn địa điểm đầu tiên từ danh sách đã lọc
    const firstPlace = filteredAndSelectedPlaces[0];

    // Lọc các địa điểm thỏa mãn điều kiện khoảng cách nhỏ hơn 15km từ địa điểm đầu tiên
    const nearbyPlaces = [firstPlace]; // Đưa địa điểm đầu tiên vào danh sách
    const firstPlaceCoordinates = firstPlace.location.coordinates;

    for (let i = 1; i < places.length; i++) {
      const place = places[i];
      const distance = calculateDistance(
        firstPlaceCoordinates[1],
        firstPlaceCoordinates[0],
        place.location.coordinates[1],
        place.location.coordinates[0]
      );

      // Nếu khoảng cách nhỏ hơn 15km, đưa địa điểm vào danh sách
      if (distance < maxDistance) {
        nearbyPlaces.push(place);
      }
    }

    return nearbyPlaces;
  };

  // Sử dụng hàm filterAndSelectFirstPlace để lọc và chọn địa điểm
  const filteredAndSelectedPlaces = filterAndSelectFirstPlace(
    places,
    preferences
  );
  console.log("Filtered and Selected Places: ", filteredAndSelectedPlaces);

  if (filteredAndSelectedPlaces.length > 0) {
    addPlaceToSchedule(filteredAndSelectedPlaces[0], 0, 0);
  }

  // Adding subsequent places with calculated travel time and distance
  for (let i = 1; i < filteredAndSelectedPlaces.length; i++) {
    let place = filteredAndSelectedPlaces[i];
    let prevPlace = filteredAndSelectedPlaces[i - 1];
    let distance = calculateDistance(
      prevPlace.location.coordinates[0],
      prevPlace.location.coordinates[1],
      place.location.coordinates[0],
      place.location.coordinates[1]
    );
    let travelTime = Math.floor((distance / 1000 / 43) * 60); // Giả sử tốc độ trung bình 50 km/h và làm tròn xuống

    if (
      currentTime + parseFloat(place.duration) * 60 <=
      (i < filteredAndSelectedPlaces.length / 2 ? morningEnd : eveningEnd)
    ) {
      addPlaceToSchedule(place, travelTime, distance);
    } else if (currentTime < afternoonStart) {
      // Reset currentTime to afternoon start if morning session ends
      currentTime = afternoonStart;
      addPlaceToSchedule(place, travelTime, distance);
    }
  }

  return daySchedule;
} // Hàm chọn ngẫu nhiên một số lượng địa điểm từ danh sách tạm thời
const selectRandomPlaces = (places, maxNumberOfPlaces) => {
  const shuffled = places.sort(() => 0.5 - Math.random()); // Xáo trộn danh sách địa điểm
  return shuffled.slice(0, maxNumberOfPlaces); // Chọn số lượng địa điểm cần thiết
};

const createScheduleForDays = async (req, res) => {
  const { days, preferences } = req.body; // days: số ngày yêu cầu

  if (!days) {
    return res.status(400).json({ message: "Days required" });
  }

  try {
    let activities = [];
    let temporaryPlaces = [];

    // Tạo danh sách tạm thời chứa tất cả các địa điểm phù hợp với sở thích của người dùng
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

      temporaryPlaces = [...temporaryPlaces, ...places];
    }

    // Lặp qua từng ngày để tạo lịch trình
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

      let selectedPlaces = [];

      // Lặp lại cho đến khi chọn được các địa điểm phù hợp
      while (selectedPlaces.length === 0) {
        // Chọn ngẫu nhiên một số lượng địa điểm từ danh sách tạm thời
        selectedPlaces = selectRandomPlaces(temporaryPlaces, 10);

        // Lọc ra các địa điểm trùng khớp với sở thích của người dùng
        selectedPlaces = selectedPlaces.filter((place) =>
          preferences.some((pref) =>
            place.category.some((cat) => cat.value === pref.value)
          )
        );
      }

      // Tạo lịch trình cho ngày hiện tại với các địa điểm đã chọn
      const dailySchedule = await generateDailySchedule(
        places,
        selectedPlaces,
        preferences
      );

      // Thêm lịch trình của ngày hiện tại vào danh sách tổng
      activities.push(dailySchedule);

      // Loại bỏ các địa điểm đã chọn khỏi danh sách tạm thời để tránh trùng lặp
      temporaryPlaces = temporaryPlaces.filter(
        (place) => !selectedPlaces.includes(place)
      );
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
