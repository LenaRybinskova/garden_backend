import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { PlantsModule } from './plants/plants.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { SortModule } from './sort/sort.module';
import { EventModule } from './event/event.module';
import { ScheduleModule } from '@nestjs/schedule';
import { MoonPhaseModule } from './moon-phase/moon-phase.module';
import { SeasonModule } from './season/season.module';
import { WeatherModule } from './weather/weather.module';
import { join } from 'path';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      serveRoot: '/assets',
    }),
    PrismaModule,
    AuthModule,
    PlantsModule,
    SortModule,
    EventModule,
    MoonPhaseModule,
    SeasonModule,
    WeatherModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
