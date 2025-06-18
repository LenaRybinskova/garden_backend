import { IsString } from 'class-validator';

export class CreatePlantVarietyDto {
  @IsString()
  description: string;
}
