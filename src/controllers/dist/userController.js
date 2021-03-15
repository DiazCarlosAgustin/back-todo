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
exports.getNombreUsuario = exports.getUsersToAdd = exports.getUserLog = exports.crearUsuario = void 0;
var user_1 = require("../entity/user");
var typeorm_1 = require("typeorm");
var bcrypt = require("bcrypt");
/**
 * *Crear usuario
 * @param req
 * @param res
 */
function crearUsuario(req, res) {
    return __awaiter(this, void 0, Promise, function () {
        var usuario, validEmail, validUsuario, salt, pass, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 8, , 9]);
                    usuario = req.body;
                    return [4 /*yield*/, typeorm_1.getRepository(user_1.user)
                            .find({ where: { email: usuario.email } })["catch"](function (err) {
                            console.error(err);
                        })];
                case 1:
                    validEmail = _a.sent();
                    return [4 /*yield*/, typeorm_1.getRepository(user_1.user)
                            .find({ where: { usuario: usuario.usuario } })["catch"](function (err) {
                            console.error(err);
                        })];
                case 2:
                    validUsuario = _a.sent();
                    if (!(validEmail === [])) return [3 /*break*/, 3];
                    res.status(200).json({
                        status: "Fail",
                        msg: "El email " + usuario.email + " ya esta registrado."
                    });
                    return [3 /*break*/, 7];
                case 3:
                    if (!(validUsuario === [])) return [3 /*break*/, 4];
                    res.status(200).json({
                        status: "Fail",
                        msg: "El usuario " + usuario.usuario + " ya esta registrado."
                    });
                    return [3 /*break*/, 7];
                case 4:
                    salt = 10;
                    return [4 /*yield*/, generarContraseña(usuario.password, salt)];
                case 5:
                    pass = _a.sent();
                    usuario.password = pass;
                    // ? Genero el usuario
                    return [4 /*yield*/, typeorm_1.getRepository(user_1.user)
                            .save(usuario)
                            .then(function (newUser) {
                            res.json({
                                status: "Ok",
                                msg: "Se registro correctamente.",
                                user: newUser
                            });
                        })["catch"](function (err) {
                            res.json({
                                status: "Fail",
                                msg: "No se pudo registrar correctamente, intente nuevamente.",
                                error: err
                            });
                        })];
                case 6:
                    // ? Genero el usuario
                    _a.sent();
                    _a.label = 7;
                case 7: return [3 /*break*/, 9];
                case 8:
                    err_1 = _a.sent();
                    console.error(err_1);
                    res.status(404).json({ error: err_1 });
                    return [3 /*break*/, 9];
                case 9: return [2 /*return*/];
            }
        });
    });
}
exports.crearUsuario = crearUsuario;
/**
 * *Genera la contraseña con bcrypt
 * @param textPlano contraseña plana
 * @param salt saltos para generar la clave
 */
function generarContraseña(textPlano, salt) {
    return __awaiter(this, void 0, Promise, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, bcrypt.hashSync(textPlano, salt)];
        });
    });
}
exports["default"] = generarContraseña;
/**
 * *Obtiene el usuario logeado
 * @param req
 * @param res
 */
function getUserLog(req, res) {
    var _a;
    return __awaiter(this, void 0, Promise, function () {
        var error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!(((_a = req === null || req === void 0 ? void 0 : req.userId) === null || _a === void 0 ? void 0 : _a.id) != null)) return [3 /*break*/, 5];
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, typeorm_1.getRepository(user_1.user)
                            .find({ where: { id: req.userId.id } })
                            .then(function (result) {
                            res.json({ status: "Ok", user: result[0] });
                        })["catch"](function (err) {
                            console.error(err);
                        })];
                case 2:
                    _b.sent();
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _b.sent();
                    console.error(error_1);
                    res.status(400).json({
                        error: error_1
                    });
                    return [3 /*break*/, 4];
                case 4: return [3 /*break*/, 6];
                case 5:
                    res.json({
                        status: "Ok",
                        user: null
                    });
                    _b.label = 6;
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.getUserLog = getUserLog;
/**
 *
 * @param req
 * @param res
 */
function getUsersToAdd(req, res) {
    return __awaiter(this, void 0, Promise, function () {
        var id, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    id = req.params.id;
                    return [4 /*yield*/, typeorm_1.createQueryBuilder('user')
                            .where('id != :id', { id: id })
                            .getMany()
                            .then(function (result) {
                            res.json({
                                status: "Ok",
                                users: result
                            });
                        })];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    res.status(400).json({
                        status: "Fail",
                        error: error_2
                    });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getUsersToAdd = getUsersToAdd;
function getNombreUsuario(id) {
    return __awaiter(this, void 0, Promise, function () {
        var userName, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, typeorm_1.getRepository(user_1.user)
                            .createQueryBuilder("user")
                            .select("user.usuario")
                            .where("user.id = :id", { id: id })
                            .getMany()];
                case 1:
                    userName = _a.sent();
                    return [2 /*return*/, userName[0].usuario];
                case 2:
                    err_2 = _a.sent();
                    console.log(err_2);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getNombreUsuario = getNombreUsuario;
