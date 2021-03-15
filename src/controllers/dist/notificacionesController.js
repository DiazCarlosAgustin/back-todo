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
exports.addNotificacion = exports.getNotificaciones = void 0;
var typeorm_1 = require("typeorm");
var notificacion_1 = require("../entity/notificacion");
var userController_1 = require("./userController");
function getNotificaciones(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var id, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    id = req.params.id;
                    return [4 /*yield*/, typeorm_1.getRepository(notificacion_1.notificacion)
                            .find({
                            relations: ["user_id"],
                            where: {
                                user_id: id
                            },
                            order: { id: "DESC" }
                        })
                            .then(function (result) {
                            res.json({
                                status: "Ok",
                                notificaciones: result
                            });
                        })["catch"](function (error) {
                            res.json({
                                status: "Fail",
                                msg: "Algo fallo, intentenuevamente.",
                                error: error
                            });
                        })];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    console.error(error_1);
                    res.status(400).json(error_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getNotificaciones = getNotificaciones;
function addNotificacion(noti) {
    return __awaiter(this, void 0, Promise, function () {
        var usuario, _a, error_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!(noti != null)) return [3 /*break*/, 7];
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 6, , 7]);
                    if (!(noti.sendBy != null)) return [3 /*break*/, 4];
                    return [4 /*yield*/, userController_1.getNombreUsuario(noti.sendBy)];
                case 2:
                    usuario = _b.sent();
                    _a = noti;
                    return [4 /*yield*/, "El usuario " + usuario + " te envio una solicitud."];
                case 3:
                    _a.mensaje = _b.sent();
                    _b.label = 4;
                case 4: return [4 /*yield*/, typeorm_1.getRepository(notificacion_1.notificacion)
                        .save(noti)
                        .then(function (result) {
                        console.log(result);
                    })["catch"](function (err) { return console.error(err); })];
                case 5:
                    _b.sent();
                    return [3 /*break*/, 7];
                case 6:
                    error_2 = _b.sent();
                    console.error(error_2);
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    });
}
exports.addNotificacion = addNotificacion;
