import { Injectable } from '@nestjs/common';
import { CreateSeasonDto } from './dto/create-season.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class SeasonService {
  constructor(private readonly prismaService: PrismaService) {
  }

  async create(dto: CreateSeasonDto, user: User) {
    return this.prismaService.season.create({
      data: {
        name: dto.name,
        description: dto.description,
        user: { connect: { id: user.id } },
      },
    })
  }

  async findByUserId(userId: string) {
    return this.prismaService.season.findMany({
      where: { userId: userId },
    });
  }

// TODO findFirst правильно?? мне надо чтобы возвращался по юзерИД и нейму конкретный Сезон

  async findCurrentSeasonByUserId(userId: string, name: string) {
    return this.prismaService.season.findFirst({
      where: { userId: userId, name: name },
    });
  }


}
