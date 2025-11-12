import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
let TelegramBot: any = null;
try {
  TelegramBot = require('node-telegram-bot-api');
} catch (e) {}

@Injectable()
export class TelegramService implements OnModuleInit {
  private bot: any;
  private readonly logger = new Logger(TelegramService.name);
  private adminId: string = '';

  constructor(private config: ConfigService) {}

  onModuleInit() {
    const token = this.config.get<string>('TELEGRAM_BOT_TOKEN');
    if (!token) {
      this.logger.warn('⚠️ TELEGRAM_BOT_TOKEN not set in .env — Telegram bot will not start.');
      return;
    }
    if (!TelegramBot) {
      this.logger.warn('⚠️ node-telegram-bot-api not installed. Run: npm install node-telegram-bot-api');
      return;
    }

    const polling = this.config.get<string>('TELEGRAM_POLLING') !== 'false';
    this.bot = new TelegramBot(token, { polling });
    this.adminId = this.config.get<string>('TELEGRAM_ADMIN_ID') ?? '';

    this.bot.onText(/\/start/, (msg: any) => {
      const chatId = msg.chat.id;
      this.bot.sendMessage(
        chatId,
        '🤖 Salom! CRM botga xush kelibsiz.\nIltimos, murojaatingizni yozib qoldiring.'
      );
    });

    this.bot.on('message', async (msg: any) => {
      const chatId = msg.chat.id;
      const text = msg.text;

      if (text && !text.startsWith('/')) {
        try {
          
          if (this.adminId) {
            await this.bot.sendMessage(
              this.adminId,
              `📩 <b>Yangi murojaat:</b>\n👤 @${msg.from?.username || 'Nomaʼlum'}\n🆔 ${chatId}\n💬 ${text}`,
              { parse_mode: 'HTML' }
            );
            this.logger.log(`📨 Admin (${this.adminId}) ga murojaat yuborildi.`);
          } else {
            this.logger.warn('⚠️ TELEGRAM_ADMIN_ID topilmadi. Admin ga yuborilmadi.');
          }

          await this.bot.sendMessage(
            chatId,
            '✅ Habaringiz adminga yetkazildi.\nIltimos, javobini kuting.'
          );
        } catch (error) {
          this.logger.error('❌ Admin ga yuborishda xato:', error);
          await this.bot.sendMessage(chatId, '⚠️ Xatolik yuz berdi, iltimos keyinroq urinib ko‘ring.');
        }
      }
    });

    this.logger.log('✅ Telegram bot muvaffaqiyatli ishga tushdi.');
  }

  sendMessage(chatId: number | string, text: string) {
    if (!this.bot) {
      this.logger.warn('⚠️ Bot hali ishga tushmagan.');
      return null;
    }
    return this.bot.sendMessage(chatId, text);
  }
}
