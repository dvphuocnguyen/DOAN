const { validationResult } = require("express-validator");

const Category = require("../models/categoryModels");

const addCategory = async (req, res) => {
  try {
    const errors = validationResult(req, res);

    if (!errors.isEmpty()) {
      return res.status(200).json({
        success: false,
        msg: "error: ",
        errors: errors.array(),
      });
    }

    const { category_name } = req.body;

    const isExists = await Category.findOne({
      name: {
        $regex: category_name,
        $options: "i",
      },
    });

    if (isExists) {
      return res.status(400).json({
        success: false,
        msg: `category is already exists`,
      });
    }

    const category = new Category({
      name: category_name,
    });

    const categoryData = await category.save();

    return res.status(200).json({
      success: true,
      msg: "Category Created Successfully",
      data: categoryData,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      msg: `${error.message} category controller`,
    });
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({});

    return res.status(200).json({
      success: true,
      msg: "Category Get Successfully",
      data: categories,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      msg: `${error.message} category controller`,
    });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const errors = validationResult(req, res);

    if (!errors.isEmpty()) {
      return res.status(200).json({
        success: false,
        msg: "error: ",
        errors: errors.array(),
      });
    }

    const { id } = req.body;
    const categoryData = await Category.findOne({ _id: id });

    if (!categoryData) {
      return res.status(400).json({
        success: false,
        msg: `category id does not exist`,
      });
    }

    await Category.findByIdAndDelete({ _id: id });

    return res.status(200).json({
      success: true,
      msg: "Category Delete Successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      msg: `${error.message} category controller`,
    });
  }
};

const updateCategory = async (req, res) => {
  try {
    const errors = validationResult(req, res);

    if (!errors.isEmpty()) {
      return res.status(200).json({
        success: false,
        msg: "error: ",
        errors: errors.array(),
      });
    }

    const { id, category_name } = req.body;
    const categoryData = await Category.findOne({ _id: id });

    if (!categoryData) {
      return res.status(400).json({
        success: false,
        msg: `category id does not exist`,
      });
    }

    const updateData = await Category.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          name: category_name,
        },
      },
      { new: true }
    );

    const isExists = await Category.findOne({
      _id: { $ne: id },
      name: {
        $regex: category_name,
        $options: "i",
      },
    });

    if (isExists) {
      return res.status(400).json({
        success: false,
        msg: `category is assigned to another category`,
      });
    }

    return res.status(200).json({
      success: true,
      msg: "Category Update Successfully",
      data: updateData,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      msg: `${error.message} category controller`,
    });
  }
};

module.exports = {
  addCategory,
  getCategories,
  deleteCategory,
  updateCategory,
};
