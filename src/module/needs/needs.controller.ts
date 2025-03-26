
import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { NeedsService } from './needs.service';
import { Needs } from 'src/common/interfaces/user.interface';
@Controller('needs')
export class NeedsController {
  constructor(private readonly needsService: NeedsService) {}  

  @Get()
  findAll() {
    return this.needsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.needsService.findOne(id);
  }

  @Post()
  create(@Body() data: Needs) {
    return this.needsService.create(data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.needsService.remove(id);
  }
}
