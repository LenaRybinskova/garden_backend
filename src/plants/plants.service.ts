import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePlantDto } from './dto/CreatePlantDto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';
import { SortService } from 'src/sort/sort.service';
import { EventService } from 'src/event/event.service';
import { handlePrismaError } from 'src/common/utils/handlePrismaError';

@Injectable()
export class PlantsService {
  constructor(
    private prismaService: PrismaService,
    private sortService: SortService,
    private readonly eventService: EventService,
  ) {}

  async create(dto: CreatePlantDto, user: User) {
    // cоздала сорт
    const sort = await this.sortService.create(dto.sort);

    // cоздала Плант с sort.id,
    const plant = await this.prismaService.plant.create({
      data: {
        kindPlant: dto.kindPlant,
        userId: user.id,
        sortId: sort.id,
      },
    });

    // если были переданы данные по event, то создаем сразу event
    if (dto.event) {
      await this.eventService.create({
        ...dto.event,
        plantId: plant.id,
      });
    }

    return plant;
  }

  async findAll() {
    return this.prismaService.plant.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findById(id: string) {
    try {
      return this.prismaService.plant.findUnique({
        where: { id },
        select: { events: { orderBy: { createdAt: 'desc' } } }
      });
    } catch (error) {
      handlePrismaError(error, 'нет такого ID');
    }
  }
}
