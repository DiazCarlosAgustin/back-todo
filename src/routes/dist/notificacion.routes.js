"use strict";
exports.__esModule = true;
var express_1 = require("express");
var notificacionesController_1 = require("../controllers/notificacionesController");
var authController_1 = require("../controllers/authController");
var router = express_1.Router();
router.use(authController_1.isLog);
router.route("/:id")
    .get(notificacionesController_1.getNotificaciones);
exports["default"] = router;
