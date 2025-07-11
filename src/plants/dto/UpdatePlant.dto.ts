import { IsEnum, IsOptional, ValidateNested } from 'class-validator';
import { Kind } from '@prisma/client';
import { Type } from 'class-transformer';
import { CreateSortDTO } from 'src/sort/dto/create-sort.dto';

export class UpdatePlantDto {
  @IsOptional()
  @IsEnum(Kind)
  kindPlant?: Kind;

  @IsOptional()
  @IsEnum(Kind)
  dateTime?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateSortDTO)
  sort?: CreateSortDTO;
}
