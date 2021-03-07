"use strict";
exports.__esModule = true;
var express_1 = require("express");
var todoController_1 = require("../controllers/todoController");
var authController_1 = require("../controllers/authController");
var router = express_1.Router();
router.use(authController_1.isLog);
router.route("/")
    .put(todoController_1.updateTodo)
    .post(todoController_1.addTodo);
router.route("/:id")
    .get(todoController_1.getTodosByUser);
exports["default"] = router;
