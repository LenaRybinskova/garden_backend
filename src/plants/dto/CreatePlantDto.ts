import { Kind } from '@prisma/client';
import {
  IsBoolean,
  IsEnum,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateSortDTO } from 'src/sort/dto/create-sort.dto';
import { CreateEventDTO } from 'src/event/dto/CreateEvent.dto';
import { Type } from 'class-transformer';

export class CreatePlantDto {
  @IsString()
  @IsOptional()
  dateTime?: string;

  @IsEnum(Kind)
  kindPlant: Kind;

  @ValidateNested()
  @Type(() => CreateSortDTO)
  sort: CreateSortDTO;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateEventDTO)
  event?: CreateEventDTO;

  @IsString()
  @IsOptional()
  season?: string;

  @IsBoolean()
  @IsOptional()
  isPerennial?: boolean;

  @IsString()
  @IsOptional()
  locationText?: string;
}
