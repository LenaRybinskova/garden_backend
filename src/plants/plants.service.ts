import { Injectable } from '@nestjs/common';
import { CreatePlantDto } from './dto/CreatePlantDto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';
import { SortService } from 'src/sort/sort.service';
import { EventService } from 'src/event/event.service';

@Injectable()
export class PlantsService {
  constructor(
    private prismaService: PrismaService,
    private sortService: SortService,
    private readonly eventService: EventService,
  ) {}

  async create(dto: CreatePlantDto, user: User) {
    const sort = await this.sortService.create(dto.sort);

    const plant = await this.prismaService.plant.create({
      data: {
        kindPlant: dto.kindPlant,
        userId: user.id,
        sortId: sort.id,
      },
    });

    if (dto.event) {
      console.log("dto.event", dto.event)
      await this.eventService.create({
        ...dto.event,
        plantId: plant.id,
      });
    }

    return plant;
  }
}
