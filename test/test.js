function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Bán kính trái đất (đơn vị kilômét)

  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c; // Khoảng cách giữa hai điểm

  return distance;
}

// Ví dụ sử dụng hàm calculateDistance
const distance = calculateDistance(
  16.0610192,
  108.2119667,
  16.0628265,
  108.2127058
);
const kcach = distance.toFixed(2);
console.log(kcach); // Kết quả là khoảng cách giữa hai điểm trong đơn vị kilômét
