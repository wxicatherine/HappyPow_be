
import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { WalkRequestService } from './walk_request.service';

@Controller('walk_request')
export class WalkRequestController {
  constructor(private readonly walk_requestServiceService: WalkRequestService) {}

  @Get()
  findAll() {
    return this.walk_requestServiceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.walk_requestServiceService.findOne(id);
  }

  @Post()
  create(@Body() data: any) {
    return this.walk_requestServiceService.create(data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.walk_requestServiceService.remove(id);
  }
}
