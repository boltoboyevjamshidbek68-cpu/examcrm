import { Controller, Post, Body, Get, UseGuards, Req, Param } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { CrmService } from './crm.service';
import { CreateClientDto } from './dto/create-client.dto';
import { CreateDealDto } from './dto/create-deal.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('CRM')
@ApiBearerAuth()
@Controller('crm')
export class CrmController {
  constructor(private crmService: CrmService) {}

  @UseGuards(JwtAuthGuard)
  @Post('clients')
  @ApiOperation({ summary: 'Create a new client' })
  createClient(@Body() dto: CreateClientDto, @Req() req: any) {
    const userId = req.user?.userId;
    return this.crmService.createClient(dto, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('clients')
  @ApiOperation({ summary: 'List clients' })
  listClients() {
    return this.crmService.listClients();
  }

  @UseGuards(JwtAuthGuard)
  @Get('clients/:id')
  getClient(@Param('id') id: string) {
    return this.crmService.getClient(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('deals')
  @ApiOperation({ summary: 'Create a new deal (linked to a client)' })
  createDeal(@Body() dto: CreateDealDto, @Req() req: any) {
    const userId = req.user?.userId;
    return this.crmService.createDeal(dto, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('deals')
  @ApiOperation({ summary: 'List deals' })
  listDeals() {
    return this.crmService.listDeals();
  }
}
