import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Attendance } from './entities/attendance.entity';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectRepository(Attendance)
    private repo: Repository<Attendance>,
  ) {}

  create(dto: any) {
    const s = this.repo.create(dto);
    return this.repo.save(s);
  }

  findAll() {
    return this.repo.find();
  }

  findByStudent(studentId: number) {
    return this.repo.find({ where: { studentId } as any });
  }
}
