
import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Categories } from 'src/common/interfaces/user.interface';
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesServiceService: CategoriesService) {}

  @Get()
  findAll() {
    return this.categoriesServiceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriesServiceService.findOne(id);
  }

  @Post()
  create(@Body() data:Categories) {
    return this.categoriesServiceService.create(data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriesServiceService.remove(id);
  }
}
