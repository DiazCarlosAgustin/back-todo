"use strict";
exports.__esModule = true;
var express_1 = require("express");
var friendsController_1 = require("../controllers/friendsController");
var authController_1 = require("../controllers/authController");
var router = express_1.Router();
router.use(authController_1.isLog);
router.route("/:id")
    .get(friendsController_1.getFriends)
    .post(friendsController_1.updateSolicitud);
router.route("/")
    .post(friendsController_1.addFriend);
exports["default"] = router;
