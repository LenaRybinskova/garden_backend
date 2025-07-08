import { Module } from '@nestjs/common';
import { WeatherService } from './weather.service';
//import { WeatherController } from './weather.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { PrismaModule } from 'src/prisma/prisma.module';
import { WeatherController } from 'src/weather/weather.controller';


@Module({
  controllers: [WeatherController],
  imports: [PrismaModule, HttpModule, ConfigModule],
  providers: [WeatherService],
})
export class WeatherModule {}
