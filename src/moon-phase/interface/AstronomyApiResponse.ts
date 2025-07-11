import { MoonPhase } from 'src/moon-phase/types/moon-phase-types';

export interface AstronomyApiResponse {
  astronomy: {
    astro: {
      moon_phase: MoonPhase;
    };
  };
}
