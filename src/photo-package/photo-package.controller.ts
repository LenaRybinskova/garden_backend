import { Body, Controller, Post } from '@nestjs/common';
import { PhotoPackageService } from './photo-package.service';
import { CreatePlantPhotoPackageDto } from 'src/photo-package/dto/createPhotoPackage.dto';

@Controller('photo-package')
export class PhotoPackageController {
  constructor(private readonly photoPackageService: PhotoPackageService) {}

  @Post()
  create(@Body() dto:CreatePlantPhotoPackageDto) {
    return this.photoPackageService.create(dto)
  }
}
