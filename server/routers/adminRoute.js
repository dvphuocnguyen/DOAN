const express = require("express");

const router = express();
const auth = require("../middlewares/authMiddlerwares");
const permissionController = require("../controllers/admin/permissionController");
const addPlaceController = require("../controllers/admin/placeController");
const { onlyAdminAccess } = require("../middlewares/adminMiddlerware");
const authAdmin = require("../controllers/admin/authAdmin")
const {
  permissionAddValidator,
  permissionDeleteValidator,
  permissionUpdateValidator,
  partnerAddValidator
} = require("../helplers/adminValidator");

const { createPartner } = require("../controllers/partner/partnerController");
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
/////
router.post(
  "/partner_register",
  auth,
  authAdmin,
  partnerAddValidator,
  createPartner
);

module.exports = router;
