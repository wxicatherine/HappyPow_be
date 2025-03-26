
import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { Reviews } from 'src/common/interfaces/user.interface';
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsServiceService: ReviewsService) {}

  @Get()
  findAll() {
    return this.reviewsServiceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reviewsServiceService.findOne(id);
  }

  @Post()
  create(@Body() data: Reviews) {
    return this.reviewsServiceService.create(data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reviewsServiceService.remove(id);
  }
}
