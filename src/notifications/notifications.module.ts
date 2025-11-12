import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TelegramService } from './telegram.service';
import { NotificationsController } from './notifications.controller';

@Module({
  imports: [ConfigModule],
  providers: [TelegramService],
  controllers: [NotificationsController],
  exports: [TelegramService],
})
export class NotificationsModule {}
