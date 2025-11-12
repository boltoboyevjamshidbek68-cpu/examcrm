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
exports.DashboardService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
let DashboardService = class DashboardService {
    constructor(dataSource) {
        this.dataSource = dataSource;
    }
    async getStats() {
        const totalStudents = await this.dataSource.getRepository('student').count().catch(() => 0);
        const totalPayments = await this.dataSource.getRepository('payment').count().catch(() => 0);
        const sumPayments = await this.dataSource.query("SELECT COALESCE(SUM(amount),0) as total FROM payment").catch(() => [{ total: 0 }]);
        const totalInvoices = await this.dataSource.getRepository('invoice').count().catch(() => 0);
        return {
            totalStudents,
            totalPayments,
            sumPayments: sumPayments[0]?.total || 0,
            totalInvoices,
        };
    }
};
exports.DashboardService = DashboardService;
exports.DashboardService = DashboardService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], DashboardService);
