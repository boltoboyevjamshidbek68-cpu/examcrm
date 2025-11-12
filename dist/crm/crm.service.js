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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrmService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const client_entity_1 = require("./entities/client.entity");
const deal_entity_1 = require("./entities/deal.entity");
const users_service_1 = require("../users/users.service");
let CrmService = class CrmService {
    constructor(clientRepo, dealRepo, usersService) {
        this.clientRepo = clientRepo;
        this.dealRepo = dealRepo;
        this.usersService = usersService;
    }
    async createClient(dto, ownerId) {
        const client = this.clientRepo.create(dto);
        if (ownerId) {
            const owner = await this.usersService.findById(ownerId);
            if (!owner)
                throw new common_1.NotFoundException('Owner not found');
            client.owner = owner;
        }
        return this.clientRepo.save(client);
    }
    async listClients() {
        return this.clientRepo.find({ relations: ['owner'] });
    }
    async getClient(id) {
        const client = await this.clientRepo.findOne({ where: { id }, relations: ['owner'] });
        if (!client)
            throw new common_1.NotFoundException('Client not found');
        return client;
    }
    async createDeal(dto, ownerId) {
        const client = await this.clientRepo.findOne({ where: { id: dto.clientId } });
        if (!client)
            throw new common_1.NotFoundException('Client not found');
        const deal = this.dealRepo.create({ title: dto.title, client, value: dto.value });
        if (dto.value)
            deal.value = dto.value;
        if (ownerId) {
            const owner = await this.usersService.findById(ownerId);
            if (!owner)
                throw new common_1.NotFoundException('Owner not found');
            deal.owner = owner;
        }
        return this.dealRepo.save(deal);
    }
    async listDeals() {
        return this.dealRepo.find({ relations: ['client', 'owner'] });
    }
};
exports.CrmService = CrmService;
exports.CrmService = CrmService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(client_entity_1.Client)),
    __param(1, (0, typeorm_1.InjectRepository)(deal_entity_1.Deal)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        users_service_1.UsersService])
], CrmService);
