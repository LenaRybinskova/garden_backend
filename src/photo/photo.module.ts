import { Module } from '@nestjs/common';
import { PhotoValidationService } from 'src/photo/photoValidation.service';
import { PhotoController } from './photo.controller';

@Module({
  controllers: [PhotoController],
  providers: [PhotoValidationService],
  exports: [PhotoValidationService],
})
export class PhotoModule {}
