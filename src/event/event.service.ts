import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEventDTO } from 'src/plants/dto/CreateEvent.dto';

@Injectable()
export class EventService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: CreateEventDTO & { plantId: string }) {

    return this.prismaService.event.create({
      data: {
        workType: dto.workType,
        description: dto.description,
        photo: dto.photo,
        plantId: dto.plantId,
      } as CreateEventDTO & { plantId: string },
    });
  }
}
