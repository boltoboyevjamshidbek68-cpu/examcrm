"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const crm_service_1 = require("../crm/crm.service");
const typeorm_1 = require("@nestjs/typeorm");
const client_entity_1 = require("../crm/entities/client.entity");
const deal_entity_1 = require("../crm/entities/deal.entity");
const users_service_1 = require("../users/users.service");
describe('CrmService', () => {
    let service;
    const mockClientRepo = {
        create: jest.fn().mockImplementation(dto => dto),
        save: jest.fn().mockImplementation(entity => Promise.resolve({ id: '1', ...entity })),
        find: jest.fn().mockResolvedValue([]),
        findOne: jest.fn().mockImplementation(({ where: { id } }) => Promise.resolve({ id })),
    };
    const mockDealRepo = {
        create: jest.fn().mockImplementation(dto => dto),
        save: jest.fn().mockImplementation(entity => Promise.resolve({ id: 'd1', ...entity })),
        find: jest.fn().mockResolvedValue([]),
    };
    const mockUsersService = {
        findById: jest.fn().mockResolvedValue({ id: 'u1', email: 'a@a.com' }),
    };
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [
                crm_service_1.CrmService,
                { provide: (0, typeorm_1.getRepositoryToken)(client_entity_1.Client), useValue: mockClientRepo },
                { provide: (0, typeorm_1.getRepositoryToken)(deal_entity_1.Deal), useValue: mockDealRepo },
                { provide: users_service_1.UsersService, useValue: mockUsersService },
            ],
        }).compile();
        service = module.get(crm_service_1.CrmService);
    });
    it('should create client', async () => {
        const res = await service.createClient({ name: 'John' });
        expect(res).toHaveProperty('name');
    });
    it('should create deal', async () => {
        const res = await service.createDeal({ title: 'T', clientId: '1' });
        expect(res).toHaveProperty('id');
    });
});
