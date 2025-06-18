import { Kind, WorkType } from '@prisma/client';
import { IsEnum, IsOptional, IsString, ValidateNested } from 'class-validator';
import { CreatePlantVarietyDto } from 'src/plant-variety/dto/createPlantVariety.dto';
import { Type } from 'class-transformer';
import { CreatePlantPhotoPackageDto } from 'src/plants/dto/createPhotoPackage.dto';

export class CreatePlantDto {
  @IsOptional()
  @IsEnum(Kind)
  kindPlant: Kind = Kind.VEGETABLE;

  @ValidateNested()
  @Type(() => CreatePlantVarietyDto)
  plantVariety: CreatePlantVarietyDto;

  @ValidateNested()
  @Type(() => CreatePlantVarietyDto)
  typePlants: CreatePlantVarietyDto;

  @ValidateNested()
  @Type(() => CreatePlantPhotoPackageDto)
  photoPackage?: CreatePlantPhotoPackageDto;

  @IsString()
  userId: string;

  @IsOptional()
  @IsEnum(WorkType)
  workType: WorkType = WorkType.SEEDING;
}
