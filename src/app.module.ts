import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { PlantsModule } from './plants/plants.module';

import { SortModule } from './sort/sort.module';
import { EventModule } from './event/event.module';

@Module({
  imports: [PrismaModule, AuthModule, PlantsModule, SortModule, EventModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
