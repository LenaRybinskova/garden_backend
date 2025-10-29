import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { MoonPhase } from 'src/moon-phase/types/moon-phase-types';
import { AstronomyApiResponse } from 'src/moon-phase/interface/AstronomyApiResponse';

@Injectable()
export class MoonPhaseService {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  //этот метод должен со старта приложения с фронта запрашиваться и там сохр в локалСТор и потом для созд Ивента использоваться
  // TODO делать потом чтобы с фронтенда приходил город
  async getMoonPhase() {
    try {
      const currentTime = new Date().toISOString().slice(0, 10);
      const params = {
        q: 'Moscow',
        dt: currentTime,
        key: this.configService.getOrThrow<string>('API_KEY_WEATHE'),
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
      const response = {
        city: 'Moscow',
        moon_Phase: phase,
      };
      return response;
    } catch (error) {
      console.log('error Service', error);
      return {
        city: 'Moscow',
        moon_Phase: 'n/a',
      };
    }
  }
}
