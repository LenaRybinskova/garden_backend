import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { PlantsModule } from './plants/plants.module';

import { SortModule } from './sort/sort.module';
import { EventModule } from './event/event.module';
import { ScheduleModule } from '@nestjs/schedule';
import { MoonPhaseModule } from './moon-phase/moon-phase.module';
import { SeasonModule } from './season/season.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    PrismaModule,
    AuthModule,
    PlantsModule,
    SortModule,
    EventModule,
    MoonPhaseModule,
    SeasonModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
