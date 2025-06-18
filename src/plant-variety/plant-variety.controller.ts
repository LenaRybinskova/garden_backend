import { Controller } from '@nestjs/common';
import { PlantVarietyService } from './plant-variety.service';

@Controller('plant-variety')
export class PlantVarietyController {
  constructor(private readonly plantVarietyService: PlantVarietyService) {}
}
