"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Deal = exports.DealStage = void 0;
const typeorm_1 = require("typeorm");
const client_entity_1 = require("./client.entity");
const user_entity_1 = require("../../users/entities/user.entity");
var DealStage;
(function (DealStage) {
    DealStage["NEW"] = "New";
    DealStage["CONTACTED"] = "Contacted";
    DealStage["PROPOSAL"] = "Proposal";
    DealStage["WON"] = "Won";
    DealStage["LOST"] = "Lost";
})(DealStage || (exports.DealStage = DealStage = {}));
let Deal = class Deal {
};
exports.Deal = Deal;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Deal.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Deal.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => client_entity_1.Client),
    __metadata("design:type", Object)
], Deal.prototype, "client", void 0);
__decorate([
    (0, typeorm_1.Column)("decimal", { nullable: true }),
    __metadata("design:type", Object)
], Deal.prototype, "value", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: DealStage, default: DealStage.NEW }),
    __metadata("design:type", Object)
], Deal.prototype, "stage", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { nullable: true }),
    __metadata("design:type", Object)
], Deal.prototype, "owner", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: "timestamptz" }),
    __metadata("design:type", Object)
], Deal.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: "timestamptz" }),
    __metadata("design:type", Object)
], Deal.prototype, "updatedAt", void 0);
exports.Deal = Deal = __decorate([
    (0, typeorm_1.Entity)("deals")
], Deal);
