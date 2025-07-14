import { IsBoolean, IsEnum, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Kind } from '@prisma/client';
import { Type } from 'class-transformer';
import { CreateSortDTO } from 'src/sort/dto/create-sort.dto';
import { UpdateSotrDto } from 'src/sort/dto/update-sort.dto';

export class UpdatePlantDto {
  @IsOptional()
  @IsString()
  dateTime?: string;

  @IsOptional()
  @IsEnum(Kind)
  kindPlant?: Kind;

  @IsOptional()
  @IsBoolean()
  isPerennial?: boolean

  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateSotrDto)
  sort?: UpdateSotrDto;

  @IsOptional()
  @IsString()
  locationText? :string

  @IsOptional()
  @IsString()
  result? :string


}
