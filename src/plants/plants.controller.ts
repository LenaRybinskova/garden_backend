import {
  Body,
  Controller,
  Delete,
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
import { UpdatePlantDto } from 'src/plants/dto/UpdatePlant.dto';

@Controller('plants')
export class PlantsController {
  constructor(private readonly plantsService: PlantsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() dto: CreatePlantDto, @GetUser() user: User) {
    return this.plantsService.create(dto, user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdatePlantDto,
    @GetUser() user: User,
  ) {
    return this.plantsService.update({ ...dto, plantId: id, user});
  }

// Публичный метод чтобы получить все Плант и Евенты
  @Get()
  findAll() {
    return this.plantsService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.plantsService.findByIdWithEvents(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.plantsService.delete(id);
  }
}
