import { Controller, Get } from '@nestjs/common';
import { WeatherService } from './weather.service';

@Controller('weather')
export class WeatherController {
    constructor(private readonly weatherService: WeatherService) {}

  /*  @Cron('0 3 * * *', { timeZone: 'Europe/Moscow' })
    getTemperatureAt3AM() {
      return this.weatherService.getTemperatureAt3AM();
    }

    @Cron('0 15 * * *', { timeZone: 'Europe/Moscow' })
    getTemperatureAt3PM() {
      return this.weatherService.getTemperatureAt3PM();
    }*/

  @Get()
  getTemperature() {
    return this.weatherService.getTemperature();
  }
}
