import { Controller, Get, Post, Body, Param, Patch, Delete, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { AnimalsService } from './animals.service';
import { Animals } from 'src/common/interfaces/user.interface';

@Controller('animals')
export class AnimalsController {
  constructor(private readonly animalsService: AnimalsService) {}

  // Отримати всіх тварин
  @Get()
  async findAll() {
    try {
      return await this.animalsService.findAll();
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error fetching animals:', error.message);
        throw new InternalServerErrorException('Failed to fetch animals');
      }
      throw new InternalServerErrorException('An unknown error occurred');
    }
  }

  // Отримати одну тварину за ID
  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const animal = await this.animalsService.findOne(id);
      if (!animal) {
        throw new NotFoundException(`Animal with ID ${id} not found`);
      }
      return animal;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(`Error fetching animal with ID ${id}:`, error.message);
        throw new InternalServerErrorException('Failed to fetch animal');
      }
      throw new InternalServerErrorException('An unknown error occurred');
    }
  }

  // Додати нову тварину
  @Post()
  async create(@Body() animalDto: Animals) {
    try {
      return await this.animalsService.create(animalDto);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error creating animal:', error.message);
        throw new InternalServerErrorException('Failed to create animal');
      }
      throw new InternalServerErrorException('An unknown error occurred');
    }
  }

  // Оновити інформацію про тварину
  @Patch(':id')
  async update(@Param('id') id: string, @Body() animalDto: Partial<Animals>) {
    try {
      return await this.animalsService.update(id, animalDto);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(`Error updating animal with ID ${id}:`, error.message);
        throw new InternalServerErrorException('Failed to update animal');
      }
      throw new InternalServerErrorException('An unknown error occurred');
    }
  }

  // Видалити тварину
  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
      return await this.animalsService.delete(id);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(`Error deleting animal with ID ${id}:`, error.message);
        throw new InternalServerErrorException('Failed to delete animal');
      }
      throw new InternalServerErrorException('An unknown error occurred');
    }
  }
}
