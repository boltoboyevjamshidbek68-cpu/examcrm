import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Invoice } from './entities/invoice.entity';

@Injectable()
export class InvoicesService {
  constructor(
    @InjectRepository(Invoice)
    private repo: Repository<Invoice>,
  ) {}

  create(dto: Partial<Invoice>) {
    const ent = this.repo.create(dto);
    return this.repo.save(ent);
  }

  findAll() {
    return this.repo.find({ relations: ['student'] });
  }

  findOne(id: number) {
    return this.repo.findOne({ where: { id }, relations: ['student'] });
  }

  async update(id: number, dto: Partial<Invoice>) {
    const item = await this.repo.findOneBy({ id });
    if (!item) throw new NotFoundException('Invoice not found');
    Object.assign(item, dto);
    return this.repo.save(item);
  }

  async remove(id: number) {
    await this.repo.delete(id);
    return { deleted: true };
  }
}
