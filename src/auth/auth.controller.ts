import { Controller, Post, Body, UnauthorizedException, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';

class LoginDto {
  email!: string;
  password!: string;
}

class RefreshDto {
  refresh_token!: string;
}

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() dto: LoginDto) {
    const user = await this.authService.validateUser(dto.email, dto.password);
    if (!user) throw new UnauthorizedException('Invalid credentials');
    return this.authService.login(user);
  }

  @Post('refresh')
  async refresh(@Body() dto: RefreshDto) {
    return this.authService.refresh(dto.refresh_token);
  }

  @Post('logout')
  async logout(@Body() dto: { userId: string }) {
    return this.authService.logout(dto.userId);
  }
}
