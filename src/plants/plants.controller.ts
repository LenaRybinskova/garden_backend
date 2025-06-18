import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { PlantsService } from './plants.service';

import { AuthGuard } from '@nestjs/passport';
import { CreatePlantDto } from 'src/plants/dto/CreatePlantDto';

@Controller('plants')
export class PlantsController {
  constructor(private readonly plantsService: PlantsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() dto: CreatePlantDto) {
    return this.plantsService.create(dto);
  }
}
