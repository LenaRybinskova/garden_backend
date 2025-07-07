import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { SeasonService } from './season.service';
import { CreateSeasonDto } from './dto/create-season.dto';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { User } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';

@Controller('season')
export class SeasonController {
  constructor(private readonly seasonService: SeasonService) {}


  @UseGuards(AuthGuard)
  @Get()
  async findByUserId(@GetUser() user: User) {
    return this.seasonService.findByUserId(user.id);
  }

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() dto: CreateSeasonDto, @GetUser() user: User) {
    return this.seasonService.create(dto, user);
  }
}
