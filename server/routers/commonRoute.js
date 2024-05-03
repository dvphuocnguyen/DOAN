const express = require("express");
const router = express();

const auth = require("../middlewares/authMiddlerwares");
const {
  categoryAddValidator,
  categoryDeleteValidator,
  categoryUpdateValidator,
} = require("../helplers/adminValidator");
const { placeAddValidator } = require("../helplers/adminValidator");
const {
  createPlace,
  getAllPlaces,
  getPlaceById,
  searchPlaces,
} = require("../controllers/admin/placeController");
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
router.get("/get-place/:id", getPlaceById);
router.get("/get-allPlace", getAllPlaces);
router.get("/get-allPlace/search", searchPlaces);

module.exports = router;
