
import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { UserSessionsService } from './user_sessions.service';
import { UserSessions } from 'src/common/interfaces/user.interface';
@Controller('user_sessions')
export class UserSessionsController {
  constructor(private readonly user_sessionsServiceService: UserSessionsService) {}

  @Get()
  findAll() {
    return this.user_sessionsServiceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.user_sessionsServiceService.findOne(id);
  }

  @Post()
  create(@Body() data: UserSessions) {
    return this.user_sessionsServiceService.create(data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.user_sessionsServiceService.remove(id);
  }
}
