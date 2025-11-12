import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from './entities/client.entity';
import { Deal } from './entities/deal.entity';
import { CreateClientDto } from './dto/create-client.dto';
import { CreateDealDto } from './dto/create-deal.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class CrmService {
  constructor(
    @InjectRepository(Client) private clientRepo: Repository<Client>,
    @InjectRepository(Deal) private dealRepo: Repository<Deal>,
    private usersService: UsersService,
  ) {}

  async createClient(dto: CreateClientDto, ownerId?: string) {
    const client = this.clientRepo.create(dto as Partial<Client>);
    if (ownerId) {
      const owner = await this.usersService.findById(ownerId);
      if (!owner) throw new NotFoundException('Owner not found');
      client.owner = owner;
    }
    return this.clientRepo.save(client);
  }

  async listClients() {
    return this.clientRepo.find({ relations: ['owner'] });
  }

  async getClient(id: string) {
    const client = await this.clientRepo.findOne({ where: { id }, relations: ['owner'] });
    if (!client) throw new NotFoundException('Client not found');
    return client;
  }

  async createDeal(dto: CreateDealDto, ownerId?: string) {
    const client = await this.clientRepo.findOne({ where: { id: dto.clientId } });
    if (!client) throw new NotFoundException('Client not found');
    const deal = this.dealRepo.create({ title: dto.title, client, value: dto.value } as Partial<Deal>);
    if (dto.value) deal.value = dto.value;
    if (ownerId) {
      const owner = await this.usersService.findById(ownerId);
      if (!owner) throw new NotFoundException('Owner not found');
      deal.owner = owner;
    }
    return this.dealRepo.save(deal);
  }

  async listDeals() {
    return this.dealRepo.find({ relations: ['client', 'owner'] });
  }
}
