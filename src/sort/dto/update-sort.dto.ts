import { IsOptional, IsString } from 'class-validator';

export class UpdateSotrDto {
  @IsString()
  id: string;

  @IsString()
  name?: string;

  @IsString()
  @IsOptional()
  userDescription?: string;

  @IsString()
  @IsOptional()
  producerDescription?: string;

  @IsString()
  @IsOptional()
  photoPackageBase64?: string;
}
