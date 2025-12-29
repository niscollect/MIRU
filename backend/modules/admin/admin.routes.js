const express = require("express");
const router = express.Router();

const adminController = require("./admin.controller");
const auth = require("../../middleware/auth");
const role = require("../../middleware/role");

router.patch(
  "/companies/:id/approve",
  auth,
  role("ADMIN"),
  adminController.approveCompany
);

module.exports = router;
