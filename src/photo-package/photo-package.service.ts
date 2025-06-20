import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePlantPhotoPackageDto } from 'src/photo-package/dto/createPhotoPackage.dto';

@Injectable()
export class PhotoPackageService {
  constructor(private readonly prismaService: PrismaService) {
  }

  async create(dto: CreatePlantPhotoPackageDto) {
    /*    return this.prismaService.photoPackage.create({
          data: {
            photo: dto.photo,
          },
          select:{
            id:true,
            photo:true,
            Plants:true
          }
        });*/
  }
}
