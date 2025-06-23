import { Kind} from '@prisma/client';
import { IsEnum, IsOptional, IsString, ValidateNested } from 'class-validator';
import { CreatePlantVarietyDto } from 'src/plant-variety/dto/createPlantVariety.dto';
import { Type } from 'class-transformer';
import { CreatePlantPhotoPackageDto } from 'src/photo-package/dto/createPhotoPackage.dto';
import { CreateSortDTO } from 'src/sort/dto/create-sort.dto';

export class CreatePlantDto {
  @IsOptional()
  @IsEnum(Kind)
  kindPlant: Kind = Kind.VEGETABLE;

  sort: CreateSortDTO

/*  @IsString()
  userId: string;*/
/*
  @ValidateNested()
  @Type(() => CreatePlantVarietyDto)
  plantVariety: CreatePlantVarietyDto;

  @ValidateNested()
  @Type(() => CreatePlantVarietyDto)
  typePlants: CreatePlantVarietyDto;

  @ValidateNested()
  @Type(() => CreatePlantPhotoPackageDto)
  photoPackage?: CreatePlantPhotoPackageDto;



  @IsOptional()
  @IsEnum(WorkType)
  workType: WorkType = WorkType.SEEDING;*/
}
