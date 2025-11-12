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
var TelegramService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TelegramService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
let TelegramBot = null;
try {
    TelegramBot = require('node-telegram-bot-api');
}
catch (e) { }
let TelegramService = TelegramService_1 = class TelegramService {
    constructor(config) {
        this.config = config;
        this.logger = new common_1.Logger(TelegramService_1.name);
        this.adminId = '';
    }
    onModuleInit() {
        const token = this.config.get('TELEGRAM_BOT_TOKEN');
        if (!token) {
            this.logger.warn('⚠️ TELEGRAM_BOT_TOKEN not set in .env — Telegram bot will not start.');
            return;
        }
        if (!TelegramBot) {
            this.logger.warn('⚠️ node-telegram-bot-api not installed. Run: npm install node-telegram-bot-api');
            return;
        }
        const polling = this.config.get('TELEGRAM_POLLING') !== 'false';
        this.bot = new TelegramBot(token, { polling });
        this.adminId = this.config.get('TELEGRAM_ADMIN_ID') ?? '';
        this.bot.onText(/\/start/, (msg) => {
            const chatId = msg.chat.id;
            this.bot.sendMessage(chatId, '🤖 Salom! CRM botga xush kelibsiz.\nIltimos, murojaatingizni yozib qoldiring.');
        });
        this.bot.on('message', async (msg) => {
            const chatId = msg.chat.id;
            const text = msg.text;
            if (text && !text.startsWith('/')) {
                try {
                    if (this.adminId) {
                        await this.bot.sendMessage(this.adminId, `📩 <b>Yangi murojaat:</b>\n👤 @${msg.from?.username || 'Nomaʼlum'}\n🆔 ${chatId}\n💬 ${text}`, { parse_mode: 'HTML' });
                        this.logger.log(`📨 Admin (${this.adminId}) ga murojaat yuborildi.`);
                    }
                    else {
                        this.logger.warn('⚠️ TELEGRAM_ADMIN_ID topilmadi. Admin ga yuborilmadi.');
                    }
                    await this.bot.sendMessage(chatId, '✅ Habaringiz adminga yetkazildi.\nIltimos, javobini kuting.');
                }
                catch (error) {
                    this.logger.error('❌ Admin ga yuborishda xato:', error);
                    await this.bot.sendMessage(chatId, '⚠️ Xatolik yuz berdi, iltimos keyinroq urinib ko‘ring.');
                }
            }
        });
        this.logger.log('✅ Telegram bot muvaffaqiyatli ishga tushdi.');
    }
    sendMessage(chatId, text) {
        if (!this.bot) {
            this.logger.warn('⚠️ Bot hali ishga tushmagan.');
            return null;
        }
        return this.bot.sendMessage(chatId, text);
    }
};
exports.TelegramService = TelegramService;
exports.TelegramService = TelegramService = TelegramService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], TelegramService);
