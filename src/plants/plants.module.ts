import { Module } from '@nestjs/common';
import { PlantsService } from './plants.service';
import { PlantsController } from './plants.controller';
import { SortModule } from 'src/sort/sort.module';
import { EventService } from 'src/event/event.service';
import { EventModule } from 'src/event/event.module';
import { SeasonModule } from 'src/season/season.module';
import { SeasonService } from 'src/season/season.service';

@Module({
  controllers: [PlantsController],
  providers: [PlantsService, EventService, SeasonService],
  exports: [PlantsService],
  imports: [SortModule, EventModule, SeasonModule],
})
export class PlantsModule {}
