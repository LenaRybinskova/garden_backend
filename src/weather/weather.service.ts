import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class WeatherService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async getWeather(hour: string) {
    const today = new Date();
    const dateStr = today.toISOString().split('T')[0]; //2025-07-07
    const location = 'Moscow';

    const params = {
      apiKey: this.configService.getOrThrow<string>('API_KEY_WEATHER'),
      city: location,
      date: dateStr,
    };

    const response = await lastValueFrom(
      this.httpService.get('https://api.weatherapi.com/v1/forecast.json', {
        params,
      }),
    );

    console.log('ПОГОДА:', response);
  }

  getTemperatureAt3AM() {}

  getTemperatureAt3PM() {}

  getTemperature() {
    return this.getWeather('10');
  }
}

