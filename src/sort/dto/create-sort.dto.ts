import { IsOptional, IsString } from 'class-validator';

export class CreateSortDTO {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  userDescription?: string;

  @IsString()
  @IsOptional()
  producerDescription?: string;

  @IsString()
  @IsOptional()
  photoPackage?: string;
}
