import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEventDTO } from 'src/event/dto/CreateEvent.dto';
import { User } from '@prisma/client';

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
          photoBase64: dto.photoBase64,
        },
      });
    } catch (error) {
      if (error && error.code === 'P2025') {
        throw new NotFoundException('Событие с таким ID не найдено');
      }
      throw error;
    }
  }

  async create(dto: CreateEventDTO & { plantId: string; userId: string }) {
    const dateStr = new Date().toISOString().split('T')[0]; // "2025-07-07"

    //ищем запись о Погоде на сегдня
    let weather = await this.prismaService.weather.findUnique({
      where: { dateTime: dateStr },
    });

    // Если не нашли — создаём новую
    if (!weather) {
      weather = await this.prismaService.weather.create({
        data: {
          dateTime: dateStr,
        },
      });
    }

    // Создаём событие
    return this.prismaService.event.create({
      data: {
        dateTime: dto.dateTime,
        workType: dto.workType,
        moonPhase: dto.moonPhase,
        description: dto.description,
        photoBase64: dto.photoBase64,
        plantId: dto.plantId,
        userId: dto.userId,
        weatherId: weather.id,
      },
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
