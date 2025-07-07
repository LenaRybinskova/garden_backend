import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDTO } from 'src/event/dto/CreateEvent.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { User } from '@prisma/client';


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
  create(@Body() dto: CreateEventDTO, @Param('plantId') plantId: string, @GetUser() user: User) {
    return this.eventService.create({ ...dto, plantId, userId: user.id });
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
