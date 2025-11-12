import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { GroupsService } from './groups.service';

@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Post()
  create(@Body() dto: any) {
    return this.groupsService.create(dto);
  }

  @Get()
  findAll() {
    return this.groupsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.groupsService.findOne(Number(id));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: any) {
    return this.groupsService.update(Number(id), dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.groupsService.remove(Number(id));
  }
}
