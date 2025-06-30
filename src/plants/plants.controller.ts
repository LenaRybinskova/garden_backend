import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { PlantsService } from './plants.service';
import { CreatePlantDto } from 'src/plants/dto/CreatePlantDto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { User } from '@prisma/client';

@Controller('plants')
export class PlantsController {
  constructor(private readonly plantsService: PlantsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() dto: CreatePlantDto, @GetUser() user: User) {
    return this.plantsService.create(dto, user);
  }
}
