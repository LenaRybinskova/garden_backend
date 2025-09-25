import { Controller, Get } from '@nestjs/common';
import { MoonPhaseService } from './moon-phase.service';

@Controller('moon-phase')
export class MoonPhaseController {
  constructor(private readonly moonPhaseService: MoonPhaseService) {}

  //@UseGuards(AuthGuard('jwt'))
  @Get()
  getMoonPhase() {
    return this.moonPhaseService.getMoonPhase();
  }
}

/*{
  "city": "Moscow",
  "moon_Phase": "Waxing Gibbous",
  "icon": "/assets/moon/waxing-gibbous.svg"
}*/
