import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { SortService } from './sort.service';
import { CreateSortDTO } from 'src/sort/dto/create-sort.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('sort')
export class SortController {
  constructor(private readonly sortService: SortService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() dto: CreateSortDTO) {
    return this.sortService.create(dto);
  }
}
