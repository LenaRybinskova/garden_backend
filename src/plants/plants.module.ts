import { Module } from '@nestjs/common';
import { PlantsService } from './plants.service';
import { PlantsController } from './plants.controller';
import { SortModule } from 'src/sort/sort.module';
import { EventModule } from 'src/event/event.module';
import { SeasonModule } from 'src/season/season.module';

@Module({
  controllers: [PlantsController],
  providers: [PlantsService],
  exports: [PlantsService],
  imports: [SortModule, EventModule, SeasonModule],
})
export class PlantsModule {}
