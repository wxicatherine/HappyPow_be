
import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { VolunteerService } from './volunteer.service';
import { Volunteer } from 'src/common/interfaces/user.interface';
@Controller('user_sessions')
export class VolunteerController {
  constructor(private readonly user_sessionsServiceService: VolunteerService) {}

  @Get()
  findAll() {
    return this.user_sessionsServiceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.user_sessionsServiceService.findOne(id);
  }

  @Post()
  create(@Body() data: Volunteer) {
    return this.user_sessionsServiceService.create(data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.user_sessionsServiceService.remove(id);
  }
}
