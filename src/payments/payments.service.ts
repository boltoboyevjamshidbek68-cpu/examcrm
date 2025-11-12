import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private repo: Repository<Payment>,
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
    if (!item) throw new NotFoundException('Payment not found');
    return item;
  }
}
