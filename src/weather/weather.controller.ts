import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { CreateWeatherDto } from 'src/weather/dto/Create-weather.dto';
import { UpdateWeatherDto } from 'src/weather/dto/Update-weather.dto';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {
  }

  @Post()
  debugCreateWeather(@Body() dto: CreateWeatherDto) {
    return this.weatherService.debugCreateWeather(dto);
  }

  @Put()
  update(@Body() dto: UpdateWeatherDto) {
    return this.weatherService.updateWeather(dto);
  }

  //технический метод
  @Get()
  getWeather(){
    return this.weatherService.getWeather();
  }
}
