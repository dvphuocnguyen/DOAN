const { check } = require("express-validator");

exports.permissionAddValidator = [
  check("permission_name", "permission_name is required").not().isEmpty(),
];
exports.permissionDeleteValidator = [
  check("id", "id is required").not().isEmpty(),
];
exports.permissionUpdateValidator = [
  check("id", "id is required").not().isEmpty(),
  check("permission_name", "permission_name is required").not().isEmpty(),
];

//
exports.categoryAddValidator = [
  check("category_name", "category_name  is required").not().isEmpty(),
];
