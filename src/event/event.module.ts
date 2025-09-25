import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { WeatherModule } from 'src/weather/weather.module';

@Module({
  controllers: [EventController],
  providers: [EventService],
  exports: [EventService],
  imports: [WeatherModule],
})
export class EventModule {}
