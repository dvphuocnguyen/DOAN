const express = require("express");
const router = express();

const roomController = require("../controllers/common/room/roomController");
const authPartner = require("../controllers/partner/partnerAuth");
const auth = require("../middlewares/authMiddlerwares");

router.post("/create_room", auth,authPartner ,roomController.createRoom);

module.exports = router;
