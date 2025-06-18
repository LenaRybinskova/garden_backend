import { Module } from '@nestjs/common';
import { PlantVarietyService } from './plant-variety.service';
import { PlantVarietyController } from './plant-variety.controller';

@Module({
  controllers: [PlantVarietyController],
  providers: [PlantVarietyService],
})
export class PlantVarietyModule {}
