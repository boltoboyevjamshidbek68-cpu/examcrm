//
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";
import { CreateUserDto } from "./dto/create-user.dto";
import * as bcrypt from "bcryptjs";

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private usersRepo: Repository<User>) {}

  async create(dto: CreateUserDto) {
    if (!dto.password) {
      throw new Error("Password is required");
    }
    const hashed = await bcrypt.hash(dto.password, 10);
    const u = this.usersRepo.create({ ...dto, password: hashed });
    return this.usersRepo.save(u);
  }

  findByEmail(email: string) {
    return this.usersRepo.findOne({ where: { email } });
  }

  findById(id: string) {
    return this.usersRepo.findOne({ where: { id } });
  }

  async setRefreshToken(userId: string, token: string) {
    const user = await this.findById(userId);
    if (!user) throw new NotFoundException("User not found");
    user.refreshToken = token;
    await this.usersRepo.save(user);
  }

  async removeRefreshToken(userId: string) {
    const user = await this.findById(userId);
    if (!user) throw new NotFoundException("User not found");
    user.refreshToken = null;
    await this.usersRepo.save(user);
  }

  async list() {
    return this.usersRepo.find();
  }

  async remove(id: string) {
    const res = await this.usersRepo.delete(id);
    if (res.affected === 0) throw new NotFoundException("User not found");
    return { success: true };
  }
}
