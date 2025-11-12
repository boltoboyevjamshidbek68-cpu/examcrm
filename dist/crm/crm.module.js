"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrmModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const crm_service_1 = require("./crm.service");
const crm_controller_1 = require("./crm.controller");
const client_entity_1 = require("./entities/client.entity");
const deal_entity_1 = require("./entities/deal.entity");
const users_module_1 = require("../users/users.module");
let CrmModule = class CrmModule {
};
exports.CrmModule = CrmModule;
exports.CrmModule = CrmModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([client_entity_1.Client, deal_entity_1.Deal]), users_module_1.UsersModule],
        providers: [crm_service_1.CrmService],
        controllers: [crm_controller_1.CrmController],
    })
], CrmModule);
