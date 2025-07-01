import {
  Body,
  Controller, Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { PlantsService } from './plants.service';
import { CreatePlantDto } from 'src/plants/dto/CreatePlantDto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { User } from '@prisma/client';
import { UpdatePlantDto } from 'src/plants/dto/UpdatePlnat.dto';

@Controller('plants')
export class PlantsController {
  constructor(private readonly plantsService: PlantsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() dto: CreatePlantDto, @GetUser() user: User) {
    return this.plantsService.create(dto, user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll() {
    return this.plantsService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.plantsService.findById(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.plantsService.delete(id);
  }
}
