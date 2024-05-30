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
  getPlacesByType,
  searchPlaces,
  getDistance
} = require("../controllers/admin/placeController");
//
const { createSchedule, getSchedule, createScheduleForDays } = require("../controllers/common/schedule/scheduleController");
const { createScheduleForDayss } = require("../controllers/common/schedule/scheduleControllers");

//
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

const roomController = require("../controllers/common/room/roomController");
///

/// place
router.post("/create-place", placeAddValidator, createPlace);
router.get("/get-place/:id", getPlaceById);
router.get("/get-places-by-type", getPlacesByType);
router.get("/get-allPlace", getAllPlaces);
router.get("/get-allPlace/search", searchPlaces);
router.get('/distance/:id1/:id2', getDistance);

//schedule
router.post("/create_schedule", createSchedule);
router.get("/getSchedule", getSchedule);
router.post('/schedules/days', createScheduleForDayss);

///tesst getalluser

///get room
router.get("/get_all_room", roomController.getAllRooms);

module.exports = router;
