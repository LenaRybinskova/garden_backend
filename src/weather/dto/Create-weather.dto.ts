import { IsOptional, IsString } from 'class-validator';

export class CreateWeatherDto {
  @IsString()
  dateTime: string;

  @IsString()
  @IsOptional()
  AM3?: string;

  @IsString()
  @IsOptional()
  PM3?: string;

  @IsString()
  @IsOptional()
  description?: string;
}
