import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEventDTO } from 'src/plants/dto/CreateEvent.dto';

@Injectable()
export class EventService {
  constructor(private readonly prismaService: PrismaService) {
  }

  async findAll() {
    return this.prismaService.event.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  //вытащ по ID Event конкретный event
  async findById(eventId: string) {
    return this.prismaService.event.findUnique({
      where: { id: eventId },
    });
  }

  async update(id: string, dto: CreateEventDTO) {

    try {
      return this.prismaService.event.update({
        where: { id: id },
        data: {
          workType: dto.workType,
          description: dto.description,
          photo: dto.photo,
        },
      });
    } catch (error) {
      if (error && error.code === 'P2025') {
        throw new NotFoundException('Событие с таким ID не найдено');
      }
      throw error;
    }
  }

  async create(dto: CreateEventDTO & { plantId: string }) {
    return this.prismaService.event.create({
      data: {
        workType: dto.workType,
        moonPhase: dto.moonPhase,
        description: dto.description,
        photo: dto.photo,
        plantId: dto.plantId,
      } as CreateEventDTO & { plantId: string },
      select: { photo: true },
    });
  }

  async delete(id: string) {
    try {
      this.prismaService.event.delete({ where: { id } });
      return true;
    } catch (error) {
      if (error && error.code === 'P2025') {
        throw new NotFoundException('Событие с таким ID не найдено');
      }
      throw error;
    }
  }
}
