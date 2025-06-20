import { IsString } from 'class-validator';

export class CreatePlantPhotoPackageDto {
  @IsString()
  photo: string;
}
