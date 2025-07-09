import { Body, Controller, Get, Post } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { CreateWeatherDto } from 'src/weather/dto/Create-weather.dto';
import { Cron } from '@nestjs/schedule';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Post()
  debugCreateWeather(@Body() dto: CreateWeatherDto) {
    return this.weatherService.debugCreateWeather(dto);
  }
}
