const express = require("express");
const router = express();

const auth = require("../middlewares/authMiddlerwares");
const {
  categoryAddValidator,
  categoryDeleteValidator,
  categoryUpdateValidator,
} = require("../helplers/adminValidator");
const { placeAddValidator } = require("../helplers/adminValidator");
const { createPlace } = require("../controllers/admin/placeController");
const categoryController = require("../controllers/categoryController");

//category routes

router.post(
  "/add-category",
  auth,
  categoryAddValidator,
  categoryController.addCategory
);
router.get("/get-categories", auth, categoryController.getCategories);
router.post(
  "/delete-category",
  auth,
  categoryDeleteValidator,
  categoryController.deleteCategory
);
router.post(
  "/update-category",
  auth,
  categoryUpdateValidator,
  categoryController.updateCategory
);

///

/// place
router.post("/create-place", placeAddValidator, createPlace);
module.exports = router;
