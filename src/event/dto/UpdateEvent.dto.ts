import { IsEnum, IsOptional, IsString } from 'class-validator';
import { WorkType } from '@prisma/client';

export class UpdateEventDTO {
  @IsString()
  @IsOptional()
  dateTime?: string;

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
