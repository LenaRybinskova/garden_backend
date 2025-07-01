import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDTO } from 'src/plants/dto/CreateEvent.dto';
import { AuthGuard } from '@nestjs/passport';


@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll() {
    return this.eventService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.eventService.findById(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post(':plantId')
  create(@Body() dto: CreateEventDTO, @Param('plantId') plantId: string) {
    return this.eventService.create({ ...dto, plantId });
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  update(@Param('id') id: string, @Body() dto: CreateEventDTO) {
    return this.eventService.update(id, dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete()
  delete(@Body() id: string) {
    return this.eventService.delete(id);
  }
}
