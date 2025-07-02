import { Controller, Get, UseGuards } from '@nestjs/common';
import { MoonPhaseService } from './moon-phase.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('moon-phase')
export class MoonPhaseController {
  constructor(private readonly moonPhaseService: MoonPhaseService) {}

  //@UseGuards(AuthGuard('jwt'))
  @Get()
  getMoonPhase() {
    return this.moonPhaseService.getMoonPhase();
  }
}
