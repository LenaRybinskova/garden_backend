import { Injectable } from '@nestjs/common';
import { CreatePlantDto } from './dto/CreatePlantDto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class PlantsService {
  constructor(private readonly prismaService: PrismaService) {
  }

  async create(dto: CreatePlantDto, user: User) {

    const sort = await this.prismaService.sort.create({
      data: {
        name: dto.sort.name,
        description: dto.sort.description,
      },
    });

    const plant = this.prismaService.plant.create({
      data: {
        kindPlant: dto.kindPlant,
        userId: user.id,
        sortId: sort.id,
      },
    });

    return plant;
  }
}


/*//сначала созд запись в табл photoPackage
let photoPackageId: string | null = null;

if (dto.photoPackage) {
  const photoPackage = await this.prismaService.photoPackage.create({
    data: {
      photo: dto.photoPackage.photo,
    },
  });
  photoPackageId = photoPackage.id;

  return photoPackageId;
}*/