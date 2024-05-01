const Place = require("../../models/placeModel");
const { validationResult } = require("express-validator");

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

// Get single place by ID
exports.getPlaceById = async (req, res) => {
  try {
    const place = await Place.findById(req.params.id);
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

// Create a new place
exports.createPlace = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(200).json({
        success: false,
        msg: "Có lỗi trong quá trình tạo place",
        errors: errors.array(),
      });
    }
    const isExists = await Place.findOne({
      place_name: {
        $regex: permission_name,
        $options: "i",
      },
    });

    if (isExists) {
      return res.status(400).json({
        success: false,
        msg: "Places already exists",
      });
    }
    const place = new Place(obj);
    const newPlace = await place.save();
    res.status(201).json({
      success: true,
      data: newPlace,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error place",
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
