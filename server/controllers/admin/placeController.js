const Place = require("../../models/placeModel");
const { validationResult } = require("express-validator");
const mongoose = require("mongoose");

// Get all places
exports.getAllPlaces = async (req, res) => {
  try {
    const places = await Place.find();
    res.status(200).json({
      success: true,
      data: places,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
exports.searchPlaces = async (req, res) => {
  try {
    const { searchTerm } = req.query;
    const places = await Place.find({
      $or: [
        { name: { $regex: searchTerm, $options: "i" } }, // Tìm kiếm theo tên địa điểm
        { description: { $regex: searchTerm, $options: "i" } }, // Tìm kiếm theo mô tả
        { address: { $regex: searchTerm, $options: "i" } }, // Tìm kiếm theo địa chỉ
      ],
    });
    res.status(200).json({
      success: true,
      data: places,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
// Get single place by IDconst { validationResult } = require('express-validator');
exports.getPlaceById = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: errors.array(),
      });
    }

    const { id } = req.params; // Lấy id từ tham số của URL

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid ObjectId",
      });
    }

    const placeData = await Place.findOne({ _id: id });

    if (!placeData) {
      return res.status(404).json({
        success: false,
        message: "Place not found",
      });
    }

    res.status(200).json({
      success: true,
      data: placeData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

///get place by type
exports.getPlacesByType = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: errors.array(),
      });
    }

    const { placeType } = req.query; // Lấy type từ query parameters

    // Query database to find places by type
    const places = await Place.find({ placeType: { $in: [placeType] } }); // Sử dụng $in để kiểm tra loại có nằm trong mảng placeType hay không

    if (!places || places.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No places found for the specified type",
      });
    }

    res.status(200).json({
      success: true,
      data: places,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Create a new place
exports.createPlace = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: errors.array(),
      });
    }

    const {
      name,
      description,
      address,
      cost,
      duration,
      priority,
      openingHours,
      closingHours,
      category,
      rating,
      city,
      location,
    } = req.body;

    const isExists = await Place.findOne({
      name: {
        $regex: new RegExp(name, "i"),
      },
    });

    if (isExists) {
      return res.status(400).json({
        success: false,
        message: "Place already exists",
      });
    }

    if (
      !location ||
      !location.coordinates ||
      location.coordinates.length !== 2
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid location format",
      });
    }

    const place = new Place({
      name,
      description,
      address,
      cost,
      duration,
      priority,
      openingHours,
      closingHours,
      category,
      rating,
      city,
      location: {
        type: "Point",
        coordinates: location.coordinates,
      },
    });

    const newPlace = await place.save();

    res.status(201).json({
      success: true,
      data: newPlace,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update a place
exports.updatePlace = async (req, res) => {
  try {
    const place = await Place.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!place) {
      return res.status(404).json({
        success: false,
        message: "Place not found",
      });
    }
    res.status(200).json({
      success: true,
      data: place,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Delete a place
exports.deletePlace = async (req, res) => {
  try {
    const place = await Place.findByIdAndDelete(req.params.id);
    if (!place) {
      return res.status(404).json({
        success: false,
        message: "Place not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Place deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

//get distance place
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371e3; // Bán kính của Trái đất tính bằng mét
  const φ1 = (lat1 * Math.PI) / 180;
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

exports.getDistance = async (req, res) => {
  try {
    const { id1, id2 } = req.params;

    const place1 = await Place.findById(id1);
    const place2 = await Place.findById(id2);

    if (!place1 || !place2) {
      return res.status(404).json({
        success: false,
        message: "One or both places not found",
      });
    }

    const [lon1, lat1] = place1.location.coordinates;
    const [lon2, lat2] = place2.location.coordinates;

    const distance = calculateDistance(lat1, lon1, lat2, lon2);

    res.status(200).json({
      success: true,
      distance: distance, // Khoảng cách tính bằng mét
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
