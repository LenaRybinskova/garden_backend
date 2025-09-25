import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateWeatherDto } from 'src/weather/dto/Create-weather.dto';
import { Cron } from '@nestjs/schedule';
import { UpdateWeatherDto } from 'src/weather/dto/Update-weather.dto';

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

    const existing = await this.prismaService.weather.findFirst({
      where: { dateTime: dateStr },
    });

    try {
      const params = {
        key: this.configService.get<string>('API_KEY_WEATHER'),
        q: location,
      };

      const response = await lastValueFrom(
        this.httpService.get('https://api.weatherapi.com/v1/current.json', {
          params,
        }),
      );

      console.log('response Weather', response);
      const temperature = response.data.current.temp_c; //33.1

      //если в сущн Погода есть уже dateTime, значит в Дей добавляем данные, а если нету, то создаем объект сущности и кладем в Найт
      // TODO проблема такой логики в том, что если я создаю Плант ( прицепом создаю эвент с погодой), то погода запишется текущая в AM3. тк предполагается что  PM3 уже ночью заполнился Кроном.

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
    } catch (error) {
      console.log('В сервисе Погоды ошибка получения данных:', error);

      if (existing) {
        return this.prismaService.weather.update({
          where: { id: existing.id },
          data: { PM3: existing.PM3, AM3: existing.AM3 },
        });
      }

      return this.prismaService.weather.create({
        data: {
          dateTime: dateStr,
          AM3: 'N/A',
          PM3: 'N/A',
        },
      });
    }
  }

  @Cron('0 3 * * *', { timeZone: 'Europe/Moscow' }) // 3:00 ночи
  async handle3AM() {
    console.log('=== Запуск в 03:00 ===');
    await this.getWeather();
  }

  @Cron('0 15 * * *', { timeZone: 'Europe/Moscow' }) // 15:00 дня
  async handle3PM() {
    console.log('=== Запуск в 15:00 ===');
    await this.getWeather();
  }

  async updateWeather(dto: UpdateWeatherDto) {
    const dataToUpdate: Record<string, string> = {};

    if (dto.AM3 !== undefined) {
      dataToUpdate.AM3 = dto.AM3;
    }

    if (dto.PM3 !== undefined) {
      dataToUpdate.PM3 = dto.PM3;
    }

    if (dto.description !== undefined) {
      dataToUpdate.description = dto.description;
    }
    const date = await this.prismaService.weather.update({
      where: { dateTime: dto.dateTime },
      data: dataToUpdate,
    });

    return date;
  }

  //технический
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
