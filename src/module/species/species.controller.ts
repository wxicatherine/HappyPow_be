
import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { SpeciesService } from './species.service';

import { Species } from 'src/common/interfaces/user.interface';
@Controller('species')
export class SpeciesController {
  constructor(private readonly speciesServiceService: SpeciesService) {}

  @Get()
  findAll() {
    return this.speciesServiceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.speciesServiceService.findOne(id);
  }

  @Post()
  create(@Body() data: Species) {
    return this.speciesServiceService.create(data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.speciesServiceService.remove(id);
  }
}
