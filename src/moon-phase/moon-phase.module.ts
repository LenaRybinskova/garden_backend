import { Module } from '@nestjs/common';
import { MoonPhaseService } from './moon-phase.service';
import { MoonPhaseController } from './moon-phase.controller';
import { HttpModule } from '@nestjs/axios';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  controllers: [MoonPhaseController],
  providers: [MoonPhaseService, ConfigService],
  imports: [PrismaModule, HttpModule, ConfigModule],
})
export class MoonPhaseModule {
}
