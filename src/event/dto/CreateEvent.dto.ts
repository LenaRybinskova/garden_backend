import { IsEnum, IsOptional, IsString } from 'class-validator';
import { WorkType } from '@prisma/client';

export class CreateEventDTO {
  @IsEnum(WorkType)
  workType?: WorkType = WorkType.SEEDING;

  @IsString()
  @IsOptional()
  moonPhase?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  photoBase64?: string;


}
