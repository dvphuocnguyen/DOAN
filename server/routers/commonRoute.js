const express = require("express");
const router = express();

const auth = require("../middlewares/authMiddlerwares");
const { categoryAddValidator } = require("../helplers/adminValidator");

const categoryController = require('../controllers/categoryController');

//category routes

router.post('./add-category', auth,categoryAddValidator, categoryController.addCategory);
module.exports = router;
