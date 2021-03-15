"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.deleteTodo = exports.updateTodo = exports.addTodo = exports.getTodosByUser = void 0;
var typeorm_1 = require("typeorm");
var todo_1 = require("../entity/todo");
var notificacionesController_1 = require("./notificacionesController");
/**
 *
 * @param req
 * @param res
 */
function getTodosByUser(req, res) {
    return __awaiter(this, void 0, Promise, function () {
        var userID, result, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    userID = req.params.id;
                    if (!(userID > 0 && userID != null)) return [3 /*break*/, 2];
                    return [4 /*yield*/, typeorm_1.getRepository(todo_1.todo)
                            .find({
                            relations: ["user", "fromUser"],
                            where: { user: userID },
                            order: { id: "DESC" }
                        })];
                case 1:
                    result = _a.sent();
                    res.json({
                        status: "Ok",
                        todo: result
                    });
                    _a.label = 2;
                case 2: return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error(error_1);
                    res.status(404).json(error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.getTodosByUser = getTodosByUser;
/**
 *
 * @param req
 * @param res
 */
function addTodo(req, res) {
    return __awaiter(this, void 0, Promise, function () {
        var newTodo_1, error_2;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    newTodo_1 = req.body;
                    if (!(newTodo_1 != null)) return [3 /*break*/, 2];
                    return [4 /*yield*/, typeorm_1.getRepository(todo_1.todo)
                            .save(newTodo_1)
                            .then(function (result) { return __awaiter(_this, void 0, void 0, function () {
                            var resultTodoAdd;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, typeorm_1.getRepository(todo_1.todo)
                                            .find({
                                            relations: ["user", "fromUser"],
                                            where: { user: newTodo_1.fromUser },
                                            order: { id: "DESC" }
                                        })];
                                    case 1:
                                        resultTodoAdd = _a.sent();
                                        notificacionesController_1.addNotificacion({
                                            user_id: result.user,
                                            type: "other",
                                            mensaje: "Se te asigno una nueva tarea, id de la tarea: " + result.id
                                        });
                                        res.json({
                                            status: "Ok",
                                            msg: "El ToDo se agrego correctamente.",
                                            todo: resultTodoAdd
                                        });
                                        return [2 /*return*/];
                                }
                            });
                        }); })["catch"](function (err) {
                            console.error(err);
                            res.json({
                                status: "Fail",
                                msg: "Algo fallo, intentanuevamente."
                            });
                        })];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2: return [3 /*break*/, 4];
                case 3:
                    error_2 = _a.sent();
                    console.error(error_2);
                    res.json({
                        status: "Fail",
                        msg: "Algo fallo, intentanuevamente."
                    });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.addTodo = addTodo;
/**
 *
 * @param req
 * @param res
 */
function updateTodo(req, res) {
    return __awaiter(this, void 0, Promise, function () {
        var _a, id_1, titulo, descripcion, progreso, error_3;
        var _this = this;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    _a = req.body, id_1 = _a.id, titulo = _a.titulo, descripcion = _a.descripcion, progreso = _a.progreso;
                    return [4 /*yield*/, typeorm_1.getRepository(todo_1.todo)
                            .createQueryBuilder("todo")
                            .update({ titulo: titulo, descripcion: descripcion, progreso: progreso })
                            .where("id = :id", { id: id_1 })
                            .execute()
                            .then(function (result) { return __awaiter(_this, void 0, void 0, function () {
                            var todoUpdated;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, typeorm_1.getRepository(todo_1.todo)
                                            .find({ where: { id: id_1 } })["catch"](function (error) {
                                            res.json({ error: error, "status": "Fail", "msg": "No se pudieron guardar los cambios correctamente, intent nuevamente." });
                                        })];
                                    case 1:
                                        todoUpdated = _a.sent();
                                        if (result.raw.affectedRows > 0 && result.raw.warningCount === 0) {
                                            res.json({ todo: todoUpdated, "status": "Ok", "msg": "Los cambios se guardaron correctamente." });
                                        }
                                        else {
                                            res.json({ todo: todoUpdated, "status": "Fail", "msg": "No se pudieron guardar los cambios correctamente, intent nuevamente." });
                                        }
                                        return [2 /*return*/];
                                }
                            });
                        }); })["catch"](function (err) {
                            console.log(err);
                        })];
                case 1:
                    _b.sent();
                    return [3 /*break*/, 3];
                case 2:
                    error_3 = _b.sent();
                    res.status(400).json({ error: error_3 });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.updateTodo = updateTodo;
/**
 *
 * @param req
 * @param res
 */
function deleteTodo(req, res) {
    return __awaiter(this, void 0, Promise, function () {
        var id, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    id = req.params.id;
                    return [4 /*yield*/, typeorm_1.getRepository(todo_1.todo)
                            .createQueryBuilder()["delete"]()
                            .from(todo_1.todo)
                            .where("id = :id", { id: id })
                            .execute()
                            .then(function (result) {
                            if (result.raw.warningCount == 0 && result.raw.affectedRows > 0) {
                                res.json({
                                    status: "Ok",
                                    msg: "Se elimino correctamente la tarea."
                                });
                            }
                            else {
                                res.json({
                                    status: "Fail",
                                    msg: "Algo fallo, intentenuevamente."
                                });
                            }
                        })];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    error_4 = _a.sent();
                    console.error(error_4);
                    res.json({
                        status: "Fail",
                        msg: "Algo fallo, intentenuevamente.",
                        error: error_4
                    });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.deleteTodo = deleteTodo;
