import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { InvoicesService } from './invoices.service';

@Controller('invoices')
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  @Post()
  create(@Body() dto: any) {
    return this.invoicesService.create(dto);
  }

  @Get()
  findAll() {
    return this.invoicesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.invoicesService.findOne(Number(id));
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: any) {
    return this.invoicesService.update(Number(id), dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.invoicesService.remove(Number(id));
  }
}
