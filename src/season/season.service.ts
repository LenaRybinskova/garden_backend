import { ConflictException, Injectable } from '@nestjs/common';
import { CreateSeasonDto } from './dto/create-season.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class SeasonService {
  constructor(private readonly prismaService: PrismaService) {
  }

  async create(dto: CreateSeasonDto, user: User) {
    try{
      const isExist = await this.findCurrentSeasonByUserId(user.id, dto.name)
      if(!isExist){
        return this.prismaService.season.create({
          data: {
            name: dto.name,
            description: dto.description ?? undefined,
            user: { connect: { id: user.id } },
          },
        })
      }
    }
    catch(err){
      throw new ConflictException("такой сезон уже существует")
    }
  }

  async findByUserId(userId: string) {
    return this.prismaService.season.findMany({
      where: { userId: userId },
    });
  }

// TODO findFirst правильно?? мне надо чтобы возвращался по юзерИД и нейму конкретный Сезон
  // получить ИД сезона по его названию (название уникально)
 async findCurrentSeasonByUserId(userId: string, name: string) {
    return this.prismaService.season.findFirst({
      where: { userId: userId, name: name },
    });
  }


}
