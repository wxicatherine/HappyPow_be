import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { AdoptionRequestsService } from './adoption_requests.service';
import { AdoptionRequests } from 'src/common/interfaces/user.interface';

@Controller('adoption-requests') // Указывает префикс маршрута
export class AdoptionRequestsController {
  constructor(private readonly adoptionRequestsService: AdoptionRequestsService) {}

  @Get() // Обрабатывает GET-запрос на /adoption-requests
  findAll() {
    return this.adoptionRequestsService.findAll();
  }

  @Get(':id') // Обрабатывает GET-запрос на /adoption-requests/:id
  findOne(@Param('id') id: string) {
    return this.adoptionRequestsService.findOne(id);
  }

  @Post() // Обрабатывает POST-запрос на /adoption-requests
  create(@Body() adoptionRequest: AdoptionRequests) {
    return this.adoptionRequestsService.create(adoptionRequest);
  }

  @Delete(':id') // Обрабатывает DELETE-запрос на /adoption-requests/:id
  remove(@Param('id') id: string) {
    return this.adoptionRequestsService.remove(id);
  }
}
