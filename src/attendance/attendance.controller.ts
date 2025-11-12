import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { AttendanceService } from './attendance.service';

@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post()
  create(@Body() dto: any) {
    return this.attendanceService.create(dto);
  }

  @Get()
  findAll() {
    return this.attendanceService.findAll();
  }

  @Get('student/:id')
  findByStudent(@Param('id') id: string) {
    return this.attendanceService.findByStudent(Number(id));
  }
}
