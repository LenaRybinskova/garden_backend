import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { WeatherModule } from 'src/weather/weather.module';
import { PhotoModule } from 'src/photo/photo.module';

@Module({
  controllers: [EventController],
  providers: [EventService],
  exports: [EventService],
  imports: [WeatherModule, PhotoModule],
})
export class EventModule {}
