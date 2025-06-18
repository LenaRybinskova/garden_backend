import { Injectable } from '@nestjs/common';
import { CreatePlantDto } from './dto/CreatePlantDto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PlantsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: CreatePlantDto) {
    //сначала созд запись в табл photoPackage
    let photoPackageId: string | null = null;

    if (dto.photoPackage) {
      const photoPackage = await this.prismaService.photoPackage.create({
        data: {
          photo: dto.photoPackage.photo,
        },
      });
      photoPackageId = photoPackage.id;

      return photoPackageId;
    }
  }
}
