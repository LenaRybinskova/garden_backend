import { Module } from '@nestjs/common';
import { PhotoPackageService } from './photo-package.service';
import { PhotoPackageController } from './photo-package.controller';

@Module({
  controllers: [PhotoPackageController],
  providers: [PhotoPackageService],
})
export class PhotoPackageModule {}
