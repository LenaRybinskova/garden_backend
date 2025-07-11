import { Body, Controller, Post, Put, UseGuards } from '@nestjs/common';
import { SortService } from './sort.service';
import { CreateSortDTO } from 'src/sort/dto/create-sort.dto';
import { AuthGuard } from '@nestjs/passport';
import { UpdateSotrDto } from 'src/sort/dto/update-sort.dto';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { User } from '@prisma/client';

@Controller('sort')
export class SortController {
  constructor(private readonly sortService: SortService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() dto: CreateSortDTO) {
    return this.sortService.create(dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put()
  update(@Body() dto: UpdateSotrDto) {
    return this.sortService.update(dto);
  }
}
