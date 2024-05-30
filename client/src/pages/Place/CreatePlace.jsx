import React, { useState } from "react";
import axios from "axios";
import Select from "react-select";
import "./CreatePlace.scss";
import Header from "../../components/Header/Header";
import Navbar from "../../components/Navbar/Navbar";

const CreatePlace = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState(""); // Địa chỉ không cần thiết trong placeSchema nhưng nếu cần, có thể thêm vào
  const [cost, setCost] = useState("");
  const [duration, setDuration] = useState("");
  const [priority, setPriority] = useState("");
  const [openingHours, setOpeningHours] = useState("");
  const [closingHours, setClosingHours] = useState("");
  const [category, setCategory] = useState([]);
  const [rating, setRating] = useState(""); // Rating không cần thiết trong placeSchema nhưng nếu cần, có thể thêm vào
  const [city, setCity] = useState("Đà Nẵng"); // Giá trị mặc định
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [images, setImages] = useState([]); // State để lưu trữ các tệp hình ảnh đã chọn

  const options = [
    { value: "coffee", label: "Coffee"},
    { value: "restaurent", label: "Restaurent" },
    { value: "natural", label: "Natural" },
    { value: "museum", label: "Museum" },
    { value: "establishment ", label: "Establishment " },
    { value: "point_of_interest", label: "Point of Interest " },
    { value: "tourist_attraction", label: "Tourist Attraction" },
    { value: "beach", label: "Beach" },
    { value: "mountain", label: "Mountain" },
    { value: "lake", label: "Lake" },
    { value: "village", label: "Village" },
    { value: "pagoda", label: "Pagoda" },
    { value: "church", label: "Church" },
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

  const handleChangeCategory = (selectedOptions) => {
    setCategory(selectedOptions);
    console.log(selectedOptions);
  };

  const handleImageChange = (e) => {
    // Lấy danh sách các tệp hình ảnh từ sự kiện onChange
    const files = e.target.files;
    setImages(files);
    console.log(images);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const placeData = {
      name,
      description,
      address,
      cost: parseFloat(cost),
      duration: parseFloat(duration),
      priority: parseInt(priority),
      openingHours,
      closingHours,
      category,
      rating,
      city,
      location: {
        type: "Point",
        coordinates: [parseFloat(latitude), parseFloat(longitude)],
      },
      images: [], // Tạo trường images rỗng
      reviews: [], // Tạo trường reviews rỗng
    };

    try {
      console.log("Submitting data:", placeData);
      const response = await axios.post(
        "http://localhost:3001/api/create-place",
        placeData
      );
      console.log("Place created:", response.data);
      // Reset form fields
      setName("");
      setDescription("");
      setAddress("");
      setCost("");
      setDuration("");
      setPriority("");
      setOpeningHours("");
      setClosingHours("");
      setCategory("");
      setRating("");
      setCity("Đà Nẵng");
      setLatitude("");
      setLongitude("");
      setImages([]);
    } catch (error) {
      console.error(
        "Error creating place:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <>
      <Header />
      <Navbar />
      <div className="create_form">
        <h2>Create New Place</h2>
        <form onSubmit={handleSubmit} className="from_container">
          <div className="form_item">
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form_item">
            <label>Description:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="form_item">
            <label>Address:</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="form_item">
            <label>Cost:</label>
            <input
              type="number"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
              required
            />
          </div>
          <div className="form_item">
            <label>Duration (hours):</label>
            <input
              type="number"
              step="0.25"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              required
            />
          </div>
          <div className="form_item">
            <label>Priority:</label>
            <input
              type="number"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              required
            />
          </div>
          <div className="form_item">
            <label>Opening Hours:</label>
            <input
              type="time"
              value={openingHours}
              onChange={(e) => setOpeningHours(e.target.value)}
              required
            />
          </div>
          <div className="form_item">
            <label>Closing Hours:</label>
            <input
              type="time"
              value={closingHours}
              onChange={(e) => setClosingHours(e.target.value)}
              required
            />
          </div>
          <div className="form_item">
            <label>Category:</label>
            <Select
              isMulti
              name="colors"
              classNamePrefix="select"
              options={options}
              onChange={handleChangeCategory}
            />
          </div>
          <div className="form_item">
            <label>Rating:</label>
            <input
              type="number"
              step="0.1"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              required
            />
          </div>
          <div className="form_item">
            <label>City:</label>
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            >
              <option value="Đà Nẵng">Đà Nẵng</option>
              <option value="Huế">Huế</option>
              <option value="Quảng Nam">Quảng Nam</option>
            </select>
          </div>
          <div className="form_item">
            <label>Latitude:</label>
            <input
              type="number"
              step="0.0001"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
              required
            />
          </div>
          <div className="form_item">
            <label>Longitude:</label>
            <input
              type="number"
              step="0.0001"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
              required
            />
          </div>
          <div className="form_item">
            <label>Images:</label>
            <input
              type="file"
              multiple
              onChange={handleImageChange} // Bắt sự kiện thay đổi của input file và gọi hàm handleImageChange
            />
          </div>
          <button type="submit" className="btn">
            Create Place
          </button>
        </form>
      </div>
    </>
  );
};

export default CreatePlace;
