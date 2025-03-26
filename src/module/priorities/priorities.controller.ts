
import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { PrioritiesService } from './priorities.service';
import { Priorities } from 'src/common/interfaces/user.interface';
@Controller('priorities')
export class PrioritiesController {
  constructor(private readonly prioritiesServiceService: PrioritiesService) {}

  @Get()
  findAll() {
    return this.prioritiesServiceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.prioritiesServiceService.findOne(id);
  }

  @Post()
  create(@Body() data: Priorities) {
    return this.prioritiesServiceService.create(data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.prioritiesServiceService.remove(id);
  }
}
