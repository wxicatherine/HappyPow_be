
import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { SheltersService } from './shelters.service';
import { Shelters} from 'src/common/interfaces/user.interface';
@Controller('shelter')
export class SheltersController {
  constructor(private readonly shelterService: SheltersService) {}  

  @Get()
  findAll() {
    return this.shelterService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shelterService.findOne(id);
  }

  @Post()
  create(@Body() data: Shelters) {
    return this.shelterService.create(data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shelterService.remove(id);
  }
}
