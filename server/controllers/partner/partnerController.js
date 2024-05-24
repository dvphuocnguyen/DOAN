const Partner = require("../../models/partnerModels");
const { validationResult } = require("express-validator");
const mongoose = require("mongoose");

//create

module.exports.createPartner = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(200).json({
        success: false,
        msg: "Có lỗi trong quá trình tạo partner",
        errors: errors.array(),
      });
    }
    const { name, email, password } = req.body;
    const isExists = await Partner.findOne({
      place_name: {
        $regex: name,
        $options: "i",
      },
    });
    if (isExists) {
      return res.status(400).json({
        success: false,
        msg: "Partner already exists",
      });
    }
    const partner = new Partner({
      name: name,
      email: email,
      password: password,
      role: 2,
    });
    const newPartner = await partner.save();
    res.status(201).json({
      success: true,
      data: newPartner,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
