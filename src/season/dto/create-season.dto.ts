import { IsOptional, IsString } from 'class-validator';

export class CreateSeasonDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;
}
