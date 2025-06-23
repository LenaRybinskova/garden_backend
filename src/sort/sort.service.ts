import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSortDTO } from 'src/sort/dto/create-sort.dto';

@Injectable()
export class SortService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: CreateSortDTO) {
    const sort = this.prismaService.sort.create({
      data: {
        name: dto.name,
        userDescription: dto.userDescription,
        producerDescription: dto.producerDescription,
        photoPackage: dto.photoPackage,
      },
    });

    return sort;
  }
}
