const express = require("express");

const router = express();
const auth = require("../middlewares/authMiddlerwares");
const permissionController = require("../controllers/admin/permissionController");
const addPlaceController = require("../controllers/admin/placeController");
const { onlyAdminAccess } = require("../middlewares/adminMiddlerware");

const {
  permissionAddValidator,
  permissionDeleteValidator,
  permissionUpdateValidator,
} = require("../helplers/adminValidator");


router.post(
  "/add-permission",
  auth,
  onlyAdminAccess,
  permissionAddValidator,
  permissionController.addPermission
);
router.get(
  "/get-permissions",
  auth,
  onlyAdminAccess,
  permissionController.getPermissions
);
router.post(
  "/delete-permission",
  auth,
  onlyAdminAccess,
  permissionDeleteValidator,
  permissionController.deletePermission
);
router.post(
  "/update-permission",
  auth,
  onlyAdminAccess,
  permissionUpdateValidator,
  permissionController.updatePermission
);

module.exports = router;
