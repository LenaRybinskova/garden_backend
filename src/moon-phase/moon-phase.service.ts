import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { MoonPhase } from 'src/moon-phase/types/moon-phase-types';
import { AstronomyApiResponse } from 'src/moon-phase/interface/AstronomyApiResponse';
import { AxiosResponse } from 'axios';

@Injectable()
export class MoonPhaseService {
  private readonly moonPhaseIcons: Record<string, string> = {
    'New Moon': '/assets/moon/new-moon.svg',
    'Waxing Crescent': '/assets/moon/waxing-crescent.svg',
    'First Quarter': '/assets/moon/first-quarter.svg',
    'Waxing Gibbous': '/assets/moon/waxing-gibbous.svg',
    'Full Moon': '/assets/moon/full-moon.svg',
    'Waning Gibbous': '/assets/moon/waning-gibbous.svg',
    'Last Quarter': '/assets/moon/last-quarter.svg',
    'Waning Crescent': '/assets/moon/waning-crescent.svg',
  };

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  //этот метод должен со старта приложения с фронта запрашиваться и там сохр в локалСТор и потом для созд Ивента использоваться
  // TODO делать потом чтобы с фронтенда приходил город
  async getMoonPhase() {
    const currentTime = new Date().toISOString().slice(0, 10);
    const params = {
      q: 'Moscow',
      dt: currentTime,
      key: this.configService.getOrThrow<string>('API_KEY_WEATHER'),
    };

    const moonPhase = await lastValueFrom(
      this.httpService.get<AstronomyApiResponse>(
        'https://api.weatherapi.com/v1/astronomy.json',
        {
          params,
        },
      ),
    );

    const phase: MoonPhase = moonPhase.data.astronomy.astro.moon_phase;
    // TODO тут домен надо добавить, чтобы на фронтенд передавать полную ссылку
    const response = {
      city: 'Moscow',
      moon_Phase: phase,
      icon: this.moonPhaseIcons[phase] ?? '',
    };
    return response;
  }
}
