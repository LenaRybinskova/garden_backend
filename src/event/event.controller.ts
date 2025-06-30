import { Body, Param, Controller, Post, Get, UseGuards } from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDTO } from 'src/plants/dto/CreateEvent.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {
  }

  @Get()
  findAll(){
    return this.eventService.findAll();
  }

  @Get(':plantId')
  findById(@Param('plantId') plantId: string){
    return this.eventService.findById(plantId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post(':plantId')
  create(@Body() dto: CreateEventDTO, @Param('plantId') plantId: string) {
    return this.eventService.create({ ...dto, plantId });
  }



}
