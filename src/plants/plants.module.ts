import { Module } from '@nestjs/common';
import { PlantsService } from './plants.service';
import { PlantsController } from './plants.controller';
import { SortModule } from 'src/sort/sort.module';
import { EventService } from 'src/event/event.service';
import { EventModule } from 'src/event/event.module';

@Module({
  controllers: [PlantsController],
  providers: [PlantsService, EventService],
  exports: [PlantsService],
  imports: [SortModule, EventModule],
})
export class PlantsModule {}
