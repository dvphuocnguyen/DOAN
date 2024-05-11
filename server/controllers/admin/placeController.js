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
        { place_name: { $regex: searchTerm, $options: "i" } }, // Tìm kiếm theo tên địa điểm
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
    const errors = validationResult(req, res);

    if (!errors.isEmpty()) {
      return res.status(200).json({
        success: false,
        msg: "Có lỗi trong quá trình tạo place",
        errors: errors.array(),
      });
    }

    const { place_name, description,address, cost, timeToLive, placeType, rating } = req.body;

    const isExists = await Place.findOne({
      place_name: {
        $regex: place_name,
        $options: "i",
      },
    });

    if (isExists) {
      return res.status(400).json({
        success: false,
        msg: "Places already exists",
      });
    }
    const place = new Place({
      place_name: place_name,
      description: description,
      address: address,
      cost: cost,
      timeToLive: timeToLive,
      placeType: placeType,
      rating: rating,
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
exports.getDistance = async (req, res) => {
  const place = await Place.findById(req.params.id);
}