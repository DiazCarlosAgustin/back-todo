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
exports.updateSolicitud = exports.addFriend = exports.getFriends = void 0;
var friend_1 = require("../entity/friend");
var typeorm_1 = require("typeorm");
var notificacionesController_1 = require("./notificacionesController");
/**
 *
 * @param req
 * @param res
 */
function getFriends(req, res) {
    return __awaiter(this, void 0, Promise, function () {
        var id, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    id = req.params.id;
                    return [4 /*yield*/, typeorm_1.createQueryBuilder("friend")
                            .leftJoinAndSelect("friend.friend_id", "user")
                            .where("friend.aceptado = true")
                            .andWhere("friend.user_id = :id", { id: id })
                            .getMany()
                            .then(function (result) {
                            res.json({
                                status: "Ok",
                                friends: result
                            });
                        })["catch"](function (error) {
                            console.error(error);
                        })];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    console.error(error_1);
                    res.status(400).json({
                        status: "Fail",
                        error: error_1
                    });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getFriends = getFriends;
/**
 *
 * @param req
 * @param res
 */
function addFriend(req, res) {
    return __awaiter(this, void 0, Promise, function () {
        var newFriend_1, existeUnaRelacion, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 7, , 8]);
                    newFriend_1 = {
                        user_id: req.body.user_id,
                        friend_id: req.body.friend_id
                    };
                    return [4 /*yield*/, typeorm_1.getRepository(friend_1.friend)
                            .find({ where: { user_id: newFriend_1.user_id, friend_id: newFriend_1.friend_id } })];
                case 1:
                    existeUnaRelacion = _a.sent();
                    if (!(existeUnaRelacion.length == 0)) return [3 /*break*/, 5];
                    if (!(newFriend_1.user_id != newFriend_1.friend_id)) return [3 /*break*/, 3];
                    return [4 /*yield*/, typeorm_1.getRepository(friend_1.friend)
                            .save(newFriend_1)
                            .then(function (result) {
                            var noti = {
                                user_id: newFriend_1.friend_id,
                                sendBy: newFriend_1.user_id,
                                type: "solicitud",
                                mensaje: "El usuario " + newFriend_1.friend_id + " te envio una solicitud de amistad."
                            };
                            notificacionesController_1.addNotificacion(noti);
                            res.json({
                                status: "Ok",
                                msg: "Se envio la solicitud al usuario.",
                                friend: result
                            });
                        })];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    res.json({
                        status: "Fail",
                        msg: "No te puedes agregar a ti mismo como amigo."
                    });
                    _a.label = 4;
                case 4: return [3 /*break*/, 6];
                case 5:
                    res.json({
                        status: "Await",
                        msg: "Ya fue enviada la solicitud, aun esta en espera de aprobación del usuario."
                    });
                    _a.label = 6;
                case 6: return [3 /*break*/, 8];
                case 7:
                    error_2 = _a.sent();
                    res.status(400).json(error_2);
                    return [3 /*break*/, 8];
                case 8: return [2 /*return*/];
            }
        });
    });
}
exports.addFriend = addFriend;
/**
 *
 * @param req
 * @param res
 */
function updateSolicitud(req, res) {
    return __awaiter(this, void 0, Promise, function () {
        var _a, user_id, friend_id, aceptado, error_3;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    console.log(req.body);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    _a = req.body, user_id = _a.user_id, friend_id = _a.friend_id, aceptado = _a.aceptado;
                    return [4 /*yield*/, typeorm_1.getRepository(friend_1.friend)
                            .createQueryBuilder("friend")
                            .update(req.body)
                            .where("user_id = :id", { user_id: user_id })
                            .where("friend_id = :id", { id: friend_id })
                            .execute()
                            .then(function (result) {
                            if (result.raw.affectedRows > 0 && result.raw.warningCount === 0) {
                                res.json({ "status": "Ok", "msg": "La solicitud fue aceptada correctamente." });
                            }
                            else {
                                res.json({ "status": "Fail", "msg": "Algo ocurrio y no se pudo aceptar la solicitud correctamente, intent nuevamente." });
                            }
                        })];
                case 2:
                    _b.sent();
                    return [3 /*break*/, 4];
                case 3:
                    error_3 = _b.sent();
                    res.status(400).json(error_3);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.updateSolicitud = updateSolicitud;
