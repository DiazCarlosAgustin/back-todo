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
exports.login = exports.isLog = void 0;
var user_1 = require("../entity/user");
var jwt = require("jsonwebtoken");
var typeorm_1 = require("typeorm");
var jwtConfig_1 = require("../config/jwtConfig");
/**
 *
 * @param req
 * @param res
 * @param next
 */
function isLog(req, res, next) {
    return __awaiter(this, void 0, Promise, function () {
        var token, payload;
        return __generator(this, function (_a) {
            if (!req.headers['usertoken']) {
                res.json({ error: "Token no valido" });
            }
            else {
                token = req.headers["usertoken"];
                payload = null;
                try {
                    payload = jwt.decode(token);
                }
                catch (error) {
                    res.json({ error: error });
                }
                req.userId = payload;
            }
            next();
            return [2 /*return*/];
        });
    });
}
exports.isLog = isLog;
/**
 *
 * @param req
 * @param res
 */
function login(req, res) {
    return __awaiter(this, void 0, Promise, function () {
        var _a, usuario, password, userToLog, token, err_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, req.body];
                case 1:
                    _a = _b.sent(), usuario = _a.usuario, password = _a.password;
                    if (!(usuario && password)) {
                        res.status(400).json({ status: "Fail", msg: "El Usuario y la Contraseña no son validos." });
                    }
                    return [4 /*yield*/, typeorm_1.getRepository(user_1.user)
                            .findOneOrFail({
                            where: {
                                usuario: usuario
                            }
                        })];
                case 2:
                    userToLog = _b.sent();
                    if (!!userToLog) return [3 /*break*/, 3];
                    res.status(400).json({ error: "El usuario ingresado no es correcto." });
                    return [3 /*break*/, 7];
                case 3:
                    if (!!userToLog.compararContraseña(password)) return [3 /*break*/, 4];
                    res.json({ error: "La contraseña ingresada no es correcta." });
                    return [3 /*break*/, 7];
                case 4:
                    _b.trys.push([4, 6, , 7]);
                    return [4 /*yield*/, jwt.sign({
                            id: userToLog.id,
                            nombre: userToLog.nombre,
                            email: userToLog.email,
                            usuario: userToLog.usuario
                        }, jwtConfig_1["default"].Secret)];
                case 5:
                    token = _b.sent();
                    res.json({
                        token: token,
                        status: "Ok",
                        msg: "Se ingreso correctamente",
                        user: userToLog
                    });
                    return [3 /*break*/, 7];
                case 6:
                    err_1 = _b.sent();
                    console.error(err_1);
                    res.status(404).json({ error: err_1 });
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    });
}
exports.login = login;
