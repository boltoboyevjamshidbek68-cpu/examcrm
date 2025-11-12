import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private repo: Repository<Student>,
  ) {}

  create(dto: CreateStudentDto) {
    const s = this.repo.create(dto as any);
    return this.repo.save(s);
  }

  findAll() {
    return this.repo.find();
  }

  async findOne(id: number) {
    const item = await this.repo.findOneBy({ id } as any);
    if (!item) throw new NotFoundException('Student not found');
    return item;
  }

  async update(id: number, dto: UpdateStudentDto) {
    const student = await this.findOne(id);
    Object.assign(student, dto);
    return this.repo.save(student);
  }

  async remove(id: number) {
    const student = await this.findOne(id);
    return this.repo.remove(student);
  }
}
