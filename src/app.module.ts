import { Module, OnApplicationBootstrap } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { DataSource } from "typeorm";

import { StudentsModule } from "./students/students.module";
import { GroupsModule } from "./groups/groups.module";
import { PaymentsModule } from "./payments/payments.module";
import { AttendanceModule } from "./attendance/attendance.module";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import { CrmModule } from "./crm/crm.module";

import { InvoicesModule } from "./invoices/invoices.module";
import { DashboardModule } from "./dashboard/dashboard.module";
import { NotificationsModule } from "./notifications/notifications.module";

@Module({
  imports: [
    StudentsModule,
    GroupsModule,
    PaymentsModule,
    AttendanceModule,

    InvoicesModule,
    DashboardModule,
    NotificationsModule,
    ConfigModule.forRoot({ isGlobal: true }),

    TypeOrmModule.forRootAsync({
      imports: [
        StudentsModule,
        GroupsModule,
        PaymentsModule,
        AttendanceModule,
        ConfigModule,
      ],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: "postgres",
        host: config.get<string>("POSTGRES_HOST") || "localhost",
       port: +(config.get<number>('POSTGRES_PORT') ?? 5432),
        username: config.get<string>("POSTGRES_USER") || "postgres",
        password: config.get<string>("POSTGRES_PASSWORD") || "123456",
        database: config.get<string>("POSTGRES_DB") || "crm",
        entities: [__dirname + "/**/*.entity{.ts,.js}"],
        synchronize: true,
      }),
    }),

    UsersModule,
    AuthModule,
    CrmModule,
  ],
})
export class AppModule implements OnApplicationBootstrap {
  constructor(private readonly dataSource: DataSource) {}

  async onApplicationBootstrap() {
    try {
      if (!this.dataSource.isInitialized) {
        await this.dataSource.initialize();
      }
      console.log("✅ Databasega muvaffaqiyatli ulandi!");
    } catch (error) {
      console.error("❌ Databasega ulanib bo‘lmadi!", error);
    }
  }
}
