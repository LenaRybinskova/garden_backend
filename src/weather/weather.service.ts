import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateWeatherDto } from 'src/weather/dto/Create-weather.dto';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class WeatherService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly prismaService: PrismaService,
  ) {}

  async getWeather() {
    const today = new Date();
    const dateStr = today.toISOString().split('T')[0]; //2025-07-07
    const location = 'Moscow';

    const params = {
      key: this.configService.get<string>('API_KEY_WEATHER'),
      q: location,
    };

    const response = await lastValueFrom(
      this.httpService.get('https://api.weatherapi.com/v1/current.json', {
        params,
      }),
    );

    const temperature = response.data.current.temp_c; //33.1

    //если в сущн Погода есть уже dateTime, значит в Дей добавляем данные, а если нету, то создаем объект сущности и кладем в Найт
    const existing = await this.prismaService.weather.findFirst({
      where: { dateTime: dateStr },
    });
    if (!existing) {
      return this.prismaService.weather.create({
        data: {
          dateTime: dateStr,
          AM3: temperature.toString(),
          PM3: '',
        },
      });
    } else {
      return this.prismaService.weather.update({
        where: { id: existing.id },
        data: { PM3: temperature.toString() },
      });
    }
  }

  getTemperature() {
    return this.getWeather();
  }

  @Cron('0 3 * * *', { timeZone: 'Europe/Moscow' }) // 3:00 ночи
  async handle3AM() {
    console.log('=== Запуск в 03:00 ===');
    await this.getTemperature();
  }

  @Cron('0 12 * * *', { timeZone: 'Europe/Moscow' }) // 15:00 дня
  async handle3PM() {
    console.log('=== Запуск в 15:00 ===');
    await this.getTemperature();
  }

  async debugCreateWeather(dto: CreateWeatherDto) {
    return this.prismaService.weather.create({
      data: {
        dateTime: dto.dateTime,
        AM3: dto.AM3 ?? ' ',
        PM3: dto.PM3 ?? ' ',
      },
    });
  }
}
