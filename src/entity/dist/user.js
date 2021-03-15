"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.user = void 0;
var typeorm_1 = require("typeorm");
var bcrypt = require("bcrypt");
var todo_1 = require("./todo");
var friend_1 = require("./friend");
var notificacion_1 = require("./notificacion");
// *Tabla/entidad de usuario
var user = /** @class */ (function () {
    function user() {
    }
    // Funciones
    /**
     *
     * @param textPlano contraseña
     */
    user.prototype.compararContraseña = function (textPlano) {
        return bcrypt.compareSync(textPlano, this.password);
    };
    __decorate([
        typeorm_1.PrimaryGeneratedColumn()
    ], user.prototype, "id");
    __decorate([
        typeorm_1.Column()
    ], user.prototype, "nombre");
    __decorate([
        typeorm_1.Column()
    ], user.prototype, "apellido");
    __decorate([
        typeorm_1.Column()
    ], user.prototype, "usuario");
    __decorate([
        typeorm_1.Column()
    ], user.prototype, "email");
    __decorate([
        typeorm_1.Column()
    ], user.prototype, "password");
    __decorate([
        typeorm_1.Column(),
        typeorm_1.CreateDateColumn()
    ], user.prototype, "createdAt");
    __decorate([
        typeorm_1.Column(),
        typeorm_1.UpdateDateColumn()
    ], user.prototype, "updatedAt");
    __decorate([
        typeorm_1.OneToMany(function () { return todo_1.todo; }, function (todo) { return todo.user; })
    ], user.prototype, "todo");
    __decorate([
        typeorm_1.OneToMany(function () { return friend_1.friend; }, function (friend) { return friend.user_id; })
    ], user.prototype, "friend");
    __decorate([
        typeorm_1.OneToMany(function () { return friend_1.friend; }, function (myFriend) { return myFriend.friend_id; })
    ], user.prototype, "myFriend");
    __decorate([
        typeorm_1.OneToMany(function () { return notificacion_1.notificacion; }, function (notificacion_id) { return notificacion_id.user_id; })
    ], user.prototype, "notificacion");
    user = __decorate([
        typeorm_1.Entity("user"),
        typeorm_1.Unique(["usuario", "email"])
    ], user);
    return user;
}());
exports.user = user;
