import { Controller } from '@nestjs/common';
import { PhotoValidationService } from 'src/photo/photoValidation.service';

@Controller('photo')
export class PhotoController {
  constructor(private readonly photoService: PhotoValidationService) {}
}
