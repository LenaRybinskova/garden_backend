import { Kind } from '@prisma/client';
import { IsEnum, IsOptional, ValidateNested } from 'class-validator';
import { CreateSortDTO } from 'src/sort/dto/create-sort.dto';
import { CreateEventDTO } from 'src/plants/dto/CreateEvent.dto';
import { Type } from 'class-transformer';

export class CreatePlantDto {
  @IsEnum(Kind)
  kindPlant: Kind;

  @ValidateNested()
  @Type(() => CreateSortDTO)
  sort: CreateSortDTO;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateEventDTO)
  event?: CreateEventDTO;
}
