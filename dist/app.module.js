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
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const typeorm_2 = require("typeorm");
const students_module_1 = require("./students/students.module");
const groups_module_1 = require("./groups/groups.module");
const payments_module_1 = require("./payments/payments.module");
const attendance_module_1 = require("./attendance/attendance.module");
const users_module_1 = require("./users/users.module");
const auth_module_1 = require("./auth/auth.module");
const crm_module_1 = require("./crm/crm.module");
const invoices_module_1 = require("./invoices/invoices.module");
const dashboard_module_1 = require("./dashboard/dashboard.module");
const notifications_module_1 = require("./notifications/notifications.module");
let AppModule = class AppModule {
    constructor(dataSource) {
        this.dataSource = dataSource;
    }
    async onApplicationBootstrap() {
        try {
            if (!this.dataSource.isInitialized) {
                await this.dataSource.initialize();
            }
            console.log("✅ Databasega muvaffaqiyatli ulandi!");
        }
        catch (error) {
            console.error("❌ Databasega ulanib bo‘lmadi!", error);
        }
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            students_module_1.StudentsModule,
            groups_module_1.GroupsModule,
            payments_module_1.PaymentsModule,
            attendance_module_1.AttendanceModule,
            invoices_module_1.InvoicesModule,
            dashboard_module_1.DashboardModule,
            notifications_module_1.NotificationsModule,
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [
                    students_module_1.StudentsModule,
                    groups_module_1.GroupsModule,
                    payments_module_1.PaymentsModule,
                    attendance_module_1.AttendanceModule,
                    config_1.ConfigModule,
                ],
                inject: [config_1.ConfigService],
                useFactory: (config) => ({
                    type: "postgres",
                    host: config.get("POSTGRES_HOST") || "localhost",
                    port: +(config.get('POSTGRES_PORT') ?? 5432),
                    username: config.get("POSTGRES_USER") || "postgres",
                    password: config.get("POSTGRES_PASSWORD") || "123456",
                    database: config.get("POSTGRES_DB") || "crm",
                    entities: [__dirname + "/**/*.entity{.ts,.js}"],
                    synchronize: true,
                }),
            }),
            users_module_1.UsersModule,
            auth_module_1.AuthModule,
            crm_module_1.CrmModule,
        ],
    }),
    __metadata("design:paramtypes", [typeorm_2.DataSource])
], AppModule);
