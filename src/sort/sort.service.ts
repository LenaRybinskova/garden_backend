import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSortDTO } from 'src/sort/dto/create-sort.dto';
import { UpdateSotrDto } from 'src/sort/dto/update-sort.dto';
import { User } from '@prisma/client';

@Injectable()
export class SortService {
  constructor(private readonly prismaService: PrismaService) {}

  /*  // проверка, создавал сущность текущий пользователь?
    async isOwnSort(userId: string, sortId: string) {
      try {
        const sort = await this.prismaService.sort.findUnique({
          where: { id: sortId },
        });
        if(sort.)
        
        return sort;
      } catch (err) {
        throw new ForbiddenException(
          'этот пользователь не может вносить изменения тк не является создателем Sort',
        );
      }
    }*/

  async create(dto: CreateSortDTO) {
    const sort = this.prismaService.sort.create({
      data: {
        name: dto.name,
        userDescription: dto.userDescription,
        producerDescription: dto.producerDescription,
        photoPackageBase64: dto.photoPackageBase64,
      },
    });

    return sort;
  }

  async update(dto: UpdateSotrDto) {
    const updateData = {
      name: dto.name ?? undefined,
      userDescription: dto.userDescription ?? undefined,
      producerDescription: dto.producerDescription ?? undefined,
      photoPackageBase64: dto.photoPackageBase64 ?? undefined,
    };

    return this.prismaService.sort.update({
      where: { id: dto.id },
      data: updateData,
    });
  }
}
