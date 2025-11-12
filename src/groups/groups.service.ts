import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Group } from './entities/group.entity';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Group)
    private repo: Repository<Group>,
  ) {}

  create(dto: any) {
    const s = this.repo.create(dto);
    return this.repo.save(s);
  }

  findAll() {
    return this.repo.find();
  }

  async findOne(id: number) {
    const item = await this.repo.findOneBy({ id } as any);
    if (!item) throw new NotFoundException('Group not found');
    return item;
  }

  async update(id: number, dto: any) {
    const item = await this.findOne(id);
    Object.assign(item, dto);
    return this.repo.save(item);
  }

  async remove(id: number) {
    const item = await this.findOne(id);
    return this.repo.remove(item);
  }
}
