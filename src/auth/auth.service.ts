import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async validateUser(email: string, pass: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) return null;
    const match = await bcrypt.compare(pass, user.password);
    if (match) {
      const { password, refreshToken, ...result } = user as any;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id, role: user.role };
    const accessToken = this.jwtService.sign(payload, { expiresIn: '15m' });
    const refreshToken = this.jwtService.sign({ sub: user.id }, { expiresIn: '7d' });
    // store refresh token hashed or raw - here we store raw for simplicity
    await this.usersService.setRefreshToken(user.id, refreshToken);
    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async refresh(refreshToken: string) {
    try {
      const decoded: any = this.jwtService.verify(refreshToken);
      const user = await this.usersService.findById(decoded.sub);
      if (!user) throw new UnauthorizedException('Invalid refresh token');
      if (user.refreshToken !== refreshToken) throw new UnauthorizedException('Invalid refresh token');
      const payload = { email: user.email, sub: user.id, role: user.role };
      const accessToken = this.jwtService.sign(payload, { expiresIn: '15m' });
      const newRefresh = this.jwtService.sign({ sub: user.id }, { expiresIn: '7d' });
      await this.usersService.setRefreshToken(user.id, newRefresh);
      return { access_token: accessToken, refresh_token: newRefresh };
    } catch (e) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async logout(userId: string) {
    await this.usersService.removeRefreshToken(userId);
    return { success: true };
  }
}
