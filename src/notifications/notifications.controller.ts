
import { Controller, Post, Body } from '@nestjs/common';
import { TelegramService } from './telegram.service';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly telegramService: TelegramService) {}

  @Post('telegram')
  sendTelegram(@Body() body: { chatId: number | string; text: string }) {
    const { chatId, text } = body;
    return this.telegramService.sendMessage(chatId, text);
  }
}
