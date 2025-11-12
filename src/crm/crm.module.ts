import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CrmService } from './crm.service';
import { CrmController } from './crm.controller';
import { Client } from './entities/client.entity';
import { Deal } from './entities/deal.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Client, Deal]), UsersModule],
  providers: [CrmService],
  controllers: [CrmController],
})
export class CrmModule {}
