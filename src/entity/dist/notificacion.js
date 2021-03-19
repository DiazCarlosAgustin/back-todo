"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.notificacion = void 0;
var typeorm_1 = require("typeorm");
var user_1 = require("./user");
var notificacion = /** @class */ (function () {
    function notificacion() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn()
    ], notificacion.prototype, "id");
    __decorate([
        typeorm_1.ManyToOne(function () { return user_1.user; }, function (user_id) { return user_id.id; }),
        typeorm_1.JoinColumn({ name: "user_id" })
    ], notificacion.prototype, "user_id");
    __decorate([
        typeorm_1.Column({ "default": null })
    ], notificacion.prototype, "sendBy");
    __decorate([
        typeorm_1.Column()
    ], notificacion.prototype, "type");
    __decorate([
        typeorm_1.Column()
    ], notificacion.prototype, "status");
    __decorate([
        typeorm_1.Column()
    ], notificacion.prototype, "mensaje");
    __decorate([
        typeorm_1.Column(),
        typeorm_1.CreateDateColumn()
    ], notificacion.prototype, "createdAt");
    __decorate([
        typeorm_1.Column(),
        typeorm_1.UpdateDateColumn()
    ], notificacion.prototype, "updatedAt");
    notificacion = __decorate([
        typeorm_1.Entity("notificacion")
    ], notificacion);
    return notificacion;
}());
exports.notificacion = notificacion;
